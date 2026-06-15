import { useContext } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import ecommContext from "../contexts/ContextProvider";

const Address = () => {
    const { address, editAddress, deleteAddress } = useContext(ecommContext);

    return (
        <div>
            <Nav />
            <div className="container py-3">
                {/* Responsive grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                    {/* Add New Address Card */}
                    <div className="col">
                        <Link to="/addAddress" className="text-decoration-none text-reset">
                            <div className="card h-100 border-dashed d-flex align-items-center justify-content-center text-center p-4 bg-light cursor-pointer">
                                <div className="text-muted">
                                    <span className="fs-3 d-block">+</span>
                                    <span className="fw-medium">Add New Address</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Dynamic Address Cards */}
                    {address.map((address, index) => (
                        <div className="col" key={index}>
                            {/* FIX 1: Added d-flex flex-column to make inner layout flexible */}
                            <div className="card h-100 p-3 shadow-sm d-flex flex-column">
                                <strong className="d-block mb-1">
                                    {address.firstName} {address.secondName}
                                </strong>
                                <span className="text-muted small">
                                    {address.address1},<br />
                                    {address.address2},<br />
                                    {address.city}, {address.state}<br />
                                    <strong>PIN:</strong> {address.pin}
                                </span>

                                {/* FIX 2: Added mt-auto and pt-3 to seamlessly push links to the bottom */}
                                <div className="mt-auto pt-3">
                                    <Link to="/updateAddress" onClick={() => editAddress(address.aid)} className="pe-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                        Edit
                                    </Link>
                                    <Link to="#" onClick={() => deleteAddress(address.aid)} className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                        Remove
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Address;