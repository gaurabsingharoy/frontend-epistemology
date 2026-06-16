import { useContext } from "react";

import Nav from "../components/Nav"
import ecommContext from "../contexts/ContextProvider";

const Wishlist = () => {
    const { wishlistData, toggleAddToWishlist, moveItemToCart } = useContext(ecommContext);
    return (
        <>
            <Nav />
            <div className="container py-3 mb-3">
                <h1 className="my-4 fw-bold">My Wishlist ({wishlistData.length > 0 ? wishlistData.length : "0"})</h1>
                {wishlistData.length > 0 ? (
                    <div className="row">
                        {wishlistData.map((book) => (
                            <div className="col-md-3 mb-4 d-flex align-items-stretch">
                                <div className="px-3 py-3 d-flex flex-column w-100">
                                    <img src={book.imageUrl} style={{ width: "100%", height: "300px", objectFit: "cover" }} className="img-fluid rounded mb-2"/>
                                    <div className="mb-auto">
                                        <h6 className="fw-semibold mb-1">
                                            {book.title}
                                        </h6>
                                        <span className="text-muted small d-block">by {book.author}</span>
                                    </div>                                    
                                    <div className="mt-auto">
                                        <div className="mb-auto">
                                            <span className="fs-4 fw-bold text-primary">₹{book.discountedPrice}</span>
                                            {" "}
                                            <span className="text-muted text-decoration-line-through small">₹{book.price}</span>
                                        </div>
                                        
                                        <button className="btn btn-outline-danger w-100" onClick={() => toggleAddToWishlist(book.title)}>Remove from Wishlist</button>
                                        <br/>
                                        <button className="btn btn-outline-dark w-100" onClick={() => moveItemToCart(book.title)}>Move to Cart</button>
                                        
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ):(
                    <p>No item in the wishlist</p>
                )}
            </div>
        </>
    )
}

export default Wishlist;