import React, { useEffect, useState } from "react";
import { cart } from "../../../type/cartType";
import { useAppDispatch } from "../../../store/hook";
import { deleteCartItem, updateCart } from "../../../store/cartSlice";

interface cartItem {
  cart: cart;
}

const CheckOutCard: React.FC<cartItem> = ({ cart }) => {
  const dispatch = useAppDispatch();
  const handleUpdateQty = (cartId: string, quantity: number) => {
    dispatch(updateCart(cartId, quantity));
  };
  const handleDeleteItem = (cartId: string) => {
    dispatch(deleteCartItem(cartId));
  };
  const [quantity, setQuantity] = useState(cart.quantity);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
  };
  useEffect(() => {
    setQuantity(cart.quantity);
  }, [cart.quantity]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      {/* <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0"> */}
      <div className="flex items-center justify-between gap-6 space-y-0">
        <img
          className="h-20 w-20 dark:hidden"
          src={cart.Product.productImage}
          alt={cart.Product.productName}
        />

        <label className="sr-only">Choose quantity:</label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-centecartr">
            <button
              onClick={() => handleUpdateQty(cart.id, cart.quantity - 1)}
              type="button"
              id="decrement-button-2"
              data-input-counter-decrement="counter-input-2"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              -
            </button>
            <input
              onChange={handleChange}
              type="number"
              id="counter-input-2"
              data-input-counter
              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
              placeholder=""
              value={quantity}
            />
            <button
              onClick={() => handleUpdateQty(cart.id, cart.quantity + 1)}
              type="button"
              id="increment-button-2"
              data-input-counter-increment="counter-input-2"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              +
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900 dark:text-white">
              Rs.{cart.Product.productPrice * cart.quantity}
            </p>
          </div>
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <h1 className="font-semibold text-lg hover:text-indigo-600 transition duration-500 ease-in-out capitalize">
            {cart.Product.productName}
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleDeleteItem(cart.id)}
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutCard;
