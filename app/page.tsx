import Notice from "@/components/Notice";
import Header from "@/components/Header";
import Title from "@/components/Title";
import News from "@/components/News";
import Footer from "@/components/Footer";
import GridSection from "@/components/GridSection";
import PrayerTimes from "@/components/PrayerTime";
import Programs from "@/components/Programs";

// export const dynamic = "force-dynamic";
// export const runtime = "nodejs";

export default async function Home() {
  const mode = "new";

  return (
    <div className="app-container">
      <div className="content-shield">
        {mode !== "new" ? (
          <iframe src="/old-site/aic.html" style={styles.iframe}></iframe>
        ) : (
          <>
            <Notice />
            <Header />
            <Title />
            <PrayerTimes />

            <GridSection gridTitle="About Us" folder="about_us" />
            <Programs title="Programs" />
            <GridSection gridTitle="Services" folder="services" />
            <News />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  iframe: {
    height: "100%",
    width: "100%",
  },
};
