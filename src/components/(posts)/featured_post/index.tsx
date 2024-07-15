import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DateTooltip, { IDateMode } from "@/components/ui/date-tooltip";
import { Content } from "@postiva/client";
import Image from "next/image";
import Link from "next/link";

export const FeaturedPost = ({ post }: { post: Content }) => {
  return (
    <div className="bg-card_bg rounded-lg p-2 grid grid-cols-12 h-[450px] lg:h-96">
      <div className="col-span-12 relative h-56 lg:h-full lg:col-span-6">
        <Image
          src={post.thumbnail as string}
          alt={post.title}
          fill
          className="rounded-lg"
        />
      </div>
      <div className="col-span-12 lg:col-span-6 h-full flex flex-col justify-between lg:py-6">
        <div className="flex flex-col lg:flex-col gap-1 lg:gap-2 p-3 lg:p-6 h-full max-w-md">
          <div className="flex gap-1 lg:gap-gap-2 lg:flex-col h-fit">
            <div className="flex gap-x-2">
              {post.categories.map((category) => (
                <Badge
                  variant="featured"
                  radius="rounded"
                  className="w-fit h-fit"
                  key={category.id}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
            <DateTooltip
              className="text-gray-500"
              mode={IDateMode.absolute}
              date={new Date(post.publishedAt as string)}
            />
          </div>
          <Link
            href={`/${post.slug}`}
            className="text-lg lg:text-2xl font-bold"
          >
            {post.title}
          </Link>
          <p className="text-sm text-gray-500">{post.description}</p>
          <div className="mt-auto flex gap-x-2">
            <Avatar className="w-5 h-5 lg:w-10 lg:h-10">
              <AvatarImage src={post.publishedBy?.user.image} />
              <AvatarFallback>{post.publishedBy?.user.name}</AvatarFallback>
            </Avatar>
            <div className="flex lg:flex-col gap-x-2">
              <p className="text-sm font-medium">
                {post.publishedBy?.user.name}
              </p>
              <p className="text-sm text-gray-500">Founder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
