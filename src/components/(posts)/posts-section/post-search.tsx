"use client";
import { Cmdk } from "@/components/(cmdk)";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useKmenu } from "kmenu";
import { Fragment, useEffect, useState } from "react";
import { CustomView, browserName } from "react-device-detect";

export const PostSearch = () => {
  const [mounted, setMounted] = useState(false);
  const { toggle, setOpen } = useKmenu();

  const handleSearch = () => {
    toggle();
    setOpen(2);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

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
        {mounted ? (
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 transition-all dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
            <span>⌘</span>
            <CustomView condition={browserName.includes("Safari")}>
              K
            </CustomView>
            <CustomView condition={!browserName.includes("Safari")}>
              F
            </CustomView>
          </kbd>
        ) : (
          <Skeleton className="h-5 w-7" />
        )}
      </Badge>
      <Cmdk />
    </Fragment>
  );
};
