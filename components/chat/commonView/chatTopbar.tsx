import React from "react";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { ArrowLeft, Info, Phone, Video } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../../ui/button";
import { Room } from "@/types/chatTypes";
import { useRouter } from "next/navigation";

interface ChatTopbarProps {
  selectedRoom: Room;
}

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

export default function ChatTopbar({ selectedRoom }: ChatTopbarProps) {
  const router = useRouter();

  function formatDistance(distance: number) {
    if (isFinite(distance)) {
      return distance.toFixed(2) + " km away";
    } else {
      return "Infinity";
    }
  }

  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Link href={"/chat"}>
          <ArrowLeft className="flex justify-center items-center flex sm:hidden" />
        </Link>

        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={selectedRoom.avatar || selectedRoom.ai_avatar}
            alt={selectedRoom.name}
            width={6}
            height={6}
            className="w-10 h-10 "
          />
        </Avatar>
        <Link href={`/${selectedRoom.username}`}>
          <div className="flex flex-col">
            <span className="font-medium">{selectedRoom.name}</span>
            <span className="text">
              {formatDistance(selectedRoom.distance)}
            </span>
          </div>
        </Link>
      </div>

      <div>
        {TopbarIcons.map((icon, index) => (
          <Link
            key={index}
            href=""
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white mr-2"
            )}
          >
            <icon.icon size={20} className="text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}
