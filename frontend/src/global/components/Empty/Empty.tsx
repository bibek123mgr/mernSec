import { Link } from "react-router-dom";

const Empty = () => {
  return (
    <section className="container px-4 mx-auto h-96 flex items-center justify-center">
      <div className="flex items-center mt-6 text-center">
        <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
          <div className="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <h1 className="mt-3 text-lg text-gray-800 dark:text-white">
            No Product found
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            There is not product's in the cart.Please add product for Shopping.
            <br />
            Stay Connected to Us !!!.
          </p>
          <div className="flex items-center mt-4 sm:mx-auto gap-x-3">
            <Link
              to="/"
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span>Add Product</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Empty;
