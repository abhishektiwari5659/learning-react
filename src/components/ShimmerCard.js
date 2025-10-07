import React from "react";

const ShimmerCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3 animate-pulse">
      {/* Image placeholder */}
      <div className="bg-gray-300 h-40 w-full rounded-md"></div>

      {/* Name placeholder */}
      <div className="h-5 bg-gray-300 rounded w-3/4"></div>

      {/* Cuisine placeholder */}
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>

      {/* Price & delivery placeholder */}
      <div className="flex justify-between">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;
