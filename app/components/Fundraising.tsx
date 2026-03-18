"use client";

import React, { useEffect, useState } from "react";
import styles from "./Fundraising.module.css";

type GalleryKey = "old_place" | "temporay_place" | "new_place";

type ImageItem = {
  name: string;
  url: string;
};

const galleryFallbacks: Record<GalleryKey, ImageItem[]> = {
  old_place: [
    {
      name: "Previous home",
      url: "",
    },
  ],
  temporay_place: [
    {
      name: "Temporary location",
      url: "",
    },
  ],
  new_place: [
    {
      name: "Future masjid home",
      url: "",
    },
  ],
};

const galleryAltText: Record<GalleryKey, string> = {
  old_place: "Previous masjid location",
  temporay_place: "Temporary masjid location",
  new_place: "Future masjid location",
};

const ImageCarousel = ({
  folder,
  alt,
}: {
  folder: GalleryKey;
  alt: string;
}) => {
  const [images, setImages] = useState<ImageItem[]>(galleryFallbacks[folder]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function fetchImages() {
      try {
        const response = await fetch(`/api/donation-images/${folder}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to load ${folder} gallery`);
        }

        const data = (await response.json()) as ImageItem[];
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setImages(data);
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Error fetching donation gallery:", error);
      }
    }

    fetchImages();

    return () => {
      isMounted = false;
    };
  }, [folder]);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % images.length);
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [images.length]);

  const showPrevious = () => {
    setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const showNext = () => {
    setCurrentIndex((index) => (index + 1) % images.length);
  };

  const currentImage = images[currentIndex];

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselImageFrame}>
        <img
          src={currentImage.url}
          alt={`${alt} ${currentIndex + 1}`}
          className={styles.carouselImage}
        />
      </div>
      {images.length > 1 ? (
        <>
          <button
            type="button"
            className={`${styles.carouselButton} ${styles.carouselButtonLeft}`}
            onClick={showPrevious}
            aria-label={`Show previous ${alt.toLowerCase()} image`}
          >
            &#8249;
          </button>
          <button
            type="button"
            className={`${styles.carouselButton} ${styles.carouselButtonRight}`}
            onClick={showNext}
            aria-label={`Show next ${alt.toLowerCase()} image`}
          >
            &#8250;
          </button>
          <div className={styles.carouselDots} aria-hidden="true">
            {images.map((image, index) => (
              <span
                key={image.url}
                className={`${styles.carouselDot} ${
                  index === currentIndex ? styles.carouselDotActive : ""
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export const Fundraising = () => {
  const scrollToDonation = () => {
    const element = document.getElementById("donation-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoHeader}>
        <img src="/assets/logo.png" alt="AIC Logo" className={styles.largeLogo} />
      </div>

      <section className={styles.hero}>
        <div className={styles.heroBadge}>Urgent Community Appeal</div>
        <img src="/assets/hadith.png" alt="Hadith" className={styles.hadith} />
        <h1 className={styles.heroHeadline}>
          Build Your <span className={styles.highlight}>House in Jannah</span>
          <br />
          Help establish the first masjid in downtown Kitchener
        </h1>
        <p className={styles.heroSubHeadline}>
          Our community is growing quickly, and we need a{" "}
          <strong>permanent home for prayer, learning, youth programs, and family support</strong>
          .
        </p>
        <div className={styles.heroActions}>
          <button className={styles.ctaButton} onClick={scrollToDonation}>
            Donate Now
          </button>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.progressContainer}>
          <div className={styles.progressHeader}>
            <span>Goal: $3.5 Million</span>
            <span>Raised: $1.2M</span>
          </div>
          <div
            className={styles.progressBarBackground}
            aria-label="Fundraising progress"
          >
            <div className={styles.progressBarFill} />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Story</h2>
        <div className={styles.storyCard}>
          <div className={styles.mediaWrapper}>
            <video
              controls
              autoPlay
              muted
              loop
              playsInline
              className={styles.video}
              poster="/components/donation/new_place.png"
            >
              <source
                src="/components/donation/leader-message.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className={styles.textBlock}>
            <p>
              Al-Salaam Islamic Centre has secured a{" "}
              <strong>conditional agreement on a three-storey building</strong> in
              downtown Kitchener.
            </p>
            <p>
              This landmark property in the Heritage District can become a
              spiritual, educational, and social hub for a region projected to
              reach <span className={styles.highlightInline}>1 million people</span>.
            </p>
            <p>
              We are not simply acquiring a building. We are building a
              permanent home for a growing Muslim community.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Journey</h2>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <ImageCarousel
              folder="old_place"
              alt={galleryAltText.old_place}
            />
            <div className={styles.timelineContent}>
              <h3 className={styles.phaseTitle}>Resilience in the Rental</h3>
              <p className={styles.phaseText}>
                Our previous home was lost to a devastating fire. It was a
                painful test, but it strengthened our resolve to rebuild with
                more purpose and more room for the future.
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <ImageCarousel
              folder="temporay_place"
              alt={galleryAltText.temporay_place}
            />
            <div className={styles.timelineContent}>
              <h3 className={styles.phaseTitle}>Resilience in the Temporary</h3>
              <p className={styles.phaseText}>
                Even after the loss, the community never stopped gathering. We
                continue to operate from a temporary place (family center), proving that the
                masjid lives through its people before its walls.
              </p>
              <div className={styles.activityList}>
                <h4 className={styles.activityHeader}>Ongoing activities</h4>
                <ul className={styles.list}>
                  <li>
                    <strong>Five daily prayers</strong> continue to anchor the
                    community every day.
                  </li>
                  <li>
                    <strong>Jummah prayers</strong> fill the space and show the
                    urgent need for a larger permanent home.
                  </li>
                  <li>
                    <strong>Ramadan and iftars</strong> bring families together
                    through worship, service, and nightly Taraweeh.
                  </li>
                  <li>
                    <strong>Halaqas and youth education</strong> are nurturing
                    the next generation of Muslims in our city.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <ImageCarousel
              folder="new_place"
              alt={galleryAltText.new_place}
            />
            <div className={styles.timelineContent}>
              <h3 className={styles.phaseTitle}>The Future</h3>
              <p className={styles.phaseText}>
                <strong>Our goal:</strong> a permanent home of about 1,000
                square feet in three stories in the heart of downtown Kitchener, with space for
                men, women, youth, seniors, education, and community care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="donation-section" className={styles.section}>
        <h2 className={styles.sectionTitle}>Donate Now</h2>
        <div className={styles.zeffyContainer}>
          <iframe
            title="Donation form"
            src="https://www.zeffy.com/en-CA/donation-form/support-al-salaam-islamic-centre"
            className={styles.zeffyIframe}
          />
        </div>
        <div className={styles.manualDonation}>
          <p>
            <strong>Registered Canadian charity.</strong> Tax receipts are
            provided for all donations over $20.
          </p>
          <div className={styles.paymentMethods}>
            <p>
              <strong>E-Transfer:</strong> Alsalaam570@gmail.com
            </p>
            <p>
              <strong>Direct Deposit:</strong> Transit 00762, Institution 004,
              Account 5246015
            </p>
          </div>
        </div>
      </section>
      <a href='https://www.alsalaam.ca/' className={styles.mainSite}>The main website</a> 
    </div>
  );
};
