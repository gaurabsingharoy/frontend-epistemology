import { useContext } from "react";

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
    const { cartData, toggleAddToCart } = useContext(ecommContext);
    console.log(cartData)
    const cartTotalPrice = cartData.reduce((acc, curr) => acc + curr.price, 0)
    const cartDiscountedPrice = cartData.reduce((acc, curr) => acc + curr.discountedPrice, 0)
    const totalDiscount = cartTotalPrice - cartDiscountedPrice
    const deliveryCharges = 499
    const totalAmount = cartDiscountedPrice + deliveryCharges
    return (
        <div className="">
            <Nav />
            <div className="container py-3 mb-3">
                <h1>My Cart ({cartData.length > 0 ? cartData.length : "0"})</h1>
                <div className="row">
                    <div className="col-md-6">
                        {cartData.length > 0 ? (
                            <ul className="">
                                {cartData.map((book) => (
                                    <div className="card mb-3 d-flex flex-row">
                                                <img src={book.imageUrl} className="img-fluid rounded-start" style={{ width: "30%", objectFit: "cover" }} />
                                            <div className="card-body py-3 px-3">
                                                    <span className="fs-6 fw-medium card-title">{book.title}</span>
                                                    <br />
                                                    <span className="">By {book.author}</span>
                                                    <br/>
                                                    <span className="fs-5 fw-bold text-primary">₹{book.discountedPrice}</span><span className="ms-2 text-muted text-decoration-line-through">₹{book.price}</span>
                                                    <br/>
                                                    <button className="btn btn-outline-danger w-100" onClick={() => toggleAddToCart(book.title)}>Remove from Cart</button>
                                                    <br/>
                                                    <button className="btn btn-dark w-100 disabled">Move to Wishlist</button>
                                            </div>
                                        </div>
                                ))}
                            </ul>
                        ) : (
                            <p>No item in the cart</p>
                        )}
                    </div>
                    <div className="col-md-1" ></div>
                    <div className="col-md-5 sticky-md-top" style={{ top: "7rem", height: "calc(100vh - 7rem)", overflowY: "auto" }}>
                        <div className="card justify-content-start container bg-light py-3 px-3">
                            <h2 className="fs-6 fw-bold text-dark text-uppercase mb-0 pb-3" style={{letterSpacing: ""}}>Price Details</h2>
                            <hr className="text-muted opacity-25 my-0"/>                                                       
                                <>
                                    {cartData.length > 0 ? (
                                    <>
                                    <div className="py-3 d-flex flex-column gap-3 text-dark" style={{fontSize: "1rem"}}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="fw-normal text-secondary">Price ({cartData.length} item)</span>
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
                                        <hr className="text-muted opacity-25 my-0"/>
                                        <div className="pt-3 d-flex justify-content-between align-items-center">
                                            <span className=" fw-bold text-dark text-uppercase" style={{fontSize: "1.2rem"}}>Total Amount</span>
                                            <span className=" fw-bold text-dark" style={{fontSize: "1.2rem"}}>₹{totalAmount}</span>
                                        </div>
                                        <hr className="text-muted opacity-25 mt-3 "/>
                                        <span className="text-muted" style={{fontSize: "1rem"}}>You saved ₹{totalDiscount} on this order</span>
                                        <button className="btn btn-warning w-100 mt-3 disabled">Proceed to Checkout</button>
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