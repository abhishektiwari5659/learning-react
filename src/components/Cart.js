import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../utils/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 pt-24 ">
        <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center">
          <p className="text-4xl mb-4">🛒</p>
          <h2 className="text-2xl font-semibold text-gray-700">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mt-2 mb-4">
            Browse restaurants and add some delicious meals!
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 mt-20 pt-24 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>

      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
          >
            {item.imageId && (
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md mb-2 sm:mb-0 sm:mr-4"
              />
            )}

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-500 mt-1">
                ₹{(item.price || item.defaultPrice || 0) / 100} × {item.quantity}
              </p>
              {item.description && (
                <p className="text-gray-400 text-sm mt-1">{item.description}</p>
              )}
            </div>

            <button
              className="text-red-500 hover:text-red-700 ml-0 sm:ml-4 mt-2 sm:mt-0 text-lg"
              onClick={() => dispatch(removeItem(item.id))}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-6 border-t border-gray-200 pt-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Total: ₹
          {cartItems.reduce(
            (acc, item) =>
              acc +
              ((item.price || item.defaultPrice || 0) / 100) * item.quantity,
            0
          )}
        </h3>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
