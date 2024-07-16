"use client";
import { Badge } from "@/components/ui/badge";
import { postivaClient } from "@/lib/postiva";
import { Content, ContentCategory } from "@postiva/client";
import { MenuProvider } from "kmenu";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PostCard } from "../post-card";
import { PostSearch } from "./post-search";

export const PostsSection = ({ posts }: { posts: Content[] }) => {
  const router = useRouter();
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const selectedCategory = useSearchParams().get("category");

  const handleCategoryChange = (category: string) => {
    const url = new URL(window.location.href);
    if (category === "") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", category);
    }
    router.push(url.toString());
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await postivaClient.categories.getCategories();
      setCategories([...categories?.data]);
    };
    fetchCategories();
  }, []);

  return (
    <MenuProvider
      dimensions={{ sectionHeight: 30, commandHeight: 50, commands: 6 }}
    >
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-medium">Recent Articles</h2>
          <div className="flex gap-x-2">
            <Badge
              onClick={() => handleCategoryChange("")}
              className={`cursor-pointer ${
                selectedCategory === "" ? "!bg-primary/70" : ""
              }`}
              radius="pill"
              size="md"
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`cursor-pointer ${
                  selectedCategory === category.id ? "!bg-primary/70" : ""
                }`}
                radius="pill"
                size="md"
              >
                {category.name}
              </Badge>
            ))}
            <PostSearch />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} {...post} />)
          ) : (
            <div className="col-span-full">No posts found</div>
          )}
        </div>
      </div>
    </MenuProvider>
  );
};
