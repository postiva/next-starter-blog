import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DateTooltip, { IDateMode } from "@/components/ui/date-tooltip";
import Image from "next/image";

export const FeaturedPost = () => {
  return (
    <div className="bg-card_bg rounded-lg p-2 grid grid-cols-12 h-96">
      <div className="col-span-7 relative">
        <Image
          src="/featured_post.png"
          alt="featured post"
          fill
          className="rounded-lg"
        />
      </div>
      <div className="col-span-5 h-full flex flex-col justify-between py-6">
        <div className="flex flex-col gap-2 p-6 h-full max-w-md">
          <Badge variant="featured" radius="rounded" className="w-fit">
            News
          </Badge>
          <DateTooltip
            className="text-gray-500"
            mode={IDateMode.absolute}
            date={new Date()}
          />
          <h3 className="text-2xl font-bold">
            How Glide is Bringing the Future of AI to the Real World
          </h3>
          <p className="text-sm text-gray-500">
            Glide is the leading AI platform for developers, offering a
            comprehensive suite of tools and services to help you build, deploy,
            and scale your AI applications.
          </p>
          <div className="mt-auto flex gap-x-2">
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/106361546?v=4" />
              <AvatarFallback>Ali Osman</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">Ali Osman</p>
              <p className="text-sm text-gray-500">Founder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
