import {Link} from "react-router-dom"

import Nav from "../components/Nav"
import userIcon from "../assets/userIcon.png"

const UserDetails = () => {
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
                    <div className="col-12 col-md-8">
                        {/* 1 column on mobile and 2 side-by-side columns on medium devices and up seamlessly */}
                        <div className="row row-cols-1 row-cols-md-2 g-3">
                            <div className="col">
                                <div className="card h-100 rounded-3 py-4 px-3 shadow-sm bg-white cursor-pointer hover-card">
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
                </div>
            </div>
        </div>
    )
}

export default UserDetails;