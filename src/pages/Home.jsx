import { useContext } from "react";
import { Link } from "react-router-dom";

import Nav from "../components/Nav"
import ecommContext from "../contexts/ContextProvider";

// Helper Filter Component
const FilterContent = ({ groupSuffix, category, rating, setRating, sort, setSort, handleCategoryFilter, setCategory }) => {
    function handleClearFilters() {
        setRating(0);
        setSort("");
        setCategory([]);
    }
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fw-medium">Filters</span>
                <Link className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" onClick={handleClearFilters}>Clear</Link>
            </div>
            <div className="mb-2">
                <p className="fs-5 fw-medium">Category:</p>
                <input type="checkbox" id={`category-Business-${groupSuffix}`} value="Business" checked={category.includes("Business")} onChange={handleCategoryFilter} /> <label className="ms-1" htmlFor={`category-Business-${groupSuffix}`}>Business</label>
                <br />
                <input type="checkbox" id={`category-Exam-${groupSuffix}`} value="Exam" checked={category.includes("Exam")} onChange={handleCategoryFilter} /> <label className="ms-1" htmlFor={`category-Exam-${groupSuffix}`}>Exams</label>
                <br />
                <input type="checkbox" id={`category-Fiction-${groupSuffix}`} value="Fiction" checked={category.includes("Fiction")} onChange={handleCategoryFilter} /> <label className="ms-1" htmlFor={`category-Fiction-${groupSuffix}`}>Fiction</label>
                <br />
                <input type="checkbox" id={`category-NonFiction-${groupSuffix}`} value="Non-Fiction" checked={category.includes("Non-Fiction")} onChange={handleCategoryFilter} /> <label className="ms-1" htmlFor={`category-NonFiction-${groupSuffix}`}>Non-Fiction</label>
            </div>
            <div className="mb-2">
                <p className="fs-5 fw-medium">Rating: </p>
                <input type="radio" id={`rating-4-${groupSuffix}`} value={4} name={`filterByRating-${groupSuffix}`} checked={rating == 4} onChange={(event) => setRating(Number(event.target.value))} /> <label className="ms-1" htmlFor={`rating-4-${groupSuffix}`}>4 Stars & Above</label>
                <br />
                <input type="radio" id={`rating-3-${groupSuffix}`} value={3} name={`filterByRating-${groupSuffix}`} checked={rating == 3} onChange={(event) => setRating(Number(event.target.value))} /> <label className="ms-1" htmlFor={`rating-3-${groupSuffix}`}>3 Stars & Above</label>
                <br />
                <input type="radio" id={`rating-2-${groupSuffix}`} value={2} name={`filterByRating-${groupSuffix}`} checked={rating == 2} onChange={(event) => setRating(Number(event.target.value))} /> <label className="ms-1" htmlFor={`rating-2-${groupSuffix}`}>2 Stars & Above</label>
                <br />
                <input type="radio" id={`rating-1-${groupSuffix}`} value={1} name={`filterByRating-${groupSuffix}`} checked={rating == 1} onChange={(event) => setRating(Number(event.target.value))} /> <label className="ms-1" htmlFor={`rating-1-${groupSuffix}`}>1 Star & Above</label>
            </div>
            <div className="mb-2">
                <p className="fs-5 fw-medium">Sort By: </p>
                <input type="radio" id={`sort-lowToHigh-${groupSuffix}`} value="LOW_TO_HIGH" name={`sortByPrice-${groupSuffix}`} checked={sort === "LOW_TO_HIGH"} onChange={(event) => setSort(event.target.value)} /> <label className="ms-1" htmlFor={`sort-lowToHigh-${groupSuffix}`}>Price: Low to High</label>
                <br />
                <input type="radio" id={`sort-highToLow-${groupSuffix}`} value="HIGH_TO_LOW" name={`sortByPrice-${groupSuffix}`} checked={sort === "HIGH_TO_LOW"} onChange={(event) => setSort(event.target.value)} /> <label className="ms-1" htmlFor={`sort-highToLow-${groupSuffix}`}>Price: High to Low</label>
            </div>
        </>
    )
};

