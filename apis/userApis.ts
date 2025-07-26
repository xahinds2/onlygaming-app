interface UserDataParams {
  [key: string]: string;
}

export const fetchUserData = async (userId: string, token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PRO}://${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export const fetchUserDataByParameter = async (params: UserDataParams) => {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_PRO}://${process.env.NEXT_PUBLIC_API_URL}/api/users/`
    );

    Object.keys(params).forEach((key) => {
      url.searchParams.append(key, params[key]);
    });

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export const updateProfileByUserId = async (
  token: string,
  userId: string,
  formData: any,
  toast: any
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PRO}://${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      toast({
        variant: "success",
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Profile Update Failed",
        description: response.json(),
      });
    }
    return response.status;
  } catch (error) {
    console.error("Error updating profile: " + error);
  }
};
