'use client'
import React, { useState, useEffect } from 'react'


const ContactUs = () => {
    const [address, setAddress] = useState('')
    const [addressId, setAddressId] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/contact-us')
                if (!response.ok) throw new Error('Failed to fetch policy')
                const data = await response.json()
    
                if (data.length > 0) {
                    setAddress(data[0].address || '')
                    setAddressId(data[0]._id || '')
                }
            } catch (error) {
                console.error('Error fetching privacy policy:', error)
                // Consider adding user-facing error state
            }
        }
        fetchData()
    }, [])// 


     const handleSubmit = async (e) => {
         e.preventDefault()

         const res = await fetch('/api/contact-us')
         const data = await res.json()

         if (data.length === 0) {
             // No content in DB – Create new
             await fetch('/api/contact-us', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ address }),
             })
         } else {
             // Content exists – Update existing
             await fetch('/api/contact-us', {
                 method: 'PUT',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ id: data[0]._id, address }),
             })
         }
         alert('Address saved!')
     }

    return <div className='w-full max-w-4xl m-10 h-[50vh]'>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="address" className='text-2xl font-bold block mb-2'>Address :</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className='border p-2 w-full rounded' />
                    <button
                        type='submit'
                        className='bg-blue-500 text-white px-4 py-2 mt-2'
                    >
                        {addressId ? 'Update' : 'Save'}
                    </button>
                </form>
            </div>
}

export default ContactUs
