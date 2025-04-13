import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

const HighlightedLine = ({ line }: { line: string }) => {
  const html = Prism.highlight(line, Prism.languages.js, "js");

  return (
    <pre className="bg-[#2d2d2d] text-sm p-0 m-0" suppressHydrationWarning>
      <code
        className="language-js"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </pre>
  );
};

export default HighlightedLine;
