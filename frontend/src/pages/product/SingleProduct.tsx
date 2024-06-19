import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchOneProducts } from "../../store/productSlice";
import ProductReviewCart from "./component/ProductReviewCart";
import { AddProductToCart } from "../../store/cartSlice";

const SingleProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const { singleProduct } = useAppSelector((store) => store.product);
  const product = singleProduct?.product;
  const reviews = singleProduct?.reviews;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(fetchOneProducts(id));
    }
  }, [dispatch, id]);

  const [quantity, setQuantity] = useState(1);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(value);
  };

  const handleQuantityChange = (productId: string | undefined, qty: number) => {
    if (productId) {
      const data = {
        productId: productId,
        quantity: qty,
      };
      dispatch(AddProductToCart(data));
    }
  };

  return (
    <div className="font-sans p-8 tracking-wide max-lg:max-w-2xl mx-auto mt-5">
      <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4 text-center lg:sticky top-8">
          <div className="bg-gray-100 p-4 flex items-center sm:h-[380px] rounded-lg">
            <img
              src={product?.productImage}
              alt={product?.productName}
              className="w-full max-h-full object-contain object-top"
            />
          </div>
          <div className="flex flex-wrap gap-4 mt-8 justify-end">
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={onChange}
              className="border-2 border-gray-500 w-12 text-center active:border-blue-500"
            />
            <button
              type="button"
              className="min-w-[200px] px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-semibold rounded-lg"
            >
              Buy now
            </button>
            <button
              onClick={() => handleQuantityChange(id, quantity)}
              type="button"
              className="min-w-[200px] px-4 py-2.5 border border-yellow-400 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded-lg"
            >
              Add to cart
            </button>
          </div>
        </div>

        <div className="max-w-xl">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800">
              {product?.productName}
            </h2>
            <p>
              <span>In stock: {product?.productStockQty} Qty</span>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {product?.Category.categoryName}
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-gray-800 text-4xl font-bold">
              Rs.{product?.productPrice}
            </h3>
          </div>

          <div className="mt-8">
            <ul className="flex border-b">
              <li className="text-gray-800 font-bold text-sm py-3">
                Description
              </li>
            </ul>

            <div className="mt-8">
              <p className="text-sm text-gray-600 mt-4 border-b-2 pb-4">
                {product?.productDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
      {reviews &&
        reviews.map((review) => (
          <ProductReviewCart key={review.id} reviews={review} />
        ))}
    </div>
  );
};

export default SingleProduct;
