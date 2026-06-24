import { createContext } from "react";
import { useState } from 'react';

import useFetch from "../customHooks/useFetch";

const addressContext = createContext();

export default addressContext;
/*
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
*/

export function AddressProvider({ children }) {
    const { data, loading, error, refetch } = useFetch("https://backend-epistemology.vercel.app/api/addresses")
    const initialAddress = data?.data?.addresses || [];
    console.log(initialAddress)
    //const [address, setAddress] = useState(initialAddress || [])
    const [updatedAddressData, setUpdatedAddressData] = useState({})
    const [formData, setFormData] = useState({
        country: "",
        firstName: "",
        lastName: "",
        phone: "",
        pin: "",
        address1: "",
        address2: "",
        city: "",
        state: ""
    })

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
    async function editAddressHandler(event, addressId) {
        event.preventDefault();
        /*
        const editedAddress = {
            ...formData,
            _id: updatedAddressData._id
        }

        const editedAddressData = address.map((item) => item._id === updatedAddressData._id ? editedAddress : item);

        setAddress(editedAddressData)
        */
        try {
            const response = await fetch(`https://backend-epistemology.vercel.app/api/address/${addressId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                throw "Failed to update address."
            }

            const data = await response.json()

            console.log("Updated address", data)

        } catch (error) {
            console.log(error);
        }

        setFormData({
            country: "",
            firstName: "",
            lastName: "",
            phone: "",
            pin: "",
            address1: "",
            address2: "",
            city: "",
            state: ""
        })
    }

    //handles form data on submit
    async function addressFormHandler(event) {
        event.preventDefault();
        /*
        const existingData = address;

        const newAddressWithPid = {
            _id: existingData.length + 1,
            ...formData,
            isDefault: false
        };

        const updatedData = [...existingData, newAddressWithPid];
        setAddress(updatedData)
        */
        try {
            const response = await fetch("https://backend-epistemology.vercel.app/api/address", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...formData, user: "6a3a7bf0aef9c2c97f85dd59" })
            });

            if (!response.ok) {
                throw "Failed to add address."
            }

            const data = await response.json()

            console.log("Added address", data)

        } catch (error) {
            console.log(error);
        }

        setFormData({
            country: "",
            firstName: "",
            lastName: "",
            phone: "",
            pin: "",
            address1: "",
            address2: "",
            city: "",
            state: ""
        })
    }

    async function editAddress(addressId) {
        const addressToUpdate = initialAddress.find((address) => addressId == address._id)
        setFormData({
            country: addressToUpdate.country,
            firstName: addressToUpdate.firstName,
            lastName: addressToUpdate.lastName,
            phone: addressToUpdate.phone,
            pin: addressToUpdate.pin,
            address1: addressToUpdate.address1,
            address2: addressToUpdate.address2,
            city: addressToUpdate.city,
            state: addressToUpdate.state
        })

        //setUpdatedAddressData(addressToUpdate)        
    }

    //handles address deletion
    async function deleteAddress(addressId) {
        //const addressToDelete = address.filter((item) => selectedId !== item._id);
        //setAddress(addressToDelete);
        try {
            const response = await fetch(
                `https://backend-epistemology.vercel.app/api/address/${addressId}`,
                { method: "DELETE" }
            )

            if (!response.ok) {
                throw "Failed to delete address"
            }

            const data = await response.json()

            if (data) {
                console.log("Address deleted", data)
                refetch()
            }

        } catch (error) {
            console.log(error);
        }
    }

    //handles isDefault state of address
    async function isDefaultHandler(selectedId) {
        try {
            const response = await fetch(`https://backend-epistemology.vercel.app/api/address/setDefault/${selectedId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                throw "Failed to set default address"
            }

            const data = await response.json()

            if (data) {
                console.log("Default address set to", data)
                refetch()
            }

        } catch (error) {
            console.log(error);
        }
        /*
        const updatedAddressState = address.map((item) => {
            if (selectedId !== item._id) {
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
        */
    }

    return (
        <addressContext.Provider value={{
            initialAddress,
            loading,
            refetch,
            formData,
            updatedAddressData,
            addressHandler,
            editAddressHandler,
            addressFormHandler,
            editAddress,
            deleteAddress,
            isDefaultHandler
        }}>
            {children}
        </addressContext.Provider>
    )

}