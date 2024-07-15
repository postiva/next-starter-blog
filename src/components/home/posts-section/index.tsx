import { Badge } from "@/components/ui/badge";
import { PostCard } from "../post-card";

const categories = ["All", "Web", "Design", "Coding"];

export const PostsSection = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-medium">Recent Articles</h2>
        <div className="flex gap-x-2">
          {categories.map((category) => (
            <Badge
              className="cursor-pointer"
              radius="pill"
              size="md"
              key={category}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
};
