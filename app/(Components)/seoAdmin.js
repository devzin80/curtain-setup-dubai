'use client'

import { useEffect, useState } from 'react'
import { getRoutes } from '@/lib/directories/dir'

const SEOADMIN = () => {
    const [routes, setRoutes] = useState([])
    const [seoData, setSeoData] = useState([])
    const [form, setForm] = useState({
        page: '',
        title: '',
        description: '',
        canonicalUrl: '',
        keywords: '',
        robots: 'index, follow',
    })
    const [editingId, setEditingId] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const r = await getRoutes()
            const seoRes = await fetch('/api/seo')
            const seo = await seoRes.json()
            setRoutes(r)
            setSeoData(seo)
        }
        fetchData()
    }, [])

    const availablePages = routes
        .map((r) => r.route)
        .filter((route) => !seoData.some((seo) => seo.page === route))

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleEdit = (seo) => {
        setForm({
            page: seo.page,
            title: seo.title,
            description: seo.description,
            canonicalUrl: seo.canonicalUrl || '',
            keywords: (seo.metaTags?.keywords || []).join(', '),
            robots: seo.metaTags?.robots || 'index, follow',
        })
        setEditingId(seo._id)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const method = editingId ? 'PUT' : 'POST'
        const res = await fetch(`/api/seo${editingId ? `/${editingId}` : ''}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...form,
                keywords: form.keywords.split(',').map((k) => k.trim()),
            }),
        })
        const updated = await res.json()
        if (res.ok) {
            window.location.reload()
        } else {
            console.error('Error saving SEO data:', updated)
        }
    }

    return (
        <div className='p-4 max-w-4xl mx-auto'>
            <h1 className='text-2xl font-bold mb-6'>SEO Admin Panel</h1>

            <form
                onSubmit={handleSubmit}
                className='space-y-4 bg-white p-4 shadow rounded-lg'
            >
                {!editingId && (
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Page
                        </label>
                        <select
                            name='page'
                            value={form.page}
                            onChange={handleChange}
                            className='w-full border border-gray-300 rounded p-2'
                            required
                        >
                            <option value=''>Select a page</option>
                            {availablePages.map((route, i) => (
                                <option
                                    key={i}
                                    value={route}
                                >
                                    {route}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Title
                    </label>
                    <input
                        type='text'
                        name='title'
                        value={form.title}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded p-2'
                        required
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Description
                    </label>
                    <textarea
                        name='description'
                        value={form.description}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded p-2'
                        rows='3'
                        required
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Canonical URL
                    </label>
                    <input
                        type='text'
                        name='canonicalUrl'
                        value={form.canonicalUrl}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded p-2'
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Keywords (comma-separated)
                    </label>
                    <input
                        type='text'
                        name='keywords'
                        value={form.keywords}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded p-2'
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Robots
                    </label>
                    <select
                        name='robots'
                        value={form.robots}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded p-2'
                    >
                        <option value='index, follow'>index, follow</option>
                        <option value='noindex, nofollow'>
                            noindex, nofollow
                        </option>
                        <option value='index, nofollow'>index, nofollow</option>
                        <option value='noindex, follow'>noindex, follow</option>
                    </select>
                </div>

                <button
                    type='submit'
                    className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                >
                    {editingId ? 'Update' : 'Create'}
                </button>
            </form>

            <div className='mt-10'>
                <h2 className='text-xl font-semibold mb-4'>
                    Existing SEO Entries
                </h2>
                <div className='grid gap-4'>
                    {seoData.map((seo) => (
                        <div
                            key={seo._id}
                            className='bg-gray-50 p-4 rounded shadow'
                        >
                            <p>
                                <strong>Page:</strong> {seo.page}
                            </p>
                            <p>
                                <strong>Title:</strong> {seo.title}
                            </p>
                            <p>
                                <strong>Description:</strong> {seo.description}
                            </p>
                            <button
                                className='mt-2 text-sm text-blue-600 underline'
                                onClick={() => handleEdit(seo)}
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SEOADMIN
