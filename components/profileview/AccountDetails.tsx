import { Mail, Phone, MapPin, Text, AtSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ProfileProps {
  userData: User;
}

export default function AdvanceDetails({ userData }: ProfileProps) {
  return (
    <div>
      <Card x-chunk="dashboard-07-chunk-1">
        <CardHeader>
          <CardTitle className="font-bold text-xl">Account Info</CardTitle>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          <div className="grid gap-6">
            <div className="flex gap-3  justify-start items-center">
              <AtSign className="h-5 w-5 text-primary" />
              <Label htmlFor="name">{userData.username}</Label>
            </div>
            <div className=" flex gap-3 justify-start items-center">
              <Mail className="h-5 w-5 text-primary" />
              <Label htmlFor="name">{userData.email}</Label>
            </div>
            {userData.privacy?.toLowerCase() == "public" && userData.mobile && (
              <div className="flex gap-3  justify-start items-center">
                <Phone className="h-5 w-5 text-primary" />
                <Label htmlFor="name">{userData.mobile}</Label>
              </div>
            )}
            {userData.country && (
              <div className="flex gap-3  justify-start items-center">
                <MapPin className="h-5 w-5 text-primary" />
                <Label htmlFor="name">{userData.country}</Label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
