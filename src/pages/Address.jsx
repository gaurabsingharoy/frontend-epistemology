import { useContext } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
//import ecommContext from "../contexts/ContextProvider";
import addressContext from "../contexts/AddressContext";

const Address = () => {
    const { initialAddress, loading, editAddress, deleteAddress, isDefaultHandler } = useContext(addressContext);

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
                    {loading ? (
                        Array.from({ length: 2 }).map((_, index) => (
                            <div className="col" key={index}>
                                <div className="card h-100 p-3 shadow-sm d-flex flex-column placeholder-glow" aria-hidden="true">
                                    <strong className="placeholder col-8 mb-2 py-2 rounded"></strong>
                                    <span className="placeholder col-10 mb-1 py-1 rounded"></span>
                                    <span className="placeholder col-9 mb-1 py-1 rounded"></span>
                                    <span className="placeholder col-6 mb-1 py-1 rounded"></span>
                                    <div className="mt-auto pt-3">
                                        <span className="placeholder col-3 py-1 rounded me-2"></span>
                                        <span className="placeholder col-3 py-1 rounded"></span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        initialAddress.map((address, index) => (
                            <div className="col" key={index}>
                                {/* FIX 1: Added d-flex flex-column to make inner layout flexible */}
                                <div className="card h-100 p-3 shadow-sm d-flex flex-column">
                                    <strong className="d-block mb-1">
                                        {address.firstName} {address.lastName}
                                    </strong>
                                    <span className="text-muted small">
                                        {address.address1},<br />
                                        {address.address2},<br />
                                        {address.city}, {address.state}<br />
                                        <strong>PIN:</strong> {address.pin}
                                    </span>

                                    {/* FIX 2: Added mt-auto and pt-3 to seamlessly push links to the bottom */}
                                    <div className="mt-auto pt-3">
                                        <Link to={`/updateAddress/${address._id}`} onClick={() => editAddress(address._id)} className="pe-1 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                            Edit
                                        </Link> <span className="pe-2">|</span>
                                        <Link onClick={() => deleteAddress(address._id)} className="pe-1 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                            Remove
                                        </Link>
                                        {address.isDefault === false ? (
                                            <>
                                                <span className="pe-2">|</span>
                                                <Link onClick={() => isDefaultHandler(address._id)} className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                                    Set as default
                                                </Link>
                                            </>
                                        ) : ("")}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Address;