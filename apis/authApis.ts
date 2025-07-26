export const generateOtpApi = async (mobile: string, email: string, toast: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PRO}://${process.env.NEXT_PUBLIC_API_URL}/api/generate_otp/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, email }),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      toast({
        variant: "success",
        title: "OTP Sent",
        description: data.message,
      });
    } else if (response.status === 404) {
      toast({
        variant: "destructive",
        title: "OTP Status",
        description: data.message,
      });
    }
    return data;
  } catch (error) {
    console.error("Error generating OTP:", error);
  }
};

export const verifyOtpApi = async (
  mobile: string,
  otp: string,
  timestamp: string,
  toast: any
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PRO}://${process.env.NEXT_PUBLIC_API_URL}/api/verify_otp/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: mobile, otp, timestamp }),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      toast({
        variant: "success",
        title: "OTP Verified",
        description: data.message,
      });
    } else if (response.status === 404) {
      toast({
        variant: "destructive",
        title: "OTP Verification failed",
        description: data.error,
      });
    }
    return response.status;
  } catch (error) {
    console.error("Error verifying OTP:", error);
  }
};
