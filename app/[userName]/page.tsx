"use client";

import { fetchUserDataByParameter } from "@/apis/userApis";
import Loading from "@/components/loading";
import MainProfileDetails from "@/components/profileview/MainProfileDetails";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProfilePageProps {
  params: { userName: string };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const userName = params.userName;
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [authInfo, setUserInfo] = useState<AuthUser>();

  const getUserInfo = () => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  };

  const fetchUserByUserName = async () => {
    try {
      const data = await fetchUserDataByParameter({ username: userName });
      setUser(data[0]);
    } catch (e) {
      console.error("Error fetching your profile: ", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
    fetchUserByUserName();
  }, [userName]);

  if (loading) {
    return <Loading message="We are fetching profile from our server." />;
  }

  if (user) {
    const sameUser = authInfo?._id.$oid == user._id.$oid;
    return (
      <div className="w-full ">
        <MainProfileDetails userData={user} sameUser={sameUser} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-16 flex flex-col justify-center items-center gap-8">
      <div className="text-center text-5xl font-bold">
        Abey laude jaa kar account bana
      </div>
      <Button>
        <Link href="/signup">Signup Button</Link>
      </Button>
    </div>
  );
}
