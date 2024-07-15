import { FeaturedPost } from "@/components/home/featured_post";
import { PostsSection } from "@/components/home/posts-section";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-20">
      <FeaturedPost />
      <PostsSection />
    </div>
  );
}
