import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

const AICoverLettersPage = () => {
  return (
    <div>
        <h1 className="flex flex-row font-bold gradient-title text-5xl md:text-6xl space-y-2">
          Create Cover Letter
        </h1>
        <p></p>
        <p className="flex flex-row text-muted-foreground space-y-2">
          Generate a Personalised AI Cover Letter For Your Job Description.
        </p>
        <div>
        <Card>
        <CardHeader>
          <CardTitle className="flex flex-row text-2xl space-y-3 gap-y-2">Job Details</CardTitle>
          <CardDescription className="flex flex-row text-muted-foreground">Provide information about the position you're applying</CardDescription>
        </CardHeader>
        <CardContent>
        <div className="grid grid-cols-2 gap-4 gap-y-2">
          <div className="space-y-2">            
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              type="text"
              id="companyName"
              placeholder="Enter the Company Name"
            />
          </div>

          <div className="space-y-2 gap-y-2">            
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              type="text"
              id="jobTitle"
              placeholder="Enter Job Title"
            />
          </div>

          <div className="col-span-2 space-y-2 gap-y-2"> 
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the Job Description here"
              className="h-32"
            />
          </div>
        </div>
        <Button type="button" variant="ghost" size="sm">
        <Sparkles className="h-4 w-4 mr-2" />
        Improve with AI
      </Button>

      </CardContent>

        <CardFooter className="flex flex-row mx-2">
          <div className="flex flex-row mx-2">
            <Button
              className="w-full"
            >
              Generate Cover Letter
            </Button>
        </div>
        </CardFooter>
      </Card>
        </div>
    </div>
  )
  
};

export default AICoverLettersPage;