import Hero from "@/Component/Hero";
import HowItWorks from "@/Component/HowItWork";
import TrendingIdeasPage from "@/Component/TrendingPage";

export default function Home() {
  return (
    <div>
      <Hero/>
      <TrendingIdeasPage/>
      <HowItWorks/>
    </div>
  );
}
