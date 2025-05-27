import { Suspense } from "react";
import { ClimbingBoxLoader } from "react-spinners";

export default function Layout({ children }) {
  return (
    <div className="px-5">
      <Suspense
        fallback={<ClimbingBoxLoader color="#170a0a" size={15} speedMultiplier={1}/>}
      >
        {children}
      </Suspense>
    </div>
  );
}