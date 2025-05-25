'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import slugify from 'slugify'

const SocialLinks = () => {
    const [socials, setSocials] = useState([])
    const [form, setForm] = useState({
        _id: null,
        name: '',
        url: '',
        logo: null,
    })
    const inputRef = useRef(null)

    useEffect(() => {
        fetchSocials()
    }, [])


    // `/api/privacy-policy`
    const fetchSocials = async () => {
        const res = await fetch(
            `/api/social-medias`,
        )
        const data = await res.json()
        setSocials(data)
    }

    const showToast = (msg, type = 'success') => {
        const toast = document.createElement('div')
        toast.className = `fixed bottom-4 left-4 px-4 py-2 rounded shadow-lg text-white text-sm z-50 ${
            type === 'error' ? 'bg-red-600' : 'bg-green-600'
        }`
        toast.innerText = msg
        document.body.appendChild(toast)
        setTimeout(() => toast.remove(), 3000)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const openFilePicker = () => inputRef.current.click()

    const handleFileInput = async (files) => {
        const file = files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            setForm((prev) => ({
                ...prev,
                logo: { name: file.name, url: reader.result },
            }))
        }
        reader.readAsDataURL(file)
    }

    const handleFileChange = (e) => {
        handleFileInput(e.target.files)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        handleFileInput(e.dataTransfer.files)
    }

    const handleDragOver = (e) => e.preventDefault()

    const removeImage = () => setForm((prev) => ({ ...prev, logo: null }))

    const handleSubmit = async () => {
        const method = form._id ? 'PATCH' : 'POST'

        const res = await fetch(
            `/api/social-medias`,
            {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            },
        )

        if (res.ok) {
            showToast(form._id ? 'Updated!' : 'Added!')
            setForm({ _id: null, name: '', url: '', logo: null })
            fetchSocials()
        } else {
            showToast('Failed to save', 'error')
        }
    }

    const handleEdit = (media) => {
        setForm(media)
        showToast('Edit mode enabled')
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this media?')) return

        const res = await fetch(
            `/api/social-medias?id=${id}`,
            {
                method: 'DELETE',
            },
        )

        if (res.ok) {
            showToast('Deleted!')
            fetchSocials()
        } else {
            showToast('Failed to delete', 'error')
        }
    }

    return (
        <div className='w-[90vw] md:w-[40vw] mx-auto p-6'>
            <h1 className='text-2xl font-bold mb-6 text-center'>
                All Social Media
            </h1>

            {/* FORM */}
            <div className='bg-white shadow shadow-sky-600 rounded p-4 space-y-4 mb-10'>
                <div>
                    <label className='block font-medium'>Name</label>
                    <input
                        type='text'
                        name='name'
                        className='w-full border p-2 rounded'
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className='block font-medium'>URL</label>
                    <input
                        type='text'
                        name='url'
                        className='w-full border p-2 rounded'
                        value={form.url}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className='block font-medium mb-1'>
                        Upload Logo
                    </label>
                    <div
                        className='w-full p-6 border-2 border-dashed rounded-md text-center cursor-pointer hover:border-blue-600'
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={openFilePicker}
                    >
                        <p className='text-gray-600'>
                            Drag and drop logo here or click to select
                        </p>
                        <input
                            type='file'
                            hidden
                            onChange={handleFileChange}
                            ref={inputRef}
                        />
                    </div>

                    {form.logo && (
                        <div className='relative mt-4 w-max'>
                            <Image
                                src={form.logo.url}
                                alt={form.logo.name}
                                width={80}
                                height={80}
                                className='border rounded'
                            />
                            <button
                                onClick={removeImage}
                                className='absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center'
                                title='Remove'
                            >
                                ×
                            </button>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleSubmit}
                    className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mx-auto block'
                >
                    {form._id ? 'Update Media' : 'Add Media'}
                </button>
            </div>

            {/* LIST */}
            <div>
                <h2 className='text-2xl font-bold text-center mb-6'>
                    Social Media List
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {socials.map((media) => (
                        <div
                            key={media._id}
                            className='bg-white shadow p-4 rounded space-y-2'
                        >
                            <div className='flex justify-between items-center gap-2'>
                                <h2 className='font-semibold text-lg'>
                                    {media.name}
                                </h2>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => handleEdit(media)}
                                        className='text-sm text-blue-600 underline'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(media._id)}
                                        className='text-sm text-red-600 underline'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className='text-sm text-blue-700'>{media.url}</p>
                            {media.logo?.url && (
                                <Image
                                    src={media.logo.url}
                                    alt={media.logo.name}
                                    width={60}
                                    height={60}
                                    className='rounded border'
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SocialLinks
