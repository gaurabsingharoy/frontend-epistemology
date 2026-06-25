import { useState } from "react"
import { useContext } from "react"
import { Link } from "react-router-dom";

import Nav from "../components/Nav";
import addressContext from "../contexts/AddressContext";

const AddAddress = () => {
    const { initialAddress, formData, refetch, addressHandler, addressFormHandler } = useContext(addressContext)
    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleSubmit = (event) => {
        addressFormHandler(event);
        setFormSubmitted(true);
        window.scrollTo(0, 0);
    };

    const handleChange = (event) => {
        addressHandler(event);
        setFormSubmitted(false);
    };

    return (
        <div>
            <Nav />
            <div className="container py-2">
                <div className="app">
                    <form onSubmit={handleSubmit}>
                        <h1 className="my-4 fw-bold">Add a new address</h1>
                        {formSubmitted && (
                            <div className="alert alert-success">Address added successfully! <span>&mdash;</span> <Link to="/address" onClick={refetch}>See addresses page</Link></div>
                        )}
                        <label htmlFor="country" className="form-label">
                            Country/Region:{" "}
                        </label>
                        <input
                            id="country"
                            type="text"
                            placeholder="Enter Country name..."
                            value={formData.country}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                        <label htmlFor="firstName" className="form-label">
                            First Name{" "}
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder="Enter first name..."
                            value={formData.firstName}
                            onChange={handleChange}
                            className="form-control"
                            pattern="[^\s]+"
                            title="First name cannot contain spaces"
                            required
                        />
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input id="lastName" type="text" className="form-control" placeholder="Enter last name..." value={formData.lastName} onChange={handleChange} required />
                        <label htmlFor="phone">Phone Number</label>
                        <input id="phone" type="tel" value={formData.phone} onChange={handleChange} className="form-control" placeholder="e.g. 9192939495" pattern="\d{10}" maxLength={10} minLength={10} title="Please enter exactly 10 digits." required />
                        <label htmlFor="pin" >Pincode</label>
                        <input id="pin" type="text" value={formData.pin} onChange={handleChange} className="form-control" placeholder="e.g. 110001" pattern="\d{6}" minLength={6} maxLength={6} title="Please enter exactly 6 digits pincode." required />
                        <label htmlFor="address1">House No., Flat, Building</label>
                        <input id="address1" type="text" value={formData.address1} onChange={handleChange} className="form-control" placeholder="Enter your address..." required />
                        <label htmlFor="address2">Area, Street, Sector, Village</label>
                        <input id="address2" type="text" value={formData.address2} onChange={handleChange} className="form-control" placeholder="Enter your address..." />
                        <label htmlFor="city">Town/City</label>
                        <input id="city" type="text" value={formData.city} onChange={handleChange} className="form-control" placeholder="Enter your city..." required />
                        <label htmlFor="state">State</label>
                        <input id="state" type="text" value={formData.state} onChange={handleChange} className="form-control" placeholder="Enter your state..." required />
                        <div className="d-grid gap-1 d-md-block">
                            <button type="submit" className="btn btn-warning">
                                Submit
                            </button>
                        </div>
                    </form>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAddress;