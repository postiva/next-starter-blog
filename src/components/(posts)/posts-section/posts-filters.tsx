import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import { postivaClient } from "@/lib/postiva";
import { CheckIcon, ListFilter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { PostSearch } from "./post-search";

export const PostsFilters = () => {
  const router = useRouter();
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => postivaClient.categories.getCategories(),
  });
  const searchParams = useSearchParams();
  const selectedCategoriesParam = searchParams.get("categories");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (selectedCategoriesParam) {
      setSelectedCategories(selectedCategoriesParam.split(","));
    }
  }, [selectedCategoriesParam]);

  const handleCategoryChange = (category: string) => {
    let updatedCategories: string[] = [];
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((c) => c !== category);
    } else if (category === "all") {
      updatedCategories = [];
    } else {
      updatedCategories = [...selectedCategories, category];
    }
    setSelectedCategories(updatedCategories);

    const url = new URL(window.location.href);
    if (updatedCategories.length > 0) {
      url.searchParams.set("categories", updatedCategories.join(","));
    } else {
      url.searchParams.delete("categories");
    }
    router.push(url.toString());
  };

  return (
    <div className="flex gap-x-0 items-center">
      <HoverCard>
        <HoverCardTrigger>
          <Badge
            className="cursor-pointer flex items-center gap-x-1 !py-1.5"
            variant="secondary"
            radius="pill"
            size="md"
          >
            Filters
            <ListFilter className="w-3 h-3 text-gray-700 dark:text-gray-100" />
          </Badge>
        </HoverCardTrigger>
        <HoverCardContent className="w-[500px] flex items-center justify-end lg:justify-start flex-row-reverse lg:flex-row flex-wrap">
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
            <div className="flex flex-col gap-y-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Categories
              </h3>
              <div className="flex gap-2 flex-wrap">
                <Badge
                  onClick={() => handleCategoryChange("all")}
                  className={`cursor-pointer flex items-center gap-x-2`}
                  variant="secondary"
                  radius="pill"
                  size="sm"
                >
                  {selectedCategories.length === 0 && (
                    <CheckIcon className="w-3 h-3" />
                  )}
                  All
                </Badge>
                {categories?.data.slice(0, 7).map((category) => (
                  <Badge
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`cursor-pointer flex items-center gap-x-2`}
                    variant="secondary"
                    radius="pill"
                    size="sm"
                  >
                    {selectedCategories.includes(category.id) && (
                      <CheckIcon className="w-3 h-3" />
                    )}
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
      <PostSearch />
    </div>
  );
};
