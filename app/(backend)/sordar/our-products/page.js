'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const OurProducts = () => {
    const [products, setProducts] = useState([])
    const [form, setForm] = useState({
        _id: null,
        title: '',
        description: '',
        image: null,
    })
    const inputRef = useRef(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/our-products`, 
        )
        const data = await res.json()
        console.log(data);
        
        setProducts(data)
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

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/our-products`,
            {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            },
        )

        if (res.ok) {
            showToast(form._id ? 'Updated!' : 'Added!')
            setForm({ _id: null, title: '', description: '', image: null })
            fetchProducts()
        } else {
            showToast('Failed to save', 'error')
        }
    }

    const handleEdit = (product) => {
        setForm(product)
        showToast('Edit mode enabled')
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/our-products?id=${id}`,
            {
                method: 'DELETE',
            },
        )

        if (res.ok) {
            showToast('Deleted!')
            fetchProducts()
        } else {
            showToast('Failed to delete', 'error')
        }
    }

    return (
        <div className='w-[90vw] md:w-[40vw] mx-auto p-6'>
            <h1 className='text-2xl font-bold mb-6 text-center'>
                Our products Section
            </h1>

            {/* FORM */}
            <div className='bg-white shadow shadow-sky-600 rounded p-4 space-y-4 mb-10'>
                <div>
                    <label className='block font-medium'>Title</label>
                    <input
                        type='text'
                        name='title'
                        className='w-full border p-2 rounded'
                        value={form?.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className='block font-medium'>Description</label>
                    <input
                        type='text'
                        name='description'
                        className='w-full border p-2 rounded'
                        value={form?.description}
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
                        />
                    </div>

                    {form.image && (
                        <div className='relative mt-4 w-max'>
                            <Image
                                src={form?.image?.url}
                                alt={form?.image?.name}
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
                    Our products
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-2 gap-6'>
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className='bg-white shadow p-4 rounded space-y-2'
                        >
                            <div className='flex justify-end items-center gap-2'>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className='text-sm text-blue-600 underline'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(product._id)
                                        }
                                        className='text-sm text-red-600 underline'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className='text-xl text-blue-700'>
                                {product?.title}
                            </p>
                            <p className='text-sm text-black'>
                                {product?.description}
                            </p>
                            {product.image?.url && (
                                <Image
                                    src={product?.image?.url}
                                    alt={product?.image?.name}
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

export default OurProducts
