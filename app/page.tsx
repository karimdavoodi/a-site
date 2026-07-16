import { Notice } from "./components/Notice";
import { Header } from "./components/Header";
import { Title } from "./components/Title";
import { News } from "./components/News";
import { Footer } from "./components/Footer";
import { PrayerTimes } from "./components/PrayerTime";
import { Events } from "./components/Events";
import { AboutUs } from "./components/AboutUs";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { Programs } from "./components/Programs";
import { Flayer } from "./components/Flayer";
import { OverlayActivityProvider } from "./components/OverlayActivityContext";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Home() {

  return (
    <div style={styles.appContainer}>
      <div style={styles.contentShield}>
        <OverlayActivityProvider>
          <Flayer />
          <Notice />
              <Header />
              <Title />
              <PrayerTimes />
              <AboutUs />
              <Services />
              <Gallery />
              <Programs />
              <Events title="Events" />
              <News />
          <Footer />
        </OverlayActivityProvider>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
  },
  contentShield: {
    width: "100%",
    maxWidth: "1080px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    background: "var(--backgroud-color)",
    flexGrow: 1,
  },
};
