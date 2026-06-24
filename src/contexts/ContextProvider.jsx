import { createContext } from "react";
import { useState, useEffect } from 'react'

import useFetch from "../customHooks/useFetch";

const ecommContext = createContext();

export default ecommContext;

export function EcommProvider({ children }) {
    const { data, loading, error } = useFetch("https://backend-epistemology.vercel.app/api/products")
    const initialBookData = data?.data?.products || [];
    const [cartData, setCartData] = useState(() => {
        const localCart = localStorage.getItem("cartData")
        return localCart ? JSON.parse(localCart) : []
    })
    const [wishlistData, setWishlistData] = useState(() => {
        const localWishlist = localStorage.getItem("wishlistData")
        return localWishlist ? JSON.parse(localWishlist) : []
    })

    useEffect(() => {
        localStorage.setItem("cartData", JSON.stringify(cartData))
    }, [cartData])

    useEffect(() => {
        localStorage.setItem("wishlistData", JSON.stringify(wishlistData))
    }, [wishlistData])

    const [category, setCategory] = useState([])
    const [rating, setRating] = useState(0)
    const [sort, setSort] = useState("")
    const [maxPrice, setMaxPrice] = useState(1000)

    let filteredBooks = [...initialBookData];

    //category filter if active
    if (category.length > 0) {
        filteredBooks = filteredBooks.filter((book) => category.includes(book.category.name));
    }

    //price filter
    filteredBooks = filteredBooks.filter((book) => book.discountedPrice <= maxPrice);

    //rating filter if active
    if (rating > 0) {
        filteredBooks = filteredBooks.filter((book) => Number(book.rating) >= rating);
    }

    //sort filter if active
    if (sort === "LOW_TO_HIGH") {
        filteredBooks.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sort === "HIGH_TO_LOW") {
        filteredBooks.sort((a, b) => b.discountedPrice - a.discountedPrice);
    }

    //handles changing the filter arrays
    function handleCategoryFilter(event) {
        const value = event.target.value
        const isChecked = event.target.checked
        if (isChecked) {
            setCategory([...category, value])
        } else {
            setCategory(category.filter((item) => item !== value))
        }
    }

    //handles cart
    function toggleAddToCart(selectedItem) {
        // Check if the item is already in the cart
        const isAlreadyInCart = cartData.some((book) => book.title === selectedItem);

        if (isAlreadyInCart) {
            // Remove it from the cart
            setCartData(cartData.filter((book) => book.title !== selectedItem));
        } else {
            // Find the item from your source data and add it
            const itemToAdd = initialBookData.find((book) => book.title === selectedItem);
            if (itemToAdd) {
                setCartData([...cartData, { ...itemToAdd, quantity: 1 }]);
            }
        }
    }



    //handles wishlist
    function toggleAddToWishlist(selectedItem) {
        // Check if the item is already in the wishlist
        const isAlreadyInWishlist = wishlistData.some((book) => book.title === selectedItem);

        if (isAlreadyInWishlist) {
            // Remove it from the wishlist
            setWishlistData(wishlistData.filter((book) => book.title !== selectedItem));
        } else {
            // Find the item from your source data and add it
            const itemToAdd = initialBookData.find((book) => book.title === selectedItem);
            if (itemToAdd) {
                setWishlistData([...wishlistData, { ...itemToAdd, quantity: 1 }]);
            }
        }
    }

    //handles wishlist and cart when moving items to cart
    function moveItemToCart(selectedItem) {
        const itemToMove = wishlistData.find((book) => book.title === selectedItem);
        const isAlreadyInCart = cartData.some((book) => book.title === selectedItem);

        if (!isAlreadyInCart) {
            setCartData([...cartData, { ...itemToMove, quantity: 1 }]);
        } else {
            const updatedCartData = cartData.map((book) => book.title === selectedItem ? { ...book, quantity: (book.quantity || 1) + 1 } : book);
            setCartData(updatedCartData);
        }

        setWishlistData(wishlistData.filter((book) => book.title !== selectedItem));
    }

    //handles wishlist and cart when moving items to wishlist
    function moveItemToWishlist(selectedItem) {
        const itemToMove = cartData.find((book) => book.title === selectedItem);
        const isAlreadyInWishlist = wishlistData.some((book) => book.title === selectedItem);

        if (!isAlreadyInWishlist) {
            setWishlistData([...wishlistData, { ...itemToMove, quantity: 1 }]);
            setCartData(cartData.filter((book) => book.title !== selectedItem));
        } else {
            setCartData(cartData.filter((book) => book.title !== selectedItem));
        }
    }

    return (
        <ecommContext.Provider value={{
            initialBookData,
            filteredBooks,
            loading,
            cartData,
            wishlistData,
            category,
            rating,
            sort,
            maxPrice,
            setMaxPrice,
            setSort,
            setRating,
            setCategory,
            setCartData,
            handleCategoryFilter,
            toggleAddToCart,
            toggleAddToWishlist,
            moveItemToCart,
            moveItemToWishlist
        }}>
            {children}
        </ecommContext.Provider>
    )
}