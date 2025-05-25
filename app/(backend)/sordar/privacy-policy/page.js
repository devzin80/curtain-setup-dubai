'use client'
import Editor from '@/app/(Components)/editor'
import React, { useState, useEffect } from 'react'

const PrivacyPolicy = () => {
    const [content, setContent] = useState('')
    const [contentId, setContentId] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/privacy-policy`)
                if (!response.ok) throw new Error('Failed to fetch policy')
                const data = await response.json()

                if (data.length > 0) {
                    setContent(data[0].content)
                    setContentId(data[0]._id)
                }
            } catch (error) {
                console.error('Error fetching privacy policy:', error)
                setError('Failed to load privacy policy.')
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        setError('')

        try {
            if (!content) {
                setError('Content cannot be empty.')
                setLoading(false)
                return
            }

            if (!contentId) {
                // No content in DB – Create new
                await fetch(`/api/privacy-policy`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content }),
                })
                setMessage('Privacy policy created!')
            } else {
                // Content exists – Update existing
                await fetch(`/api/privacy-policy`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: contentId, content }),
                })
                setMessage('Privacy policy updated!')
            }
        } catch (err) {
            setError('Failed to save privacy policy.')
        } finally {
            setLoading(false)
        }
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
                    disabled={!content || loading}
                >
                    {loading ? 'Saving...' : contentId ? 'Update' : 'Save'}
                </button>
                {message && (
                    <div className='mt-2 text-green-700 font-medium'>
                        {message}
                    </div>
                )}
                {error && (
                    <div className='mt-2 text-red-600 font-medium'>{error}</div>
                )}
            </form>
        </div>
    )
}

export default PrivacyPolicy
