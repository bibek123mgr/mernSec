import React, { useEffect } from "react";
import CartProduct from "./components/CartProduct";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchAllCart } from "../../store/cartSlice";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleFatchCart = () => {
    dispatch(fetchAllCart());
  };
  useEffect(() => {
    handleFatchCart();
  }, [dispatch]);

  const { data: cart } = useAppSelector((store) => store.cart);
  const GrandtotalPrice = cart.reduce(
    (total, item) => item.Product.productPrice * item.quantity + total,
    0
  );
  const GrandtotalProduct = cart.reduce(
    (total, item) => item.quantity + total,
    0
  );

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cart.map((item) => (
                <CartProduct key={item.id} cart={item} />
              ))}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                summary
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Total Product
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {GrandtotalProduct} Qty
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Total Price
                    </dt>
                    <dd className="text-base font-medium text-green-600">
                      Rs.{GrandtotalPrice}/-
                    </dd>
                  </dl>
                </div>
              </div>

              <Link
                to="/checkout"
                className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
              >
                Proceed to Checkout
              </Link>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  or
                </span>
                <Link
                  to="/"
                  title=""
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline hover:no-underline dark:text-blue-500"
                >
                  Continue Shopping
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
