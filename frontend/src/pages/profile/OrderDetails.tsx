import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchOneOrder, reSetStatus } from "../../store/orderSlice";
import { STATUSES } from "../../type/Type";
import { useParams } from "react-router-dom";
import OrderDetailsCard from "./components/OrderDetailsCard";
import { ORDERSTATUSES } from "../../type/orderType";
import Loading from "../../global/components/loading/Loading";

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectOrder, status } = useAppSelector((store) => store.order);
  const handlefetchOrders = async (id: string) => {
    await dispatch(fetchOneOrder(id));
  };
  useEffect(() => {
    if (id) {
      handlefetchOrders(id);
    }
  }, [dispatch]);

  useEffect(() => {
    if (status !== STATUSES.IDLE) {
      dispatch(reSetStatus());
    }
  }, [status, dispatch]);
  if (!selectOrder || !selectOrder.items) {
    return <Loading />;
  }
  return (
    <div className="bg-white p-8 rounded-lg shadow-md my-5">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">
        Order Summary
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Shipping & Billing Info
          </h3>
          <div className="mb-2">
            <span className="block font-medium text-gray-700">
              Phone Number
            </span>
            <span className="block">{selectOrder?.phoneNumber}</span>
          </div>
          <div className="mb-2">
            <span className="block font-medium text-gray-700">
              Shipping Address
            </span>
            <span className="block">{selectOrder?.shippingAddress}</span>
          </div>
          <div className="mb-2">
            <span className="block font-medium text-gray-700">
              Order Status
            </span>
            <span
              className={`${
                selectOrder.orderStatus === ORDERSTATUSES.Cancelled &&
                "text-red-600"
              } ${
                selectOrder.orderStatus === ORDERSTATUSES.Delivered &&
                "text-green-700"
              }block`}
            >
              {selectOrder?.orderStatus}
            </span>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-6 mb-4">Payment Details</h3>
          <div className="mb-2">
            <span className="block font-medium text-gray-700">
              Payment Method
            </span>
            <span className="block">
              {selectOrder.PaymentDetail?.paymentMethod}
            </span>
          </div>
          <div className="mb-2">
            <span className="block font-medium text-gray-700">
              Payment Status
            </span>
            <span className="block">
              {selectOrder.PaymentDetail?.paymentStatus}
            </span>
          </div>
          {selectOrder.PaymentDetail?.paymentMethod !== "cod" && (
            <div className="mb-2">
              <span className="block font-medium text-gray-700">Pidx</span>
              <span className="block"> {selectOrder.PaymentDetail?.pidx}</span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold mb-4">
            Items in your Shopping Cart
          </h3>
          {selectOrder?.orderStatus === "pending" && (
            <button
              type="button"
              className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
            >
              Cancel order
            </button>
          )}
        </div>
        {selectOrder &&
          selectOrder.items.map((item) => (
            <OrderDetailsCard key={item.id} order={item} />
          ))}
        <div className="flex justify-end mt-4">
          <div className="text-lg font-semibold">Total Price:</div>
          <div className="ml-4 text-blue-600 text-lg font-semibold">
            Rs.{selectOrder.amount}/-
            <span className="text-black font-normal">
              (including shipping Charge)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
