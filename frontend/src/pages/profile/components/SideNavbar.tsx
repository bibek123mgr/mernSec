import React from "react";
import { Link } from "react-router-dom";

interface PathName {
  path: string | undefined;
}
const SideNavbar: React.FC<PathName> = ({ path }) => {
  return (
    <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
      <h2 className="pl-3 mb-4 text-2xl font-semibold capitalize">{path}</h2>
      <Link
        to="/profile"
        className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
      >
        Profile
      </Link>
      <Link
        to="/profile/setting"
        className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"
      >
        Account Settings
      </Link>
      <Link
        to="/profile/notification"
        className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
      >
        Notifications
      </Link>
      <Link
        to="/profile/orders"
        className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
      >
        My Orders
      </Link>
    </div>
  );
};

export default SideNavbar;
