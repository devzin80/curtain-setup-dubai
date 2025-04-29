'use client'
import React, { useState, useEffect } from 'react'

const PhoneNumber = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneNumberId, setPhoneNumberId] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/phone-number')
                if (!response.ok) throw new Error('Failed to fetch policy')
                const data = await response.json()

                if (data.length > 0) {
                    setPhoneNumber(data[0].phoneNumber || '')
                    setPhoneNumberId(data[0]._id || '')
                }
            } catch (error) {
                console.error('Error fetching privacy policy:', error)
                // Consider adding user-facing error state
            }
        }
        fetchData()
    }, []) //

        const handleSubmit = async (e) => {
            e.preventDefault()

            const res = await fetch('/api/phone-number')
            const data = await res.json()

            if (data.length === 0) {
                // No content in DB – Create new
                await fetch('/api/phone-number', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phoneNumber }),
                })
            } else {
                // Content exists – Update existing
                await fetch('/api/phone-number', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: data[0]._id, phoneNumber }),
                })
            }
            alert('Phone Number saved!')
        }

    return (
        <div className='w-full max-w-4xl m-10 h-[50vh]'>
            <form onSubmit={handleSubmit}>
                <label
                    htmlFor='Phone Number'
                    className='text-2xl font-bold block mb-2'
                >
                    Phone Number :
                </label>
                <input
                    type='text'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className='border p-2 w-full rounded'
                />
                <button
                    type='submit'
                    className='bg-blue-500 text-white px-4 py-2 mt-2'
                >
                    {phoneNumberId ? 'Update' : 'Save'}
                </button>
            </form>
        </div>
    )
}

export default PhoneNumber


