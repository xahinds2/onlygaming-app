import React from "react";
import ProfileForm from "./profileForm";

interface ProfileFormProps {
  userData: User;
  updateProfile: (formData: any) => void;
}

const privacySection = {
  "username": true,
  "mobile": true,
  "email": false,
  "privacy": false,
  "country": false,
};

const PrivacySection = ({
  userData,
  updateProfile,
}: ProfileFormProps) => {
  return (
    <div>
      <ProfileForm
        userData={userData}
        section={privacySection}
        updateProfile={updateProfile}
      />
    </div>
  );
};

export default PrivacySection;
