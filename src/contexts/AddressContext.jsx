import { createContext } from "react";
import { useState } from 'react';

import useFetch from "../customHooks/useFetch";

const addressContext = createContext();

export default addressContext;

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

export function AddressProvider({ children }) {
    //const { data, loading, error } = useFetch("https://backend-epistemology.vercel.app/api/addresses")
    //const initialAddress = data?.data?.addresses || [];
    const [address, setAddress] = useState(initialAddress)
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
            ...formData,
            isDefault: false
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
        <addressContext.Provider value={{
            address,
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