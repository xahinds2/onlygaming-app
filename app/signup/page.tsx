"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateOtpApi, verifyOtpApi } from "@/apis/authApis";
import Image from "next/image";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import Loading from "@/components/loading";

interface Auth {
  otp: string;
  user: string;
  timestamp: string;
}

const SignupForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpData, setOtpData] = useState<Auth>(Object);
  const [verificationCode, setVerificationCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
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
      const data = await generateOtpApi(mobile, email, toast);
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PRO}://${process.env.NEXT_PUBLIC_API_URL}/api/signup/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
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
          title: "Account Created",
          description: "Your account has been successfully created.",
        });
        router.push("/");
      } else {
        toast({
          variant: "destructive",
          title: "Signup Failed",
          description: response.json(),
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = () => {
    if (mobile.length) {
      generateOTP();
    } else {
      toast({
        variant: "destructive",
        title: "OTP Status",
        description: "Please enter form details",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyOTP();
  };

  return (
    <div>
      {loading && <Loading />}

      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your basic details to create your account with Nearby
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="text">Full name</Label>
                    <Input
                      id="name"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="text">Enter Mobile</Label>
                    <Input
                      id="mobile"
                      type="text"
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="text">Enter Email</Label>
                    <Input
                      id="email"
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label
                        htmlFor="password"
                        className="mr-auto inline-block text-sm"
                      >
                        Create Password
                      </Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

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

                  <Button type="submit" className="w-full">
                    Create
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Log In
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Image block */}
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

export default SignupForm;