const Home = () => {
    const { filteredBooks, setCategory, cartData, wishlistData, category, rating, setRating, sort, setSort, handleCategoryFilter, toggleAddToCart, toggleAddToWishlist } = useContext(ecommContext);

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
        <div>
            <Nav />
            <div className="container py-2">
                <div className="row">

                    {/* 1. MOBILE ONLY: Filter Toggle Button */}
                    <div className="col-12 d-block d-md-none my-2">
                        <button
                            className="btn btn-outline-dark w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#mobileFilterDrawer"
                            aria-controls="mobileFilterDrawer"
                        >
                            <span className="fs-5">&#9783;</span> Filters & Sorting
                        </button>
                    </div>

                    {/* 2. MOBILE ONLY: Sliding Offcanvas */}
                    <div
                        className="offcanvas offcanvas-start d-md-none"
                        tabIndex="-1"
                        id="mobileFilterDrawer"
                        aria-labelledby="mobileFilterDrawerLabel"
                    >
                        <div className="offcanvas-header border-bottom">
                            <h5 className="offcanvas-title fw-bold" id="mobileFilterDrawerLabel">Sort & Filter Books</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body p-4">
                            <FilterContent
                                groupSuffix="mobile"
                                category={category} rating={rating} setRating={setRating} setCategory={setCategory}
                                sort={sort} setSort={setSort} handleCategoryFilter={handleCategoryFilter}
                            />
                        </div>
                    </div>

                    {/* 3. DESKTOP ONLY: Sticky Sidebar Panel */}
                    <div className="col-md-3 my-4 sticky-md-top d-none d-md-block pe-3" style={{ top: "7rem", height: "calc(100vh - 7rem)", overflowY: "auto" }}>
                        <FilterContent
                            groupSuffix="desktop"
                            category={category} rating={rating} setRating={setRating} setCategory={setCategory}
                            sort={sort} setSort={setSort} handleCategoryFilter={handleCategoryFilter}
                        />
                    </div>

                    {/* 4. Product Listings */}
                    <div className="col-12 col-md-9">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {filteredBooks.map((book, index) => (
                                <div className="col mb-4 d-flex align-items-stretch" key={book.pid || index}>
                                    <div className="px-1 py-3 d-flex flex-column w-100 card p-2 border-0">
                                        <Link to={`/book/${book.pid}`}>
                                            <img
                                                src={book.imageUrl}
                                                style={{ width: "100%", height: "300px", objectFit: "cover" }}
                                                className="img-fluid rounded mb-2"
                                                alt={book.title}
                                            />
                                        </Link>

                                        {/* Title and Author container */}
                                        <div className="mb-2">
                                            <Link to={`/book/${book.pid}`} className="text-decoration-none text-reset">
                                                <h6 className="fw-semibold mb-1 text-truncate">
                                                    {book.title}
                                                </h6>
                                            </Link>
                                            <span className="text-muted small d-block">by {book.author}</span>
                                        </div>

                                        {/* Rating container */}
                                        <div className="mb-3">
                                            <span className="text-warning"><RatingDisplay rating={book.rating} /></span>
                                            <span className="text-muted fs-6 ms-1 fw-medium">{Number(book.rating).toFixed(1)}</span>
                                            <span className="text-muted small">/5</span>
                                        </div>

                                        {/* Price and Button container pushed to the bottom */}
                                        <div className="mt-auto">
                                            <div className="mb-2">
                                                <span className="fs-4 fw-bold text-primary">₹{book.discountedPrice}</span>
                                                {" "}
                                                <span className="text-muted text-decoration-line-through small">₹{book.price}</span>
                                            </div>

                                            {/* Action Buttons with added vertical padding gaps */}
                                            <div className="d-flex flex-column gap-2">
                                                {cartData.some((cartBook) => cartBook.title === book.title) ? (
                                                    <button className="btn btn-sm btn-outline-dark disabled">Added to Cart</button>
                                                ) : (
                                                    <button className="btn btn-sm btn-warning fw-medium" onClick={() => toggleAddToCart(book.title)}>Add to Cart</button>
                                                )}

                                                {wishlistData.some((wishlistBook) => wishlistBook.title === book.title) ? (
                                                    <button className="btn btn-sm btn-outline-dark disabled">Saved in Wishlist</button>
                                                ) : (
                                                    <button className="btn btn-sm btn-dark" onClick={() => toggleAddToWishlist(book.title)}>Save to Wishlist</button>
                                                )}
                                            </div>
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