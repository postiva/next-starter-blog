import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { postivaClient } from "@/lib/postiva";
import { CheckIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import { PostSearch } from "./post-search";

export const PostsFilters = () => {
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
    <div className="flex items-center justify-end lg:justify-start flex-row-reverse lg:flex-row">
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
        <div className="flex gap-x-2">
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
          {categories?.data.slice(0, 7).map((category) => (
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
        </div>
      )}
      <PostSearch />
    </div>
  );
};
