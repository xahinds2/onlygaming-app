"use client";

import { Home, MessageSquareDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { anynomousUser } from "@/shared/anonymousUser";

const BottomNavBar = () => {
  const [authInfo, setAuthInfo] = useState<User>(anynomousUser);

  const getUserInfo = () => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setAuthInfo(JSON.parse(storedUserInfo));
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="fixed bottom-0 w-full bg-background sm:hidden">
      <div className="flex items-center gap-4 border-t py-4 justify-around px-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <Home className="h-6 w-6" />
          </Button>
        </Link>

        <Link href="/chat">
          <Button variant="ghost" size="icon">
            <MessageSquareDot href="/chat" className="h-6 w-6" />
          </Button>
        </Link>

        <Link href={"/" + authInfo.username}>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src={authInfo.avatar || authInfo.ai_avatar}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavBar;
