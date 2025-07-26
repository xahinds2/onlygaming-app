"use client";

import { useState, useEffect } from "react";
import Loading from "@/components/loading";
import UserCard from "./UserInfoCard";
import { fetchNearbyUsers, updateUserLocation } from "@/apis/nearbyUser";

interface NearbyProps {
  searchInput: string;
  authInfo?: AuthUser;
  sortKey: string;
  reverse: boolean;
  coords: number[];
}

const NearbyParentComponent = ({
  searchInput,
  authInfo,
  sortKey,
  reverse,
  coords,
}: NearbyProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    clearTimeout(timeoutId);
    const latestTimeoutId = setTimeout(() => {
      fetchUsers();
    }, 500);
    setTimeoutId(latestTimeoutId);
  }, [coords, searchInput, sortKey, reverse]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchNearbyUsers({
        name: searchInput,
        sortby: sortKey,
        reverse,
        coords,
        user_id: authInfo?._id.$oid,
      });
      setNearbyUsers(data.nearby_users);
    } catch (error) {
      console.error("Error fetching nearby users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authInfo && coords.length) {
      updateLocation(authInfo.token, authInfo._id.$oid, coords);
    }
  }, [authInfo, coords]);

  const updateLocation = async (
    token: string,
    userId: string,
    coords: number[]
  ) => {
    updateUserLocation(token, userId, coords);
  };

  return (
    <div className="dark:bg-black bg-white min-h-screen text-white">
      {loading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nearbyUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default NearbyParentComponent;
