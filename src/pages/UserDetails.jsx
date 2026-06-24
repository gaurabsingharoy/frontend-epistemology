import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Nav from "../components/Nav"
import userIcon from "../assets/userIcon.png"

const UserDetails = () => {
    const [activeView, setActiveView] = useState("menu")
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('orders')) || []
        setOrders(storedOrders)
    }, [])

    return (
        <div>
            <Nav />
            <div className="container py-2">
                <h1 className="my-4 fw-bold">Your Account</h1>

                <div className="row g-4">
                    {/* Stacks on mobile, takes up 4 left columns on desktop */}
                    <div className="col-12 col-md-4 d-flex flex-column align-items-center align-items-md-start">
                        <div className="mb-3">
                            <img
                                src={userIcon}
                                alt="User Icon"
                                className="img-fluid rounded-circle"
                                style={{ width: "220px", height: "220px", objectFit: "cover" }}
                            />
                        </div>

                        <div className="text-center text-md-start w-100">
                            <h2 className="fs-3 fw-bold mb-0 text-dark">Archit Ranjan</h2>
                            <span className="fs-5 fw-light text-muted d-block mb-3">architranjan</span>

                            <div className="fs-6 text-dark">
                                <p className="mb-1"><strong>Email</strong>: architranjan@example.com</p>
                                <p className="mb-0"><strong>Location</strong>: Bangalore, India</p>
                            </div>
                        </div>
                    </div>

                    {/* Stacks on mobile, takes up 8 right columns on desktop */}
                    {activeView === "menu" ? (
                        <div className="col-12 col-md-8">
                            {/* 1 column on mobile and 2 side-by-side columns on medium devices and up seamlessly */}
                            <div className="row row-cols-1 row-cols-md-2 g-3">
                                <div className="col">
                                    <div
                                        className="card h-100 rounded-3 py-4 px-3 shadow-sm bg-white cursor-pointer hover-card"
                                        onClick={() => setActiveView("orders")}
                                    >
                                        <span className="fw-medium text-dark fs-5">Your Orders</span>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card rounded-3 py-4 px-3 shadow-sm bg-white cursor-pointer hover-card">
                                        <span className="fw-medium text-dark fs-5">Login & Security</span>
                                    </div>
                                </div>
                                <div className="col">
                                    <Link to="/address" className="text-decoration-none text-reset">
                                        <div className="card h-100 rounded-3 py-4 px-3 shadow-sm bg-white cursor-pointer hover-card">
                                            <span className="fw-medium text-dark fs-5">Your Addresses</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col">
                                    <div className="card h-100 rounded-3 py-4 px-3 shadow-sm bg-white cursor-pointer hover-card">
                                        <span className="fw-medium text-dark fs-5">Contact Us</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="col-12 col-md-8">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h2 className="fs-4 fw-bold mb-0 text-dark">Your Orders</h2>
                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => setActiveView("menu")}
                                >
                                    &larr; Back to Account
                                </button>
                            </div>

                            {orders.length === 0 ? (
                                <div className="card text-center p-5 shadow-sm bg-light">
                                    <div className="card-body">
                                        <p className="text-muted fs-5 mb-4">You haven't placed any orders yet.</p>
                                        <Link to="/productListing" className="btn btn-primary">
                                            Start Shopping
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="d-flex flex-column gap-4">
                                    {[...orders].reverse().map((order) => (
                                        <div key={order.id} className="card shadow-sm border rounded-3 overflow-hidden bg-white">
                                            {/* Order Header */}
                                            <div className="card-header bg-light py-3 border-bottom d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                                                <div>
                                                    <span className="text-muted small text-uppercase fw-semibold d-block" style={{ fontSize: "0.75rem" }}>Order ID</span>
                                                    <span className="font-monospace text-dark fw-bold">{order.id}</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted small text-uppercase fw-semibold d-block" style={{ fontSize: "0.75rem" }}>Date Placed</span>
                                                    <span className="text-dark fw-medium">{order.date}</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted small text-uppercase fw-semibold d-block" style={{ fontSize: "0.75rem" }}>Total Paid</span>
                                                    <span className="text-primary fw-bold fs-5">₹{order.billing?.totalAmount}</span>
                                                </div>
                                            </div>

                                            {/* Order Body */}
                                            <div className="card-body p-4">
                                                {/* Delivery Address Box */}
                                                <div className="mb-4 p-3 bg-light rounded border">
                                                    <h4 className="fs-6 fw-bold mb-2 text-dark">Shipping Address</h4>
                                                    <span className="text-muted small">
                                                        <strong>{order.deliveryAddress?.firstName} {order.deliveryAddress?.lastName}</strong>
                                                        <br />
                                                        {order.deliveryAddress?.address1}, {order.deliveryAddress?.address2},<br />
                                                        {order.deliveryAddress?.city}, {order.deliveryAddress?.state}<br />
                                                        <strong>PIN:</strong> {order.deliveryAddress?.pin} | <strong>Phone:</strong> {order.deliveryAddress?.phone}
                                                    </span>
                                                </div>

                                                {/* Items List */}
                                                <h4 className="fs-6 fw-bold mb-3 text-dark">Items Summary</h4>
                                                <div className="d-flex flex-column gap-3">
                                                    {order.items.map((item, itemIdx) => (
                                                        <div key={itemIdx} className={`d-flex gap-3 align-items-center py-2 ${itemIdx !== order.items.length - 1 ? 'border-bottom' : ''}`}>
                                                            <img
                                                                src={item.imageUrl}
                                                                alt={item.title}
                                                                className="rounded border"
                                                                style={{ width: "50px", height: "70px", objectFit: "cover" }}
                                                            />
                                                            <div className="flex-grow-1">
                                                                <h5 className="fs-6 fw-bold mb-0 text-dark">{item.title}</h5>
                                                                <span className="text-muted small">Qty: {item.quantity || 1} &bull; Price: ₹{item.discountedPrice}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserDetails;