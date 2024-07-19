"use client";

import { Check, Clipboard } from "lucide-react";
import useClipboard from "react-use-clipboard";

export const CopyCode = ({ children }: { children: string }) => {
  const [isCopied, copy] = useClipboard(children, {
    successDuration: 1000,
  });

  return (
    <button onClick={copy} className="p-2 text-slate-500 hover:text-slate-600">
      {isCopied ? <Check size="16" /> : <Clipboard size="16" />}
    </button>
  );
};
