import { Link } from "react-router-dom"
import { useState } from "react"
import { useContext } from "react"
import Nav from "../components/Nav"
import addressContext from "../contexts/AddressContext"
import ecommContext from "../contexts/ContextProvider"

const Checkout = () => {
    const { cartData } = useContext(ecommContext)
    const { initialAddress } = useContext(addressContext)

    const deliveryAddress = initialAddress.find((item) => item.isDefault === true)
    const otherAddresses = initialAddress.filter((item) => item.isDefault === false)

    const [newDeliveryAddress, setNewDeliveryAddress] = useState(deliveryAddress)
    const [delivery, setDelivery] = useState(false)

    const totalItems = cartData.reduce((acc, curr) => acc + (curr.quantity || 1), 0)
    const cartTotalPrice = cartData.reduce((acc, curr) => acc + (curr.price * (curr.quantity || 1)), 0)
    const cartDiscountedPrice = cartData.reduce((acc, curr) => acc + (curr.discountedPrice * (curr.quantity || 1)), 0)
    const totalDiscount = cartTotalPrice - cartDiscountedPrice
    const deliveryCharges = 499
    const totalAmount = cartDiscountedPrice + deliveryCharges


    function newDeliveryAddressHandler(selectedId) {
        const toBeDelivered = initialAddress.find((item) => item.aid === selectedId)
        setNewDeliveryAddress(toBeDelivered)
    }

    function deliveryHandler(selectedId) {
        newDeliveryAddressHandler(selectedId)
        setDelivery(false)
    }

    return (
        <div>
            <Nav />
            <div className="container py-3">
                <h1 className="my-4 fw-bold">Secure Checkout</h1>
                <div className="app">
                    <h2 className="fs-5 fw-bold mb-2">Delivery Address</h2>


                    <div className="card p-3 mb-4 shadow-sm">
                        <p className="fw-semibold d-block mb-1 text-dark">
                            {newDeliveryAddress?.firstName} {newDeliveryAddress?.lastName}
                        </p>
                        <span className="text-muted small">
                            {newDeliveryAddress?.address1},{" "}
                            {newDeliveryAddress?.address2},<br />
                            {newDeliveryAddress?.city}, {newDeliveryAddress?.state}<br />
                            <strong>PIN:</strong> {newDeliveryAddress?.pin}
                        </span>
                        <div className="mt-auto pt-3">
                            <Link onClick={() => setDelivery(!delivery)} className="pe-1 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                Change Delivery Address
                            </Link>
                            {delivery === true ? (
                                <>
                                    {otherAddresses.map((item) => (
                                        <div className="card p-3 mt-4 mb-4 shadow-sm">
                                            <p className="fw-semibold d-block mb-1 text-dark">
                                                {item?.firstName} {item?.secondName}
                                            </p>
                                            <span className="text-muted small">
                                                {item?.address1},{" "}
                                                {item?.address2},<br />
                                                {item?.city}, {item?.state}<br />
                                                <strong>PIN:</strong> {item?.pin}
                                            </span>
                                            <div>
                                                <Link onClick={() => deliveryHandler(item.aid)} className="pe-1 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                                    Set for Delivery
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : ("")}
                        </div>
                    </div>

                    <h2 className="fs-5 fw-bold mb-2">Review Items</h2>
                    {cartData.map((book, index) => (

                        <div className="card mb-3 shadow-sm overflow-hidden" key={index}>
                            <div className="row g-0 align-items-center">

                                {/* Image Column: Takes up 4 out of 12 slots */}
                                <div className="col-4 col-sm-3 col-md-2">
                                    <img
                                        src={book.imageUrl}
                                        className="img-fluid w-100"
                                        alt={book.title}

                                        style={{ height: "100%", minHeight: "200px", maxHeight: "250px", objectFit: "cover" }}
                                    />
                                </div>


                                <div className="col-8 col-sm-9 col-md-10">
                                    <div className="card-body py-3">
                                        <h3 className="fs-6 fw-bold card-title mb-1 text-dark">{book.title}</h3>
                                        <p className="text-muted small mb-2">By {book.author}</p>

                                        <div className="mb-2">
                                            <span className="fs-5 fw-bold text-primary">₹{book.discountedPrice}</span>
                                            <span className="ms-2 text-muted text-decoration-line-through small">₹{book.price}</span>
                                        </div>

                                        <p className="fw-normal text-secondary small mb-3">Quantity: {book.quantity}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                    <div className="card justify-content-start container bg-light">
                        <h2 className="fw-bold text-dark text-uppercase pt-3" style={{ fontSize: "1.2rem" }}>Billing Details</h2>
                        <hr className="text-muted opacity-25 my-0" />
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
                            <button className="btn btn-primary w-100 mt-3 disabled">Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;