import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { MapPinned, MessageSquareDot } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface UserInfoCardProps {
  user: NearbyUser;
}

function UserInfoCard({ user }: UserInfoCardProps) {
  const router = useRouter();

  const handleClick = (key: string, val: string) => {
    if (key == "chat") {
      localStorage.setItem("roomId", val);
      router.push(`/chat`);
    } else if (key == "userName") {
      router.push("/" + val);
    }

    return;
  };

  function formatDistance(distance: number) {
    if (isFinite(distance)) {
      return distance.toFixed(2) + " km";
    } else {
      return "Infinity";
    }
  }

  return (
    <Card className="w-full p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow">
      <div className="relative h-[300px]">
        <Image
          src={user.avatar || user.ai_avatar}
          alt={user.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          quality={80}
          className="rounded-t-lg"
        />
      </div>

      <CardHeader>
        <CardTitle
          onClick={() => handleClick("userName", user.username)}
          className="hover:text-primary hover:cursor-pointer duration-200 "
        >
          {user.name}
        </CardTitle>
        <CardDescription>{user.summary}</CardDescription>
        <div>
          {user.interests &&
            user.interests.length > 0 &&
            user.interests.slice(0, 1).map((interest, index) => (
              <div className="flex flex-row gap-2 mr-2" key={index}>
                <Badge className="mr-2">{interest}</Badge>
              </div>
            ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <MapPinned className="h-8 w-8" />
            <span className="ml-4 font-bold text-xl">
              {formatDistance(user.distance)}
            </span>
          </div>
          <Link href={`/chat/${user.room}`}>
            <Button>
              <MessageSquareDot className="h-8 w-8" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserInfoCard;
