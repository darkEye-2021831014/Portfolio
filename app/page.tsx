import { FadeUpObserver, Footer, Header, MobileNav, RadialGlow } from "@/components/layout";
import { AboutSection } from "./(home)/sections/About";
import { AchievementsSection } from "./(home)/sections/Achievements";
import { CompetitiveProgrammingSection } from "./(home)/sections/CompetitiveProgramming";
import { ContactSection } from "./(home)/sections/Contact";
import { Hero } from "./(home)/sections/Hero";
import { ProjectsSection } from "./(home)/sections/Projects";
import { SkillsSection } from "./(home)/sections/Skills";

/**
 * Home page. Composes the full portfolio in the same order as
 * `design/desktop/code.html` and `design/mobile/code.html`:
 *
 *   1. Hero (anchors #about)
 *   2. About + Key Metrics
 *   3. Competitive Programming (#cp)
 *   4. Featured Projects (#projects)
 *   5. Technical Proficiencies (#skills)
 *   6. Honors & Achievements (#achievements)
 *   7. Contact (#contact)
 *
 * All copy is sourced from `/content/*`. The `Header` and `MobileNav`
 * are rendered above the page; the `Footer` is rendered below.
 *
 * Each section carries the `motion-fade-up` class so the
 * `<FadeUpObserver />` toggles `is-visible` as it enters the viewport
 * (no-op when prefers-reduced-motion is set).
 */
export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header />
      <MobileNav />
      <FadeUpObserver />

      <main id="main" className="relative w-full bg-surface-container-lowest pt-16 pb-20 lg:pb-0">
        <RadialGlow />

        <div className="relative mx-auto flex max-w-container flex-col gap-24 px-margin py-space-xl">
          <Hero />
          <div className="motion-fade-up"><AboutSection /></div>
          <div className="motion-fade-up"><CompetitiveProgrammingSection /></div>
          <div className="motion-fade-up"><ProjectsSection /></div>
          <div className="motion-fade-up"><SkillsSection /></div>
          <div className="motion-fade-up"><AchievementsSection /></div>
          <div className="motion-fade-up"><ContactSection /></div>
        </div>
      </main>

      <Footer />
    </>
  );
}
