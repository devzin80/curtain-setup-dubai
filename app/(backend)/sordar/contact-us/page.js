'use client'
import React, { useState, useEffect } from 'react'

const ContactUs = () => {
    const [address, setAddress] = useState('')
    const [addressId, setAddressId] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/contact-us`)
            const data = await response.json()
            if (data.length > 0) {
                setAddress(data[0].address)
                setAddressId(data[0]._id)
            }
        } catch (error) {
            console.error('Error fetching contact address:', error)
            setMessage('Failed to load address.')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        try {
            if (!addressId) {
                // Create new
                await fetch(`/api/contact-us`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ address }),
                })
                setMessage('Address saved!')
            } else {
                // Update existing
                await fetch(`/api/contact-us`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: addressId, address }),
                })
                setMessage('Address updated!')
            }
            fetchData()
        } catch (error) {
            setMessage('Failed to save address.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full max-w-4xl mx-auto my-10 px-4 sm:px-6 lg:px-8 min-h-[300px] md:min-h-[50vh] bg-white rounded-xl shadow-md'>
            <form onSubmit={handleSubmit}>
                <label
                    htmlFor='address'
                    className='text-2xl font-bold block mb-2'
                >
                    Address :
                </label>
                <input
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className='border p-2 w-full rounded'
                />
                <button
                    type='submit'
                    className='bg-blue-500 text-white px-4 py-2 mt-2'
                    disabled={!address || loading}
                >
                    {loading ? 'Saving...' : addressId ? 'Update' : 'Save'}
                </button>
                {message && (
                    <div className='mt-2 text-green-700 font-medium'>
                        {message}
                    </div>
                )}
            </form>
        </div>
    )
}

export default ContactUs
