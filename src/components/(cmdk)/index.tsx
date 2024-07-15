"use client";
import { postivaClient } from "@/lib/postiva";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { FilesIcon, Loader2Icon, SearchIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CommandPalette, {
  JsonStructureItem,
  filterItems,
  getItemIndex,
} from "react-cmdk";
import "react-cmdk/dist/cmdk.css";
import { useDebounceValue } from "usehooks-ts";

const Cmdk = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [page] = useState<"root" | "posts">("root");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounceValue(search, 1000);
  const [posts, setPosts] = useState<JsonStructureItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasNoResults = posts.length === 0 && debouncedSearch.trim() !== "";

  const searchPosts = async () => {
    setIsLoading(true);
    const searchPosts = await postivaClient.contents.getContents({
      query: debouncedSearch,
    });

    if (searchPosts?.data.length === 0 && debouncedSearch.trim() !== "") {
      setPosts([]);
    } else {
      const posts = searchPosts?.data?.map((post) => ({
        id: post.id,
        children: post.title,
        icon: () => <FilesIcon className="w-4 h-4" />,
        href: `/${post.slug}`,
      })) as JsonStructureItem[];
      setPosts(posts);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    searchPosts();
  }, [debouncedSearch]);

  const filteredItems = useMemo(() => {
    return filterItems(
      [
        {
          heading: "Posts",
          id: "posts",
          items: posts,
        },
        {
          heading: "Other",
          id: "advanced",
          items: [
            {
              id: "github",
              children: "Github",
              icon: () => <GitHubLogoIcon />,
              href: "#",
            },
            {
              id: "discord",
              children: "Discord",
              icon: () => <DiscordLogoIcon />,
              href: "#",
            },
          ],
        },
      ],
      search
    );
  }, [posts, search]);

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setOpen}
      search={search}
      isOpen={open}
      page={page}
      placeholder="Search posts..."
    >
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.ListItem
            index={0}
            icon={() =>
              isLoading ? (
                <Loader2Icon className="w-4 h-4 animate-spin" />
              ) : (
                <SearchIcon className="w-4 h-4" />
              )
            }
            showType={false}
          >
            <span className="max-w-md truncate dark:text-white">
              {isLoading
                ? "Searching..."
                : hasNoResults
                ? "No results found"
                : "Search..."}
            </span>
          </CommandPalette.ListItem>
        )}
      </CommandPalette.Page>
    </CommandPalette>
  );
};

export default Cmdk;
