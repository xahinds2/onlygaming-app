import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function MaintenancePage() {

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full max-w-xl mx-auto flex flex-col justify-center items-center gap-8">
        <img src={"/assets/home/maintainance.png"} alt="Under Maintenance" className="w-64 h-auto" />
        <div className="text-center mt-8">
          Manish is currently working on making this page amazing. Stay tuned!
        </div>
        <Button className="text-sm mt-4">
          <Link href="/">Explore Nearby</Link>
        </Button>
      </div>
    </div>
  );
}
