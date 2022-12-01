import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you

const NoteContent = ({ note }) => {
  return (
    <div className="container w-full mb-10">
      <h1 className="text-5xl font-bold mb-3 dark:text-white text-black">
        {note.title}
      </h1>
      {note.content === "" ? (
        <p className="mt-10">
          This note is empty. Start by click edit button to write some note.
        </p>
      ) : (
        <ReactMarkdown
          className="prose prose-md dark:prose-invert prose-p:text-lg prose-table:text-lg prose-li:text-lg max-w-none"
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          remarkPlugins={[remarkGfm, remarkMath]}
        >
          {note.content}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default NoteContent;
