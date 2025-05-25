'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import slugify from 'slugify'

const AdditionalProducts = () => {
    const [products, setProducts] = useState([])
    const [form, setForm] = useState({
        _id: null,
        name: '',
        slug: '',
        category: 'others',
        description: '',
        images: [],
    })
    const [selectedFiles, setSelectedFiles] = useState([])
    const inputRef = useRef(null)

    const fetchProducts = async () => {
        try {
            const res = await fetch(
                '/api/best-selling-products?category=others',
            )
            if (!res.ok) {
                throw new Error('Failed to fetch')
            }
            const data = await res.json()
            setProducts(data)
        } catch (error) {
            console.error('Fetch error:', error)
            setProducts([]) // fallback to empty list
        }
    }
    useEffect(() => {
        fetchProducts()
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

        // Auto-generate slug when "name" field changes
        if (name === 'name') {
            setForm((prev) => ({
                ...prev,
                name: value,
                slug: slugify(value, { lower: true, strict: true }),
            }))
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    const openFilePicker = () => {
        inputRef.current.click()
    }
    const handleFileInput = async (files) => {
        const fileList = Array.from(files)
        setSelectedFiles((prev) => [...prev, ...fileList])

        const previews = await Promise.all(
            fileList.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        resolve({ name: file.name, url: reader.result })
                    }
                    reader.onerror = reject
                    reader.readAsDataURL(file)
                })
            }),
        )

        setForm((prev) => ({ ...prev, images: [...prev.images, ...previews] }))
    }

    const handleDrop = (e) => {
        e.preventDefault()
        handleFileInput(e.dataTransfer.files)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleFileChange = (e) => {
        handleFileInput(e.target.files)
    }

    const removeImage = (index) => {
        const updatedImages = [...form.images]
        updatedImages.splice(index, 1)
        setForm((prev) => ({ ...prev, images: updatedImages }))
    }

    const handleSubmit = async () => {
        const method = form._id ? 'PATCH' : 'POST'

        // Use FormData for file uploads
        const formData = new FormData()
        formData.append('name', form.name)
        formData.append('slug', form.slug)
        formData.append('category', form.category)
        formData.append('description', form.description)
        selectedFiles.forEach((file) => formData.append('files', file))
        if (form._id) formData.append('_id', form._id)

        const res = await fetch('/api/best-selling-products', {
            method,
            body: formData,
        })

        if (res.ok) {
            showToast(form._id ? 'Product updated!' : 'Product added!')
            setForm({
                _id: null,
                name: '',
                slug: '',
                category: 'others',
                description: '',
                images: [],
            })
            setSelectedFiles([])
            fetchProducts()
        } else {
            showToast('Failed to save product', 'error')
        }
    }

    const handleEdit = (product) => {
        setForm(product)
        setSelectedFiles([]) // Reset file input
        showToast('Edit mode enabled')
    }

    const handleDelete = async (id) => {
        const confirmed = confirm(
            'Are you sure you want to delete this product?',
        )
        if (!confirmed) return

        const res = await fetch(`/api/best-selling-products?id=${id}`, {
            method: 'DELETE',
        })

        if (res.ok) {
            showToast('Product deleted!')
            fetchProducts()
        } else {
            showToast('Failed to delete product', 'error')
        }
    }
    return (
        <div className='w-[30vw] mx-auto p-6'>
            <h1 className='text-2xl font-bold mb-6 text-center'>
                Best Selling Products
            </h1>

            {/* FORM */}
            <div className=' bg-white shadow shadow-sky-600 rounded p-4 space-y-4 mb-10'>
                <div>
                    <label className='block font-medium'>Name</label>
                    <input
                        type='text'
                        name='name'
                        className='w-full border p-2 rounded'
                        value={form?.name || ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className='block font-medium'>Slug</label>
                    <input
                        type='text'
                        name='slug'
                        className='w-full border p-2 rounded bg-gray-100'
                        value={form?.slug}
                        readOnly
                    />
                </div>

                <div>
                    <label className='block font-medium'>Category</label>
                    <select
                        name='category'
                        className='w-full border p-2 rounded'
                        value={form?.category || ''}
                        onChange={handleChange}
                    >
                        <option
                            value=''
                            disabled
                        >
                            Select a category
                        </option>
                        <option value='curtains'>Curtains</option>
                        <option value='others'>Others</option>
                    </select>
                </div>

                <div>
                    <label className='block font-medium mb-1'>
                        Upload Images
                    </label>
                    <div
                        className='w-full p-6 border-2 border-dashed rounded-md text-center cursor-pointer hover:border-blue-600'
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={openFilePicker}
                    >
                        <p className='text-gray-600'>
                            Drag and drop images here or click to select
                        </p>
                        <input
                            type='file'
                            hidden
                            multiple
                            onChange={handleFileChange}
                            className='mt-2'
                            ref={inputRef}
                        />
                    </div>
                    <div className='flex gap-3 flex-wrap mt-4'>
                        {form?.images?.map((img) => (
                            <div
                                key={img.url || img.name}
                                className='relative'
                            >
                                <Image
                                    src={img?.url}
                                    alt={img?.name}
                                    width={80}
                                    height={80}
                                    className='border rounded'
                                />
                                <button
                                    onClick={() => removeImage(i)}
                                    className='absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center'
                                    title='Remove'
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <Uploader apiPath={'/api/best-selling-products'} /> */}

                <button
                    onClick={handleSubmit}
                    className='text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mx-auto block'
                >
                    {form._id ? 'Update Product' : 'Add Product'}
                </button>
            </div>

            {/* PRODUCT LIST */}
            <div>
                <h1 className='text-3xl font-bold text-center m-10'>
                    Product List
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {products.map((product) => (
                        <div
                            key={product?._id}
                            className='bg-white shadow p-4 rounded space-y-2'
                        >
                            <div className='flex justify-between items-center gap-2'>
                                <h2 className='font-semibold text-lg'>
                                    {product?.name}
                                </h2>
                                <button
                                    onClick={() => handleEdit(product)}
                                    className='text-sm text-blue-600 underline'
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className='text-sm text-blue-600 underline'
                                >
                                    Delete
                                </button>
                            </div>
                            <p className='text-sm text-gray-600'>
                                {product?.category}
                            </p>
                            <div className='flex gap-2 flex-wrap'>
                                {product.images?.map((img, i) => (
                                    <Image
                                        key={i}
                                        src={img.url}
                                        alt={img.name}
                                        width={60}
                                        height={60}
                                        className='rounded border'
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdditionalProducts
