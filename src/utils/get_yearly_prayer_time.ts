// Run this script using: npx ts-node src/utils/get_yearly_prayer_time.ts
// Run it yearly to prepare prayer times data for the current year.

import puppeteer, { Page, type Browser } from "puppeteer";
import fs from "fs";

const url = "https://waterloomasjid.com/main/index.php/prayers";

interface ExtractedDay {
  year: string;
  month: string;
  day: number;
  prayers: Record<string, { azan: string; iqamah: string }>;
}

async function pageExtraxction(page: Page): Promise<(ExtractedDay | null)[]> {
  return await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll(".row"));
    console.log(`Found ${rows.length} rows in the page`);

    const extractedDays = rows.map((row) => {
      const monthyear =
        row.querySelector(".monthyear")?.textContent?.trim() || "";
      const monthName = monthyear.split(" ")[0];
      const yearName = monthyear.split(" ")[1] || "";

      const currentYear = new Date().getFullYear().toString();
      if (yearName !== currentYear) {
        console.log(
          `Skipping row for year ${yearName}, current year is ${currentYear}`
        );
        return null;
      }

      const dateday = row.querySelector(".dateday")?.textContent?.trim() || "";

      const dayNumber = parseInt(dateday.split(",")[0] || "0", 10);

      const timeCells = Array.from(row.querySelectorAll(".time-cell"));
      const prayers: Record<string, { azan: string; iqamah: string }> = {};

      timeCells.forEach((cell) => {
        const name =
          cell.querySelector(".time-name")?.textContent?.trim() || "";
        const startTime =
          cell.querySelector(".time-start")?.textContent?.trim() || "";
        const iqamahTime =
          cell.querySelector(".time-iqamah")?.textContent?.trim() || "";

        if (name) {
          prayers[name] = {
            azan: startTime,
            iqamah: iqamahTime,
          };
        }
      });

      return {
        year: yearName,
        month: monthName.toLowerCase(),
        day: dayNumber,
        prayers,
      };
    });
    return extractedDays;
  });
}

async function extractPrayerTimes() {
  console.log("Starting prayer times extraction with Puppeteer...");

  let browser: Browser | null = null;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Navigate to the page
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    // Wait for the prayer times table to load
    await page.waitForSelector(".prayer-timetable", { timeout: 30000 });
    console.log("Prayer timetable found on the page");

    const yearPrayerTimes: { [key: string]: Record<string, { azan: string; iqamah: string }> } = {};

    while (true) {
      const extractedData = await pageExtraxction(page);
      for (const dayData of extractedData) {
        if (dayData) {
          const key = `${dayData.year}-${dayData.month}-${dayData.day}`;
          yearPrayerTimes[key] = dayData.prayers;
        }
      }
      if (extractedData.some((day) => day === null)) {
        console.log("No data extracted from the page", "warn");
        break;
      }
      await page.click("#prayer-timetable-header-next");
    }
    
    const currentYear = new Date().getFullYear().toString();
    fs.writeFileSync(
      `./public/data/${currentYear}_prayer_times.json`,
      JSON.stringify(yearPrayerTimes, null, 2)
    );
    console.log("Prayer times extraction completed successfully!");

  } catch (error) {
    if (error instanceof Error) {
      console.log("Error during extraction", error);
    } else {
      console.log("Error during extraction: Unknown error", "error");
    }
    throw error;
  } finally {
    if (browser) {
      await browser.close();
      console.log("Browser closed");
    }
  }
}

extractPrayerTimes()
  .then(() => {
    console.log("Script completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.log(`Script failed: ${message}`, "error");
    process.exit(1);
  });
