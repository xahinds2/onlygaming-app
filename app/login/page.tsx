"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/loading";
import { generateOtpApi, verifyOtpApi } from "@/apis/authApis";

interface Auth {
  otp: string;
  user: string;
  timestamp: string;
}

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otpData, setOtpData] = useState<Auth>(Object);
  const [verificationCode, setVerificationCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    let intervalId: any;
    if (isOtpSent && resendTimer > 0) {
      intervalId = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isOtpSent, resendTimer]);

  const generateOTP = async () => {
    try {
      setIsOtpSent(true);
      setResendTimer(30);
      const data = await generateOtpApi(mobile, "", toast);
      setOtpData(data);
    } catch (error) {
      console.error("Error generating OTP:", error);
    }
  };

  const verifyOTP = async () => {
    try {
      const status = await verifyOtpApi(
        mobile,
        verificationCode,
        otpData.timestamp,
        toast
      );
      if (status == 200) {
        handlePasswordAuth("OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handlePasswordAuth = async (auth_method: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PRO}://${process.env.NEXT_PUBLIC_API_URL}/api/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile,
            password,
            auth_method,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userInfo", JSON.stringify(data));

        toast({
          variant: "success",
          title: "Login Successful",
          description: "You have successfully logged in.",
        });

        window.location.href = "/"
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: response.json(),
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLoginMethod = () => {
    setShowOtp(!showOtp);
  };

  const handleSendOTP = () => {
    if (mobile.length) {
      generateOTP();
    } else {
      toast({
        variant: "destructive",
        title: "OTP Status",
        description: "Please enter mobile number",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (showOtp) {
      verifyOTP();
    } else {
      handlePasswordAuth("password");
    }
  };

  return (
    <div>
      {loading && <Loading />}

      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Log In</CardTitle>
              <CardDescription>
                Enter your number and {showOtp ? "OTP" : "password"} to login to
                your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="number">Number</Label>
                    <Input
                      id="number"
                      type="text"
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                  </div>

                  {showOtp ? (
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="otp">OTP</Label>
                        {!isOtpSent ? (
                          <a
                            className="ml-auto inline-block text-sm underline"
                            onClick={handleSendOTP}
                          >
                            Generate OTP
                          </a>
                        ) : (
                          <>
                            <span className="ml-auto inline-block text-sm">
                              {resendTimer > 0
                                ? `Resend OTP in ${resendTimer} seconds`
                                : ""}
                            </span>
                            {resendTimer === 0 && (
                              <a
                                className="ml-2 inline-block text-sm underline"
                                onClick={handleSendOTP}
                              >
                                Resend OTP
                              </a>
                            )}
                          </>
                        )}
                      </div>
                      <Input
                        id="otp"
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                      />
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a className="ml-auto inline-block text-sm underline">
                          Forgot your password?
                        </a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <Button type="submit" className="w-full">
                    Log In
                  </Button>
                  <Button
                    type="button"
                    style={{ backgroundColor: "gray", color: "white" }}
                    className="w-full"
                    onClick={toggleLoginMethod}
                  >
                    {showOtp ? "Login with Password" : "Login with OTP"}
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                  Sign Up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="hidden bg-muted lg:block h-screen">
          <Image
            src="/assets/home/Home2.png"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.4] "
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
