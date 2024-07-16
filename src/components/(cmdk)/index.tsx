"use client";

import { postivaClient } from "@/lib/postiva";
import { Content } from "@postiva/client";
import {
  Command,
  CommandMenu,
  CommandWrapper,
  InnerCommand,
  useCommands,
  useKmenu,
} from "kmenu";
import { FileIcon, Loader2Icon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { BsDiscord, BsGithub, BsTwitterX } from "react-icons/bs";
import {
  FiCommand,
  FiHome,
  FiLink,
  FiMoon,
  FiSearch,
  FiSun,
} from "react-icons/fi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { LuLink2 } from "react-icons/lu";
import { TbMoonStars } from "react-icons/tb";
import { useDebounceValue } from "usehooks-ts";

type Page = {
  icon: ReactElement;
  name: string;
  href?: string;
};

export type Item = {
  category: string;
  pages: Page[];
};

export const Cmdk = () => {
  const router = useRouter();

  const { setTheme } = useTheme();
  const { setOpen, input } = useKmenu();
  const [debouncedValue] = useDebounceValue(input, 500);
  const [loading, setLoading] = useState(false);

  const [contents, setContents] = useState<Content[]>([]);

  const generatePostsCommands = (): InnerCommand[] =>
    contents.map((content) => ({
      icon: <FileIcon />,
      text: content.title,
      perform: () => router.push(`/${content.slug}`),
      closeOnComplete: true,
    }));

  const main: Command[] = [
    {
      category: "Navigation",
      commands: [
        {
          icon: <FiHome />,
          text: "Home",
          perform: () => router.push("/"),
          closeOnComplete: true,
          keywords: ["back"],
        },
        {
          icon: <FiSearch />,
          text: "Search Posts...",
          perform: () => setOpen(2),
          shortcuts: { modifier: <FiCommand />, keys: ["E"] },
          keywords: ["posts", "articles", "blog"],
        },
      ],
    },
    {
      category: "Utility",
      commands: [
        {
          icon: <TbMoonStars />,
          text: "Set Theme...",
          perform: () => setOpen(3),
          keywords: ["dark", "mode", "light"],
        },
        {
          icon: <FiLink />,
          text: "Copy URL",
          perform: () =>
            navigator.clipboard.writeText(`https://kmenu.hxrsh.in/docs`),
          closeOnComplete: true,
        },
      ],
    },
    {
      category: "Other",
      commands: [
        {
          icon: <LuLink2 />,
          text: "Links...",
          keywords: ["github", "code", "npm", "x", "twitter"],
          perform: () => setOpen(4),
        },
      ],
    },
  ];

  const posts: Command[] = [
    {
      category: "Posts",
      commands: generatePostsCommands(),
    },
  ];

  const theme: Command[] = [
    {
      category: "Set Theme",
      commands: [
        {
          icon: <HiOutlineDesktopComputer />,
          text: "System",
          perform: () => setTheme("system"),
        },
        {
          icon: <FiSun />,
          text: "Light",
          perform: () => setTheme("light"),
        },
        {
          icon: <FiMoon />,
          text: "Dark",
          perform: () => setTheme("dark"),
        },
      ],
    },
  ];

  const links: Command[] = [
    {
      category: "Links",
      commands: [
        {
          icon: <BsDiscord />,
          text: "Join Discord",
          href: "https://www.postiva.app/discord",
          newTab: true,
        },
        {
          icon: <BsGithub />,
          text: "GitHub",
          href: "https://github.com/postiva",
          newTab: true,
        },
        {
          icon: <BsTwitterX />,
          text: "Twitter",
          href: "https://x.com/postivaapp",
          newTab: true,
        },
      ],
    },
  ];

  const [mainCommands] = useCommands(main);
  const [postsCommands, setPostsCommands] = useCommands(posts);
  const [themeCommands] = useCommands(theme);
  const [linkCommands] = useCommands(links);

  const fetchData = async (query: string) => {
    setLoading(true);
    const response = await postivaClient.contents.getContents({
      query,
    });
    setContents(response?.data);
    const newPosts: Command = {
      category: "Posts",
      commands: generatePostsCommands(),
    };
    setPostsCommands([newPosts]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    fetchData(input);
  }, [input]);

  console.log("postsCommands", postsCommands);

  return (
    <CommandWrapper>
      <CommandMenu commands={mainCommands} index={1} crumbs={["Home"]} />
      <CommandMenu
        commands={postsCommands}
        index={2}
        crumbs={["Home", "Posts"]}
        placeholder="Search Posts..."
        loadingState={loading}
        loadingPlaceholder={<Loader2Icon className="w-4 h-4 animate-spin" />}
        preventSearch
      />
      <CommandMenu
        commands={themeCommands}
        index={3}
        crumbs={["Home", "Theme"]}
      />
      <CommandMenu
        commands={linkCommands}
        index={4}
        crumbs={["Home", "Links"]}
      />
    </CommandWrapper>
  );
};
