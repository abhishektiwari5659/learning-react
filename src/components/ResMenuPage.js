import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import useResMenu from "../utils/useResMenu";
import { useDispatch } from "react-redux";
import { addItems } from "../utils/cartSlice";

const ResMenuPage = () => {
  const { id } = useParams();
  const { restaurant, menu, loading, error } = useResMenu(id);
  const [openCategory, setOpenCategory] = useState(null);
  const dispatch = useDispatch();

  const handleAdd = (item) => {
    dispatch(addItems(item));
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">Loading menu...</p>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-500 text-lg">{error}</p>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-20">
      <Link
        to="/"
        className="inline-block mb-4 text-orange-500 hover:underline"
      >
        ⬅ Back to restaurants
      </Link>

      {/* Restaurant header */}
      {restaurant && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{restaurant.name}</h2>
          <p className="text-gray-500 mt-1">
            {restaurant.cuisines?.join(", ")} • {restaurant.costForTwoMessage}
          </p>
          <p className="text-yellow-500 mt-1">
            ⭐ {restaurant.avgRating} ({restaurant.totalRatingsString})
          </p>
        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-800 mb-4">Menu</h3>

      {menu.length === 0 ? (
        <p className="text-gray-500 text-center">No menu items available</p>
      ) : (
        <div className="space-y-4">
          {menu.map((category, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Category Header */}
              <div
                className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
                onClick={() => setOpenCategory(openCategory === idx ? null : idx)}
              >
                <span className="font-medium text-gray-800">
                  {category.title} ({category.items.length})
                </span>
                <span className="text-gray-500">
                  {openCategory === idx ? "⬆️" : "⬇️"}
                </span>
              </div>

              {/* Items */}
              {openCategory === idx && (
                <ul className="divide-y divide-gray-200">
                  {category.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 hover:bg-gray-50 transition"
                    >
                      {/* Info */}
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">{item.name}</h5>
                        <p className="text-gray-500 mt-1">
                          ₹{(item.price || item.defaultPrice || 0) / 100}
                        </p>
                        {item.description && (
                          <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                        )}
                      </div>

                      {/* Image */}
                      {item.imageId && (
                        <img
                          src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-md mt-2 sm:mt-0 sm:ml-4"
                        />
                      )}

                      {/* Add button */}
                      <button
                        className="bg-orange-500 text-white px-3 py-1 rounded-md mt-2 sm:mt-0 sm:ml-4 hover:bg-orange-600 transition"
                        onClick={() => handleAdd(item)}
                      >
                        + Add
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResMenuPage;
