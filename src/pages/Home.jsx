import { useContext } from "react";
import { Link } from "react-router-dom";

import Nav from "../components/Nav"
import ecommContext from "../contexts/ContextProvider";

const Home = () => {
    const { filteredBooks, cartData, category, rating, setRating, sort, setSort, handleCategoryFilter, toggleAddToCart } = useContext(ecommContext);
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
    return (
        <div className="">
            <Nav />
            <div className="container py-2">
                <div className="row">
                    <div className="col-md-3 my-4 sticky-md-top" style={{ top: "7rem", height: "calc(100vh - 7rem)", overflowY: "auto" }}>
                        <div>
                            <span className="fs-4 fw-medium">Category: </span>
                            <br />
                            <input type="checkbox" value="Business" checked={category.includes("Business")} onChange={handleCategoryFilter} /> <label>Business</label>
                            <br />
                            <input type="checkbox" value="Exam" checked={category.includes("Exam")} onChange={handleCategoryFilter} /> <label>Exams</label>
                            <br />
                            <input type="checkbox" value="Fiction" checked={category.includes("Fiction")} onChange={handleCategoryFilter} /> <label>Fiction</label>
                            <br />
                            <input type="checkbox" value="Non-Fiction" checked={category.includes("Non-Fiction")} onChange={handleCategoryFilter} /> <label>Non-Fiction</label>
                        </div>
                        <div>
                            <span className="fs-4 fw-medium">Rating: </span>
                            <br />
                            <input type="radio" value={4} name="filterByRating" checked={rating === 4} onChange={(event) => setRating(Number(event.target.value))} /> <label htmlFor="filterByRating">4 Stars & Above</label>
                            <br />
                            <input type="radio" value={3} name="filterByRating" checked={rating === 3} onChange={(event) => setRating(Number(event.target.value))} /> <label htmlFor="filterByRating">3 Stars & Above</label>
                            <br />
                            <input type="radio" value={2} name="filterByRating" checked={rating === 2} onChange={(event) => setRating(Number(event.target.value))} /> <label htmlFor="filterByRating">2 Stars & Above</label>
                            <br />
                            <input type="radio" value={1} name="filterByRating" checked={rating === 1} onChange={(event) => setRating(Number(event.target.value))} /> <label htmlFor="filterByRating">1 Star & Above</label>
                        </div>
                        <div>
                            <span className="fs-4 fw-medium">Sort By: </span>
                            <br />
                            <input type="radio" value="LOW_TO_HIGH" name="sortByPrice" checked={sort === "LOW_TO_HIGH"} onChange={(event) => setSort(event.target.value)} /> <label htmlFor="sortByPrice">Price: Low to High</label>
                            <br />
                            <input type="radio" value="HIGH_TO_LOW" name="sortByPrice" checked={sort === "HIGH_TO_LOW"} onChange={(event) => setSort(event.target.value)} /> <label htmlFor="sortByPrice">Price: High to Low</label>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            {filteredBooks.map((book) => (
                                <div className="col-md-4 mb-4 d-flex align-items-stretch">
                                    <div className="px-3 py-3 d-flex flex-column w-100">
                                        <img
                                            src={book.imageUrl}
                                            style={{ width: "100%", height: "300px", objectFit: "cover" }}
                                            className="img-fluid rounded mb-2"
                                            alt={book.title}
                                        />

                                        {/* Title and Author container */}
                                        <div className="mb-auto">
                                            <h6 className="fw-semibold mb-1">
                                                {book.title}
                                            </h6>
                                            <span className="text-muted small d-block">by {book.author}</span>
                                        </div>
                                        {/* Rating container */}
                                        <div className="mb-auto">
                                            <RatingDisplay rating={book.rating} /><span className="text-muted fs-5 ms-1">{Number(book.rating).toFixed(1)}</span><span className="text-muted small">/5</span>
                                        </div>
                                        {/* Price and Button container pushed to the bottom */}
                                        <div className="mt-auto">
                                            <div className="mb-auto">
                                                <span className="fs-4 fw-bold text-primary">₹{book.discountedPrice}</span>
                                                {" "}
                                                <span className="text-muted text-decoration-line-through small">₹{book.price}</span>
                                            </div>
                                            {cartData.some((cartBook) => cartBook.title === book.title) ? <button className="btn btn-outline-dark w-100 disabled">Added to Cart</button> : <button className="btn btn-warning w-100" onClick={() => toggleAddToCart(book.title)}>Add to Cart</button>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;