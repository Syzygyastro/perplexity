import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-1/5 h-screen bg-gray-900 text-white flex flex-col justify-between p-4">
      <div>
        <h1 className="text-2xl font-bold mb-6">Perplexity</h1>
        <nav>
          <ul className="space-y-4">
            <li className="cursor-pointer hover:text-gray-300">Home</li>
            <li className="cursor-pointer hover:text-gray-300">Discover</li>
            <li className="cursor-pointer hover:text-gray-300">Spaces</li>
            <li className="cursor-pointer hover:text-gray-300">Library</li>
          </ul>
        </nav>
      </div>
      <div>
        <button className="bg-blue-600 w-full py-2 mb-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
        <button className="bg-gray-700 w-full py-2 rounded hover:bg-gray-600">
          Log In
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
