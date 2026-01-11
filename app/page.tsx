import {Notice} from "@/components/Notice";
import {Header} from "@/components/Header";
import {Title} from "@/components/Title";
import {News} from "@/components/News";
import {Footer} from "@/components/Footer";
import {GridSection} from "@/components/GridSection";
import {PrayerTimes} from "@/components/PrayerTime";
import {Events} from "@/components/Events";
import {Flayer} from "@/components/Flayer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Home() {
  return (
    <div style={styles.appContainer}>
      <div style={styles.contentShield}>
        <Flayer />
        <Notice />
        <Header />
        <Title />
        <PrayerTimes />
        <GridSection gridTitle="About Us" folder="about_us" />
        <GridSection gridTitle="Services" folder="services" />
        {/* TODO: fill /public/components/programs before enabling the below component */}
        {/* <GridSection gridTitle="Programs" folder="programs" /> */}
        <Events title="Events" />
        <News />
        <Footer />
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
