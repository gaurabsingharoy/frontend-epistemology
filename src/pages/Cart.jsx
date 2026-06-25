import { useContext } from "react";
import { Link } from "react-router-dom";

import Nav from "../components/Nav"
import ecommContext from "../contexts/ContextProvider";

const Cart = () => {

    const RatingDisplay = ({ rating }) => {

        let stars = [];
        for (let i = 0; i < 5; i++) {
            if ((rating - i) >= 1) {
                stars.push("\u2605")
            } else if ((rating - i) > 0 && (rating - i) < 1) {
                stars.push("\u2BEA")
            } else {
                stars.push("\u2606")
            }
        }
        return <span>{stars.join("")}</span>
    }
    const { cartData, toggleAddToCart, moveItemToWishlist, updateCartItemQuantity } = useContext(ecommContext);
    console.log(cartData)
    const totalItems = cartData.reduce((acc, curr) => acc + (curr.quantity || 1), 0)
    const cartTotalPrice = cartData.reduce((acc, curr) => acc + (curr.price * (curr.quantity || 1)), 0)
    const cartDiscountedPrice = cartData.reduce((acc, curr) => acc + (curr.discountedPrice * (curr.quantity || 1)), 0)
    const totalDiscount = cartTotalPrice - cartDiscountedPrice
    const deliveryCharges = 499
    const totalAmount = cartDiscountedPrice + deliveryCharges
    return (
        <div className="">
            <Nav />
            <div className="container py-3 mb-3">
                <h1 className="my-3 fs-4 fw-medium text-center">{cartData.length > 0 ? `Cart Items (${cartData.length})` : `Your Cart is empty`}</h1>
                <hr className="text-dark border-1" />
                <div className="row">
                    <div className="col-md-6">
                        {cartData.length > 0 ? (
                            <>
                                {cartData.map((book) => (
                                    <div className="card mb-3 d-flex flex-row" style={{ height: "" }}>
                                        <img src={book.imageUrl} className="img-fluid rounded-start" style={{ width: "35%", objectFit: "cover" }} />
                                        <div className="card-body py-3">
                                            <span className="fs-6 fw-medium card-title">{book.title}</span>
                                            <br />
                                            <span className="">By {book.author}</span>
                                            <br />
                                            <span className="fs-5 fw-bold text-primary">₹{book.discountedPrice}</span>
                                            <span className="ms-2 text-muted text-decoration-line-through">₹{book.price}</span>
                                            <br />

                                            <div className="d-flex align-items-center mb-auto">
                                                <span className="fw-normal text-secondary me-1">Quantity:</span>
                                                <div className="input-group mt-2" style={{ width: "100px" }}>
                                                    <button
                                                        className="btn btn-outline-secondary py-1 px-auto"
                                                        onClick={() => updateCartItemQuantity(book.title, "decrement")}
                                                        disabled={(book.quantity || 1) <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        className="form-control text-center bg-white"
                                                        style={{ padding: "0" }}
                                                        value={book.quantity || 1}
                                                        readOnly
                                                    />
                                                    <button
                                                        className="btn btn-outline-secondary py-1 px-auto"
                                                        onClick={() => updateCartItemQuantity(book.title, "increment")}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            <br />
                                            <button className="btn btn-outline-danger w-100 mt-2" onClick={() => toggleAddToCart(book.title)}>Remove from Cart</button>
                                            <br />
                                            <button className="btn btn-dark w-100" onClick={() => moveItemToWishlist(book.title)}>Move to Wishlist</button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p>No item in the cart</p>
                        )}
                    </div>
                    <div className="col-md-1" ></div>
                    <div className="col-md-5 sticky-md-top" style={{ top: "7rem", height: "calc(100vh - 7rem)", overflowY: "auto" }}>
                        <div className="card justify-content-start container bg-light py-3 px-3">
                            <h2 className="fs-6 fw-bold text-dark text-uppercase mb-0 pb-3" style={{ letterSpacing: "" }}>Price Details</h2>
                            <hr className="text-muted opacity-25 my-0" />
                            <>
                                {cartData.length > 0 ? (
                                    <>
                                        <div className="py-3 d-flex flex-column gap-3 text-dark" style={{ fontSize: "1rem" }}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="fw-normal text-secondary">Price ({totalItems} item)</span>
                                                <span className="fw-normal">₹{cartTotalPrice}</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="fw-normal text-secondary">Discount</span>
                                                <span className="fw-normal text-dark">- ₹{totalDiscount}</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="fw-normal text-secondary">Delivery Charges</span>
                                                <span className="fw-normal">₹{deliveryCharges}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <hr className="text-muted opacity-25 my-0" />
                                            <div className="pt-3 d-flex justify-content-between align-items-center">
                                                <span className=" fw-bold text-dark text-uppercase" style={{ fontSize: "1.2rem" }}>Total Amount</span>
                                                <span className=" fw-bold text-dark" style={{ fontSize: "1.2rem" }}>₹{totalAmount}</span>
                                            </div>
                                            <hr className="text-muted opacity-25 mt-3 " />
                                            <span className="text-muted" style={{ fontSize: "1rem" }}>You saved ₹{totalDiscount} on this order</span>
                                            <Link to="/checkout" className="btn btn-warning w-100 mt-3">Proceed to Checkout</Link>
                                        </div>
                                    </>
                                ) : (
                                    <p>Add items to your cart</p>
                                )}
                            </>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;