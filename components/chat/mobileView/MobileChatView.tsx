"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Room } from "@/types/chatTypes";
import { fetchRooms } from "@/apis/chatApis";
import Loading from "@/components/loading";
import { Chat } from "../commonView/chat";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MobileChatListProps {
  userInfo: User;
  roomId?: string;
}

export function MobileChatView({ userInfo, roomId }: MobileChatListProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

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

  useEffect(() => {
    if (rooms.length && roomId) {
      const data = rooms.find((item) => item.room === roomId);
      if (data) {
        setSelectedRoom(data);
      }
    }
  }, [rooms]);

  useEffect(() => {
    fetchRoomsInfo();
  }, [searchInput]);

  if (loading) return <Loading />;

  if (selectedRoom) {
    return (
      <div className="flex flex-col h-full">
        <Chat
          setSelectedRoom={setSelectedRoom}
          selectedRoom={selectedRoom}
          isMobile={true}
          userInfo={userInfo}
        />
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="pb-16">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              onChange={handleInputChange}
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
        </header>
        <div className="flex flex-col gap-4 p-2 overflow-y-auto">
          <div className="flex justify-between p-2 items-center">
            <div className="flex gap-2 items-center text-2xl">
              <p className="font-medium">Chats</p>
              <span className="text-zinc-300">({rooms.length})</span>
            </div>
          </div>
          <nav className="grid gap-1 px-2 overflow-y-auto">
            {rooms.map((data, index) => (
              <Link
                key={index}
                href={`/chat/${data.room}`}
                className={`flex items-center gap-4 p-2 rounded-md ${
                  data === selectedRoom ? "bg-muted text-white" : ""
                }`}
              >
                <Avatar className="flex justify-center items-center">
                  <AvatarImage
                    src={data.avatar || data.ai_avatar}
                    alt={data.avatar || data.ai_avatar}
                    width={6}
                    height={6}
                    className="w-10 h-10"
                  />
                </Avatar>
                <div className="flex flex-col max-w-28">
                  <span>{data.name}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
