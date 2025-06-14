'use client'

import { decodeToken } from '@/lib/auth'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const showToast = (message, type = 'success') => {
        const toast = document.createElement('div')
        toast.textContent = message
        toast.className = `
      fixed top-5 right-5 z-50 px-4 py-2 text-white rounded shadow-md transition
      ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}
    `
        document.body.appendChild(toast)
        setTimeout(() => {
            toast.classList.add('opacity-0')
            setTimeout(() => toast.remove(), 500)
        }, 3000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (loading) return // Prevent double submit

        setLoading(true)

        try {
            const res = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (res.ok) {
                localStorage.setItem('token', data.token)
                showToast('Login successful!', 'success')

                // Wait for push before continuing
                 router.push('/sordar/')
                // router.refresh()
            } else {
                // Show error message from API if available
                showToast(data.message || 'Login failed', 'error')
            }
        } catch (err) {
            showToast(err.message || 'Login failed', 'error')
        } finally {
            setLoading(false)
            // Clear inputs only on success, so move this inside the success branch if needed
            // Or you can decide to clear always — here clearing only if login succeeded:
            // But for demo, let's clear always:
            setEmail('')
            setPassword('')
            // router.refresh() // Refresh the page to reflect login state
        }
    }

    useEffect(() => {
        const user = decodeToken()
        if (user) {
            router.push('/sordar/')
        }
    }, [router])
    return (
        <div className='flex items-center justify-center min-h-screen bg-orange-50 p-4'>
            <div className='w-full max-w-md bg-white p-8 rounded-2xl shadow-xl'>
                <h2 className='text-2xl font-bold text-orange-600 mb-6 text-center'>
                    Login to Your Account
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className='space-y-4'
                >
                    <div>
                        <label className='block text-sm text-gray-600'>
                            Email
                        </label>
                        <input
                            type='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full mt-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black'
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className='block text-sm text-gray-600'>
                            Password
                        </label>
                        <input
                            type='password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full mt-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black'
                            disabled={loading}
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-semibold py-2 px-4 rounded-md transition'
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    )
}
