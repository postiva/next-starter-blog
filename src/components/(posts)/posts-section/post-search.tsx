"use client";
import { Cmdk } from "@/components/(cmdk)";
import { Badge } from "@/components/ui/badge";
import { useKmenu } from "kmenu";
import { SearchIcon } from "lucide-react";
import { Fragment } from "react";

export const PostSearch = () => {
  const { toggle, setOpen } = useKmenu();

  const handleSearch = () => {
    toggle();
    setOpen(2);
  };

  return (
    <Fragment>
      {" "}
      <Badge
        className="flex items-center gap-x-1.5 cursor-pointer hover:bg-primary/70 transition-all duration-500"
        radius="pill"
        size="md"
        onClick={handleSearch}
      >
        <SearchIcon className="w-3.5 h-3.5" />
      </Badge>
      <Cmdk />
    </Fragment>
  );
};
