interface NearbyUsersParams {
  [key: string]: any;
}

export const fetchNearbyUsers = async (params: NearbyUsersParams) => {
  try {
    const bodyData: any = {};
    Object.keys(params).forEach((key) => {
      bodyData[key] = params[key];
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PRO}://${process.env.NEXT_PUBLIC_API_URL}/api/nearby/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }
    );
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export const updateUserLocation = async (
  token: string,
  userId: string,
  coords: number[]
) => {
  try {
    const respone = await fetch(
      `${process.env.NEXT_PUBLIC_API_PRO}://${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ coordinates: coords }),
      }
    );
    return respone.status;
  } catch (error) {
    console.error("Failed to update location:", error);
  }
};
