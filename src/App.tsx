import { Nav } from "./components/layout/Nav";
import { ExpertiseSection } from "./components/sections/ExpertiseSection";
import { FooterSection } from "./components/sections/FooterSection";
import { HeroSection } from "./components/sections/HeroSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { WorkSection } from "./components/sections/WorkSection";
import ParticleTrail from "./components/ui/ParticleTrail";

export default function App() {
  return (
    <>
      <Nav />
      <ParticleTrail />
      {/* Stacking container — needs enough height for all sticky panels */}
      <main>
        <HeroSection />
        <ProjectsSection />
        <WorkSection />
        <ExpertiseSection />
        <FooterSection />
      </main>
    </>
  );
}
