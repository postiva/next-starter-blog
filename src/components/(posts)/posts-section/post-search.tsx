"use client";
import { Cmdk } from "@/components/(cmdk)";
import { Badge } from "@/components/ui/badge";
import { useKmenu } from "kmenu";
import { SearchIcon } from "lucide-react";
import { Fragment, useEffect } from "react";

export const PostSearch = () => {
  const { toggle } = useKmenu();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        (navigator?.platform?.toLowerCase().includes("mac")
          ? e.metaKey
          : e.ctrlKey) &&
        e.key === "f"
      ) {
        e.preventDefault();
        e.stopPropagation();

        toggle();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Fragment>
      {" "}
      <Badge
        className="flex items-center gap-x-1.5 cursor-pointer hover:bg-muted/10 transition-all duration-500"
        radius="pill"
        size="md"
        onClick={toggle}
      >
        <SearchIcon className="w-3.5 h-3.5" />
      </Badge>
      <Cmdk />
    </Fragment>
  );
};
