import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchMyprofile, resetStatus } from "../../store/authSlice";
import { STATUSES } from "../../type/Type";
import EditProfile from "./EditProfile";

interface User {
  username: string;
  email: string;
  gender: string;
  number: string | number | null;
  address: string;
}

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, data } = useAppSelector((store) => store.auth);
  const user: User = data?.user || {
    username: "",
    email: "",
    gender: "",
    number: null,
    address: "",
  };
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchMyprofile());
  }, [dispatch]);

  useEffect(() => {
    if (status !== STATUSES.IDLE) {
      dispatch(resetStatus());
    }
  }, [status, dispatch]);

  const handleEditClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSave = (updatedData: User) => {
    // Add logic to save the updated data
    console.log(updatedData);
    setIsPopupOpen(false);
  };

  if (!data || !user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">
            Personal Information
          </h2>

          <div className="items-center mt-8 sm:mt-14 text-[#202142]">
            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  UserName
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder="Your username"
                  required
                  defaultValue={user.username}
                  disabled
                />
              </div>
            </div>

            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                disabled
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="your.email@mail.com"
                required
              />
            </div>

            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
              >
                Gender
              </label>
              <input
                type="text"
                id="gender"
                name="gender"
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="gender"
                required
                defaultValue={user.gender}
                disabled
              />
            </div>

            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="number"
                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
              >
                Number
              </label>
              <input
                type="text"
                id="number"
                name="number"
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="your Number"
                required
                defaultValue={
                  user.number !== null ? user.number.toString() : ""
                }
                disabled
              />
            </div>

            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="your Full Address"
                required
                defaultValue={user.address}
                disabled
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleEditClick}
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <EditProfile
          user={user}
          onClose={handleClosePopup}
          onSave={handleSave}
        />
      )}
    </main>
  );
};

export default Profile;
