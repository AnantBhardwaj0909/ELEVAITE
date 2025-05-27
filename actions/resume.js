"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type, position, organization }) {
    try {
      // Verify API key first
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("AI service configuration error - Missing API key");
      }
  
      const { userId } = await auth();
      if (!userId) throw new Error("Unauthorized");
  
      const user = await db.user.findUnique({
        where: { clerkUserId: userId },
        include: { UserIndustry: true },
      });
  
      if (!user) throw new Error("User not found");
  
      // Build more detailed prompt
      const prompt = `
      As an expert resume writer, improve this ${type} description for a ${user.UserIndustry?.name || 'tech'} professional.
      Incorporate these specific details:
      - Position: ${position || 'Engineering Role'}
      - Company: ${organization || 'Tech Company'}
      
      Current description: "${current}"
      
      Requirements:
      1. Explicitly mention the position and company name naturally
      2. Use action verbs like "developed", "led", or "implemented"
      3. Include measurable metrics where possible
      4. Focus on technical achievements relevant to ${position}
      5. Keep it to 2 concise sentences maximum
      
      Example format:
      "Developed [specific system] at [Company] using [technologies], resulting in [metric]. Led [specific initiative] that improved [business outcome] by [percentage]."
      
      Improved description:`;
  
      console.log("Sending prompt to Gemini:", prompt);
  
      // Add timeout handling
      const result = await Promise.race([
        model.generateContent(prompt),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("AI request timed out")), 10000)
        ),
      ]);
      
  
      if (!result?.response) {
        throw new Error("Invalid response from AI service");
      }
  
      const responseText = await result.response.text();
      const cleanContent = responseText
        .replace(/```/g, "")
        .trim();
  
      if (!cleanContent) throw new Error("Empty content from AI service");
  
      console.log("Received improved content:", cleanContent);
      return cleanContent;
  
    } catch (error) {
      console.error("AI Improvement Error:", {
        error: error.message,
        stack: error.stack,
        type,
        position,
        organization
      });
      
      throw new Error(`Failed to improve content: ${error.message}`);
    }
  }