import Notice from "@/components/Notice";
import Header from "@/components/Header";
import Title from "@/components/Title";
import PrayerTimes from "@/components/PrayerTimes";
import News from "@/components/News";
import Footer from "@/components/Footer";
import GridSection from "@/components/GridSection";
const OLD = true;

export default function Home() {
  return (
    <div className="app-container">
      {OLD ? (
        <iframe
        src='/AIC-site/aic.html'
        style={styles.iframe}
        ></iframe>
      ) : (
        <>
          <Notice />
          <Header />
          <Title />
          <PrayerTimes />
          <GridSection gridTitle='Objects' />
          <GridSection gridTitle='Programs' />
          <GridSection gridTitle='Services' />
          <News />
          <Footer />
        </>
      )}
    </div>
  );
}

const styles: Record<string, any> = {
  iframe: {
    height: '100%',
    width: '100%',
  },
};