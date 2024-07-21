"use client";
import { Cmdk } from "@/components/(cmdk)";
import { Badge } from "@/components/ui/badge";
import { useKmenu } from "kmenu";
import { Fragment } from "react";

export const PostSearch = () => {
  const { toggle, setOpen } = useKmenu();

  const handleSearch = () => {
    toggle();
    setOpen(2);
  };

  return (
    <Fragment>
      <Badge
        className="flex items-center gap-x-1.5 cursor-pointer transition-all duration-500 hover:bg-muted ml-2"
        radius="pill"
        size="md"
        onClick={handleSearch}
        variant="secondary"
      >
        Search
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 transition-all dark:bg-gray-500 dark:text-gray-100 dark:border-gray-500">
          <span>⌘</span>F
        </kbd>
      </Badge>
      <Cmdk />
    </Fragment>
  );
};
