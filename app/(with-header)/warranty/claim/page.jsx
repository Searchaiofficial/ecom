"use client"
import React, { useState } from 'react';

export default function WarrantyClaim() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        fullAddress: '',
        apartment: '',
        city: '',
        country: '',
        state: '',
        pincode: '',
        email: '',
        phoneNumber: '',
        purchasedFrom: '',
        issue: '',
        reason: '',
        damageProductImages: [],
        invoice: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
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
            <h2 className="text-black text-2xl font-semibold mb-12 mt[20px] pr-3">
                Warranty Claim Form
            </h2>
            <div className="container mx-auto p-4">
                <div className="bg-white px-10">
                    <form id="myform" noValidate onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="firstName">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="Enter First Name"
                                className="w-full p-2 border border-black rounded mt-1 h-12 px-4"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="lastName">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Enter Last Name"
                                className="w-full p-2 border border-black rounded mt-1 h-12 px-4"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="company">
                                Company
                            </label>
                            <input
                                id="company"
                                name="company"
                                type="text"
                                placeholder="Enter Company Name"
                                className="w-full p-2 border border-black rounded mt-1 h-12 px-4"
                                value={formData.company}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="fullAddress">
                                Full Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="fullAddress"
                                name="fullAddress"
                                type="text"
                                placeholder="Enter Full Address"
                                className="w-full p-2 border border-black rounded mt-1 h-12 px-4"
                                value={formData.fullAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="apartment">
                                Apartment, suite, etc.
                            </label>
                            <input
                                id="apartment"
                                name="apartment"
                                type="text"
                                placeholder="Enter Apartment, suite, etc."
                                className="w-full p-2 border border-black rounded mt-1 h-12 px-4"
                                value={formData.apartment}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="city">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="city"
                                name="city"
                                type="text"
                                placeholder="Enter City"
                                className="w-full p-2 border border-black rounded mt-1 h-12 px-4"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="country">
                                Country/Region <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="country"
                                name="country"
                                className="w-full p-2 border border-black rounded mt-1 h-12 px-4"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Select Country/Region
                                </option>
                                {/* Add country options here */}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="state">
                                State
                            </label>
                            <input
                                id="state"
                                name="state"
                                type="text"
                                placeholder="Enter State"
                                className="w-full p-2 border border-black rounded mt-1 h-12 px-4"
                                value={formData.state}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="pincode">
                                Pincode <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="pincode"
                                name="pincode"
                                type="text"
                                placeholder="Enter Pincode"
                                className="w-full p-2 border border-black rounded mt-1 h-12 px-4"
                                value={formData.pincode}
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
                                className="w-full p-2 border border-black rounded mt-1 h-12 px-4"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                placeholder="Enter Phone Number"
                                className="w-full p-2 border border-black rounded mt-1 h-12 px-4"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="purchasedFrom">
                                Purchased From <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="purchasedFrom"
                                name="purchasedFrom"
                                className="w-full p-2 border border-black rounded mt-1 h-12 px-4"
                                value={formData.purchasedFrom}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Select Purchased From
                                </option>
                                {/* Add purchased from options here */}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="issue">
                                Issue <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="issue"
                                name="issue"
                                placeholder="Describe the issue"
                                className="w-full p-2 border border-black rounded mt-1 px-4"
                                value={formData.issue}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="reason">
                                Enter a Reason <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="reason"
                                name="reason"
                                placeholder="Enter your reason"
                                className="w-full p-2 border border-black rounded mt-1 px-4"
                                value={formData.reason}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-black font-bold mb-2" htmlFor="damageProductImages">
                                Damage Product Images <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="damageProductImages"
                                name="damageProductImages"
                                type="file"
                                className="hidden"
                                accept=".jpg, .jpeg, .png"
                                multiple
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="damageProductImages" className="w-full md:w-[300px] cursor-pointer bg-white border border-black rounded-lg flex items-center justify-center px-3 py-2 h-12">
                                Upload Damage Product Images
                            </label>
                            <p className="text-gray-500 text-sm">At least 3 images required. Max file size: 10MB.</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-black font-bold mb-2" htmlFor="invoice">
                                Invoice <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="invoice"
                                name="invoice"
                                type="file"
                                className="hidden"
                                accept=".pdf"
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="invoice" className="w-full md:w-[300px] cursor-pointer bg-white border border-black rounded-lg flex items-center justify-center px-3 py-2 h-12">
                                Upload Invoice
                            </label>
                            <p className="text-gray-500 text-sm">Max file size: 10MB.</p>
                        </div>
                        <div>
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
