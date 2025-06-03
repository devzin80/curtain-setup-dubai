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
                await fetch(`/api/privacy-policy`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content }),
                })
                setMessage('Privacy policy created!')
            } else {
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
        <div className='w-full max-w-4xl mx-auto my-10 px-4 sm:px-6 lg:px-8 min-h-[50vh] flex flex-col'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col flex-grow'
            >
                <div className='flex-grow min-h-[300px] sm:min-h-[400px] overflow-auto border rounded-lg shadow-sm'>
                    <Editor
                        content={content}
                        onChange={setContent}
                    />
                </div>

                <button
                    type='submit'
                    disabled={!content || loading}
                    className='mt-4 self-start bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition disabled:opacity-50'
                >
                    {loading ? 'Saving...' : contentId ? 'Update' : 'Save'}
                </button>

                {message && (
                    <p className='mt-3 text-green-600 font-medium'>{message}</p>
                )}
                {error && (
                    <p className='mt-3 text-red-600 font-medium'>{error}</p>
                )}
            </form>
        </div>
    )
}

export default PrivacyPolicy
