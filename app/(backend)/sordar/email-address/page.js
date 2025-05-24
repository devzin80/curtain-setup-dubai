'use client'
import React, { useState, useEffect } from 'react'

const EmailAddress = () => {

      const [email, setEmail] = useState('')
      const [emailId, setEmailId] = useState('')

      useEffect(() => {
          const fetchData = async () => {
              try {
                  const response = await fetch(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/api/email`,
                  )
                  if (!response.ok) throw new Error('Failed to fetch policy')
                  const data = await response.json()

                  if (data.length > 0) {
                      setEmail(data[0].email || '')
                      setEmailId(data[0]._id || '')
                  }
              } catch (error) {
                  console.error('Error fetching privacy policy:', error)
                  // Consider adding user-facing error state
              }
          }
          fetchData()
      }, []) 

       const handleSubmit = async (e) => {
           e.preventDefault()

           const res = await fetch(
               `${process.env.NEXT_PUBLIC_BASE_URL}/api/email`,
           )
           const data = await res.json()

           if (data.length === 0) {
               // No content in DB – Create new
               await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email`, {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({ email }),
               })
           } else {
               // Content exists – Update existing
               await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email`, {
                   method: 'PUT',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({ id: data[0]._id, email }),
               })
           }
           alert('Address saved!')
       }


    return (
        <div className='w-full max-w-4xl m-10 h-[50vh]'>
            <form onSubmit={handleSubmit}>
                <label
                    htmlFor='email'
                    className='text-2xl font-bold block mb-2'
                >
                    Email Address :
                </label>
                <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border p-2 w-full rounded'
                />
                <button
                    type='submit'
                    className='bg-blue-500 text-white px-4 py-2 mt-2'
                >
                    {emailId ? 'Update' : 'Save'}
                </button>
            </form>
        </div>
    )
}

export default EmailAddress


