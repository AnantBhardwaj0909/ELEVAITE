import { UserPlus, FileEdit, Users, LineChart } from "lucide-react";

export const howItWorks = [
  {
    title: "Personalized Onboarding",
    description: "Tell us about your background and career goals to tailor your experience from the start.",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    title: "Build Your Career Assets",
    description: "Generate ATS-optimized resumes and persuasive cover letters designed to stand out.",
    icon: <FileEdit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Ace the Interview",
    description: "Practice with role-specific AI mock interviews and receive actionable feedback.",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    title: "Track & Improve",
    description: "View progress analytics and identify key areas for continuous improvement.",
    icon: <LineChart className="w-8 h-8 text-primary" />,
  },
];
