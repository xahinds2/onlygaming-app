import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ProfileProps {
  userData: User;
}

export default function InterestDetails({ userData }: ProfileProps) {
  return (
    <div>
      <Card x-chunk="dashboard-07-chunk-5">
        <CardHeader>
          <CardTitle className="font-bold text-xl"> Interests</CardTitle>
        </CardHeader>
        <CardContent>
            {userData.interests}
          <div></div>
        </CardContent>
      </Card>
    </div>
  );
}
