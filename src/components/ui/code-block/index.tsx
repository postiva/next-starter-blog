import { CopyCode } from "@/components/ui/code-block/copy-code";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

type Props = {
  children: string;
  language?: string;
};

export const CodeBlock = ({ children, language = "typescript" }: Props) => {
  return (
    <div className="rounded-lg font-mono text-white relative group h-full">
      <div className="flex items-center justify-end px-2 absolute right-0 top-1">
        <CopyCode>{children}</CopyCode>
      </div>
      <SyntaxHighlighter
        customStyle={{
          padding: "1.4rem",
          borderRadius: "0.5rem",
          // backgroundColor: "#0f172a",
          fontSize: "0.90rem",
          lineHeight: "1.5rem",
          overflowX: "hidden",
        }}
        language={language}
        style={atomOneLight}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
