import { useState } from "react";
import { Link } from "react-router-dom";
export const Header = () => {
    const [btn, setBtn] = useState("login");
    return (
        <div className="header">
            <div className="logo-con">
                <img src="https://img.freepik.com/free-vector/restaurant-tasty-food-logo-design_460848-10307.jpg?t=st=1755961376~exp=1755964976~hmac=37738340958d9cfe5b74b7528a1b2b5c55b00357a641affb9e86adfab49a9a15&w=1480" alt="logo"/>
            </div>
            <div className="nav-items">
                <ul>
                    <li> <Link to={"/"}>Home</Link></li>
                    <li><Link to={"/contact"}>Contact</Link></li>
                    <li><Link to={"/about"}>About</Link></li>
                    <button onClick={
                        () => {
                            btn === "login" ?
                            setBtn("logout") :
                            setBtn("login")
                        }
                    }>{btn}</button>
                </ul>
            </div>
        </div>
    );
};

export default Header;