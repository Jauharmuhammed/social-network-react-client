import React from "react";
import Navbar from "./Navbar";
import Sidbar from "./Sidbar";

export const Layout = ({ children }) => {
  return (
    <main className="min-h-screen bg-[#303030] text-white">
      <div className="flex">
        <Sidbar />
        <div className="flex flex-col w-full">
          <Navbar />
          <div className="px-16">{children}</div>
        </div>
      </div>
    </main>
  );
};
