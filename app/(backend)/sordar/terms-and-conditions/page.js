'use client'
import React, { useState, useEffect } from 'react'
import Editor from '@/app/(Components)/editor'

const TermsAndConditions = () => {
  const [content, setContent] = useState('')
  const [contentId, setContentId] = useState('')
  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/api/terms-and-conditions`,
              )
              if (!response.ok) throw new Error('Failed to fetch policy')
              const data = await response.json()
  
              if (data.length > 0) {
                  setContent(data[0].content)
                  setContentId(data[0]._id)
              }
          } catch (error) {
              console.error('Error fetching privacy policy:', error)
              // Consider adding user-facing error state
          }
      }
      fetchData()
  }, [])// ✅ only run once

  const handleSubmit = async (e) => {
      e.preventDefault()
  
      const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/terms-and-conditions`,
      )
      const data = await res.json()
  
      if (data.length === 0) {
          // No content in DB – Create new
          await fetch(
             ` ${process.env.NEXT_PUBLIC_BASE_URL}/api/terms-and-conditions`,
              {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ content }),
              },
          )
      } else {
          // Content exists – Update existing
          await fetch(
             ` ${process.env.NEXT_PUBLIC_BASE_URL}/api/terms-and-conditions`,
              {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ id: data[0]._id, content }),
              },
          )
      }
      alert('Post saved!')
  }

  return (
    <div className='w-full max-w-4xl m-10 h-[50vh]'>
            <form onSubmit={handleSubmit}>
                <Editor
                    content={content}
                    onChange={setContent}
                />
                <button
                    type='submit'
                    className='bg-blue-500 text-white px-4 py-2 mt-2'
                >
                    {contentId ? 'Update' : 'Save'}
                </button>
            </form>
        </div>
  )
}

export default TermsAndConditions





