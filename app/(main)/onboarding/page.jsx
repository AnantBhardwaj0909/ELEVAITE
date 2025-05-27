import { getUserOnboardingStatus } from "@/actions/user";
  import { industries } from "@/app/data/industries";
  import { redirect } from "next/navigation";
  import OnboardingForm from "./_components/onboardingForm";
import { getIndustryInsights } from "@/actions/dashboard";
  
  const OnboardingPage =async () => {
      //check if use id onboraded
      const {isOnboarded}=await getUserOnboardingStatus();
      if(isOnboarded){
          redirect("/dashboard");
      }
    return <main>
      <OnboardingForm industries={industries} />
    </main>;
    
  };
  export default OnboardingPage; 