"use client";
import { ReactNode } from "react";
import { UserProvider } from "./UserContext"; // Import the context provider

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
};

export default Layout;
