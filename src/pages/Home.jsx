import { useContext } from "react";
import { Link } from "react-router-dom";

import ecommContext from "../contexts/ContextProvider";

import library from "../assets/library.jpg"
import Nav from "../components/Nav"

const Home = () => {
    const { initialBookData, setCategory } = useContext(ecommContext);
    return (
        <div>
            <Nav />
            <div className="container py-3">
                <div className="row row-cols-2 row-cols-md-4 g-3">
                    <div className="col">
                        <Link className="btn btn-dark w-100 rounded-0 p-2" to="/productListing" style={{ fontSize: "1.05rem" }} onClick={() => setCategory(["Fiction"])}>Fiction</Link>
                    </div>
                    <div className="col">
                        <Link className="btn btn-dark w-100 rounded-0 p-2" to="/productListing" style={{ fontSize: "1.05rem" }} onClick={() => setCategory(["Business"])}>Business</Link>
                    </div>
                    <div className="col">
                        <Link className="btn btn-dark w-100 rounded-0 p-2" to="/productListing" style={{ fontSize: "1.05rem" }} onClick={() => setCategory(["Exam"])}>Exam</Link>
                    </div>
                    <div className="col">
                        <Link className="btn btn-dark w-100 rounded-0 p-2" to="/productListing" style={{ fontSize: "1.05rem" }} onClick={() => setCategory(["Non-Fiction"])}>Non-Fiction</Link>
                    </div>
                </div>
                <hr className="my-3 opacity-50" />
                <div className="my-3 d-flex align-items-center justify-content-center text-center position-relative" style={{ backgroundImage: `url(${library})`, height: "70vh", backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
                    <div className="position-relative text-white p-5">
                        <h1 className="display-4 fw-bold text-white text-opacity-50">Explore the World of Knowledge</h1>
                        <p className="lead text-white text-opacity-50">Discover curated collections of fiction, business, non-fiction, and academic exam prep.</p>
                        <Link className="btn btn-light btn-lg rounded-0 mt-3 px-4" to="/productListing" onClick={() => setCategory([])}>Shop Now</Link>
                    </div>
                </div>
                <h1 className="fs-4 my-3 fw-semibold">New Arrivals</h1>
                <hr className="opacity-50" />
                <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2">
                    {initialBookData.filter((book) => book.isNewArrival == true).map((book) => (
                        <div key={book.pid} className="col">
                            <div className="card mb-3 bg-dark text-light w-100">
                                <div className="row">
                                    <div className="">
                                        <Link to={`/book/${book.pid}`} className="text-decoration-none text-reset">
                                            <div className="px-3 py-3">
                                                <h3 className="fs-5 fw-semibold card-title mb-1 text-truncate">{book.title}</h3>
                                                <p className="mb-2 text-light">By {book.author}</p>

                                                <div className="mb-auto">
                                                    <span className="fs-5 fw-bold text-primary">₹{book.discountedPrice}</span>
                                                    <span className="ms-2 text-warning">{Math.round(((book.price - book.discountedPrice) / book.price) * 100)}% off</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;