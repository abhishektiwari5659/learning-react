
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
  }



  if (loading) return <p className="loading">Loading menu...</p>;
  if (error) return <p className="error">{error}</p>;
  
  return (
    <div className="menu-container">
      <Link to="/" className="back-link">
        ⬅ Back to restaurants
      </Link>

      {restaurant && (
        <div className="restaurant-header">
          <h2>{restaurant.name}</h2>
          <p className="cuisine-text">
            {restaurant.cuisines?.join(", ")} • {restaurant.costForTwoMessage}
          </p>
          <p className="rating-text">
            ⭐ {restaurant.avgRating} ({restaurant.totalRatingsString})
          </p>
        </div>
      )}

      <h3 className="menu-title">Menu</h3>

      {menu.length === 0 ? (
        <p>No menu items available</p>
      ) : (
        <div className="accordion">
          {menu.map((category, idx) => (
            <div key={idx} className="category">
        
              <h4
                className="category-header"
                onClick={() =>
                  setOpenCategory(openCategory === idx ? null : idx)
                }
              >
                <span>
                  {category.title} ({category.items.length})
                </span>
                <span>{openCategory === idx ? "⬆️" : "⬇️"}</span>
              </h4>

              
              {openCategory === idx && (
                <ul className="item-list">
                  {category.items.map((item) => (
                    <li key={item.id} className="menu-item">
                      <div className="item-info">
                        <h5>{item.name}</h5>
                        <p className="price">
                          ₹{(item.price || item.defaultPrice || 0) / 100}
                        </p>
                        {item.description && (
                          <p className="description">{item.description}</p>
                        )}
                      </div>

                      {item.imageId && (
                        <img
                          src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                          alt={item.name}
                          className="item-image"
                        />
                      )}

                      <button className="add-btn" onClick={() => handleAdd(item)}>+ Add</button>
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
