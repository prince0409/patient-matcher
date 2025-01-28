import React from "react";

const Loader: React.FC = () => {
  return (
    <div
      className="flex justify-center items-center"
      role="status"
      aria-label="Loading"
    >
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-500 h-12 w-12 mb-4"></div>
    </div>
  );
};

export default Loader;
