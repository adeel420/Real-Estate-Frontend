import HeroSection from "./components/home/HeroSection";
import ExclusiveProperties from "./components/home/ExclusiveProperties";
import FeaturedProperties from "./components/home/FeaturedProperties";
import CitiesSection from "./components/home/CitiesSection";
import HowItWorks from "./components/home/HowItWorks";
import AgentsSection from "./components/home/AgentsSection";
import Testimonials from "./components/home/Testimonials";
import StatsSection from "./components/home/StatsSection";
import FAQSection from "./components/home/FAQSection";
import CTABanner from "./components/home/CTABanner";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProperties />
      <CitiesSection />
      <HowItWorks />
      <ExclusiveProperties />
      <AgentsSection />
      <Testimonials />
      <StatsSection />
      <FAQSection />
      <CTABanner />
    </main>
  );
}
