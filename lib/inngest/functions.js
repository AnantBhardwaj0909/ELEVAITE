import { inngest } from "./client";
import { db } from "../prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateIndustryInsights = inngest.createFunction(
  { name: "Generate Industry Insights" },
  { cron: "0 0 * * 0" }, // every Sunday
  async ({ step }) => {
    const industries = await step.run("Fetch industries", async () => {
      return await db.userIndustry.findMany({
        select: { industry: true },
      });
    });

    for (const { industry } of industries) {
      const prompt = `
        Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format:
        {
          "salaryRanges": [
            { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
          ],
          "growthRate": number,
          "demandLevel": "High" | "Medium" | "Low",
          "topSkills": ["skill1", "skill2"],
          "marketOutlook": "Positive" | "Neutral" | "Negative",
          "keyTrends": ["trend1", "trend2"],
          "recommendedSkills": ["skill1", "skill2"]
        }
        Include at least 5 roles, 5 skills, and 5 trends. Return ONLY valid JSON.
      `;

      const response = await step.run(`Generate insights for ${industry}`, async () => {
        const result = await model.generateContent(prompt);
        return result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";
      });

      const cleanedText = response.replace(/```json/g, "").replace(/```/g, "").trim();

      let insights;
      try {
        insights = JSON.parse(cleanedText);
      } catch (error) {
        console.error(`Failed to parse JSON for ${industry}:`, cleanedText);
        continue;
      }

      await step.run(`Update ${industry} insights`, async () => {
        await db.UserIndustry.update({
          where: { industry },
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
          },
        });
      });
    }
  }
);
