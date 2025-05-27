import { SignIn } from '@clerk/nextjs'

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <SignIn path="/sign-in" routing="path" />
    </div>
  );
  
}
export default Page;