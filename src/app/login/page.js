import LoginPage from "@/Component/LoginPage";
import { Suspense } from "react";

export const metadata = {
  title: 'ThinkShare - Login',
  description: 'This is the best idea share platform '
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage/>
    </Suspense>
  );
}
