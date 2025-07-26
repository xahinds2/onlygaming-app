"use client";

import { useState } from "react";
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

interface ProfileFormProps {
  userData: any;
  section: { [key: string]: boolean };
  updateProfile: (formData: any) => void;
}

const ProfileForm = ({
  userData,
  section,
  updateProfile,
}: ProfileFormProps) => {
  const [formData, setFormData] = useState(userData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredData: { [key: string]: any } = {};
    Object.keys(section).map((key) => {
      filteredData[key] = formData[key];
    });
    updateProfile(filteredData);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-16">
      <Card className="mx-auto p-4">
        <CardHeader>
          <CardTitle className="font-bold text-xl">Profile</CardTitle>
          <CardDescription>Please update your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(section).map((key) => (
              <div key={key} className="grid gap-2">
                <Label htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Label>
                <Input
                  className="text-gray-400"
                  id={key}
                  type={key === "email" ? "email" : "text"}
                  name={key}
                  value={formData[key] || "Write a prompt to generate AI avatar"}
                  onChange={handleChange}
                  required={section[key]}
                />
              </div>
            ))}
            <Button type="submit" className="w-full">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
