import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Text, PersonStanding, User, Heart, Star } from "lucide-react";

interface ProfileProps {
  userData: User;
}

export default function BasicProfileDetails({ userData }: ProfileProps) {
  return (
    <div>
      <Card x-chunk="dashboard-07-chunk-0">
        <CardHeader>
          <CardTitle className="font-bold text-xl">Basic Info</CardTitle>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          <div className="grid gap-6">
            <div className="flex gap-3 justify-start items-center">
              <User className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl">{userData.name}</CardTitle>
              <Label htmlFor="name"></Label>
            </div>
            {userData.gender && (
              <div className="flex gap-3  justify-start items-center">
                <PersonStanding className="h-5 w-5 text-primary" />
                <Label htmlFor="gender">{userData.gender}</Label>
              </div>
            )}
            {userData.interests && (
              <div className="grid gap-3">
                <CardTitle className="text-lg">Summary</CardTitle>
                <div className="flex gap-3 justify-start items-center">
                  <Text className="h-5 w-5 text-primary" />
                  <CardDescription className="dark:text-white">{userData.summary}</CardDescription>
                </div>
              </div>
            )}
            {userData.interests && (
              <div className="grid gap-3">
                <CardTitle className="text-lg">Interests</CardTitle>
                <div className="flex gap-3 justify-start items-center">
                  <Heart className="h-5 w-5 text-primary" />
                  <CardDescription className="dark:text-white">{userData.interests}</CardDescription>
                </div>
              </div>
            )}
            {userData.personality && (
              <div className="grid gap-3">
                <CardTitle className="text-lg">Personalities</CardTitle>
                <div className="flex gap-3 justify-start items-center">
                  <Star className="h-5 w-5 text-primary" />
                  <CardDescription className="dark:text-white">{userData.personality}</CardDescription>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
