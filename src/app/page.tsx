import { FeaturedPost } from "@/components/(posts)/featured_post";
import { PostsSection } from "@/components/(posts)/posts-section";
import { postivaClient } from "@/lib/postiva";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const selectedCategory = searchParams?.category as string;
  const posts = await postivaClient.contents.getContents({
    ...(selectedCategory ? { categories: [selectedCategory] } : {}),
  });

  const randomPost = posts.data[Math.floor(Math.random() * posts.data.length)];

  const postsWithoutRandom = posts.data.filter(
    (post) => post.id !== randomPost.id
  );

  return (
    <div className="flex flex-col gap-y-20">
      <FeaturedPost post={randomPost} />
      <PostsSection posts={postsWithoutRandom} />
    </div>
  );
}
