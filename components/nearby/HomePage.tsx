"use client";

import { useEffect, useState } from "react";
import Dashboard from "@/components/nearby/MainPage";
import { fetchUserData } from "@/apis/userApis";
import Loading from "@/components/loading";
import { anynomousUser } from "@/shared/anonymousUser";

interface HomePageProps {
  localCoords: number[];
}

const HomePage = ({ localCoords }: HomePageProps) => {
  const [authInfo, setAuthInfo] = useState<AuthUser>();
  const [userData, setUserData] = useState<User>(anynomousUser);
  const [loading, setLoading] = useState(true);

  const getUserInfo = () => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setAuthInfo(JSON.parse(storedUserInfo));
    } else {
      setLoading(false);
    }
    return {};
  };

  const fetchProfileInfo = async (token: string, userId: string) => {
    try {
      const data = await fetchUserData(userId, token);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching profile: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authInfo) {
      fetchProfileInfo(authInfo.token, authInfo._id.$oid);
    } else {
      getUserInfo();
    }
  }, [authInfo]);

  if (loading) return <Loading />;
  return <Dashboard userData={userData} authInfo={authInfo} localCoords={localCoords} />;
};

export default HomePage;
