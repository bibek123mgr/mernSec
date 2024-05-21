import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="min-w-screen min-h-[78vh] bg-slate-600 flex items-center justify-center">
      <div className="max-w-[800px] w-full mx-4 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <div className="w-[150px] h-[150px] bg-red-400 rounded-full overflow-hidden mb-4">
            <img src="path/to/profile-pic.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">John Doe</h2>
            <p className="text-gray-600 mb-4">Software Engineer at Company</p>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                Follow
              </button>
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
