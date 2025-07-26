"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DesktopView } from "./desktopView/DesktopChatView";
import { MobileChatView } from "./mobileView/MobileChatView";

interface ChatLayoutProps {
  defaultLayout: number[];
  roomId?: string;
}

export function ChatLayout({ defaultLayout, roomId }: ChatLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [authInfo, setAuthInfo] = useState<User>();
  const router = useRouter();

  const getUserInfo = () => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setAuthInfo(JSON.parse(storedUserInfo));
    } else {
      router.push("/login");
    }
  };

  const checkScreenWidth = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    getUserInfo();
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  if (authInfo && isMobile) {
    return (
      <div className="h-full w-full">
        <MobileChatView userInfo={authInfo} roomId={roomId} />
      </div>
    );
  }

  if (authInfo) {
    return (
      <div className="h-full w-full">
        <DesktopView
          defaultLayout={defaultLayout}
          navCollapsedSize={8}
          userInfo={authInfo}
          roomId={roomId}
        />
      </div>
    );
  }
}
