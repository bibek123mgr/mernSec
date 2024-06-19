import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { Product } from "../../../type/productType";
import { useAppDispatch } from "../../../store/hook";
import { AddProductToCart, resetStatus } from "../../../store/cartSlice";

interface prod {
  product: Product;
}

const ProductCart: React.FC<prod> = ({ product }) => {
  const dispatch = useAppDispatch();
  const handleCartClick = (e: React.MouseEvent, id: string) => {
    const data = {
      productId: id,
      quantity: 1,
    };
    e.stopPropagation();
    e.preventDefault();
    dispatch(AddProductToCart(data));
    dispatch(resetStatus());
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="rounded overflow-hidden shadow-lg"
    >
      <div className="relative">
        <img
          className="w-full"
          src={product.productImage}
          alt={product.productName}
        />
        <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        <p>
          <div className="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
            <small>Rs.{product.productPrice}</small>
          </div>
        </p>
      </div>
      <div className="px-6 py-4">
        <h2 className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">
          {product.productName}
        </h2>
        <p className="text-gray-500 text-sm">{product.productDescription}</p>
      </div>
      <hr />
      <div className="px-6 py-4 flex flex-row items-center justify-end">
        <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row justify-between items-center">
          <button
            className="ml-1"
            onClick={(e) => handleCartClick(e, product.id)}
          >
            <FaCartShopping size={28} />
          </button>
        </span>
      </div>
    </Link>
  );
};

export default ProductCart;
