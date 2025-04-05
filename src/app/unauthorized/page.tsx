"use client";

import { useSearchParams } from "next/navigation";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function UnauthorizedPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-center p-6">
      <div className="bg-red-100 dark:bg-red-800 p-8 rounded-xl shadow-xl max-w-xl">
        <h1 className="text-3xl font-bold text-red-700 dark:text-red-300 mb-4">
          Invalid Email
        </h1>
        <p className="text-gray-800 dark:text-gray-200 mb-6">
          {email} is not a valid official email. Employers must sign up with
          their company email (not Gmail, Yahoo, Outlook, etc.).
        </p>
        <LogoutLink>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Return
          </button>
        </LogoutLink>
      </div>
    </div>
  );
}
