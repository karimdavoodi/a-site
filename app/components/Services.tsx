import { ServicesClient } from "./ServicesClient";
import { renderMarkdown } from "../utils/markdown";

interface ServiceItem {
  id: string;
  title: string;
  image: string;
  summary: string;
  descriptionHtml: string;
}

const SERVICE_ITEMS_DATA = [
  {
    id: "1",
    title: "Daily prayers and weekly Halaqa",
    image: "/components/services/1/title.png",
    summary:
      "The weekly halaqa complements daily prayers by fostering a collective environment of learning and fellowship that enriches spiritual life and promotes communal unity.",
    descriptionMarkdown:
      "The weekly halaqa complements the essence of daily prayers by fostering a collective spirit of learning, sharing, and fellowship. Rooted in Islamic tradition, the halaqa is a circle of knowledge and wisdom where community members come together under the guidance of a knowledgeable leader or scholar.\n\nThrough Al-Salaam, the practice of daily prayers and the vibrant gatherings of the weekly halaqa, Muslims enrich their spiritual lives, embody peace, and foster unity in the service of Allah and humanity.",
  },
  {
    id: "2",
    title: "Qur'an Classes For All Ages",
    image: "/components/services/2/title.png",
    summary:
      "Al-Salaam Quran Academy provides personalized, comprehensive Quranic education for all ages, focusing on recitation, memorization, and the practical application of Quranic wisdom in daily life.",
    descriptionMarkdown:
      "Al-Salaam Quran Academy takes immense pride in offering comprehensive Quran classes tailored for all ages, with the vision of spreading knowledge and understanding of the Holy Quran among individuals from diverse backgrounds. From young children to seasoned adults, our qualified and compassionate instructors ensure that each student receives personalized attention and guidance on their Quranic journey.\n\nFor teenagers and adults seeking to deepen their understanding of the Quran and its meanings, we offer insightful classes and discussions on the profound messages within the Quranic verses. Our Quran classes for all ages encompass not only the recitation and memorization of the Quran but also the practical application of its principles in daily life.",
  },
  {
    id: "3",
    title: "Islamic Studies",
    image: "/components/services/3/title.png",
    summary:
      "Our mission is to provide transformative Islamic education that empowers learners of all ages to apply faith-driven values like compassion and justice to the challenges of the modern world.",
    descriptionMarkdown:
      "Our mission is to provide transformative Islamic education that empowers learners of all ages to apply faith-driven values like compassion and justice to the challenges of the modern world.",
  },
  {
    id: "4",
    title: "Family Counselling",
    image: "/components/services/4/title.png",
    summary:
      "Our family counseling provides holistic, Islamically-rooted support to resolve conflicts and strengthen the bonds of a thriving community.",
    descriptionMarkdown:
      "Our family counseling provides holistic, Islamically-rooted support to resolve conflicts and strengthen the bonds of a thriving community.",
  },
  {
    id: "5",
    title: "Psychoeducation Sessions",
    image: "/components/services/5/title.png",
    summary:
      "Our psychoeducation sessions provide Islamically-integrated tools and strategies to enhance community mental health, resilience, and emotional well-being.",
    descriptionMarkdown:
      "Our psychoeducation sessions provide Islamically-integrated tools and strategies to enhance community mental health, resilience, and emotional well-being.",
  },
  {
    id: "6",
    title: "Youth Programs",
    image: "/components/services/6/title.png",
    summary:
      "Our youth programs empower young individuals to develop leadership skills and a strong Islamic identity through mentorship and community service.",
    descriptionMarkdown:
      "Our youth programs empower young individuals to develop leadership skills and a strong Islamic identity through mentorship and community service.",
  },
];

const SERVICE_ITEMS: ServiceItem[] = SERVICE_ITEMS_DATA.map((item) => ({
  ...item,
  descriptionHtml: renderMarkdown(item.descriptionMarkdown),
}));

export function Services() {
  return <ServicesClient items={SERVICE_ITEMS} />;
}
