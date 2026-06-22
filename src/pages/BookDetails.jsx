import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";

import useFetch from "../customHooks/useFetch";

import Nav from "../components/Nav"
import ecommContext from "../contexts/ContextProvider";

const BookDetails = () => {
    const { data, loading, error } = useFetch("https://backend-epistemology.vercel.app/api/products");
    const [bookQuantity, setBookQuantity] = useState(1)
    const [isClicked, setIsClicked] = useState(false);
    const { cartData, setCartData, toggleAddToCart } = useContext(ecommContext);
    const { bookId } = useParams();

    const products = data?.data?.products || [];
    const selectedBook = products.find((book) => book._id === bookId);

    useEffect(() => {
        setIsClicked(false);
    }, [bookQuantity])

    const discountPercent = (price, discountedPrice) => {
        return Math.round(((price - discountedPrice) / price) * 100);
    }

    //increament in bookQuantity
    function incrementQuantity() {
        setBookQuantity((prevQuantity) => prevQuantity + 1);
    }

    //decreament in bookQuantity
    function decrementQuantity() {
        setBookQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    }

    //handles product page cart addition and quantity update
    function productToCart(selectedItem) {
        const itemToAdd = products.find((book) => book.title === selectedItem);
        const isAlreadyInCart = cartData.some((book) => book.title === selectedItem);

        if (isAlreadyInCart) {
            const updatedCartData = cartData.map((book) => book.title === selectedItem ? { ...book, quantity: (book.quantity || 1) + bookQuantity } : book);
            setCartData(updatedCartData);
        } else {
            setCartData([...cartData, { ...itemToAdd, quantity: bookQuantity }]);
        }

    }

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
    //console.log(selectedBook);

    if (loading || !selectedBook) {
        return (
            <>
                <Nav />
                <div className="container py-3 mb-3 placeholder-glow">
                    <div className="row">
                        {/* Cover Image Placeholder */}
                        <div className="col-md-4 mb-4">
                            <div className="placeholder rounded mb-2 w-100" style={{ height: "300px" }}></div>
                            <div className="mb-auto d-flex flex-column gap-2">
                                <div className="placeholder col-12 py-3 rounded"></div>
                                <div className="placeholder col-12 py-3 rounded"></div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>

                        {/* Details Placeholder */}
                        <div className="col-md-7">
                            <div className="col-md-8 mb-3">
                                <span className="placeholder col-10 py-3"></span>
                            </div>
                            <div className="mb-3">
                                <span className="placeholder col-4 py-2"></span>
                            </div>
                            <div className="my-2 mb-3">
                                <span className="placeholder col-3 py-3"></span>
                            </div>
                            <div className="my-2 mb-4">
                                <span className="placeholder col-2 py-2"></span>
                            </div>
                            <hr />

                            {/* Badges Placeholder */}
                            <div className="row gap-2 mb-3 justify-content-start align-items-start">
                                <div className="col-auto d-flex flex-column align-items-center text-center" style={{ width: '90px' }}>
                                    <div className="placeholder rounded-circle mb-2" style={{ width: '70px', height: '70px' }}></div>
                                    <span className="placeholder col-10"></span>
                                </div>
                                <div className="col-auto d-flex flex-column align-items-center text-center" style={{ width: '90px' }}>
                                    <div className="placeholder rounded-circle mb-2" style={{ width: '70px', height: '70px' }}></div>
                                    <span className="placeholder col-8"></span>
                                </div>
                                <div className="col-auto d-flex flex-column align-items-center text-center" style={{ width: '90px' }}>
                                    <div className="placeholder rounded-circle mb-2" style={{ width: '70px', height: '70px' }}></div>
                                    <span className="placeholder col-8"></span>
                                </div>
                                <div className="col-auto d-flex flex-column align-items-center text-center" style={{ width: '90px' }}>
                                    <div className="placeholder rounded-circle mb-2" style={{ width: '70px', height: '70px' }}></div>
                                    <span className="placeholder col-8"></span>
                                </div>
                            </div>
                            <hr />
                            <p className="placeholder col-2 py-2"></p>
                            <ul>
                                <li className="placeholder col-10 mb-2"></li>
                                <li className="placeholder col-8 mb-2"></li>
                                <li className="placeholder col-9 mb-2"></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Nav />
            <div className="container py-3 mb-3">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <img src={selectedBook.imageUrl} style={{ width: "100%", height: "300px", objectFit: "cover" }} className="img-fluid rounded mb-2" />
                        <div className="mb-auto">
                            <Link to="/cart" className="btn btn-primary w-100 mb-2" onClick={() => productToCart(selectedBook.title)}>Buy Now</Link>
                            <br />
                            {isClicked === false ? (
                                <button className="btn btn-warning w-100 mb-2" onClick={() => {
                                    productToCart(selectedBook.title);
                                    setIsClicked(true);
                                }}>Add to Cart</button>
                            ) : (
                                <Link to="/cart" className="btn btn-success w-100 mb-2">Go to Cart</Link>
                            )}
                        </div>

                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-7">
                        <div className="col-md-8">
                            <h1 className="fs-4 fw-semibold">{selectedBook.title}</h1>
                        </div>
                        <div className="mb-auto">
                            <RatingDisplay rating={selectedBook.rating} /><span className="text-muted fs-5 ms-1">{Number(selectedBook.rating).toFixed(1)}</span><span className="text-muted small">/5</span>
                        </div>
                        <div className="my-2">
                            <span className="fs-3 fw-bold text-dark">₹{selectedBook.discountedPrice}</span>
                            {" "}
                            <span className="ps-2 fw-semibold text-secondary text-decoration-line-through">₹{selectedBook.price}</span>
                        </div>
                        <div className="my-2">
                            <span className="fs-4 fw-bold text-secondary">{discountPercent(selectedBook.price, selectedBook.discountedPrice)}% off</span>
                        </div>
                        <div className="mb-auto d-flex align-items-center">
                            <span className="me-2">Quantity:</span>
                            <div className="input-group mt-2" style={{ width: "100px" }}>
                                <button
                                    className="btn btn-outline-secondary px-auto py-1"
                                    type="button"
                                    onClick={decrementQuantity}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    className="form-control text-center bg-white"
                                    style={{ padding: "0" }}
                                    value={bookQuantity}
                                    readOnly
                                />
                                <button
                                    className="btn btn-outline-secondary px-auto py-1"
                                    type="button"
                                    onClick={incrementQuantity}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <hr />
                        <div className="row gap-2 mb-3 justify-content-start align-items-start">
                            {/* First Badge */}
                            <div className="col-auto d-flex flex-column align-items-center text-center" style={{ width: '90px' }}>
                                <img src="https://placehold.co/70x70/" className="rounded-circle mb-2" alt="7 Days Returnable" />
                                <span style={{ fontSize: "0.8rem", lineHeight: "1.2" }}>
                                    7 Days<br />Returnable
                                </span>
                            </div>
                            {/* Second Badge */}
                            <div className="col-auto d-flex flex-column align-items-center text-center" style={{ width: '90px' }}>
                                <img src="https://placehold.co/70x70/" className="rounded-circle mb-2" alt="Pay on Delivery" />
                                <span style={{ fontSize: "0.8rem", lineHeight: "1.2" }}>
                                    Pay on<br />Delivery
                                </span>
                            </div>

                            {/* Third Badge */}
                            <div className="col-auto d-flex flex-column align-items-center text-center" style={{ width: '90px' }}>
                                <img src="https://placehold.co/70x70/" className="rounded-circle mb-2" alt="Free Delivery" />
                                <span style={{ fontSize: "0.8rem", lineHeight: "1.2" }}>
                                    Free<br />Delivery
                                </span>
                            </div>

                            {/* Fourth Badge */}
                            <div className="col-auto d-flex flex-column align-items-center text-center" style={{ width: '90px' }}>
                                <img src="https://placehold.co/70x70/" className="rounded-circle mb-2" alt="Secure Payment" />
                                <span style={{ fontSize: "0.8rem", lineHeight: "1.2" }}>
                                    Secure<br />Payment
                                </span>
                            </div>
                        </div>
                        <hr />
                        <p className="fs-6 fw-semibold">Description</p>
                        <ul>
                            {selectedBook.description.map((list) => (
                                <li>{list}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p className="fs-6 fw-semibold">More books you may like</p>
                    {products.filter((book) => book.category?.name === selectedBook.category?.name && book._id !== selectedBook._id).map((book, index) => (
                        <div className="col-md-3 mb-4 d-flex align-items-stretch" key={book._id || index}>
                            <div className="d-flex flex-column w-100">
                                <Link to={`/book/${book._id}`} className="text-decoration-none text-reset"><img src={book.imageUrl} className="img-fluid rounded mb-2" style={{ width: "100%", height: "300px", objectFit: "cover" }} alt={book.title} /></Link>
                                <div>
                                    <Link to={`/book/${book._id}`} className="text-decoration-none text-reset"><span className="fs-6 fw-medium">{book.title}</span></Link>
                                    <br />
                                    <span className="text-muted small d-block">by {book.author}</span>
                                </div>
                                <div className="mb-auto">
                                    <RatingDisplay rating={book.rating} /><span className="text-muted fs-5 ms-1">{Number(book.rating).toFixed(1)}</span><span className="text-muted small">/5</span>
                                </div>
                                <div>

                                    <span className="fs-4 fw-bold text-primary">₹{book.discountedPrice}</span>
                                </div>
                                <div className="mt-auto">
                                    {cartData.some((cartBook) => cartBook.title === book.title) ? <button className="btn btn-outline-dark w-100 disabled">Added to Cart</button> : <button className="btn btn-warning w-100" onClick={() => toggleAddToCart(book.title)}>Add to Cart</button>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default BookDetails