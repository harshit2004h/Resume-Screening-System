"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./UserContext";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Briefcase, User } from "lucide-react";
import Image from "next/image";

const RoleSelection = () => {
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const { userEmail, userPicture, loading } = useUser();
  const router = useRouter();

  const personalDomains = [
    "gmail.com",
    "yahoo.com",
    "rediffmail.com",
    "outlook.com",
    "hotmail.com",
  ];

  const handleProceed = () => {
    if (!role) {
      setError("Please select a role.");
      return;
    }

    if (!userEmail || !userEmail.includes("@")) {
      setError("Invalid email address.");
      return;
    }

    const domain = userEmail.split("@")[1];

    if (role === "Employee") {
      router.push("/u/dashboard");
      return;
    }

    if (personalDomains.includes(domain)) {
      setError("Login with Official email for Employer Login");
      return;
    }

    router.push("/h/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Select Your Role
        </h2>

        {/* User Profile Picture */}
        {loading ? (
          <p className="text-center mb-4 text-gray-600">
            Fetching user data...
          </p>
        ) : (
          <>
            {userPicture && (
              <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-400 shadow-md">
                  <Image
                    src={userPicture}
                    alt="User Profile"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            )}
            <p className="text-center mb-6 text-lg text-gray-700">
              Logged in as: <strong>{userEmail ?? "Unknown Email"}</strong>
            </p>
          </>
        )}

        <div className="flex gap-6">
          <div
            className={`flex flex-col items-center justify-center w-1/2 p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              role === "Employee"
                ? "border-blue-500 bg-blue-100 shadow-md"
                : "border-gray-300 bg-white hover:bg-gray-100"
            }`}
            onClick={() => setRole("Employee")}
          >
            <User size={60} className="mb-4 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800">Employee</h3>
          </div>

          <div
            className={`flex flex-col items-center justify-center w-1/2 p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              role === "Employer"
                ? "border-green-500 bg-green-100 shadow-md"
                : "border-gray-300 bg-white hover:bg-gray-100"
            }`}
            onClick={() => setRole("Employer")}
          >
            <Briefcase size={60} className="mb-4 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-800">Employer</h3>
          </div>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <button
          onClick={handleProceed} // 🚀 FIXED! Now Proceed works
          className="mt-6 p-3 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
          disabled={loading}
        >
          Proceed
        </button>

        <LogoutLink>
          <button className="mt-4 p-3 bg-red-500 text-white rounded-lg w-full hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-md">
            Logout
          </button>
        </LogoutLink>
      </div>
    </div>
  );
};

export default RoleSelection;
