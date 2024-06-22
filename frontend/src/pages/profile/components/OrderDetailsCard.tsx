import React from "react";
import { productItems } from "../../../type/orderType";

interface OrderDetailsCardType {
  order: productItems;
}

const OrderDetailsCard: React.FC<OrderDetailsCardType> = ({ order }) => {
  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex justify-between mb-4">
        <div className="flex">
          <img
            src={order?.Product.productImage}
            alt={order?.Product.productName}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="ml-4">
            <h4 className="text-lg font-semibold">
              {order?.Product.productName}
            </h4>
            <p className="text-gray-600">{order?.quantity} Qty</p>
          </div>
        </div>
        <div className="text-blue-600 text-lg font-semibold">
          Rs.{order?.Product.productPrice}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default OrderDetailsCard;
