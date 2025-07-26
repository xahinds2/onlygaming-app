import React from "react";
import ProfileForm from "./profileForm";

interface ProfileFormProps {
  userData: User;
  updateProfile: (formData:any) => void;
}

const basicSection = {
    "name": true,
    "gender": true,
    "summary": false,
    "interests": false,
    "personality": false,
    "prompt": false
};

const BasicInfoSection = ({ userData, updateProfile }: ProfileFormProps) => {
  return (
    <div>
      <ProfileForm userData={userData} section={basicSection} updateProfile={updateProfile} />
    </div>
  );
};

export default BasicInfoSection;
