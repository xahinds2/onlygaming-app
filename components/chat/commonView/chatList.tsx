import { Message, Room } from "../../../types/chatTypes";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { AnimatePresence, motion } from "framer-motion";

interface ChatListProps {
  messages: Message[];
  selectedRoom: Room;
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
  userInfo: User;
  typing: boolean
}

export function ChatList({ messages, selectedRoom, userInfo, typing }: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, typing]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.sender_id !== selectedRoom._id.$oid
                  ? "items-end"
                  : "items-start"
              )}
            >
              <div className="flex gap-3 items-center">
                {message.sender_id === selectedRoom._id.$oid && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={selectedRoom.avatar || selectedRoom.ai_avatar}
                      alt={message.sender}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
                <span className=" bg-primary text-black p-3 rounded-md max-w-xs ">
                  {message.content}
                </span>
                {message.sender_id !== selectedRoom._id.$oid && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={userInfo.avatar || userInfo.ai_avatar}
                      alt={userInfo.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
          {typing && (
            <div className="flex justify-center p-4">
              <span className="text-gray-500"> Typing...</span>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
