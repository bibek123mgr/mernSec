import React, { useState, ChangeEvent, FormEvent } from "react";

interface User {
  username: string;
  email: string;
  gender: string;
  number: string | number | null;
  address: string;
}

interface EditProfileProps {
  user: User;
  onClose: () => void;
  onSave: (updatedData: User) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState<User>({
    username: user.username,
    email: user.email,
    gender: user.gender,
    number: user.number,
    address: user.address,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "number" ? (value ? Number(value) : null) : value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              value={formData.gender}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-700"
            >
              Number
            </label>
            <input
              type="text"
              id="number"
              name="number"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              value={formData.number ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-4 py-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
