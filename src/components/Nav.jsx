import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { useContext } from "react";

import userIcon from "../assets/userIcon.png"

import ecommContext from "../contexts/ContextProvider";

const Nav = () => {
    const {cartData, wishlistData} = useContext(ecommContext);
    return (
        <header className="sticky-top border-bottom bg-white" style={{ zIndex: 1030 }}>
            <nav className="navbar navbar-expand-md navbar-light bg-white py-2">
                <div className="container">
                    <div>
                        <Link className="logo" to="/">epistemology.com</Link>
                    </div>
                    {/* MOBILE HAMBURGER BUTTON (Visible on small devices, hidden on md+) */}
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#mainNavbarMenu" 
                        aria-controls="mainNavbarMenu" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* COLLAPSIBLE WRAPPER */}
                    <div className="collapse navbar-collapse" id="mainNavbarMenu">
                        {/* 'ms-auto' pushes links to the right side on desktop layouts */}
                        <div className="navbar-nav ms-auto align-items-md-center pt-2 pt-md-0">
                            
                            <NavLink to="/userDetails" className="nav-link py-2 px-md-3 d-flex align-items-center">
                                <img 
                                    src={userIcon} 
                                    style={{ width: "22px", height: "22px", objectFit: "contain" }} 
                                    alt="User Icon" 
                                    className="me-2" 
                                />
                                My Account
                            </NavLink>
                            
                            <NavLink to="/wishlist" className="nav-link py-2 px-md-3">
                                Wishlist ({wishlistData.length})
                            </NavLink>
                            
                            <NavLink to="/cart" className="nav-link py-2 px-md-3">
                                Cart ({cartData.length})
                            </NavLink>

                        </div>
                    </div>
                </div>
            </nav>
        </header>

    )
}

export default Nav