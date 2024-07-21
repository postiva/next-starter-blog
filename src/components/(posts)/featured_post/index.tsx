import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DateTooltip, { IDateMode } from "@/components/ui/date-tooltip";
import { Content } from "@postiva/client";
import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const FeaturedPost = ({ post }: { post: Content }) => {
  return (
    <div className="bg-gray-100 border-gray-200 border dark:border-gray-800 dark:bg-card_bg rounded-lg p-2 grid grid-cols-12 h-[450px] lg:h-96">
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
          <div className="flex gap-1 lg:gap-2 flex-col h-fit">
            <div className="flex gap-x-1">
              {post.categories.map((category) => (
                <Badge
                  variant="default"
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
            className="text-lg lg:text-2xl font-bold hover:text-primary/80 transition-all"
          >
            {post.title}
          </Link>
          <p className="text-sm text-gray-500">{post.description}</p>
          <div className="mt-auto flex gap-x-2">
            <Avatar className="w-5 h-5 lg:w-9 lg:h-9">
              <AvatarImage src={post.publishedBy?.user.image} />
              <AvatarFallback size={36}>
                {post.publishedBy?.user.name}
              </AvatarFallback>
            </Avatar>
            <div className="flex lg:flex-col gap-x-2 items-center lg:items-start">
              <p className="text-sm font-medium">
                {post.publishedBy?.user.name}
              </p>
              <p className="text-xs text-gray-500 group">
                Founder at{" "}
                <Link
                  target="_blank"
                  href="https://postiva.app"
                  className="hover:text-primary/80 transition-all group-hover:text-primary/80"
                >
                  Postiva
                  <SquareArrowOutUpRight className="w-2.5 h-2.5 ml-1 hidden group-hover:inline text-primary/80 mb-1" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
