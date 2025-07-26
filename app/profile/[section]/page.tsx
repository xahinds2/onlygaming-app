"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import Profile from "@/components/profile/mainProfile";

interface ProfilePageProps {
  params: { section: string };
}

const ProfilePage = ({ params }: ProfilePageProps) => {
  const [authInfo, setUserInfo] = useState<AuthUser>();
  const sectionName = params.section;
  const router = useRouter();

  const getUserInfo = () => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      router.push("/login");
    }
    return {};
  };

  useEffect(() => {
    if (!authInfo) {
      getUserInfo();
    }
  }, [authInfo]);

  if (!authInfo) return <Loading />;

  return <Profile authInfo={authInfo} sectionName={sectionName} />;
};

export default ProfilePage;
