import { useRef } from "react";
import { Link } from "react-router-dom";
import reactLogo from "../assets/react.svg";

export default function Navbar({ hooks }) {
    const menu = useRef();
    function handleClick(e) {
        const menuItems = menu.current.childNodes;
        menuItems.forEach((item) => {
            item.childNodes[0].classList.remove("selected-nav-link");
        });
        const link = e.target;
        link.classList.add("selected-nav-link");
    }

    return (
        <>
            <Link to="/">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </Link>
            <ul className="menu" ref={menu}>
                {hooks.map((hook) => (
                    <li key={hook} className="menu-item">
                        <Link
                            to={`/${hook}`}
                            className="link"
                            onClick={handleClick}
                        >
                            {hook}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
