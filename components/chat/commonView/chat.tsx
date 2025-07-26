import { Message, Room } from "../../../types/chatTypes";
import ChatTopbar from "./chatTopbar";
import { ChatList } from "./chatList";
import { useState, useEffect } from "react";
import ChatBottombar from "./chatBottombar";
import { fetchMessageByRoomId } from "@/apis/chatApis";

interface ChatProps {
  selectedRoom: Room;
  isMobile: boolean;
  userInfo: User;
  setSelectedRoom: (selectedRoom: Room | undefined) => void;
}

export function Chat({ selectedRoom, isMobile, userInfo, setSelectedRoom }: ChatProps) {
  const [socket, setSocket] = useState<WebSocket>();
  const [messagesState, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState<boolean>(false);
  const [typingTimeout, setTypingTimeout] = useState<number>();

  const initWebSocket = () => {
    const socketURL = `${process.env.NEXT_PUBLIC_SOCKET}://${process.env.NEXT_PUBLIC_API_URL}/ws/chat/${selectedRoom.room}`;
    const newSocket = new WebSocket(socketURL);

    newSocket.onopen = () => {
      setSocket(newSocket);
    };

    newSocket.onmessage = (e) => {
      const message = JSON.parse(e.data) as Message;
      if (message.type == "chat_typing") {
        if (message.sender == selectedRoom.name) {
          setTyping(true);
          const timeoutId = window.setTimeout(() => {
            setTyping(false);
          }, 1600);
          setTypingTimeout(timeoutId);
        }
      } else if (message.type == "chat_message") {
        setTyping(false);
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };
  };

  const fetchChatHistory = async () => {
    if (userInfo && selectedRoom.room) {
      const messagedata = await fetchMessageByRoomId(
        userInfo.token,
        selectedRoom.room
      );
      setMessages(messagedata);
    }
  };

  useEffect(() => {
    fetchChatHistory();
    initWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [selectedRoom]);

  const sendMessage = (newMessage: Message) => {
    socket?.send(JSON.stringify(newMessage));
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar
        selectedRoom={selectedRoom}
      />
      <ChatList
        messages={messagesState}
        typing={typing}
        selectedRoom={selectedRoom}
        sendMessage={sendMessage}
        isMobile={isMobile}
        userInfo={userInfo}
      />
      <ChatBottombar
        sendMessage={sendMessage}
        isMobile={isMobile}
        userInfo={userInfo}
        socket={socket}
      />
    </div>
  );
}
