"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { copyText } from "@/lib/utils";
import { Content } from "@postiva/client";
import { CopyIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { GoShare } from "react-icons/go";
import { LinkedinShareButton, TwitterShareButton } from "react-share";
import { toast } from "sonner";

export default function PostShare({ slug, title }: Content) {
  const [host, setHost] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.origin);
    }
  }, []);

  const url = host ? `${host}/blogs/${slug}` : "";

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

  if (!host) {
    return null; // or a loading spinner
  }

  return (
    <Popover>
      <PopoverTrigger>
        <button className="flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-neutral-200 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
          <GoShare className="flex-shrink-0 size-4" />
          Share
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 opacity-100 mb-1 z-10 bg-white shadow-md rounded-xl p-2 dark:bg-secondary">
        <button
          onClick={handleCopy}
          className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-500 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-400"
        >
          <CopyIcon className="flex-shrink-0 size-4" />
          Copy link
        </button>
        <div className="border-t-[0.50px] border-gray-200 w-full my-2 dark:border-neutral-500"></div>
        <TwitterShareButton
          url={url}
          title={title}
          className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-500 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-400"
          resetButtonStyle={false}
        >
          <TwitterIcon className="flex-shrink-0 size-4" />
          Share on Twitter
        </TwitterShareButton>
        <LinkedinShareButton
          url={url}
          title={title}
          className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-500 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-400"
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
  const [host, setHost] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.origin);
    }
  }, []);

  const url = host ? `${host}/blogs/${slug}` : "";

  if (!host) {
    return null; // or a loading spinner
  }

  return (
    <TwitterShareButton
      url={url}
      title={title}
      className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-secondary dark:border-gray-700 dark:text-gray-200"
      resetButtonStyle={false}
    >
      <TwitterIcon className="flex-shrink-0 size-4" />
      Tweet
    </TwitterShareButton>
  );
};
