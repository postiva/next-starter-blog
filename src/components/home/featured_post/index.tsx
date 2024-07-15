import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DateTooltip, { IDateMode } from "@/components/ui/date-tooltip";
import Image from "next/image";

export const FeaturedPost = () => {
  return (
    <div className="bg-card_bg rounded-lg p-2 grid grid-cols-12 h-[450px] lg:h-96">
      <div className="col-span-12 relative h-56 lg:h-full lg:col-span-7">
        <Image
          src="/featured_post.png"
          alt="featured post"
          fill
          className="rounded-lg"
        />
      </div>
      <div className="col-span-12 lg:col-span-5 h-full flex flex-col justify-between lg:py-6">
        <div className="flex flex-col lg:flex-col gap-1 lg:gap-2 p-3 lg:p-6 h-full max-w-md">
          <div className="flex gap-1 lg:gap-gap-2 lg:flex-col h-fit">
            <Badge variant="featured" radius="rounded" className="w-fit h-fit">
              News
            </Badge>
            <DateTooltip
              className="text-gray-500"
              mode={IDateMode.absolute}
              date={new Date()}
            />
          </div>
          <h3 className="text-lg lg:text-2xl font-bold">
            How Glide is Bringing the Future of AI to the Real World
          </h3>
          <p className="text-sm text-gray-500">
            Glide is the leading AI platform for developers, offering a
            comprehensive suite of tools and services to help you build, deploy,
            and scale your AI applications.
          </p>
          <div className="mt-auto flex gap-x-2">
            <Avatar className="w-5 h-5 lg:w-10 lg:h-10">
              <AvatarImage src="https://avatars.githubusercontent.com/u/106361546?v=4" />
              <AvatarFallback>Ali Osman</AvatarFallback>
            </Avatar>
            <div className="flex lg:flex-col gap-x-2">
              <p className="text-sm font-medium">Ali Osman</p>
              <p className="text-sm text-gray-500">Founder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
