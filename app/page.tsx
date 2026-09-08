import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { Narrative } from "./components/Narrative";
import { Experiences } from "./components/Experiences";
import { Atmosphere } from "./components/Atmosphere";
import { Reservation } from "./components/Reservation";
import { SiteFooter } from "./components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Narrative />
        <Experiences />
        <Atmosphere />
        <Reservation />
      </main>
      <SiteFooter />
    </>
  );
}
