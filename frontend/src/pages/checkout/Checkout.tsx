import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchAllCart } from "../../store/cartSlice";
import CheckOutCard from "./components/CheckOutCard";
import { createOrder, reSetStatus } from "../../store/orderSlice";
import { useNavigate } from "react-router-dom";
import { STATUSES } from "../../type/Type";

const CheckOut: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: cart } = useAppSelector((store) => store.cart);
  const { status } = useAppSelector((store) => store.order);

  // State for form fields
  const [formData, setFormData] = useState({
    address: "",
    number: "",
    paymentMethod: "cod",
  });

  const handleFatchCart = () => {
    dispatch(fetchAllCart());
  };

  useEffect(() => {
    if (cart.length === 0) {
      handleFatchCart();
    }
  }, [dispatch]);

  const GrandtotalPrice = cart.reduce(
    (total, item) => item.Product.productPrice * item.quantity + total,
    0
  );

  const GrandtotalProduct = cart.reduce(
    (total, item) => item.quantity + total,
    0
  );

  const ShippingCost = 115;

  const paymentMethods = [
    {
      option: "cod",
      imageUrl:
        "https://img.freepik.com/premium-vector/cash-delivery_569841-175.jpg?w=740",
    },
    {
      option: "esewa",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Esewa_logo.webp/1200px-Esewa_logo.webp.png?20220908142913",
    },
    {
      option: "khalti",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/e/ee/Khalti_Digital_Wallet_Logo.png.jpg?20191113062452",
    },
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const items = cart.map((item) => ({
      productId: item.Product.id,
      quantity: item.quantity,
    }));

    const data = {
      phoneNumber: formData.number,
      shippingAddress: formData.address,
      paymentDetails: {
        paymentMethod: formData.paymentMethod,
      },
      items: items,
      amount: GrandtotalPrice,
    };
    dispatch(createOrder(data));
  };

  useEffect(() => {
    console.log(status);
    if (status == STATUSES.SUCCESS) {
      navigate("/profile/orders");
    }
    if (status != STATUSES.IDLE) {
      dispatch(reSetStatus());
    }
  }, [dispatch, status]);

  return (
    <div className="font-[sans-serif] bg-white">
      <div className="max-lg:max-w-xl mx-auto w-full">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 max-lg:order-1 p-6 !pr-0 max-w-4xl mx-auto w-full">
            <div className="text-center max-lg:hidden">
              <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b border-gray-800 pb-1">
                Checkout
              </h2>
            </div>

            <form className="lg:mt-16" onSubmit={handleSubmit}>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Shipping info
                </h2>

                <div className="grid sm:grid-cols-2 gap-8 mt-8">
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="Address"
                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  <input
                    required
                    type="number"
                    name="number"
                    placeholder="Number"
                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    value={formData.number}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mt-16">
                <h2 className="text-xl font-bold text-gray-800">
                  Payment method
                </h2>

                <div className="grid gap-4 sm:grid-cols-3 mt-4">
                  {paymentMethods.map((method) => (
                    <div className="flex items-center" key={method.option}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        className="w-5 h-5 cursor-pointer"
                        id={method.option}
                        value={method.option}
                        checked={formData.paymentMethod === method.option}
                        onChange={handleInputChange}
                      />
                      <label
                        htmlFor={method.option}
                        className="ml-4 flex gap-2 cursor-pointer"
                      >
                        <img
                          src={method.imageUrl}
                          className="w-20"
                          alt={method.option}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8 md:justify-end">
                <button
                  type="submit"
                  className="min-w-[150px] px-6 py-3.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-800"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>

          <div className="bg-gray-100 lg:h-screen lg:sticky lg:top-0">
            <div className="relative h-full">
              <div className="p-6 lg:overflow-auto lg:h-[calc(100vh-60px)] max-lg:mb-8">
                <h2 className="text-xl font-bold text-gray-800">
                  Order Summary
                </h2>
                <div className="space-y-8 mt-8">
                  {cart.map((item) => (
                    <CheckOutCard key={item.id} cart={item} />
                  ))}
                </div>
              </div>

              <div className="lg:absolute lg:left-0 lg:bottom-0 bg-gray-200 w-full p-6 ">
                <h4 className="flex flex-wrap gap-4 text-base text-gray-800 font-bold ">
                  Total Products
                  <span className="ml-auto">{GrandtotalProduct} Qty</span>
                </h4>
                <h4 className="flex flex-wrap gap-4 text-base text-gray-800 font-bold">
                  Shipping Cost{" "}
                  <span className="ml-auto">Rs.{ShippingCost}/-</span>
                </h4>
                <h4 className="flex flex-wrap gap-4 text-base text-gray-800 font-bold border-b-2 border-black">
                  Total <span className="ml-auto">Rs.{GrandtotalPrice}/-</span>
                </h4>
                <h4 className="flex flex-wrap gap-4 text-base text-gray-800 font-bold">
                  Grand Total{" "}
                  <span className="ml-auto">
                    Rs.{GrandtotalPrice + ShippingCost}/-
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
