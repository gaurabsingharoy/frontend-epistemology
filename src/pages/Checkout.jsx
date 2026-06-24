import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Nav from "../components/Nav"
import addressContext from "../contexts/AddressContext"
import ecommContext from "../contexts/ContextProvider"

const Checkout = () => {
    const { cartData, setCartData } = useContext(ecommContext)
    const { initialAddress } = useContext(addressContext)

    const deliveryAddress = initialAddress.find((item) => item.isDefault === true)
    const otherAddresses = initialAddress.filter((item) => item.isDefault === false)

    const [newDeliveryAddress, setNewDeliveryAddress] = useState(deliveryAddress)
    const [delivery, setDelivery] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (!newDeliveryAddress && initialAddress.length > 0) {
            const defaultAddress = initialAddress.find((item) => item.isDefault === true) || initialAddress[0];
            setNewDeliveryAddress(defaultAddress)
        }
    }, [initialAddress, newDeliveryAddress])

    const totalItems = cartData.reduce((acc, curr) => acc + (curr.quantity || 1), 0)
    const cartTotalPrice = cartData.reduce((acc, curr) => acc + (curr.price * (curr.quantity || 1)), 0)
    const cartDiscountedPrice = cartData.reduce((acc, curr) => acc + (curr.discountedPrice * (curr.quantity || 1)), 0)
    const totalDiscount = cartTotalPrice - cartDiscountedPrice
    const deliveryCharges = 499
    const totalAmount = cartDiscountedPrice + deliveryCharges

    const isPlaceOrderDisabled = cartData.length === 0 || !newDeliveryAddress

    function handlePlaceOrder() {
        setShowModal(true)
    }

    function handleContinueShopping() {
        const orderId = "ORD-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
        const orderDate = new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const newOrder = {
            id: orderId,
            items: cartData,
            billing: {
                totalItems,
                cartTotalPrice,
                cartDiscountedPrice,
                totalDiscount,
                deliveryCharges,
                totalAmount
            },
            deliveryAddress: newDeliveryAddress,
            date: orderDate
        };

        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

        setCartData([])
        setShowModal(false)
    }


    function newDeliveryAddressHandler(selectedId) {
        const toBeDelivered = initialAddress.find((item) => item._id === selectedId)
        setNewDeliveryAddress(toBeDelivered)
    }

    function deliveryHandler(selectedId) {
        newDeliveryAddressHandler(selectedId)
        setDelivery(false)
    }

    return (
        <div>
            <Nav />
            <div className="app">
                <h1 className="fs-5 fw-bold text-center">Secure Checkout</h1>
                <hr className="w-100 border-1 text-dark" />
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
                                            {item?.firstName} {item?.lastName}
                                        </p>
                                        <span className="text-muted small">
                                            {item?.address1},{" "}
                                            {item?.address2},<br />
                                            {item?.city}, {item?.state}<br />
                                            <strong>PIN:</strong> {item?.pin}
                                        </span>
                                        <div>
                                            <Link onClick={() => deliveryHandler(item._id)} className="pe-1 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
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
                        <button
                            className="btn btn-primary w-100 mt-3"
                            onClick={handlePlaceOrder}
                            disabled={isPlaceOrderDisabled}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>


            {/* Order Success Modal */}
            {showModal && (
                <>
                    <div className="modal fade show" tabIndex="-1" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content border-0 shadow-lg p-2">
                                <div className="modal-header border-0 pb-0 justify-content-center">
                                    <h5 className="modal-title fw-bold fs-4 text-success text-center"> Order Placed Successfully!</h5>
                                </div>
                                <div className="modal-body text-center py-4">
                                    <p className="fs-6 mb-3 text-secondary">Thank you for your purchase. Your order has been placed successfully and will be delivered to:</p>
                                    <div className="bg-light p-3 rounded mb-3 text-start border">
                                        <strong className="d-block mb-1 text-dark">{newDeliveryAddress?.firstName} {newDeliveryAddress?.lastName}</strong>
                                        <span className="text-muted small">
                                            {newDeliveryAddress?.address1}, {newDeliveryAddress?.address2},<br />
                                            {newDeliveryAddress?.city}, {newDeliveryAddress?.state}<br />
                                            <strong>PIN:</strong> {newDeliveryAddress?.pin}
                                        </span>
                                    </div>
                                    <p className="fw-bold mb-0 text-primary fs-5">Total Amount Paid: ₹{totalAmount}</p>
                                </div>
                                <div className="modal-footer border-0 pt-0 justify-content-center">
                                    <Link
                                        to="/productListing"
                                        onClick={handleContinueShopping}
                                        className="btn btn-primary px-4 py-2 fw-medium w-100"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}
        </div>
    )
}

export default Checkout;