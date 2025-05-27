import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function NotFound() {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-400 mb-6">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
                <Link href="/">
                    <Button>
                    Go Back Home
                    </Button>
                </Link>
          
      </div>
    );
  }
  