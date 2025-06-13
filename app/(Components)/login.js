'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
        setTimeout(() => toast.remove(), 3000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()
            

            // if (!res.ok) {
            //     throw new Error(data.message || 'Invalid email or password')
            // }

            showToast('Login successful!', 'success')
            router.refresh()
            // Optional: redirect user
        } catch (err) {
            showToast(err.message || 'Login failed', 'error') // <- Toast for invalid login
        } finally {
            setLoading(false)
            setEmail('')
            setPassword('')
        }
    }

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
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-md transition'
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    )
}
