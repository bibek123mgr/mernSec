import React from "react";

const NotificationCard = () => {
  return (
    <div
      id="notification-card-1"
      className="mt-3 bg-verylightgb rounded-md flex justify-between p-3 max-w-fit"
    >
      <img
        src="./assets/images/avatar-mark-webber.webp"
        alt="notification user avatar"
        className="w-12 h-12 "
      />
      <div id="notification-card-details" className="ml-2 text-sm flex-auto">
        <a href="#" className="font-bold hover:text-blue">
          Mark Webber
        </a>
        <span className="text-darkgb">reacted to your recent post</span>
        <a
          href="#"
          className="font-bold text-darkgb cursor-pointer hover:text-blue"
        >
          My first tournament today! My first tournament today! My first
          tournament today!
        </a>
        <span id="notification-ping">
          <span className="absolute inline-block rounded-full mt-2 ml-1 p-1 bg-red">
            {" "}
          </span>
          <span className="relative inline-block animate-ping rounded-full ml-1 p-1 bg-red">
            {" "}
          </span>
        </span>
        <div className="flex items-center justify-between px-2">
          <p className="text-gb mt-1">1m ago</p>
          <button>Clear</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
