"use client";

import { copyText } from "@/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Content } from "@postiva/client";
import { CopyIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { GoShare } from "react-icons/go";
import { LinkedinShareButton, TwitterShareButton } from "react-share";
import { toast } from "sonner";

export default function PostShare({ slug, title }: Content) {
  const host =
    typeof window !== "undefined" ? window.location.origin : undefined;
  const url = `${host}/blogs/${slug}`;

  const handleCopy = () => {
    const copyPromise = () =>
      new Promise((resolve) => {
        const status = copyText(url);
        setTimeout(() => {
          resolve(status);
        }, 200);
      });

    toast.promise(copyPromise, {
      loading: "Loading...",
      success: "Link copied.",
      error: "Error",
    });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <button className="flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
          <GoShare className="flex-shrink-0 size-4" />
          Share
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 opacity-100 mb-1 z-10 bg-white shadow-md rounded-xl p-2">
        <button
          onClick={handleCopy}
          className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <CopyIcon className="flex-shrink-0 size-4" />
          Copy link
        </button>
        <div className="border-t-[0.50px] border-gray-200 w-full my-2 dark:border-gray-700"></div>
        <TwitterShareButton
          url={url}
          title={title}
          className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          resetButtonStyle={false}
        >
          <TwitterIcon className="flex-shrink-0 size-4" />
          Share on Twitter
        </TwitterShareButton>
        <LinkedinShareButton
          url={url}
          title={title}
          className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          resetButtonStyle={false}
        >
          <LinkedinIcon className="flex-shrink-0 size-4" />
          Share on LinkedIn
        </LinkedinShareButton>
      </PopoverContent>
    </Popover>
  );
}

export const TwitterShare = ({ title, slug }: Content) => {
  const host =
    typeof window !== "undefined" ? window.location.origin : undefined;
  const url = `${host}/blogs/${slug}`;
  return (
    <TwitterShareButton
      url={url}
      title={title}
      className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
      resetButtonStyle={false}
    >
      <TwitterIcon className="flex-shrink-0 size-4" />
      Tweet
    </TwitterShareButton>
  );
};
