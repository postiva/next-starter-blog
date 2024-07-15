"use client";
import Cmdk from "@/components/(cmdk)";
import { Badge } from "@/components/ui/badge";
import { SearchIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useHandleOpenCommandPalette } from "react-cmdk";

export const PostSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        (navigator?.platform?.toLowerCase().includes("mac")
          ? e.metaKey
          : e.ctrlKey) &&
        e.key === "k"
      ) {
        e.preventDefault();
        e.stopPropagation();

        setIsOpen((currentValue) => {
          return !currentValue;
        });
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useHandleOpenCommandPalette(setIsOpen);

  return (
    <Fragment>
      {" "}
      <Badge
        className="flex items-center gap-x-1.5 cursor-pointer hover:bg-muted/10 transition-all duration-500"
        radius="pill"
        size="md"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <SearchIcon className="w-3.5 h-3.5" />
      </Badge>
      <Cmdk open={isOpen} setOpen={setIsOpen} />
    </Fragment>
  );
};
