import MarkdownIt from "markdown-it";
import imsize from "markdown-it-imsize";
import attrs from "markdown-it-attrs";

const md = new MarkdownIt({ html: true });
md.use(imsize);
md.use(attrs);

export function renderMarkdown(content: string) {
  return md.render(content);
}
