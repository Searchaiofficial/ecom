"use client"
import React, { useState } from 'react';

export default function WarrantyRegistration() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneCountryCode: '+91',
        phoneNumber: '',
        category: '',
        purchasedFrom: '',
        invoiceFile: null,
        acceptMarketing: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log(formData);
    };

    return (
        <div className="md:px-[67px] mx-auto px-[20px] pt-[170px]">
            <h1 className="text-black text-4xl font-bold mb-12 pr-3">
                Warranty Registration Form
            </h1>
            <div className="container mx-auto p-4">
                <div className="bg-white px-10">
                    <form id="myform" noValidate onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="fullName">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Enter Full Name"
                                className="w-full p-2 border border-black rounded mt-1 h-12"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter Email ID"
                                className="w-full p-2 border border-black rounded mt-1 h-12"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <div className="flex items-center mt-2">
                                <input
                                    id="acceptMarketing"
                                    name="acceptMarketing"
                                    type="checkbox"
                                    className="mr-2"
                                    checked={formData.acceptMarketing}
                                    onChange={handleChange}
                                />
                                <label htmlFor="acceptMarketing" className="text-black">
                                    Accept to receive marketing news by email.
                                </label>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <div className="flex">
                                <select
                                    id="phoneCountryCode"
                                    name="phoneCountryCode"
                                    className="border rounded-l-lg px-3 py-2 h-12 border-black"
                                    value={formData.phoneCountryCode}
                                    onChange={handleChange}
                                >
                                    <option>+86</option>
                                    <option>+90</option>
                                    <option selected="">+91</option>
                                </select>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    placeholder="Enter Phone Number"
                                    className="w-full px-3 py-2 border rounded-r-lg border-black border-l-0"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="category">
                                Select Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="category"
                                name="category"
                                className="w-full p-2 border border-black rounded mt-1 h-12"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Select Category
                                </option>
                                <option>Accessories</option>
                                <option>Audio Devices</option>
                                <option>Beauty Products</option>
                                <option>Camera Accessories</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="purchasedFrom">
                                Purchased From <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="purchasedFrom"
                                name="purchasedFrom"
                                type="text"
                                placeholder="Enter Purchased From"
                                className="w-full p-2 border border-black rounded mt-1 h-12"
                                value={formData.purchasedFrom}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-black font-bold mb-2" htmlFor="invoiceFile">
                                Upload Invoice <span className="text-red-500">*</span>
                            </label>
                            <label htmlFor="invoiceFile" className="w-full md:w-[300px] cursor-pointer bg-white border border-black rounded-lg flex items-center justify-center px-3 py-2">
                                <img src="/icons/upload_icon.svg" alt="" className="mr-2 w-6 text-gray-400" />
                                Upload Invoice
                                <input
                                    id="invoiceFile"
                                    name="invoiceFile"
                                    type="file"
                                    className="hidden"
                                    accept=".jpg, .jpeg, .png, .pdf"
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div >
                            <button
                                type="submit"
                                className="bg-black text-white py-3 rounded-full px-8 sm:px-12 md:px-20 mt-8 w-full sm:w-auto"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
