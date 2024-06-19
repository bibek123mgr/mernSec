import React from "react";
import { review } from "../../../type/productType";
interface ProductReviewCartProps {
  reviews: review;
}
const ProductReviewCart: React.FC<ProductReviewCartProps> = ({ reviews }) => {
  return (
    <article className="p-4 bg-slate-100 mt-3">
      <div className="flex items-center mb-4">
        <img
          className="w-10 h-10 me-4 rounded-full"
          src="/docs/images/people/profile-picture-5.jpg"
          alt=""
        />
        <div className="font-medium dark:text-white">
          <p>{reviews.User?.username}</p>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            rating: {reviews.rating} out of 5
          </h3>
        </div>
      </div>

      <footer className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <p>{reviews.createdAt}</p>
      </footer>
      <p className="mb-2 text-gray-500 dark:text-gray-400">{reviews.comment}</p>
      <div className="flex gap-3">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </article>
  );
};

export default ProductReviewCart;
