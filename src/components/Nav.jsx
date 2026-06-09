import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { useContext } from "react";

import ecommContext from "../contexts/ContextProvider";

const Nav = () => {
    const {cartData} = useContext(ecommContext);
    return (
        <header className="py-2 sticky-top border-bottom bg-white" style={{ backgroundColor: "", zIndex: 1030 }}>
            <nav>
                <div className="container">
                    <div className="d-flex justify-content-start">
                        <Link className="logo" to="/">epistemology.com</Link>
                    </div>
                    <div className="d-flex justify-content-end">
                        <NavLink className="nav-link pe-3">Wishlist</NavLink>
                        <NavLink to="/cart" className="nav-link pe-3">
                            Cart <span>({cartData.length})</span>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>

    )
}

export default Nav