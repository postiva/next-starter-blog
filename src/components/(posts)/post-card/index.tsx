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
              <Badge className="w-fit" variant="default" key={category.id}>
                {category.name}
              </Badge>
            ))}
          </div>
          <Link href={`/${content.slug}`} className="text-2xl font-medium">
            {content.title}
          </Link>
          <p className="text-sm text-[#7C7C86]">{content.description}</p>
        </div>
        <div className="mt-auto flex gap-x-2 items-center text-sm">
          <Avatar className="h-9 w-9">
            <AvatarImage src={content.publishedBy?.user.image} />
            <AvatarFallback>{content.publishedBy?.user.name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-y-0.5">
            <p className="text-md text-[#D8D8DB] leading-none mt-1">
              {content.publishedBy?.user.name}
            </p>
            <DateTooltip
              className="text-[#96969E] text-xs"
              mode={IDateMode.absolute}
              date={new Date(content.publishedAt as string)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
