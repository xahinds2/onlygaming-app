import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

interface ProfileProps {
  userData: User;
}

export default function PrivacyDetails({ userData }: ProfileProps) {
  const privacy =
    userData.privacy?.toLowerCase() == "private" ? "Private" : "Public";

  return (
    <div>
      <Card x-chunk="dashboard-07-chunk-3">
        <CardHeader>
          <CardTitle className="font-bold text-xl">Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex gap-3 justify-start items-center">
              <Shield className="h-4 w-4 text-primary" />
              <h4>{privacy}</h4>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
