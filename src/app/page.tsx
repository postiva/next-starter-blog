import { FeaturedPost } from "@/components/(posts)/featured_post";
import PostsSection from "@/components/(posts)/posts-section";
import { postivaClient } from "@/lib/postiva";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const selectedCategories = searchParams?.categories as string;

  const posts = await postivaClient.contents.getContents({
    ...(selectedCategories
      ? { categories: selectedCategories.split(",") }
      : {}),
    pagination: {
      page: 1,
      size: 7,
    },
  });

  const [randomPost] = await postivaClient.contents.getRandomContents({
    limit: 1,
  });

  return (
    <div className="flex flex-col gap-y-20">
      <FeaturedPost post={randomPost} />
      <PostsSection posts={posts.data} randomPost={randomPost} />
    </div>
  );
}
