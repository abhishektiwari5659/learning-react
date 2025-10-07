const ResCard = ({ name, cuisine, image, price, deliveryTime, onClick }) => {
  // Determine display price safely
  let displayPrice = "N/A";
  if (price) {
    displayPrice = typeof price === "number" ? `₹${price / 100}` : price;
  }

  return (
    <div
      className="res-card bg-white rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 p-4 flex flex-col items-center"
      onClick={onClick}
    >
      {/* Restaurant Image */}
      <div className="relative w-full h-36 rounded-lg overflow-hidden mb-3">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
          {deliveryTime || "N/A"} min
        </span>
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-gray-800 text-center mb-1">{name}</h3>

      {/* Cuisine */}
      <p className="text-gray-500 text-sm text-center mb-2">{cuisine}</p>

      {/* Price */}
      <p className="text-orange-500 font-semibold mb-2">{displayPrice}</p>

      {/* CTA / hover effect hint */}
      <p className="text-gray-400 text-xs mt-auto">Click to see menu →</p>
    </div>
  );
};

export default ResCard;
