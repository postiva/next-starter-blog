import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DateTooltip, { IDateMode } from "@/components/ui/date-tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Content } from "@postiva/client";
import Link from "next/link";
import PostThumbnail from "./post-thumbnail";

export const PostCard = (content: Content) => {
  return (
    <div className="flex flex-col gap-y-5 h-[450px] rounded-lg relative">
      <div className="relative">
        <PostThumbnail
          slug={content.slug}
          className="h-52"
          imageSrc={content.thumbnail as string}
        />
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-1">
            {content?.categories?.map((category) => (
              <Badge className="w-fit" variant="secondary" key={category.id}>
                {category.name}
              </Badge>
            ))}
          </div>
          <Link
            href={`/${content.slug}`}
            className="text-2xl font-medium hover:text-primary/80 transition-all"
          >
            {content.title}
          </Link>
          <p className="text-sm text-gray-600 dark:text-[#7C7C86] line-clamp-3">
            {content.description}
          </p>
        </div>
        <div className="mt-auto flex gap-x-2 items-center text-sm absolute bottom-2 left-0">
          <Avatar className="h-9 w-9">
            <AvatarImage src={content.publishedBy?.user.image} />
            <AvatarFallback>{content.publishedBy?.user.name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-between h-full gap-y-0.5">
            <p className="text-sm text-black font-medium dark:text-[#D8D8DB] leading-none mt-0.5">
              {content.publishedBy?.user.name}
            </p>
            <DateTooltip
              className="text-gray-500 dark:text-[#96969E] !text-xs !leading-4"
              mode={IDateMode.absolute}
              date={new Date(content.publishedAt as string)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PostLoader = () => {
  return (
    <div className="flex flex-col gap-y-5 h-[450px] rounded-lg relative">
      <div className="relative w-full h-52">
        <Skeleton className="h-full rounded-lg" />
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex flex-col gap-y-2">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex flex-col gap-y-1 mt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
      <div className="mt-auto flex gap-x-2 items-center text-sm absolute bottom-2 left-0 w-full">
        <Skeleton className="h-9 w-10" />
        <div className="flex flex-col gap-y-1 w-full">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-2/5" />
        </div>
      </div>
    </div>
  );
};
