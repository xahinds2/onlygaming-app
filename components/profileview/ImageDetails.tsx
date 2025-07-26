import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProfileProps {
  userData: User;
}

export default function ImageDetails({ userData }: ProfileProps) {
  return (
    <div>
      <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
        <CardHeader>
          <CardTitle className="font-bold text-xl">Profile Images</CardTitle>
          <CardDescription>Here are the best photos!!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Image
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover"
              height="300"
              src={userData.avatar || userData.ai_avatar}
              width="300"
            />
            <div className="grid grid-cols-3 gap-2">
              {userData.ai_avatar && (
                <button>
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="84"
                    src={userData.ai_avatar}
                    width="84"
                  />
                </button>
              )}
              {userData.avatar && (
                <button>
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="84"
                    src={userData.avatar}
                    width="84"
                  />
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
