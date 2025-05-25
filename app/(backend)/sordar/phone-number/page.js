'use client'
import React, { useState, useEffect } from 'react'
//
const PhoneNumber = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneNumberId, setPhoneNumberId] = useState('')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/phone-number`)

            if (!response.ok) {
                const errorText = await response.text()
                console.error('Error response from API:', errorText)
                throw new Error(`Fetch failed: ${response.status}`)
            }

            const data = await response.json()

            if (data.length > 0) {
                setPhoneNumber(data[0].phoneNumber)
                setPhoneNumberId(data[0]._id)
            }
        } catch (error) {
            console.error('Error fetching phone number:', error)
        }
    }
    //

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!phoneNumber) return

        try {
            if (!phoneNumberId) {
                await fetch(`/api/phone-number`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phoneNumber }),
                })
            } else {
                await fetch(`/api/phone-number`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: phoneNumberId, phoneNumber }),
                })
            }
            alert('Phone Number saved!')
        } catch (err) {
            console.error('Submit error:', err)
            alert('Something went wrong saving the phone number.')
        }
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
