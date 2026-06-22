import { createContext } from "react";
import { useState } from 'react'

import useFetch from "../customHooks/useFetch";

const ecommContext = createContext();

export default ecommContext;

const initialAddress = [
    {
        aid: 1,
        firstName: "Gaurab",
        secondName: "Singha Roy",
        address1: "H.No. 35",
        address2: "Shree Sai Layout, Kanakapura Road, Basavangudi",
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
        pin: "560004",
        phone: "9192939495",
        isDefault: true
    },
    {
        aid: 2,
        firstName: "Jayesh",
        secondName: "Mathur",
        address1: "224, Hotel Centrum",
        address2: "Delhi Road, Colony",
        city: "Roorkee",
        state: "Uttarakhand",
        country: "India",
        pin: "247667",
        phone: "7172737475",
        isDefault: false
    },
    {
        aid: 3,
        firstName: "Sushmita",
        secondName: "Krishnan",
        address1: "H.No. 09",
        address2: "Green Gardens Layout, Manipa Country Road, Singasandra",
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
        pin: "560068",
        phone: "8182838485",
        isDefault: false
    }
]

export function EcommProvider({ children }) {
    const { data, loading, error } = useFetch("https://backend-epistemology.vercel.app/api/products")
    const initialBookData = data?.data?.products || [];
    const [cartData, setCartData] = useState([])
    const [address, setAddress] = useState(initialAddress)
    const [wishlistData, setWishlistData] = useState([])
    const [category, setCategory] = useState([])
    const [rating, setRating] = useState(0)
    const [sort, setSort] = useState("")
    const [maxPrice, setMaxPrice] = useState(1000)
    const [updatedAddressData, setUpdatedAddressData] = useState({})
    const [formData, setFormData] = useState({
        country: "",
        firstName: "",
        secondName: "",
        phone: "",
        pin: "",
        address1: "",
        address2: "",
        city: "",
        state: ""
    })

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

    //handles form data on change in event
    function addressHandler(event) {
        const { id, value } = event.target;
        const key = id;
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }))
    }

    //handles address edits on submission
    function editAddressHandler(event) {
        event.preventDefault();

        const editedAddress = {
            ...formData,
            aid: updatedAddressData.aid
        }

        const editedAddressData = address.map((item) => item.aid === updatedAddressData.aid ? editedAddress : item);

        setAddress(editedAddressData)
    }

    //handles form data on submit
    function addressFormHandler(event) {
        event.preventDefault();
        const existingData = address;

        const newAddressWithPid = {
            aid: existingData.length + 1,
            ...formData
        };

        const updatedData = [...existingData, newAddressWithPid];
        setAddress(updatedData)
        setFormData({
            country: "",
            firstName: "",
            secondName: "",
            phone: "",
            pin: "",
            address1: "",
            address2: "",
            city: "",
            state: ""
        })
    }

    function editAddress(addressId) {
        const addressToUpdate = address.find((address) => addressId == address.aid)
        setFormData({
            country: addressToUpdate.country,
            firstName: addressToUpdate.firstName,
            secondName: addressToUpdate.secondName,
            phone: addressToUpdate.phone,
            pin: addressToUpdate.pin,
            address1: addressToUpdate.address1,
            address2: addressToUpdate.address2,
            city: addressToUpdate.city,
            state: addressToUpdate.state
        })

        setUpdatedAddressData(addressToUpdate)
    }

    //handles address deletion
    function deleteAddress(selectedId) {
        const addressToDelete = address.filter((item) => selectedId !== item.aid);
        setAddress(addressToDelete);
    }

    //handles isDefault state of address
    function isDefaultHandler(selectedId) {
        const updatedAddressState = address.map((item) => {
            if (selectedId !== item.aid) {
                return {
                    ...item,
                    isDefault: false
                }
            } else {
                return {
                    ...item,
                    isDefault: true
                }
            }
        })

        setAddress(updatedAddressState)
    }

    return (
        <ecommContext.Provider value={{
            initialBookData,
            filteredBooks,
            loading,
            address,
            cartData,
            formData,
            wishlistData,
            category,
            rating,
            sort,
            maxPrice,
            setMaxPrice,
            setSort,
            setRating,
            setCategory,
            editAddress,
            setCartData,
            deleteAddress,
            addressHandler,
            isDefaultHandler,
            editAddressHandler,
            addressFormHandler,
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