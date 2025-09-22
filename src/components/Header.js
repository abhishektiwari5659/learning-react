// import { useState } from "react";
// import { Link } from "react-router-dom";
// import useStatus from "../utils/useStatus";
// import { useSelector } from "react-redux";

// export const Header = () => {
//     const onlineStatus = useStatus();
//     const [btn, setBtn] = useState("login");

//     const cartItems = useSelector((store) => store.cart.items)
//     return (
//         <div className="header">
//             <div className="logo-con">
//                 <Link to="/">
//                     <img
//                         src="https://img.freepik.com/free-vector/restaurant-tasty-food-logo-design_460848-10307.jpg?t=st=1755961376~exp=1755964976~hmac=37738340958d9cfe5b74b7528a1b2b5c55b00357a641affb9e86adfab49a9a15&w=1480"
//                         alt="logo"
//                     />
//                 </Link>
//             </div>
//             <div className="nav-items">
//                 <ul>
//                     <li>Internet connection {onlineStatus ? "✅" : "🔴"}</li>
//                     <li> <Link to={"/"}>Home</Link></li>
//                     <li><Link to={"/contact"}>Contact</Link></li>
//                     <li><Link to={"/cart"}>Cart ({cartItems.length} - items)</Link></li>
//                     <li><Link to={"/about"}>About</Link></li>
//                     <button onClick={
//                         () => {
//                             btn === "login" ?
//                                 setBtn("logout") :
//                                 setBtn("login")
//                         }
//                     }>{btn}</button>
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Header;

import { useState } from "react";
import { Link } from "react-router-dom";
import useStatus from "../utils/useStatus";
import { useSelector } from "react-redux";

export const Header = () => {
  const onlineStatus = useStatus();
  const [btn, setBtn] = useState("login");
  const [menuOpen, setMenuOpen] = useState(false);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <header className="header">
      <div className="logo-con">
        <Link to="/">
          <img
            src="https://img.freepik.com/free-vector/restaurant-tasty-food-logo-design_460848-10307.jpg"
            alt="logo"
          />
        </Link>
      </div>

      {/* Hamburger menu button */}
      <div
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav items */}
      <nav className={`nav-items ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>Internet connection {onlineStatus ? "✅" : "🔴"}</li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/cart">Cart ({cartItems.length} - items)</Link></li>
          <li><Link to="/about">About</Link></li>
          <li>
            <button
              onClick={() => setBtn(btn === "login" ? "logout" : "login")}
            >
              {btn}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
