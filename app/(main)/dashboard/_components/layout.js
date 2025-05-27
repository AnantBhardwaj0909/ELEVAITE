import { ClimbingBoxLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
      </div>
      <Suspense
        fallback={<ClimbingBoxLoader color="#170a0a" size={15} speedMultiplier={1}/>}
      >
        {/* suspense used to show loader while the data is fetched */}
        {children}
      </Suspense>
    </div>
  );
}