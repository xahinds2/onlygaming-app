import BasicInfoSection from "./basicProfile";
import PrivacySection from "./privacyProfile";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { fetchUserData, updateProfileByUserId } from "@/apis/userApis";
import { useState } from "react";
import Loading from "../loading";
import { useEffect } from "react";

interface ProfileProps {
  authInfo: AuthUser;
  sectionName: string;
}

const Profile = ({ authInfo, sectionName }: ProfileProps) => {
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSectionClick = (section: string) => {
    router.push(section);
  };

  const fetchProfileInfo = async (token: string, userId: string) => {
    const data = await fetchUserData(userId, token);
    setUserData(data);
  };

  const updateProfileInfo = async (formData: any) => {
    setLoading(true);
    const status = await updateProfileByUserId(
      authInfo.token,
      authInfo._id.$oid,
      formData,
      toast
    );
    if (status == 200) {
      await fetchProfileInfo(authInfo.token, authInfo._id.$oid);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfileInfo(authInfo.token, authInfo._id.$oid);
  }, []);

  if (loading || !userData) return <Loading />;

  return (
    <div className="w-full max-w-xl mx-auto mt-16">
      <h1>Edit your profile</h1>
      <div className="mt-4 cursor-pointer py-2 px-4 dark:bg-black bg-white">
        <ul className="flex space-x-4">
          <li onClick={() => handleSectionClick("basic")}>Basic Info</li>
          <li onClick={() => handleSectionClick("privacy")}>Privacy</li>
        </ul>
      </div>
      {sectionName === "basic" && (
        <BasicInfoSection
          userData={userData}
          updateProfile={updateProfileInfo}
        />
      )}
      {sectionName === "privacy" && (
        <PrivacySection userData={userData} updateProfile={updateProfileInfo} />
      )}
    </div>
  );
};

export default Profile;
