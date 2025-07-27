'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const WhyWeAreTrusted = () => {
    const [contents, setContents] = useState([])
    const [form, setForm] = useState({
        _id: null,
        title: '',
        description: '',
        image: null,
        button: '',
    })
    const inputRef = useRef(null)
    const fetchContents = async () => {
        try {
            const res = await fetch(`/api/why-we-are-trusted`)
            if (!res.ok) throw new Error('Failed to fetch')
            const data = await res.json()
            setContents(data)
        } catch (err) {
            showToast('Failed to load contents', 'error')
        }
    }

    useEffect(() => {
        fetchContents()
    }, [])

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
                image: { name: file.name, url: reader.result },
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

    const removeImage = () => setForm((prev) => ({ ...prev, image: null }))

    const handleSubmit = async () => {
        const method = form._id ? 'PATCH' : 'POST'
        try {
            const res = await fetch(`/api/why-we-are-trusted`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (res.ok) {
                showToast(form._id ? 'Updated!' : 'Added!')
                setForm({
                    _id: null,
                    title: '',
                    description: '',
                    image: null,
                    button: '',
                })
                fetchContents()
            } else {
                showToast('Failed to save', 'error')
            }
        } catch (err) {
            showToast('Network error', 'error')
        }
    }

    const handleEdit = (content) => {
        setForm(content)
        showToast('Edit mode enabled')
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this content?')) return

        const res = await fetch(`/api/why-we-are-trusted?id=${id}`, {
            method: 'DELETE',
        })

        if (res.ok) {
            showToast('Deleted!')
            fetchContents()
        } else {
            showToast('Failed to delete', 'error')
        }
    }
    return (
        <div className='w-[90vw] md:w-[40vw] mx-auto p-6'>
            <h1 className='text-2xl font-bold mb-6 text-center'>
                Our contents Section
            </h1>

            {/* FORM */}
            <div className='bg-white shadow shadow-sky-600 rounded p-4 space-y-4 mb-10'>
                <div>
                    <label className='block font-medium'>Title</label>
                    <input
                        type='text'
                        name='title'
                        className='w-full border p-2 rounded'
                        value={form.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className='block font-medium'>Description</label>
                    <input
                        type='text'
                        name='description'
                        className='w-full border p-2 rounded'
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className='block font-medium'>
                        Add Button To Content
                    </label>
                    <select
                        name='button'
                        className='w-full border p-2 rounded'
                        value={form.button || ''}
                        onChange={handleChange}
                    >
                        <option
                            value=''
                            disabled
                        >
                            Select a Button
                        </option>
                        <option value='null'>Not Applicable</option>
                        <option value='free-visit'>Book A Free Visit</option>
                        <option value='price-calculator'>Get Estimate</option>
                    </select>
                </div>

                <div>
                    <label className='block font-medium mb-1'>
                        Upload Image
                    </label>
                    <div
                        className='w-full p-6 border-2 border-dashed rounded-md text-center cursor-pointer hover:border-blue-600'
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={openFilePicker}
                    >
                        <p className='text-gray-600'>
                            Drag and drop image here or click to select
                        </p>
                        <input
                            type='file'
                            hidden
                            onChange={handleFileChange}
                            ref={inputRef}
                        />
                    </div>

                    {form.image && (
                        <div className='relative mt-4 w-max'>
                            <Image
                                src={form.image.url}
                                alt={form.image.name}
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
                    disabled={!form.title || !form.description || !form.image}
                >
                    {form._id ? 'Update content' : 'Add content'}
                </button>
            </div>

            {/* LIST */}
            <div>
                <h2 className='text-2xl font-bold text-center mb-6'>
                    Our contents
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {contents?.map((content) => (
                        <div
                            key={content._id}
                            className='bg-white shadow p-4 rounded space-y-2'
                        >
                            <div className='flex justify-end items-center gap-2'>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => handleEdit(content)}
                                        className='text-sm text-blue-600 underline'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(content._id)
                                        }
                                        className='text-sm text-red-600 underline'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className='text-xl text-blue-700'>
                                {content.title}
                            </p>
                            <p className='text-sm text-black'>
                                {content.description}
                            </p>
                            <p className='text-sm text-black'>
                                Button: {content.button}
                            </p>
                            {content.image?.url && (
                                <Image
                                    src={content.image.url}
                                    alt={content.image.name}
                                    width={300}
                                    height={300}
                                    className='object-cover rounded border'
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WhyWeAreTrusted
