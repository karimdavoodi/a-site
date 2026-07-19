import { AlertBanner } from "./components/AlertBanner";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { News } from "./components/News";
import { Footer } from "./components/Footer";
import { PrayerTimes, getPrayerTimesData } from "./components/PrayerTime";
import { Events } from "./components/Events";
import { AboutUs } from "./components/AboutUs";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { MobileNav } from "./components/MobileNav";
import { NextPrayerCountdown } from "./components/PrayerTimeClient";
import { DonationCard } from "./components/DonationCard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Home() {
  const prayerData = await getPrayerTimesData();

  return (
    <>
      <AlertBanner />
      <Header />
      <main id="main-content">
        <Hero>
          {prayerData && (
            <NextPrayerCountdown
              prayers={prayerData.prayers}
              day={prayerData.day}
            />
          )}
        </Hero>
        {prayerData && <PrayerTimes data={prayerData} />}
        <DonationCard />
        <AboutUs />
        <Services />
        <Gallery />
        <Events title="Events" />
        <News />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
