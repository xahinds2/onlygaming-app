import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BasicProfileDetails from "@/components/profileview/BasicDetails";
import AdvanceDetails from "@/components/profileview/AccountDetails";
import PrivacyDetails from "@/components/profileview/PrivacyDetails";
import ImageDetails from "@/components/profileview/ImageDetails";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProfileProps {
  userData: User;
  sameUser: boolean;
}

export default function MainProfileDetails({
  userData,
  sameUser,
}: ProfileProps) {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };

  return (
    <div>
      <div>
        <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-16">
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="mx-auto grid max-w-[64rem] flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={handleClick}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Profile
                  </h1>
                  {sameUser && (
                    <div className="items-center gap-2 md:ml-auto md:flex">
                      <Button variant="outline">
                        <Link href="/profile">Edit Profile</Link>
                      </Button>
                    </div>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <ImageDetails userData={userData} />
                    <PrivacyDetails userData={userData} />
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <BasicProfileDetails userData={userData} />
                    <AdvanceDetails userData={userData} />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
