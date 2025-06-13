'use client'

import { useEffect, useState } from 'react'

const roles = ['user','admin', 'developer']

export default function UserManager() {
    const [users, setUsers] = useState([])
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'user',
    })
    const [editingId, setEditingId] = useState(null)

    // Reusable fetch function
    const fetchUsers = async () => {
        const res = await fetch('/api/user')
        const data = await res.json()
        setUsers(data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const url = '/api/user'
        const payload = {
            ...formData,
            ...(editingId && { userId: editingId }),
        }

        const res = await fetch(url, {
            method: editingId ? 'PATCH' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })

        const result = await res.json()

        if (!res.ok) {
            alert(result.message || 'Something went wrong')
            return
        }

        await fetchUsers() // ✅ refresh after add/update
        setFormData({ email: '', password: '', role: 'user' })
        setEditingId(null)
    }

    const handleEdit = (user) => {
        setFormData({ email: user.email, password: '', role: user.role })
        setEditingId(user._id)
    }

    const handleDelete = async (id) => {
        const res = await fetch(`/api/user?id=${id}`, { method: 'DELETE' })
        if (res.ok) {
            await fetchUsers() // ✅ refresh after delete
        } else {
            const data = await res.json()
            alert(data.message || 'Delete failed')
        }
    }

    return (
        <div className='max-w-5xl mx-auto px-4 py-10 space-y-10'>
            {/* Form Card */}
            <div className='bg-white border border-orange-100 rounded-2xl shadow-xl p-8'>
                <h2 className='text-2xl font-bold text-orange-600 mb-6'>
                    {editingId ? 'Update User' : 'Add New User'}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className='grid grid-cols-1 md:grid-cols-3 gap-6'
                >
                    <input
                        type='email'
                        name='email'
                        required
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        className='input-style'
                    />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        required={!editingId}
                        value={formData.password}
                        onChange={handleChange}
                        className='input-style'
                    />
                    <select
                        name='role'
                        value={formData.role}
                        onChange={handleChange}
                        className='input-style'
                    >
                        {roles.map((r) => (
                            <option
                                key={r}
                                value={r}
                            >
                                {r.charAt(0).toUpperCase() + r.slice(1)}
                            </option>
                        ))}
                    </select>

                    <div className='md:col-span-3 text-right'>
                        <button
                            type='submit'
                            className='bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition'
                        >
                            {editingId ? 'Update User' : 'Add User'}
                        </button>
                    </div>
                </form>
            </div>

            {/* User List Card */}
            <div className='bg-white border border-gray-100 rounded-2xl shadow-md p-6'>
                <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                    User List
                </h2>

                <div className='overflow-x-auto'>
                    <table className='w-full text-sm border-collapse'>
                        <thead>
                            <tr className='bg-orange-50 text-orange-700 text-left'>
                                <th className='p-3'>Email</th>
                                <th className='p-3'>Role</th>
                                <th className='p-3 text-right'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className='border-t hover:bg-orange-50/20'
                                    >
                                        <td className='p-3'>{user.email}</td>
                                        <td className='p-3 capitalize'>
                                            {user.role}
                                        </td>
                                        <td className='p-3 text-right space-x-2'>
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md transition'
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(user._id)
                                                }
                                                className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition'
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan='3'
                                        className='p-4 text-center text-gray-400'
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom style using Tailwind apply */}
            <style jsx>{`
                .input-style {
                    @apply border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-600;
                }
            `}</style>
        </div>
    )
}
