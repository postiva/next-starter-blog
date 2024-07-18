"use client";
import { Badge } from "@/components/ui/badge";
import { postivaClient } from "@/lib/postiva";
import { Content } from "@postiva/client";
import { MenuProvider } from "kmenu";
import { CheckIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { PostCard } from "../post-card";
import { PostSearch } from "./post-search";

import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";
import { useQuery } from "react-query";

export const PostsSection = ({ posts }: { posts: Content[] }) => {
  const router = useRouter();
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => postivaClient.categories.getCategories(),
  });
  const selectedCategories = useSearchParams().get("categories");

  const handleCategoryChange = (category: string) => {
    const url = new URL(window.location.href);
    if (selectedCategories?.includes(category)) {
      const filteredCategories = selectedCategories
        ?.split(",")
        .filter((c) => c !== category);
      url.searchParams.set("categories", filteredCategories.join(","));
    } else if (category === "all") {
      url.searchParams.delete("categories");
    } else {
      const categories = selectedCategories
        ? [...selectedCategories.split(",")]
        : [];
      categories.push(category);
      url.searchParams.set("categories", categories.join(","));
    }
    router.push(url.toString());
  };

  return (
    <MenuProvider
      dimensions={{ sectionHeight: 30, commandHeight: 50, commands: 6 }}
    >
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-medium">Recent Articles</h2>
          <div className="flex gap-x-2">
            {isLoading ? (
              <div className="flex items-center gap-x-2">
                {new Array(8).fill(0).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="w-16 h-6 rounded-full !bg-secondary"
                  />
                ))}
              </div>
            ) : (
              <Fragment>
                <Badge
                  onClick={() => handleCategoryChange("all")}
                  className={`cursor-pointer flex items-center gap-x-2`}
                  variant="secondary"
                  radius="pill"
                  size="md"
                >
                  {!selectedCategories && <CheckIcon className="w-3 h-3" />}
                  All
                </Badge>
                {categories?.data.map((category) => (
                  <Badge
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`cursor-pointer flex items-center gap-x-2`}
                    variant="secondary"
                    radius="pill"
                    size="md"
                  >
                    {selectedCategories?.includes(category.id) && (
                      <CheckIcon className="w-3 h-3" />
                    )}
                    {category.name}
                  </Badge>
                ))}
              </Fragment>
            )}
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
