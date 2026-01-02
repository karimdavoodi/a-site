import Notice from "@/components/Notice";
import Header from "@/components/Header";
import Title from "@/components/Title";
import News from "@/components/News";
import Footer from "@/components/Footer";
import GridSection from "@/components/GridSection";
import PrayerAndMap from "@/components/PrayerAndMap";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
  }
) {
  const resolvedSearchParams = await searchParams;
  const mode = resolvedSearchParams.mode ?? 'default';

  console.log('KKKL', mode);
  return (
    <div className="app-container">
      {mode !== 'new' ? (
        <iframe
        src='/old-site/aic.html'
        style={styles.iframe}
        ></iframe>
      ) : (
        <>
          <Notice />
          <Header />
          <Title />
          <PrayerAndMap />
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

const styles: { [key: string]: React.CSSProperties } = {
  iframe: {
    height: '100%',
    width: '100%',
  },
};