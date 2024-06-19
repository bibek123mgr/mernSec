import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "./components/SideNavbar";
import { useLocation } from "react-router-dom";

const ProfileLayout: React.FC = () => {
  let location = useLocation();
  const path = location.pathname.split("/").pop();
  return (
    <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <SideNavbar path={path} />
      </aside>
      <main className="w-full md:w-2/3 lg:w-3/4">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;
