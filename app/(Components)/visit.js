'use client'

import React, { useState } from 'react'

export default function VisitForm() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [address, setAddress] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const message = `New Free Visit Request:
Name: ${name}
Phone: ${phone}
Date: ${date}
Time: ${time}
Address: ${address}`

        const encodedMsg = encodeURIComponent(message)
        const adminPhone = '971544985661' // 🔁 Replace with your real number (without +)

        window.open(`https://wa.me/${adminPhone}?text=${encodedMsg}`, '_blank')
    }

    return (
        <div className='bg-orange-50 min-h-screen flex items-center justify-center px-4 py-10'>
            <form
                onSubmit={handleSubmit}
                className='bg-white w-full max-w-3xl p-8 rounded-2xl shadow-xl'
            >
                <h2 className='text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4'>
                    Book a Free Visit
                </h2>
                <p className='text-center text-gray-600 mb-8'>
                    Please select the date that is suitable for a visit
                </p>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <label className='block text-gray-700 mb-1'>
                            Your Name
                        </label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className='w-full border-b-2 border-gray-400 py-2 px-1 focus:outline-none focus:border-orange-500'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 mb-1'>
                            Phone
                        </label>
                        <input
                            type='tel'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            placeholder='+971 50xxxxxxx'
                            className='w-full border-b-2 border-gray-400 py-2 px-1 focus:outline-none focus:border-orange-500'
                        />
                    </div>

                    <div>
                        <label className='block text-gray-700 mb-1'>
                            Select Date
                        </label>
                        <input
                            type='date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className='w-full border-b-2 border-gray-400 py-2 px-1 focus:outline-none focus:border-orange-500'
                        />
                    </div>

                    <div>
                        <label className='block text-gray-700 mb-1'>
                            Choose Time Range
                        </label>
                        <select
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                            className='w-full border-b-2 border-gray-400 py-2 px-1 bg-transparent focus:outline-none focus:border-orange-500'
                        >
                            <option
                                value=''
                                disabled
                            >
                                Choose your time range
                            </option>
                            <option>9:00 AM - 12:00 PM</option>
                            <option>12:00 PM - 3:00 PM</option>
                            <option>3:00 PM - 6:00 PM</option>
                            <option>6:00 PM - 9:00 PM</option>
                        </select>
                    </div>

                    <div className='md:col-span-2'>
                        <label className='block text-gray-700 mb-1'>
                            Address in Dubai
                        </label>
                        <input
                            type='text'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className='w-full border-b-2 border-gray-400 py-2 px-1 focus:outline-none focus:border-orange-500'
                        />
                    </div>
                </div>

                <div className='mt-8 text-center'>
                    <button
                        type='submit'
                        className='bg-[#FF6F52] text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition'
                    >
                        BOOK A FREE VISIT
                    </button>
                </div>
            </form>
        </div>
    )
}
