import React, { ChangeEvent, FormEvent, useState } from "react";
import { AuthProp, userDataType } from "../../type/Type";
import { Link } from "react-router-dom";

const Form: React.FC<AuthProp> = ({ page, onSubmit }) => {
  const [userData, setUserData] = useState<userDataType>({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center py-24 px-6 mx-auto">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <h1 className="mt-3 mb-8 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
            {page === "signin" ? "Sign in" : "Sign up"}
          </h1>
          {page === "signup" && (
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <i className="fa-regular fa-user w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"></i>
              </span>

              <input
                type="text"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Full Name"
                name="username"
                onChange={handleChange}
              />
            </div>
          )}

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              type="email"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email address"
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type="password"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              {page === "signin" ? "Sign in" : "Sign up"}
            </button>

            <div className="mt-6 text-center ">
              {page === "signin" ? (
                <Link
                  to="/signup"
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Don’t have an account yet? Sign up
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Already have an account? Sign in
                </Link>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
