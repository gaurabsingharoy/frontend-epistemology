import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { useContext } from "react";

import ecommContext from "../contexts/ContextProvider";

const Nav = () => {
    const {cartData, wishlistData} = useContext(ecommContext);
    return (
        <header className="py-2 sticky-top border-bottom bg-white" style={{ backgroundColor: "", zIndex: 1030 }}>
            <nav>
                <div className="container d-flex justify-content-between align-items-center py-1">
                    <div>
                        <Link className="logo" to="/">epistemology.com</Link>
                    </div>
                    <div className="d-flex align-items-center">
                        <NavLink to="/wishlist" className="nav-link pe-3">Wishlist({wishlistData.length})</NavLink>
                        <NavLink to="/cart" className="nav-link pe-3">
                            Cart({cartData.length})
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>

    )
}

export default Nav