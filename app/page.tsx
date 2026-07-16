import { AlertBanner } from "./components/AlertBanner";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { News } from "./components/News";
import { Footer } from "./components/Footer";
import { PrayerTimes } from "./components/PrayerTime";
import { Events } from "./components/Events";
import { AboutUs } from "./components/AboutUs";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { Programs } from "./components/Programs";
import { MobileNav } from "./components/MobileNav";
import { Flayer } from "./components/Flayer";
import { OverlayActivityProvider } from "./components/OverlayActivityContext";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Home() {
  return (
    <>
      <OverlayActivityProvider>
        <Flayer />
        <AlertBanner />
        <Header />
        <main>
          <Hero />
          <PrayerTimes />
          <AboutUs />
          <Services />
          <Gallery />
          <Programs />
          <Events title="Events" />
          <News />
        </main>
        <Footer />
        <MobileNav />
      </OverlayActivityProvider>
    </>
  );
}
