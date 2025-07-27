'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const OurRecentWorks = () => {
    const [recentWorks, setRecentWorks] = useState([])
    const [form, setForm] = useState({
        _id: null,
        location: '',
        image: null,
    })
    const inputRef = useRef(null)

    useEffect(() => {
        fetchRecentWorks()
    }, [])

    const fetchRecentWorks = async () => {
        const res = await fetch('/api/recent-works')
        const data = await res.json()
        setRecentWorks(data)
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

    const handleFileInput = (files) => {
        const file = files[0]
        if (!file) return
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
        if (!form.location) {
            showToast('Location is required', 'error')
            return
        }

        const body = {
            _id: form._id,
            location: form.location,
            image: form.image ? form.image : null,
        }

        const method = form._id ? 'PATCH' : 'POST'

        const res = await fetch('/api/recent-works', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        if (res.ok) {
            showToast(form._id ? 'Updated!' : 'Added!')
            setForm({ _id: null, location: '', image: null })
            fetchRecentWorks()
        } else {
            showToast('Failed to save', 'error')
        }
    }

    const handleEdit = (work) => {
        setForm({
            _id: work._id,
            location: work.location,
            image: work.image || null,
        })
        showToast('Edit mode enabled')
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this?')) return

        const res = await fetch(`/api/recent-works?id=${id}`, {
            method: 'DELETE',
        })

        if (res.ok) {
            showToast('Deleted!')
            fetchRecentWorks()
        } else {
            showToast('Failed to delete', 'error')
        }
    }

    return (
        <div className='w-[90vw] md:w-[40vw] mx-auto p-6'>
            <h1 className='text-2xl font-bold mb-6 text-center'>
                Add Recent Works
            </h1>

            {/* FORM */}
            <div className='bg-white shadow shadow-sky-600 rounded p-4 space-y-4 mb-10'>
                <div>
                    <label className='block font-medium'>Location</label>
                    <input
                        type='text'
                        name='location'
                        className='w-full border p-2 rounded'
                        value={form.location}
                        onChange={handleChange}
                    />
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
                            accept='image/*'
                        />
                    </div>

                    {form.image && (
                        <div className='relative mt-4 w-max'>
                            <Image
                                src={form.image.url}
                                alt={form.image.name}
                                width={80}
                                height={80}
                                className='rounded'
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
                    className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mx-auto block disabled:opacity-50'
                    disabled={!form.location || !form.image}
                >
                    {form._id ? 'Update' : 'Upload'}
                </button>
            </div>

            {/* LIST */}
            <div>
                <h2 className='text-2xl font-bold text-center mb-6'>
                    Our Recent Works
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {recentWorks.map((work) => (
                        <div
                            key={work._id}
                            className='bg-white shadow p-4 rounded space-y-2'
                        >
                            <div className='flex justify-end items-center gap-2'>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => handleEdit(work)}
                                        className='text-sm text-blue-600 underline'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(work._id)}
                                        className='text-sm text-red-600 underline'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className='text-xl text-blue-700'>
                                {work.location}
                            </p>

                            {work.image?.url && (
                                <Image
                                    src={work.image.url}
                                    alt={work.image.name}
                                    width={300}
                                    height={300}
                                    className='object-cover rounded'
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OurRecentWorks
