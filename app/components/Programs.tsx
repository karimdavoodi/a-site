import { ProgramsClient } from "./ProgramsClient";
import { renderMarkdown } from "../utils/markdown";

interface ProgramItem {
  id: string;
  title: string;
  image: string;
  summary: string;
  descriptionHtml: string;
}

const PROGRAM_ITEMS_DATA = [
  {
    id: "1",
    title: "Mentorship Program",
    image: "/components/programs/1/title.png",
    summary:
      "We believe that no one should walk the path of faith alone. Our combined mentorship program is designed to support both individuals who have recently embraced Islam and families seeking to strengthen their spiritual foundations.",
    descriptionMarkdown:
      "Our program bridges the gap between individual faith and family harmony. We pair New Muslims and families with experienced mentors to navigate the spiritual, social, and practical aspects of living an Islamic life. Whether you are learning your first prayer or seeking to build a more God-conscious home, we provide the community and guidance you need to thrive.",
  },
];

const PROGRAM_ITEMS: ProgramItem[] = PROGRAM_ITEMS_DATA.map((item) => ({
  ...item,
  descriptionHtml: renderMarkdown(item.descriptionMarkdown),
}));

export function Programs() {
  return <ProgramsClient items={PROGRAM_ITEMS} />;
}
