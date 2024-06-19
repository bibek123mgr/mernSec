import React from "react";

const CheckoutProductCard = () => {
  return (
    <li className="flex justify-between">
      <div className="inline-flex">
        <img
          src="https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGhhaXIlMjBkcnllcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="max-h-16"
        />
        <div className="ml-3">
          <p className="text-base font-semibold text-white">Luisia H35</p>
          <p className="text-sm font-medium text-white text-opacity-80">
            Hair Dryer
          </p>
        </div>
      </div>
      <p className="text-sm font-semibold text-white">$350.00</p>
    </li>
  );
};

export default CheckoutProductCard;
