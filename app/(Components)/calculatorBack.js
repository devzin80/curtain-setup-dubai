'use client'

import { useEffect, useState } from 'react'

// Show toast
const showToast = (message, type = 'success') => {
    const toast = document.createElement('div')
    toast.textContent = message
    toast.className = `fixed top-5 right-5 z-50 px-4 py-2 text-white rounded shadow transition-all duration-300 ${
        type === 'error' ? 'bg-red-600' : 'bg-green-600'
    }`
    document.body.appendChild(toast)

    setTimeout(() => {
        toast.style.opacity = '0'
        setTimeout(() => toast.remove(), 300)
    }, 3000)
}

export default function CalculatorPage() {
    const [calculators, setCalculators] = useState([])
    const [form, setForm] = useState({
        _id: null,
        name: '',
        hasVariants: false,
        price: '',
        factor: '',
        variants: [],
    })

    useEffect(() => {
        fetchCalculators()
    }, [])

    const fetchCalculators = async () => {
        const res = await fetch(`/api/calculator`)
        const data = await res.json()
        setCalculators(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const method = form._id ? 'PATCH' : 'POST'

        const res = await fetch(`/api/calculator`, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                form._id
                    ? {
                          id: form._id,
                          name: form.name,
                          hasVariants: form.hasVariants,
                          price: form.price,
                          factor: form.factor,
                          variants: form.variants,
                      }
                    : form,
            ),
        })

        if (res.ok) {
            showToast(form._id ? 'Calculator updated!' : 'Calculator added!')
            setForm({
                _id: null,
                name: '',
                hasVariants: false,
                price: '',
                factor: '',
                variants: [],
            })
            fetchCalculators()
        } else {
            const err = await res.json().catch(() => null)
            showToast(err?.message || 'Failed to save', 'error')
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return

        const res = await fetch(`/api/calculator`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        })

        const data = await res.json()

        if (res.ok) {
            showToast('Deleted successfully!')
            fetchCalculators()
        } else {
            showToast(data.message || 'Delete failed', 'error')
        }
    }

    const handleEdit = (calc) => {
        setForm({
            _id: calc._id,
            name: calc.name,
            hasVariants: calc.hasVariants,
            price: calc.price || '',
            factor: calc.factor || '',
            variants: calc.variants || [],
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleVariantChange = (index, key, value) => {
        const updatedVariants = [...form.variants]
        updatedVariants[index][key] = value
        setForm({ ...form, variants: updatedVariants })
    }

    const addVariant = () => {
        setForm({
            ...form,
            variants: [...form.variants, { name: '', price: '', factor: '' }],
        })
    }

    const removeVariant = (index) => {
        const updated = [...form.variants]
        updated.splice(index, 1)
        setForm({ ...form, variants: updated })
    }

    return (
        <div className='p-6 w-full max-w-3xl mx-auto space-y-8'>
            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className='bg-white border shadow p-6 space-y-6 rounded'
            >
                <h2 className='text-xl font-semibold'>
                    {form._id ? 'Edit Calculator' : 'Add Calculator'}
                </h2>

                <input
                    type='text'
                    placeholder='Name'
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className='w-full p-3 border rounded'
                />

                <label className='flex items-center space-x-2'>
                    <input
                        type='checkbox'
                        checked={form.hasVariants}
                        onChange={(e) =>
                            setForm({ ...form, hasVariants: e.target.checked })
                        }
                    />
                    <span>Has Variants</span>
                </label>

                {/* Non-variant inputs */}
                <div
                    className={`${
                        form.hasVariants
                            ? 'hidden'
                            : 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                    }`}
                >
                    <div className='flex flex-col'>
                        <label
                            htmlFor='price'
                            className='mb-1 text-sm font-medium'
                        >
                            Price
                        </label>
                        <input
                            id='price'
                            type='number'
                            placeholder='Price'
                            value={form.price}
                            onChange={(e) =>
                                setForm({ ...form, price: e.target.value })
                            }
                            required={!form.hasVariants}
                            className='w-full p-3 border rounded'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label
                            htmlFor='factor'
                            className='mb-1 text-sm font-medium'
                        >
                            Factor
                        </label>
                        <input
                            id='factor'
                            type='number'
                            placeholder='Factor'
                            value={form.factor}
                            onChange={(e) =>
                                setForm({ ...form, factor: e.target.value })
                            }
                            required={!form.hasVariants}
                            className='w-full p-3 border rounded'
                        />
                    </div>
                </div>

                {/* Variant inputs */}
                <div className={`${form.hasVariants ? 'space-y-6' : 'hidden'}`}>
                    {form.variants.map((variant, index) => (
                        <div
                            key={index}
                            className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-start'
                        >
                            <div className='flex flex-col'>
                                <label
                                    htmlFor={`variant-name-${index}`}
                                    className='mb-1 text-sm font-medium'
                                >
                                    Variant Name
                                </label>
                                <input
                                    id={`variant-name-${index}`}
                                    type='text'
                                    placeholder='Variant Name'
                                    value={variant.name}
                                    onChange={(e) =>
                                        handleVariantChange(
                                            index,
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                    required={form.hasVariants}
                                    className='p-3 border rounded'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label
                                    htmlFor={`variant-price-${index}`}
                                    className='mb-1 text-sm font-medium'
                                >
                                    Price
                                </label>
                                <input
                                    id={`variant-price-${index}`}
                                    type='number'
                                    placeholder='Price'
                                    value={variant.price}
                                    onChange={(e) =>
                                        handleVariantChange(
                                            index,
                                            'price',
                                            e.target.value,
                                        )
                                    }
                                    required={form.hasVariants}
                                    className='p-3 border rounded'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label
                                    htmlFor={`variant-factor-${index}`}
                                    className='mb-1 text-sm font-medium'
                                >
                                    Factor
                                </label>
                                <input
                                    id={`variant-factor-${index}`}
                                    type='number'
                                    placeholder='Factor'
                                    value={variant.factor}
                                    onChange={(e) =>
                                        handleVariantChange(
                                            index,
                                            'factor',
                                            e.target.value,
                                        )
                                    }
                                    required={form.hasVariants}
                                    className='p-3 border rounded'
                                />
                            </div>
                            <button
                                type='button'
                                onClick={() => removeVariant(index)}
                                className='text-red-600 text-sm mt-6'
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type='button'
                        onClick={addVariant}
                        className='bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm'
                    >
                        + Add Variant
                    </button>
                </div>

                <button
                    type='submit'
                    className='bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700'
                >
                    {form._id ? 'Update' : 'Add'}
                </button>
            </form>

            {/* List */}
            <div>
                <h2 className='text-xl font-semibold mb-3'>All Calculators</h2>
                {calculators.length === 0 ? (
                    <p>No calculators found.</p>
                ) : (
                    <div className='space-y-4'>
                        {calculators.map((calc) => (
                            <div
                                key={calc._id}
                                className='p-4 border rounded flex flex-col sm:flex-row justify-between items-start sm:items-center'
                            >
                                <div className='mb-4 sm:mb-0'>
                                    <h3 className='font-bold text-lg'>
                                        {calc.name}
                                    </h3>
                                    {calc.hasVariants ? (
                                        <ul className='text-sm list-disc ml-5'>
                                            {calc.variants.map((v, i) => (
                                                <li key={i}>
                                                    {v.name} - ${v.price} ×{' '}
                                                    {v.factor}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className='text-sm text-gray-700'>
                                            Price: ${calc.price} × {calc.factor}
                                        </p>
                                    )}
                                </div>
                                <div className='space-x-4'>
                                    <button
                                        onClick={() => handleEdit(calc)}
                                        className='text-blue-600 hover:underline'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(calc._id)}
                                        className='text-red-600 hover:underline'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
