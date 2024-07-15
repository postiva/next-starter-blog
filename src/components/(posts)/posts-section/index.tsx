import { Badge } from "@/components/ui/badge";
import { postivaClient } from "@/lib/postiva";
import { Content } from "@postiva/client";
import { PostCard } from "../post-card";

export const PostsSection = async ({ posts }: { posts: Content[] }) => {
  const categories = await postivaClient.categories.getCategories();

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-medium">Recent Articles</h2>
        <div className="flex gap-x-2">
          {categories.data.map((category) => (
            <Badge
              className="cursor-pointer"
              radius="pill"
              size="md"
              key={category.id}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};
