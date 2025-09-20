import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return <h2 className="cart-empty">Your cart is empty 🛒</h2>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            {/* Product Image */}
            {item.imageId && (
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                alt={item.name}
                className="cart-item-img"
              />
            )}

            {/* Item Info */}
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="cart-item-price">
                ₹{(item.price || item.defaultPrice || 0) / 100} × {item.quantity}
              </p>
              {item.description && (
                <p className="cart-item-desc">{item.description}</p>
              )}
            </div>

            {/* Remove Button */}
            <button
              className="remove-btn"
              onClick={() => dispatch(removeItem(item.id))}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      {/* Total */}
      <h3 className="cart-total">
        Total: ₹
        {cartItems.reduce(
          (acc, item) =>
            acc +
            ((item.price || item.defaultPrice || 0) / 100) * item.quantity,
          0
        )}
      </h3>

      <button className="clear-btn" onClick={() => dispatch(clearCart())}>
        🗑️ Clear Cart
      </button>
    </div>
  );
};

export default Cart;
