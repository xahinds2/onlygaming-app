import {
  FileImage,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizontal,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { buttonVariants } from "../../ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Message } from "../../../types/chatTypes";
import { Textarea } from "../../ui/textarea";
import { EmojiPicker } from "../emojiPicker";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
  userInfo: User;
  socket?: WebSocket;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({
  sendMessage,
  isMobile,
  userInfo,
  socket,
}: ChatBottombarProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [typingTimeout, setTypingTimeout] = useState<number>();
  const [hasTypingBeenSent, setHasTypingBeenSent] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    if (socket) {
      if (!hasTypingBeenSent) {
        const typingMessage: Message = {
          content: "Typing...",
          sender: userInfo.name,
          type: "chat_typing",
          sender_id: userInfo._id.$oid,
        };
        socket.send(JSON.stringify(typingMessage));
        setHasTypingBeenSent(true);
        const timeoutId = window.setTimeout(() => {
          setHasTypingBeenSent(false);
        }, 1500);
        setTypingTimeout(timeoutId);
      }
    }
  };

  const handleThumbsUp = () => {
    const newMessage: Message = {
      content: "👍",
      sender: userInfo.name,
      type: "chat_message",
      sender_id: userInfo._id.$oid,
    };
    sendMessage(newMessage);
    setMessage("");
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        sender: userInfo.name,
        type: "chat_message",
        content: message.trim(),
        sender_id: userInfo._id.$oid,
      };
      sendMessage(newMessage);
      setMessage("");
      setHasTypingBeenSent(false);
      clearTimeout(typingTimeout);
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="z-50">
      <div className="p-2 flex justify-between w-full items-center gap-2">
        <div className="flex">
          <Popover>
            <PopoverTrigger asChild>
              <Link
                href=""
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white mr-2"
                )}
              >
                <PlusCircle size={20} className="text-muted-foreground " />
              </Link>
            </PopoverTrigger>
            <PopoverContent side="top" className="w-full p-2">
              {message.trim() || isMobile ? (
                <div className="flex gap-2">
                  <Link
                    href=""
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "h-9 w-9",
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <Mic size={20} className="text-muted-foreground" />
                  </Link>
                  {BottombarIcons.map((icon, index) => (
                    <Link
                      key={index}
                      href=""
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "h-9 w-9",
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white mr-2"
                      )}
                    >
                      <icon.icon
                        size={20}
                        className="text-muted-foreground mr-2"
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  href=""
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9",
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <Mic size={20} className="text-muted-foreground" />
                </Link>
              )}
            </PopoverContent>
          </Popover>
          {!message.trim() && !isMobile && (
            <div className="flex">
              {BottombarIcons.map((icon, index) => (
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
          )}
        </div>

        <AnimatePresence initial={false}>
          <motion.div
            key="input"
            className="w-full relative"
            layout
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{
              opacity: { duration: 0.05 },
              layout: {
                type: "spring",
                bounce: 0.15,
              },
            }}
          >
            <Textarea
              autoComplete="off"
              value={message}
              ref={inputRef}
              onKeyDown={handleKeyPress}
              onChange={handleInputChange}
              name="message"
              placeholder="Aa"
              className=" w-full border rounded-full flex items-center h-full resize-none overflow-hidden bg-background justify-center p-2 text-base "
            ></Textarea>
            <div className="absolute right-2 bottom-0.5 flex items-center justify-center h-full  ">
              <EmojiPicker
                onChange={(value) => {
                  setMessage(message + value);
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              />
            </div>
          </motion.div>

          {message.trim() ? (
            <Link
              href=""
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
              )}
              onClick={handleSend}
            >
              <SendHorizontal size={20} className="text-muted-foreground" />
            </Link>
          ) : (
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
              )}
              onClick={handleThumbsUp}
            >
              <ThumbsUp size={20} className="text-muted-foreground" />
            </Link>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
