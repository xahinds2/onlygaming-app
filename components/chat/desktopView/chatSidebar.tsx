"use client";

import Link from "next/link";
import { MoreHorizontal, Search, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Room } from "../../../types/chatTypes";
import { useEffect, useState } from "react";
import { fetchRooms } from "@/apis/chatApis";
import Loading from "../../loading";
import { Input } from "@/components/ui/input";

interface SidebarProps {
  isCollapsed: boolean;
  onClick?: () => void;
  isMobile: boolean;
  userInfo: User;
  selectedRoom: Room | undefined;
  setSelectedRoom: (selectedRoom: Room) => void;
  roomId?: string;
}

export function Sidebar({
  isCollapsed,
  setSelectedRoom,
  userInfo,
  selectedRoom,
  roomId,
}: SidebarProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const fetchRoomsInfo = async () => {
      try {
        const roomsData = await fetchRooms(userInfo._id.$oid, searchInput);
        setRooms(roomsData.nearby_users);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomsInfo();
  }, [searchInput]);

  useEffect(() => {
    if (rooms.length && roomId) {
      const data = rooms.find((item) => item.room === roomId);
      if (data) {
        setSelectedRoom(data);
      }
    }
  }, [rooms]);

  return (
    <div>
      {loading && <Loading />}

      <div
        data-collapsed={isCollapsed}
        className="relative group flex flex-col h-full gap-4 p-2 [data-collapsed=true]:p-2 "
      >
        {!isCollapsed && (
          <div>
            
            <div className="relative ml-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                onChange={handleInputChange}
                className="w-full rounded-lg bg-background pl-8"
              />
            </div>

            <div className="flex justify-between p-2 items-center">
              <div className="flex gap-2 items-center text-2xl">
                <p className="font-medium">Chats</p>
                <span className="text-zinc-300">({rooms.length})</span>
              </div>

              <div>
                <Link
                  href=""
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9"
                  )}
                >
                  <MoreHorizontal size={20} />
                </Link>

                <Link
                  href=""
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9"
                  )}
                >
                  <SquarePen size={20} />
                </Link>
              </div>
            </div>
          </div>
        )}

        <nav className="nav-scrollbar grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 overflow-y-auto h-screen">
          {rooms.map((data, index) =>
            isCollapsed ? (
              <TooltipProvider key={index}>
                <Tooltip key={index} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/chat/${data.room}`}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "h-11 w-11 md:h-16 md:w-16",
                        data === selectedRoom &&
                          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      <Avatar className="flex justify-center items-center">
                        <AvatarImage
                          src={data.avatar || data.ai_avatar}
                          alt={data.avatar || data.ai_avatar}
                          width={6}
                          height={6}
                          className="w-10 h-10 "
                        />
                      </Avatar>{" "}
                      <span className="sr-only">{data.name}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                  >
                    {data.name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Link
                key={index}
                href={`/chat/${data.room}`}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  data === selectedRoom &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
                  "justify-start gap-4"
                )}
              >
                <Avatar className="flex justify-center items-center">
                  <AvatarImage
                    src={data.avatar || data.ai_avatar}
                    alt={data.avatar || data.ai_avatar}
                    width={6}
                    height={6}
                    className="w-10 h-10 "
                  />
                </Avatar>
                <div className="flex flex-col max-w-28">
                  <span>{data.name}</span>
                </div>
              </Link>
            )
          )}
        </nav>
      </div>
    </div>
  );
}
