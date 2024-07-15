import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DateTooltip, { IDateMode } from "@/components/ui/date-tooltip";
import Image from "next/image";

export const PostCard = () => {
  return (
    <div className="flex flex-col gap-y-5 h-[450px] rounded-lg">
      <div className="relative w-full h-full">
        <Image
          src="/example-post.png"
          alt="Post 1"
          className="rounded-lg"
          fill
        />
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <Badge className="w-fit" variant="featured">
            React
          </Badge>
          <h3 className="text-2xl font-medium">
            How to use React Context API for state management
          </h3>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe
            velit dolorum illum culpa et odio exercitationem voluptates corporis
            repellat excepturi magnam corrupti animi officiis, dignissimos
            doloribus rerum neque deserunt eius!
          </p>
        </div>
        <div className="mt-auto flex gap-x-2 items-center text-sm">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://avatars.githubusercontent.com/u/106361546?v=4" />
            <AvatarFallback>Ali Osman</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-y-0.5">
            <p className="text-md text-[#D8D8DB] leading-none mt-1">
              Ali Osman Delişmen
            </p>
            <DateTooltip
              className="text-[#96969E] text-xs"
              mode={IDateMode.absolute}
              date={new Date()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
