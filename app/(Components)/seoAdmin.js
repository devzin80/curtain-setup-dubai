'use client'

import { useEffect, useState } from 'react'

export default function SeoAdmin({ routes }) {
    const [existingSeo, setExistingSeo] = useState([])
    const [form, setForm] = useState({
        page: '',
        locale: 'en',
        region: '',
        title: '',
        description: '',
        canonicalUrl: '',
        alternateLocales: [],
        metaTags: {
            keywords: [],
            robots: 'index, follow',
            viewport: 'width=device-width, initial-scale=1',
            themeColor: '',
            mobileOptimized: true,
            author: '',
            generator: '',
            charset: 'utf-8',
        },
        openGraph: {
            title: '',
            description: '',
            url: '',
            type: 'website',
            locale: '',
            siteName: '',
            images: [],
        },
        twitter: {
            card: 'summary_large_image',
            title: '',
            description: '',
            image: '',
            site: '',
            creator: '',
            app: { name: '', id: '', url: '' },
        },
        favicons: {
            appleTouchIcon: '',
            icon192: '',
            icon512: '',
            manifest: '',
            maskIcon: '',
            shortcutIcon: '',
        },
        structuredData: [],
        publisher: {
            name: '',
            logo: '',
            url: '',
            type: 'Organization',
        },
        socialProfiles: [],
        analytics: {
            googleAnalyticsId: '',
            googleTagManagerId: '',
            facebookPixelId: '',
            hotjarId: '',
        },
        extraHead: {
            scripts: [],
            noscript: [],
            links: [],
        },
        customMeta: [],
        environment: {
            showInProduction: true,
            showInStaging: false,
        },
    })

    const [mode, setMode] = useState('create')
    const [selectedId, setSelectedId] = useState(null)
    const [showStoredData, setShowStoredData] = useState(true)
    const [loading, setLoading] = useState(false)

    // Fetch existing SEO data on mount
    useEffect(() => {
        fetchSeoData()
    }, [])

    const fetchSeoData = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/seo')
            const data = await res.json()
            setExistingSeo(data)
        } catch (error) {
            console.error('Error fetching SEO data:', error)
            alert('Error fetching SEO data')
        } finally {
            setLoading(false)
        }
    }

    const handledPages = existingSeo.map((e) => e.page)
    const availablePages = routes.filter((r) => !handledPages.includes(r.route))

    // Reset form to initial state
    const resetForm = () => {
        setForm({
            page: '',
            locale: 'en',
            region: '',
            title: '',
            description: '',
            canonicalUrl: '',
            alternateLocales: [],
            metaTags: {
                keywords: [],
                robots: 'index, follow',
                viewport: 'width=device-width, initial-scale=1',
                themeColor: '',
                mobileOptimized: true,
                author: '',
                generator: '',
                charset: 'utf-8',
            },
            openGraph: {
                title: '',
                description: '',
                url: '',
                type: 'website',
                locale: '',
                siteName: '',
                images: [],
            },
            twitter: {
                card: 'summary_large_image',
                title: '',
                description: '',
                image: '',
                site: '',
                creator: '',
                app: { name: '', id: '', url: '' },
            },
            favicons: {
                appleTouchIcon: '',
                icon192: '',
                icon512: '',
                manifest: '',
                maskIcon: '',
                shortcutIcon: '',
            },
            structuredData: [],
            publisher: {
                name: '',
                logo: '',
                url: '',
                type: 'Organization',
            },
            socialProfiles: [],
            analytics: {
                googleAnalyticsId: '',
                googleTagManagerId: '',
                facebookPixelId: '',
                hotjarId: '',
            },
            extraHead: {
                scripts: [],
                noscript: [],
                links: [],
            },
            customMeta: [],
            environment: {
                showInProduction: true,
                showInStaging: false,
            },
        })
        setMode('create')
        setSelectedId(null)
    }

    // Generic change handler for simple fields or nested sections
    const handleChange = (e, section = null) => {
        const { name, value, type, checked } = e.target
        const val = type === 'checkbox' ? checked : value

        if (section) {
            setForm((prev) => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [name]: val,
                },
            }))
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: val,
            }))
        }
    }

    // For nested arrays of objects
    const handleArrayChange = (section, index, field, value) => {
        setForm((prev) => {
            const copy = [...(prev[section] || [])]
            copy[index] = { ...copy[index], [field]: value }
            return { ...prev, [section]: copy }
        })
    }

    // Add and remove items in arrays
    const addArrayItem = (section, item) => {
        setForm((prev) => ({
            ...prev,
            [section]: [...(prev[section] || []), item],
        }))
    }

    const removeArrayItem = (section, index) => {
        setForm((prev) => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index),
        }))
    }

    // For openGraph images specifically
    const addOpenGraphImage = () => {
        setForm((prev) => ({
            ...prev,
            openGraph: {
                ...prev.openGraph,
                images: [
                    ...(prev.openGraph.images || []),
                    { url: '', width: '', height: '', alt: '' },
                ],
            },
        }))
    }

    const updateOpenGraphImage = (index, field, value) => {
        setForm((prev) => {
            const images = [...prev.openGraph.images]
            images[index] = { ...images[index], [field]: value }
            return { ...prev, openGraph: { ...prev.openGraph, images } }
        })
    }

    const removeOpenGraphImage = (index) => {
        setForm((prev) => {
            const images = prev.openGraph.images.filter((_, i) => i !== index)
            return { ...prev, openGraph: { ...prev.openGraph, images } }
        })
    }

    // For twitter app nested object
    const handleTwitterAppChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            twitter: {
                ...prev.twitter,
                app: { ...prev.twitter.app, [field]: value },
            },
        }))
    }

    // Extra head: scripts, noscript, links
    const handleExtraHeadChange = (section, index, field, value) => {
        setForm((prev) => {
            const list = [...(prev.extraHead[section] || [])]
            list[index] = { ...list[index], [field]: value }
            return {
                ...prev,
                extraHead: {
                    ...prev.extraHead,
                    [section]: list,
                },
            }
        })
    }

    const addExtraHeadItem = (section, template) => {
        setForm((prev) => ({
            ...prev,
            extraHead: {
                ...prev.extraHead,
                [section]: [...(prev.extraHead[section] || []), template],
            },
        }))
    }

    const removeExtraHeadItem = (section, index) => {
        setForm((prev) => {
            const list = prev.extraHead[section].filter((_, i) => i !== index)
            return {
                ...prev,
                extraHead: {
                    ...prev.extraHead,
                    [section]: list,
                },
            }
        })
    }

    // Submit form handler
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const method = mode === 'edit' ? 'PUT' : 'POST'
            const url = mode === 'edit' ? `/api/seo/${selectedId}` : '/api/seo'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            if (res.ok) {
                alert(
                    `SEO data ${
                        mode === 'edit' ? 'updated' : 'created'
                    } successfully!`,
                )
                await fetchSeoData() // Refresh the data
                resetForm() // Reset form after successful submission
            } else {
                const err = await res.json()
                alert('Error: ' + (err.error || 'Something went wrong'))
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            alert('Error submitting form')
        } finally {
            setLoading(false)
        }
    }

    // Edit existing SEO entry
    const handleEdit = (entry) => {
        // Deep clone the entry to avoid reference issues
        const clonedEntry = JSON.parse(JSON.stringify(entry))

        // Ensure all required fields exist with defaults
        const formData = {
            ...clonedEntry,
            alternateLocales: clonedEntry.alternateLocales || [],
            metaTags: {
                keywords: [],
                robots: 'index, follow',
                viewport: 'width=device-width, initial-scale=1',
                themeColor: '',
                mobileOptimized: true,
                author: '',
                generator: '',
                charset: 'utf-8',
                ...clonedEntry.metaTags,
            },
            openGraph: {
                title: '',
                description: '',
                url: '',
                type: 'website',
                locale: '',
                siteName: '',
                images: [],
                ...clonedEntry.openGraph,
            },
            twitter: {
                card: 'summary_large_image',
                title: '',
                description: '',
                image: '',
                site: '',
                creator: '',
                app: { name: '', id: '', url: '' },
                ...clonedEntry.twitter,
            },
            favicons: {
                appleTouchIcon: '',
                icon192: '',
                icon512: '',
                manifest: '',
                maskIcon: '',
                shortcutIcon: '',
                ...clonedEntry.favicons,
            },
            structuredData: clonedEntry.structuredData || [],
            publisher: {
                name: '',
                logo: '',
                url: '',
                type: 'Organization',
                ...clonedEntry.publisher,
            },
            socialProfiles: clonedEntry.socialProfiles || [],
            analytics: {
                googleAnalyticsId: '',
                googleTagManagerId: '',
                facebookPixelId: '',
                hotjarId: '',
                ...clonedEntry.analytics,
            },
            extraHead: {
                scripts: [],
                noscript: [],
                links: [],
                ...clonedEntry.extraHead,
            },
            customMeta: clonedEntry.customMeta || [],
            environment: {
                showInProduction: true,
                showInStaging: false,
                ...clonedEntry.environment,
            },
        }

        setForm(formData)
        setSelectedId(entry._id)
        setMode('edit')
        setShowStoredData(false) // Hide stored data when editing
    }

    // Delete SEO entry
    const handleDelete = async (id, page) => {
        if (
            !confirm(`Are you sure you want to delete SEO data for "${page}"?`)
        ) {
            return
        }

        setLoading(true)
        try {
            const res = await fetch(`/api/seo/${id}`, {
                method: 'DELETE',
            })

            if (res.ok) {
                alert('SEO data deleted successfully!')
                await fetchSeoData() // Refresh the data
                if (selectedId === id) {
                    resetForm() // Reset form if we're deleting the currently edited item
                }
            } else {
                const err = await res.json()
                alert(
                    'Error deleting: ' + (err.error || 'Something went wrong'),
                )
            }
        } catch (error) {
            console.error('Error deleting SEO data:', error)
            alert('Error deleting SEO data')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='p-6 max-w-6xl mx-auto'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold'>SEO Admin</h1>
                <div className='flex gap-4'>
                    <button
                        onClick={() => setShowStoredData(!showStoredData)}
                        className='px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700'
                    >
                        {showStoredData ? 'Hide' : 'Show'} Stored Data
                    </button>
                    {mode === 'edit' && (
                        <button
                            onClick={resetForm}
                            className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
                        >
                            Create New
                        </button>
                    )}
                </div>
            </div>

            {loading && (
                <div className='text-center py-4'>
                    <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
                    <p className='mt-2'>Loading...</p>
                </div>
            )}

            {/* Stored Data Section */}
            {showStoredData && (
                <div className='mb-10 bg-gray-50 p-6 rounded-lg'>
                    <h2 className='text-2xl font-semibold mb-4'>
                        Stored SEO Data ({existingSeo.length})
                    </h2>
                    {existingSeo.length === 0 ? (
                        <p className='text-gray-600'>
                            No SEO data found. Create your first SEO entry
                            below.
                        </p>
                    ) : (
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {existingSeo.map((entry) => (
                                <div
                                    key={entry._id}
                                    className={`border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow ${
                                        selectedId === entry._id
                                            ? 'ring-2 ring-blue-500'
                                            : ''
                                    }`}
                                >
                                    <div className='mb-3'>
                                        <p className='font-semibold text-lg text-blue-600 mb-1'>
                                            {entry.page}
                                        </p>
                                        <p className='text-sm text-gray-600 mb-2'>
                                            <strong>Title:</strong>{' '}
                                            {entry.title || 'No title'}
                                        </p>
                                        <p className='text-sm text-gray-600 mb-2'>
                                            <strong>Description:</strong>{' '}
                                            {entry.description
                                                ? entry.description.length > 100
                                                    ? entry.description.substring(
                                                          0,
                                                          100,
                                                      ) + '...'
                                                    : entry.description
                                                : 'No description'}
                                        </p>
                                        <p className='text-xs text-gray-500 mb-3'>
                                            <strong>Locale:</strong>{' '}
                                            {entry.locale || 'N/A'} |
                                            <strong> Region:</strong>{' '}
                                            {entry.region || 'N/A'}
                                        </p>

                                        {/* Quick Info */}
                                        <div className='text-xs text-gray-500 mb-3'>
                                            <div className='flex flex-wrap gap-2'>
                                                {entry.openGraph?.images
                                                    ?.length > 0 && (
                                                    <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded'>
                                                        {
                                                            entry.openGraph
                                                                .images.length
                                                        }{' '}
                                                        OG Images
                                                    </span>
                                                )}
                                                {entry.structuredData?.length >
                                                    0 && (
                                                    <span className='bg-green-100 text-green-800 px-2 py-1 rounded'>
                                                        {
                                                            entry.structuredData
                                                                .length
                                                        }{' '}
                                                        Schema
                                                    </span>
                                                )}
                                                {entry.analytics
                                                    ?.googleAnalyticsId && (
                                                    <span className='bg-purple-100 text-purple-800 px-2 py-1 rounded'>
                                                        GA4
                                                    </span>
                                                )}
                                                {entry.socialProfiles?.length >
                                                    0 && (
                                                    <span className='bg-orange-100 text-orange-800 px-2 py-1 rounded'>
                                                        Social
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex gap-2'>
                                        <button
                                            className='flex-1 text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 px-3 py-1 rounded text-sm transition-colors'
                                            onClick={() => handleEdit(entry)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className='flex-1 text-red-600 hover:text-red-800 border border-red-600 hover:border-red-800 px-3 py-1 rounded text-sm transition-colors'
                                            onClick={() =>
                                                handleDelete(
                                                    entry._id,
                                                    entry.page,
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Form Section */}
            <div className='bg-white border rounded-lg p-6'>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-2xl font-semibold'>
                        {mode === 'edit'
                            ? `Edit SEO for: ${form.page}`
                            : 'Create New SEO Entry'}
                    </h2>
                    {mode === 'edit' && (
                        <span className='bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm'>
                            Editing Mode
                        </span>
                    )}
                </div>

                <form
                    onSubmit={handleSubmit}
                    className='space-y-6'
                >
                    {/* Page select on create mode */}
                    {mode === 'create' && (
                        <div>
                            <label className='block mb-1 font-medium'>
                                Page *
                            </label>
                            <select
                                name='page'
                                onChange={handleChange}
                                required
                                className='w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                value={form.page}
                            >
                                <option value=''>Select a page</option>
                                {availablePages.map((r, i) => (
                                    <option
                                        key={i}
                                        value={r.route}
                                    >
                                        {r.route}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Basic info */}
                    <div className='grid md:grid-cols-2 gap-4'>
                        <div>
                            <label className='block font-medium'>Locale</label>
                            <input
                                name='locale'
                                value={form.locale || ''}
                                onChange={handleChange}
                                className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                placeholder='e.g., en, ar, fr'
                            />
                        </div>
                        <div>
                            <label className='block font-medium'>Region</label>
                            <input
                                name='region'
                                value={form.region || ''}
                                onChange={handleChange}
                                className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                placeholder='e.g., US, AE, FR'
                            />
                        </div>
                    </div>

                    <div>
                        <label className='block font-medium'>Title</label>
                        <input
                            name='title'
                            value={form.title || ''}
                            onChange={handleChange}
                            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            placeholder='SEO title for this page'
                        />
                    </div>
                    <div>
                        <label className='block font-medium'>Description</label>
                        <textarea
                            name='description'
                            value={form.description || ''}
                            onChange={handleChange}
                            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            rows={3}
                            placeholder='SEO description for this page'
                        />
                    </div>

                    <div>
                        <label className='block font-medium'>
                            Canonical URL
                        </label>
                        <input
                            name='canonicalUrl'
                            value={form.canonicalUrl || ''}
                            onChange={handleChange}
                            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            placeholder='https://example.com/page'
                        />
                    </div>

                    {/* Alternate Locales */}
                    <div className='border-t pt-4'>
                        <h3 className='text-xl font-semibold mb-2'>
                            Alternate Locales
                        </h3>
                        {form.alternateLocales?.map((alt, i) => (
                            <div
                                key={i}
                                className='flex gap-2 mb-2'
                            >
                                <input
                                    className='flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    placeholder='hrefLang (e.g., en-US)'
                                    value={alt.hrefLang || ''}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            'alternateLocales',
                                            i,
                                            'hrefLang',
                                            e.target.value,
                                        )
                                    }
                                />
                                <input
                                    className='flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    placeholder='href URL'
                                    value={alt.href || ''}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            'alternateLocales',
                                            i,
                                            'href',
                                            e.target.value,
                                        )
                                    }
                                />
                                <button
                                    type='button'
                                    className='text-red-500 hover:text-red-700 px-3 py-2 border border-red-500 rounded'
                                    onClick={() =>
                                        removeArrayItem('alternateLocales', i)
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type='button'
                            className='text-blue-600 hover:text-blue-800 underline'
                            onClick={() =>
                                addArrayItem('alternateLocales', {
                                    hrefLang: '',
                                    href: '',
                                })
                            }
                        >
                            Add Alternate Locale
                        </button>
                    </div>

                    {/* Meta Tags */}
                    <div className='border-t pt-4'>
                        <h3 className='text-xl font-semibold mb-2'>
                            Meta Tags
                        </h3>
                        <div className='grid md:grid-cols-2 gap-4'>
                            <div>
                                <label className='block font-medium'>
                                    Keywords (comma separated)
                                </label>
                                <input
                                    name='keywords'
                                    value={(form.metaTags.keywords || []).join(
                                        ', ',
                                    )}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            metaTags: {
                                                ...prev.metaTags,
                                                keywords: e.target.value
                                                    .split(',')
                                                    .map((kw) => kw.trim()),
                                            },
                                        }))
                                    }
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    placeholder='keyword1, keyword2, keyword3'
                                />
                            </div>
                            <div>
                                <label className='block font-medium'>
                                    Robots
                                </label>
                                <select
                                    name='robots'
                                    value={form.metaTags.robots || ''}
                                    onChange={(e) =>
                                        handleChange(e, 'metaTags')
                                    }
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                >
                                    <option value='index, follow'>
                                        index, follow
                                    </option>
                                    <option value='noindex, nofollow'>
                                        noindex, nofollow
                                    </option>
                                    <option value='index, nofollow'>
                                        index, nofollow
                                    </option>
                                    <option value='noindex, follow'>
                                        noindex, follow
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label className='block font-medium'>
                                    Viewport
                                </label>
                                <input
                                    name='viewport'
                                    value={form.metaTags.viewport || ''}
                                    onChange={(e) =>
                                        handleChange(e, 'metaTags')
                                    }
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                />
                            </div>
                            <div>
                                <label className='block font-medium'>
                                    Theme Color
                                </label>
                                <input
                                    type='color'
                                    name='themeColor'
                                    value={form.metaTags.themeColor || ''}
                                    onChange={(e) =>
                                        handleChange(e, 'metaTags')
                                    }
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                />
                            </div>
                            <div>
                                <label className='block font-medium'>
                                    Author
                                </label>
                                <input
                                    name='author'
                                    value={form.metaTags.author || ''}
                                    onChange={(e) =>
                                        handleChange(e, 'metaTags')
                                    }
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                />
                            </div>
                            <div>
                                <label className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        name='mobileOptimized'
                                        checked={
                                            form.metaTags.mobileOptimized ||
                                            false
                                        }
                                        onChange={(e) =>
                                            handleChange(e, 'metaTags')
                                        }
                                        className='rounded'
                                    />
                                    Mobile Optimized
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Open Graph */}
                    <div className='border-t pt-4'>
                        <h3 className='text-xl font-semibold mb-2'>
                            Open Graph
                        </h3>
                        <div className='grid md:grid-cols-2 gap-4 mb-4'>
                            <div>
                                <label className='block font-medium'>
                                    Title
                                </label>
                                <input
                                    name='title'
                                    value={form.openGraph.title || ''}
                                    onChange={(e) => {
                                        const val = e.target.value
                                        setForm((prev) => ({
                                            ...prev,
                                            openGraph: {
                                                ...prev.openGraph,
                                                title: val,
                                            },
                                        }))
                                    }}
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                />
                            </div>
                            <div>
                                <label className='block font-medium'>
                                    Type
                                </label>
                                <select
                                    name='type'
                                    value={form.openGraph.type || 'website'}
                                    onChange={(e) => {
                                        const val = e.target.value
                                        setForm((prev) => ({
                                            ...prev,
                                            openGraph: {
                                                ...prev.openGraph,
                                                type: val,
                                            },
                                        }))
                                    }}
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                >
                                    <option value='website'>website</option>
                                    <option value='article'>article</option>
                                    <option value='product'>product</option>
                                    <option value='profile'>profile</option>
                                </select>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label className='block font-medium'>
                                Description
                            </label>
                            <textarea
                                name='description'
                                value={form.openGraph.description || ''}
                                onChange={(e) => {
                                    const val = e.target.value
                                    setForm((prev) => ({
                                        ...prev,
                                        openGraph: {
                                            ...prev.openGraph,
                                            description: val,
                                        },
                                    }))
                                }}
                                className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                rows={3}
                            />
                        </div>

                        <div className='grid md:grid-cols-2 gap-4 mb-4'>
                            <div>
                                <label className='block font-medium'>URL</label>
                                <input
                                    name='url'
                                    value={form.openGraph.url || ''}
                                    onChange={(e) => {
                                        const val = e.target.value
                                        setForm((prev) => ({
                                            ...prev,
                                            openGraph: {
                                                ...prev.openGraph,
                                                url: val,
                                            },
                                        }))
                                    }}
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                />
                            </div>
                            <div>
                                <label className='block font-medium'>
                                    Site Name
                                </label>
                                <input
                                    name='siteName'
                                    value={form.openGraph.siteName || ''}
                                    onChange={(e) => {
                                        const val = e.target.value
                                        setForm((prev) => ({
                                            ...prev,
                                            openGraph: {
                                                ...prev.openGraph,
                                                siteName: val,
                                            },
                                        }))
                                    }}
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                />
                            </div>
                        </div>

                        {/* Images */}
                        <div className='mt-4'>
                            <h4 className='font-semibold mb-2'>Images</h4>
                            {form.openGraph.images?.map((img, i) => (
                                <div
                                    key={i}
                                    className='border p-3 mb-3 rounded bg-gray-50'
                                >
                                    <div className='grid md:grid-cols-2 gap-2 mb-2'>
                                        <input
                                            type='text'
                                            placeholder='Image URL'
                                            value={img.url || ''}
                                            onChange={(e) =>
                                                updateOpenGraphImage(
                                                    i,
                                                    'url',
                                                    e.target.value,
                                                )
                                            }
                                            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                        />
                                        <input
                                            type='text'
                                            placeholder='Alt text'
                                            value={img.alt || ''}
                                            onChange={(e) =>
                                                updateOpenGraphImage(
                                                    i,
                                                    'alt',
                                                    e.target.value,
                                                )
                                            }
                                            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                        />
                                    </div>
                                    <div className='grid md:grid-cols-2 gap-2 mb-2'>
                                        <input
                                            type='number'
                                            placeholder='Width'
                                            value={img.width || ''}
                                            onChange={(e) =>
                                                updateOpenGraphImage(
                                                    i,
                                                    'width',
                                                    e.target.value,
                                                )
                                            }
                                            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                        />
                                        <input
                                            type='number'
                                            placeholder='Height'
                                            value={img.height || ''}
                                            onChange={(e) =>
                                                updateOpenGraphImage(
                                                    i,
                                                    'height',
                                                    e.target.value,
                                                )
                                            }
                                            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                        />
                                    </div>
                                    <button
                                        type='button'
                                        className='text-red-600 hover:text-red-800 text-sm'
                                        onClick={() => removeOpenGraphImage(i)}
                                    >
                                        Remove Image
                                    </button>
                                </div>
                            ))}
                            <button
                                type='button'
                                onClick={addOpenGraphImage}
                                className='text-blue-600 hover:text-blue-800 underline'
                            >
                                Add Image
                            </button>
                        </div>
                    </div>

                    {/* Twitter */}
                    <div className='border-t pt-4'>
                        <h3 className='text-xl font-semibold mb-2'>Twitter</h3>
                        <div className='grid md:grid-cols-2 gap-4 mb-4'>
                            <div>
                                <label className='block font-medium'>
                                    Card Type
                                </label>
                                <select
                                    name='card'
                                    value={form.twitter.card}
                                    onChange={(e) => handleChange(e, 'twitter')}
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                >
                                    <option value='summary'>summary</option>
                                    <option value='summary_large_image'>
                                        summary_large_image
                                    </option>
                                    <option value='app'>app</option>
                                    <option value='player'>player</option>
                                </select>
                            </div>
                            <div>
                                <label className='block font-medium'>
                                    Site (@username)
                                </label>
                                <input
                                    name='site'
                                    value={form.twitter.site || ''}
                                    onChange={(e) => handleChange(e, 'twitter')}
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    placeholder='@yourusername'
                                />
                            </div>
                        </div>

                        <div className='grid md:grid-cols-2 gap-4 mb-4'>
                            <div>
                                <label className='block font-medium'>
                                    Title
                                </label>
                                <input
                                    name='title'
                                    value={form.twitter.title || ''}
                                    onChange={(e) => handleChange(e, 'twitter')}
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                />
                            </div>
                            <div>
                                <label className='block font-medium'>
                                    Creator (@username)
                                </label>
                                <input
                                    name='creator'
                                    value={form.twitter.creator || ''}
                                    onChange={(e) => handleChange(e, 'twitter')}
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    placeholder='@creatorusername'
                                />
                            </div>
                        </div>

                        <div className='mb-4'>
                            <label className='block font-medium'>
                                Description
                            </label>
                            <textarea
                                name='description'
                                value={form.twitter.description || ''}
                                onChange={(e) => handleChange(e, 'twitter')}
                                className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                rows={3}
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='block font-medium'>
                                Image URL
                            </label>
                            <input
                                name='image'
                                value={form.twitter.image || ''}
                                onChange={(e) => handleChange(e, 'twitter')}
                                className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            />
                        </div>

                        {/* Twitter app */}
                        <div className='border p-3 rounded bg-gray-50'>
                            <h4 className='font-semibold mb-2'>App Details</h4>
                            <div className='grid md:grid-cols-3 gap-2'>
                                <input
                                    placeholder='App Name'
                                    value={form.twitter.app.name || ''}
                                    onChange={(e) =>
                                        handleTwitterAppChange(
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                />
                                <input
                                    placeholder='App ID'
                                    value={form.twitter.app.id || ''}
                                    onChange={(e) =>
                                        handleTwitterAppChange(
                                            'id',
                                            e.target.value,
                                        )
                                    }
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                />
                                <input
                                    placeholder='App URL'
                                    value={form.twitter.app.url || ''}
                                    onChange={(e) =>
                                        handleTwitterAppChange(
                                            'url',
                                            e.target.value,
                                        )
                                    }
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Favicons */}
                    <div className='border-t pt-4'>
                        <h3 className='text-xl font-semibold mb-2'>Favicons</h3>
                        <div className='grid md:grid-cols-2 gap-4'>
                            {Object.entries(form.favicons).map(([key, val]) => (
                                <div key={key}>
                                    <label className='block font-medium capitalize'>
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </label>
                                    <input
                                        name={key}
                                        value={val || ''}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                favicons: {
                                                    ...prev.favicons,
                                                    [key]: e.target.value,
                                                },
                                            }))
                                        }
                                        className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                        placeholder={`URL for ${key}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Structured Data */}
                    <div className='border-t pt-4'>
                        <h3 className='text-xl font-semibold mb-2'>
                            Structured Data (JSON-LD)
                        </h3>
                        {form.structuredData?.map((sd, i) => (
                            <div
                                key={i}
                                className='mb-4 border p-4 rounded bg-gray-50'
                            >
                                <div className='mb-2'>
                                    <label className='block font-medium'>
                                        Schema Type
                                    </label>
                                    <input
                                        placeholder='e.g., Organization, LocalBusiness, Article'
                                        value={sd.type || ''}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                'structuredData',
                                                i,
                                                'type',
                                                e.target.value,
                                            )
                                        }
                                        className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    />
                                </div>
                                <div className='mb-2'>
                                    <label className='block font-medium'>
                                        JSON Data
                                    </label>
                                    <textarea
                                        placeholder='Enter valid JSON data'
                                        value={JSON.stringify(
                                            sd.data || {},
                                            null,
                                            2,
                                        )}
                                        onChange={(e) => {
                                            let parsed = {}
                                            try {
                                                parsed = JSON.parse(
                                                    e.target.value,
                                                )
                                            } catch (error) {
                                                // Keep the current value if JSON is invalid
                                                return
                                            }
                                            handleArrayChange(
                                                'structuredData',
                                                i,
                                                'data',
                                                parsed,
                                            )
                                        }}
                                        className='w-full p-2 border rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                        rows={8}
                                    />
                                </div>
                                <button
                                    type='button'
                                    className='text-red-600 hover:text-red-800 border border-red-600 px-3 py-1 rounded'
                                    onClick={() =>
                                        removeArrayItem('structuredData', i)
                                    }
                                >
                                    Remove Schema
                                </button>
                            </div>
                        ))}
                        <button
                            type='button'
                            className='text-blue-600 hover:text-blue-800 underline'
                            onClick={() =>
                                addArrayItem('structuredData', {
                                    type: '',
                                    data: {},
                                })
                            }
                        >
                            Add Structured Data
                        </button>
                    </div>

                    {/* Publisher */}
                    <div className='border-t pt-4'>
                        <h3 className='text-xl font-semibold mb-2'>
                            Publisher Information
                        </h3>
                        <div className='grid md:grid-cols-2 gap-4'>
                            <div>
                                <label className='block font-medium'>
                                    Name
                                </label>
                                <input
                                    name='name'
                                    value={form.publisher.name || ''}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            publisher: {
                                                ...prev.publisher,
                                                name: e.target.value,
                                            },
                                        }))
                                    }
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                />
                            </div>
                            <div>
                                <label className='block font-medium'>
                                    Type
                                </label>
                                <select
                                    name='type'
                                    value={
                                        form.publisher.type || 'Organization'
                                    }
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            publisher: {
                                                ...prev.publisher,
                                                type: e.target.value,
                                            },
                                        }))
                                    }
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                >
                                    <option value='Organization'>
                                        Organization
                                    </option>
                                    <option value='Person'>Person</option>
                                </select>
                            </div>
                            <div>
                                <label className='block font-medium'>
                                    Logo URL
                                </label>
                                <input
                                    name='logo'
                                    value={form.publisher.logo || ''}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            publisher: {
                                                ...prev.publisher,
                                                logo: e.target.value,
                                            },
                                        }))
                                    }
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                />
                            </div>
                            <div>
                                <label className='block font-medium'>
                                    Website URL
                                </label>
                                <input
                                    name='url'
                                    value={form.publisher.url || ''}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            publisher: {
                                                ...prev.publisher,
                                                url: e.target.value,
                                            },
                                        }))
                                    }
                                    className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Profiles */}
                    <div className='border-t pt-4'>
                        <h3 className='text-xl font-semibold mb-2'>
                            Social Profiles
                        </h3>
                        {form.socialProfiles?.map((sp, i) => (
                            <div
                                key={i}
                                className='flex gap-2 mb-2'
                            >
                                <input
                                    placeholder='Platform (e.g., Facebook, Twitter)'
                                    value={sp.platform || ''}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            'socialProfiles',
                                            i,
                                            'platform',
                                            e.target.value,
                                        )
                                    }
                                    className='flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                />
                                <input
                                    placeholder='Profile URL'
                                    value={sp.url || ''}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            'socialProfiles',
                                            i,
                                            'url',
                                            e.target.value,
                                        )
                                    }
                                    className='flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                />
                                <button
                                    type='button'
                                    className='text-red-600 hover:text-red-800 border border-red-600 px-3 py-2 rounded'
                                    onClick={() =>
                                        removeArrayItem('socialProfiles', i)
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type='button'
                            className='text-blue-600 hover:text-blue-800 underline'
                            onClick={() =>
                                addArrayItem('socialProfiles', {
                                    platform: '',
                                    url: '',
                                })
                            }
                        >
                            Add Social Profile
                        </button>
                    </div>

                    {/* Analytics */}
                    <div className='border-t pt-4'>
                        <h3 className='text-xl font-semibold mb-2'>
                            Analytics & Tracking
                        </h3>
                        <div className='grid md:grid-cols-2 gap-4'>
                            {Object.entries(form.analytics).map(
                                ([key, val]) => (
                                    <div key={key}>
                                        <label className='block font-medium capitalize'>
                                            {key
                                                .replace(/([A-Z])/g, ' $1')
                                                .replace(/Id$/, ' ID')}
                                        </label>
                                        <input
                                            name={key}
                                            value={val || ''}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    analytics: {
                                                        ...prev.analytics,
                                                        [key]: e.target.value,
                                                    },
                                                }))
                                            }
                                            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                            placeholder={`Enter ${key}`}
                                        />
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    {/* Extra Head */}
                    <div className='border-t pt-4'>
                        <h3 className='text-xl font-semibold mb-2'>
                            Extra Head Elements
                        </h3>

                        {/* Scripts */}
                        <div className='mb-6'>
                            <h4 className='font-semibold mb-2'>Scripts</h4>
                            {form.extraHead.scripts?.map((script, i) => (
                                <div
                                    key={i}
                                    className='mb-4 border p-4 rounded bg-gray-50'
                                >
                                    <div className='grid md:grid-cols-2 gap-2 mb-2'>
                                        <input
                                            placeholder='Script src URL'
                                            value={script.src || ''}
                                            onChange={(e) =>
                                                handleExtraHeadChange(
                                                    'scripts',
                                                    i,
                                                    'src',
                                                    e.target.value,
                                                )
                                            }
                                            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                        />
                                        <input
                                            placeholder='Script type (e.g., text/javascript)'
                                            value={script.type || ''}
                                            onChange={(e) =>
                                                handleExtraHeadChange(
                                                    'scripts',
                                                    i,
                                                    'type',
                                                    e.target.value,
                                                )
                                            }
                                            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                        />
                                    </div>
                                    <div className='flex gap-4 mb-2'>
                                        <label className='flex items-center gap-2'>
                                            <input
                                                type='checkbox'
                                                checked={script.async || false}
                                                onChange={(e) =>
                                                    handleExtraHeadChange(
                                                        'scripts',
                                                        i,
                                                        'async',
                                                        e.target.checked,
                                                    )
                                                }
                                                className='rounded'
                                            />
                                            Async
                                        </label>
                                        <label className='flex items-center gap-2'>
                                            <input
                                                type='checkbox'
                                                checked={script.defer || false}
                                                onChange={(e) =>
                                                    handleExtraHeadChange(
                                                        'scripts',
                                                        i,
                                                        'defer',
                                                        e.target.checked,
                                                    )
                                                }
                                                className='rounded'
                                            />
                                            Defer
                                        </label>
                                    </div>
                                    <textarea
                                        placeholder='Script content (innerHTML)'
                                        value={script.innerHTML || ''}
                                        onChange={(e) =>
                                            handleExtraHeadChange(
                                                'scripts',
                                                i,
                                                'innerHTML',
                                                e.target.value,
                                            )
                                        }
                                        className='w-full p-2 border rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                        rows={4}
                                    />
                                    <button
                                        type='button'
                                        className='mt-2 text-red-600 hover:text-red-800 border border-red-600 px-3 py-1 rounded'
                                        onClick={() =>
                                            removeExtraHeadItem('scripts', i)
                                        }
                                    >
                                        Remove Script
                                    </button>
                                </div>
                            ))}
                            <button
                                type='button'
                                className='text-blue-600 hover:text-blue-800 underline'
                                onClick={() =>
                                    addExtraHeadItem('scripts', {
                                        src: '',
                                        async: false,
                                        defer: false,
                                        type: '',
                                        innerHTML: '',
                                    })
                                }
                            >
                                Add Script
                            </button>
                        </div>

                        {/* NoScript */}
                        <div className='mb-6'>
                            <h4 className='font-semibold mb-2'>
                                NoScript Elements
                            </h4>
                            {form.extraHead.noscript?.map((ns, i) => (
                                <div
                                    key={i}
                                    className='mb-3 border p-3 rounded bg-gray-50'
                                >
                                    <textarea
                                        placeholder='NoScript content'
                                        value={ns.innerHTML || ''}
                                        onChange={(e) =>
                                            handleExtraHeadChange(
                                                'noscript',
                                                i,
                                                'innerHTML',
                                                e.target.value,
                                            )
                                        }
                                        className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                        rows={3}
                                    />
                                    <button
                                        type='button'
                                        className='mt-2 text-red-600 hover:text-red-800 border border-red-600 px-3 py-1 rounded'
                                        onClick={() =>
                                            removeExtraHeadItem('noscript', i)
                                        }
                                    >
                                        Remove NoScript
                                    </button>
                                </div>
                            ))}
                            <button
                                type='button'
                                className='text-blue-600 hover:text-blue-800 underline'
                                onClick={() =>
                                    addExtraHeadItem('noscript', {
                                        innerHTML: '',
                                    })
                                }
                            >
                                Add NoScript
                            </button>
                        </div>

                        {/* Links */}
                        <div className='mb-6'>
                            <h4 className='font-semibold mb-2'>
                                Link Elements
                            </h4>
                            {form.extraHead.links?.map((link, i) => (
                                <div
                                    key={i}
                                    className='mb-3 border p-3 rounded bg-gray-50'
                                >
                                    <div className='grid md:grid-cols-3 gap-2'>
                                        <input
                                            placeholder='rel (e.g., stylesheet, preload)'
                                            value={link.rel || ''}
                                            onChange={(e) =>
                                                handleExtraHeadChange(
                                                    'links',
                                                    i,
                                                    'rel',
                                                    e.target.value,
                                                )
                                            }
                                            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                        />
                                        <input
                                            placeholder='href URL'
                                            value={link.href || ''}
                                            onChange={(e) =>
                                                handleExtraHeadChange(
                                                    'links',
                                                    i,
                                                    'href',
                                                    e.target.value,
                                                )
                                            }
                                            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                        />
                                        <input
                                            placeholder='type (e.g., text/css)'
                                            value={link.type || ''}
                                            onChange={(e) =>
                                                handleExtraHeadChange(
                                                    'links',
                                                    i,
                                                    'type',
                                                    e.target.value,
                                                )
                                            }
                                            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                        />
                                    </div>
                                    <button
                                        type='button'
                                        className='mt-2 text-red-600 hover:text-red-800 border border-red-600 px-3 py-1 rounded'
                                        onClick={() =>
                                            removeExtraHeadItem('links', i)
                                        }
                                    >
                                        Remove Link
                                    </button>
                                </div>
                            ))}
                            <button
                                type='button'
                                className='text-blue-600 hover:text-blue-800 underline'
                                onClick={() =>
                                    addExtraHeadItem('links', {
                                        rel: '',
                                        href: '',
                                        type: '',
                                    })
                                }
                            >
                                Add Link
                            </button>
                        </div>
                    </div>

                    {/* Custom Meta */}
                    <div className='border-t pt-4'>
                        <h3 className='text-xl font-semibold mb-2'>
                            Custom Meta Tags
                        </h3>
                        {form.customMeta?.map((meta, i) => (
                            <div
                                key={i}
                                className='mb-3 border p-3 rounded bg-gray-50'
                            >
                                <div className='grid md:grid-cols-3 gap-2'>
                                    <input
                                        placeholder='Name attribute'
                                        value={meta.name || ''}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                'customMeta',
                                                i,
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    />
                                    <input
                                        placeholder='Content'
                                        value={meta.content || ''}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                'customMeta',
                                                i,
                                                'content',
                                                e.target.value,
                                            )
                                        }
                                        className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    />
                                    <input
                                        placeholder='Property attribute (optional)'
                                        value={meta.property || ''}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                'customMeta',
                                                i,
                                                'property',
                                                e.target.value,
                                            )
                                        }
                                        className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    />
                                </div>
                                <button
                                    type='button'
                                    className='mt-2 text-red-600 hover:text-red-800 border border-red-600 px-3 py-1 rounded'
                                    onClick={() =>
                                        removeArrayItem('customMeta', i)
                                    }
                                >
                                    Remove Meta Tag
                                </button>
                            </div>
                        ))}
                        <button
                            type='button'
                            className='text-blue-600 hover:text-blue-800 underline'
                            onClick={() =>
                                addArrayItem('customMeta', {
                                    name: '',
                                    content: '',
                                    property: '',
                                })
                            }
                        >
                            Add Custom Meta Tag
                        </button>
                    </div>

                    {/* Environment */}
                    <div className='border-t pt-4 mb-6'>
                        <h3 className='text-xl font-semibold mb-2'>
                            Environment Settings
                        </h3>
                        <div className='flex gap-6'>
                            <label className='flex items-center gap-2'>
                                <input
                                    type='checkbox'
                                    checked={form.environment.showInProduction}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            environment: {
                                                ...prev.environment,
                                                showInProduction:
                                                    e.target.checked,
                                            },
                                        }))
                                    }
                                    className='rounded'
                                />
                                Show in Production
                            </label>
                            <label className='flex items-center gap-2'>
                                <input
                                    type='checkbox'
                                    checked={form.environment.showInStaging}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            environment: {
                                                ...prev.environment,
                                                showInStaging: e.target.checked,
                                            },
                                        }))
                                    }
                                    className='rounded'
                                />
                                Show in Staging
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='flex gap-4 pt-6 border-t'>
                        <button
                            type='submit'
                            disabled={loading}
                            className={`px-6 py-3 rounded font-medium transition-colors ${
                                loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : mode === 'edit'
                                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                    : 'bg-blue-600hover:bg-blue-700 text-white'
                            }`}
                        >
                            {loading
                                ? 'Saving...'
                                : mode === 'edit'
                                ? 'Update SEO Data'
                                : 'Create SEO Data'}
                        </button>

                        {mode === 'edit' && (
                            <button
                                type='button'
                                onClick={resetForm}
                                className='px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded font-medium transition-colors'
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Quick Actions */}
            <div className='mt-8 bg-blue-50 p-4 rounded-lg'>
                <h3 className='text-lg font-semibold mb-2'>Quick Actions</h3>
                <div className='flex flex-wrap gap-2'>
                    <button
                        onClick={fetchSeoData}
                        disabled={loading}
                        className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400'
                    >
                        Refresh Data
                    </button>
                    <button
                        onClick={() => {
                            const dataStr = JSON.stringify(existingSeo, null, 2)
                            const dataBlob = new Blob([dataStr], {
                                type: 'application/json',
                            })
                            const url = URL.createObjectURL(dataBlob)
                            const link = document.createElement('a')
                            link.href = url
                            link.download = 'seo-data-backup.json'
                            link.click()
                            URL.revokeObjectURL(url)
                        }}
                        className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
                    >
                        Export Data
                    </button>
                    <button
                        onClick={() => {
                            if (
                                confirm(
                                    'This will clear the current form. Are you sure?',
                                )
                            ) {
                                resetForm()
                            }
                        }}
                        className='px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700'
                    >
                        Clear Form
                    </button>
                </div>
            </div>

            {/* Statistics */}
            {existingSeo.length > 0 && (
                <div className='mt-8 bg-gray-50 p-4 rounded-lg'>
                    <h3 className='text-lg font-semibold mb-2'>Statistics</h3>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
                        <div className='bg-white p-3 rounded'>
                            <div className='text-2xl font-bold text-blue-600'>
                                {existingSeo.length}
                            </div>
                            <div className='text-sm text-gray-600'>
                                Total Pages
                            </div>
                        </div>
                        <div className='bg-white p-3 rounded'>
                            <div className='text-2xl font-bold text-green-600'>
                                {
                                    existingSeo.filter(
                                        (e) => e.openGraph?.images?.length > 0,
                                    ).length
                                }
                            </div>
                            <div className='text-sm text-gray-600'>
                                With OG Images
                            </div>
                        </div>
                        <div className='bg-white p-3 rounded'>
                            <div className='text-2xl font-bold text-purple-600'>
                                {
                                    existingSeo.filter(
                                        (e) => e.structuredData?.length > 0,
                                    ).length
                                }
                            </div>
                            <div className='text-sm text-gray-600'>
                                With Schema
                            </div>
                        </div>
                        <div className='bg-white p-3 rounded'>
                            <div className='text-2xl font-bold text-orange-600'>
                                {
                                    existingSeo.filter(
                                        (e) => e.analytics?.googleAnalyticsId,
                                    ).length
                                }
                            </div>
                            <div className='text-sm text-gray-600'>
                                With Analytics
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Help Section */}
            <div className='mt-8 bg-yellow-50 p-4 rounded-lg'>
                <h3 className='text-lg font-semibold mb-2'>💡 Tips</h3>
                <ul className='text-sm text-gray-700 space-y-1'>
                    <li>
                        • Use descriptive titles (50-60 characters) and meta
                        descriptions (150-160 characters)
                    </li>
                    <li>
                        • Open Graph images should be at least 1200x630 pixels
                        for best results
                    </li>
                    <li>
                        • Test your structured data using Googles Rich Results
                        Test
                    </li>
                    <li>
                        • Always preview your social media cards before
                        publishing
                    </li>
                    <li>
                        • Use canonical URLs to avoid duplicate content issues
                    </li>
                </ul>
            </div>
        </div>
    )
}
