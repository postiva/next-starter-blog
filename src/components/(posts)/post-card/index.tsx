import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DateTooltip, { IDateMode } from "@/components/ui/date-tooltip";
import { Content } from "@postiva/client";
import Image from "next/image";
import Link from "next/link";

export const PostCard = (content: Content) => {
  return (
    <div className="flex flex-col gap-y-5 h-[450px] rounded-lg relative">
      <div className="relative w-full h-52">
        <Image
          src={content.thumbnail as string}
          alt={content.title}
          className="rounded-lg"
          fill
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
          <p className="text-sm text-gray-600 dark:text-[#7C7C86]">
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
