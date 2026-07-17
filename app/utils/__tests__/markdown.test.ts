import { renderMarkdown } from "../markdown";

describe("renderMarkdown", () => {
  it("renders a simple paragraph", () => {
    const result = renderMarkdown("Hello, world!");
    expect(result).toContain("<p>Hello, world!</p>");
  });

  it("renders bold text", () => {
    const result = renderMarkdown("**bold text**");
    expect(result).toContain("<strong>bold text</strong>");
  });

  it("renders italic text", () => {
    const result = renderMarkdown("*italic text*");
    expect(result).toContain("<em>italic text</em>");
  });

  it("renders headings", () => {
    const result = renderMarkdown("# Heading 1\n\n## Heading 2");
    expect(result).toContain("<h1>Heading 1</h1>");
    expect(result).toContain("<h2>Heading 2</h2>");
  });

  it("renders unordered lists", () => {
    const result = renderMarkdown("- Item A\n- Item B\n- Item C");
    expect(result).toContain("<li>Item A</li>");
    expect(result).toContain("<li>Item B</li>");
    expect(result).toContain("<li>Item C</li>");
    expect(result).toContain("<ul>");
  });

  it("renders ordered lists", () => {
    const result = renderMarkdown("1. First\n2. Second\n3. Third");
    expect(result).toContain("<li>First</li>");
    expect(result).toContain("<li>Second</li>");
    expect(result).toContain("<li>Third</li>");
    expect(result).toContain("<ol>");
  });

  it("renders links", () => {
    const result = renderMarkdown("[Click here](https://example.com)");
    expect(result).toContain('<a href="https://example.com">Click here</a>');
  });

  it("renders images", () => {
    const result = renderMarkdown("![alt text](image.jpg)");
    expect(result).toContain('<img src="image.jpg" alt="alt text">');
  });

  it("renders inline HTML when html option is enabled", () => {
    const result = renderMarkdown('<span class="test">inline html</span>');
    expect(result).toContain('<span class="test">inline html</span>');
  });

  it("handles empty string", () => {
    const result = renderMarkdown("");
    // markdown-it renders empty input as an empty string
    expect(typeof result).toBe("string");
  });

  it("renders code blocks", () => {
    const result = renderMarkdown("```js\nconst x = 1;\n```");
    expect(result).toContain("<code");
    expect(result).toContain("const x = 1;");
  });

  it("renders blockquotes", () => {
    const result = renderMarkdown("> quoted text");
    expect(result).toContain("<blockquote>");
    expect(result).toContain("quoted text");
  });

  it("renders multiple paragraphs", () => {
    const result = renderMarkdown("Paragraph one.\n\nParagraph two.");
    expect(result).toContain("<p>Paragraph one.</p>");
    expect(result).toContain("<p>Paragraph two.</p>");
  });
});
