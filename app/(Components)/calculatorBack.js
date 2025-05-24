// 'use client'
// import React from 'react'

// const CalculatorBack = () => {



//     return (
//         <div className='w-[90vw] md:w-[40vw] mx-auto p-6'>
//             <h1 className='text-2xl font-bold mb-6 text-center'>
//                 Set Up Curtain Price Calculator
//             </h1>
//             <div>
//                 <label className='block font-medium'>Curtain Name</label>
//                 <input
//                     type='text'
//                     name='name'
//                     className='w-full border p-2 rounded'
//                     value={''} 
//                     onChange={''}
//                 />
//             </div>
//             <div>
//                 <label className='block font-medium'>Have Variants</label>
//                 <input
//                     type='checkbox'
//                     name='haveVariants'
//                     className='w-full border p-2 rounded'
//                     value={''} 
//                     onChange={''}
//                 />
//             </div>
//         </div>
//     )
// }

// export default CalculatorBack



// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'

// export default function CalculatorBack() {
//     const { id } = useParams()
//     const router = useRouter()

//     const [loading, setLoading] = useState(true)
//     const [name, setName] = useState('')
//     const [hasVariants, setHasVariants] = useState(false)
//     const [price, setPrice] = useState('')
//     const [factor, setFactor] = useState('')
//     const [variants, setVariants] = useState([])

//     useEffect(() => {
//         const fetchCalculator = async () => {
//             const res = await fetch(`/api/calculator/${id}`)
//             const data = await res.json()

//             setName(data.name)
//             setHasVariants(data.hasVariants)
//             setPrice(data.price || '')
//             setFactor(data.factor || '')
//             setVariants(data.variants || [])
//             setLoading(false)
//         }

//         if (id) fetchCalculator()
//     }, [id])

//     const handleVariantChange = (index, field, value) => {
//         const updated = [...variants]
//         updated[index][field] = value
//         setVariants(updated)
//     }

//     const addVariant = () => {
//         setVariants([...variants, { name: '', price: '', factor: '' }])
//     }

//     const removeVariant = (index) => {
//         const updated = variants.filter((_, i) => i !== index)
//         setVariants(updated)
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const payload = {
//             name,
//             hasVariants,
//             ...(hasVariants
//                 ? { variants }
//                 : { price: Number(price), factor: Number(factor) }),
//         }

//         const res = await fetch(`/api/calculator/${id}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload),
//         })

//         if (res.ok) {
//             router.push('/calculator') // Redirect or show success
//         }
//     }

//     if (loading) return <p className='text-center p-6'>Loading...</p>

//     return (
//         <div className='max-w-2xl mx-auto p-6'>
//             <form
//                 onSubmit={handleSubmit}
//                 className='space-y-6 bg-white shadow-lg rounded-2xl p-8 border'
//             >
//                 <h2 className='text-2xl font-bold mb-4'>Edit Calculator</h2>

//                 <div>
//                     <label className='block mb-1 font-medium'>Name</label>
//                     <input
//                         type='text'
//                         className='w-full border px-4 py-2 rounded'
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className='flex items-center gap-4'>
//                     <label className='font-medium'>Has Variants?</label>
//                     <input
//                         type='checkbox'
//                         checked={hasVariants}
//                         onChange={() => setHasVariants(!hasVariants)}
//                         className='w-5 h-5'
//                     />
//                 </div>

//                 {!hasVariants && (
//                     <>
//                         <div>
//                             <label className='block mb-1 font-medium'>
//                                 Price
//                             </label>
//                             <input
//                                 type='number'
//                                 className='w-full border px-4 py-2 rounded'
//                                 value={price}
//                                 onChange={(e) => setPrice(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className='block mb-1 font-medium'>
//                                 Factor
//                             </label>
//                             <input
//                                 type='number'
//                                 className='w-full border px-4 py-2 rounded'
//                                 value={factor}
//                                 onChange={(e) => setFactor(e.target.value)}
//                                 required
//                             />
//                         </div>
//                     </>
//                 )}

//                 {hasVariants && (
//                     <div className='space-y-4'>
//                         <label className='block font-medium'>Variants</label>
//                         {variants.map((variant, index) => (
//                             <div
//                                 key={index}
//                                 className='grid grid-cols-3 gap-3 items-end border p-4 rounded'
//                             >
//                                 <input
//                                     type='text'
//                                     placeholder='Variant Name'
//                                     className='border px-3 py-2 rounded'
//                                     value={variant.name}
//                                     onChange={(e) =>
//                                         handleVariantChange(
//                                             index,
//                                             'name',
//                                             e.target.value,
//                                         )
//                                     }
//                                     required
//                                 />
//                                 <input
//                                     type='number'
//                                     placeholder='Price'
//                                     className='border px-3 py-2 rounded'
//                                     value={variant.price}
//                                     onChange={(e) =>
//                                         handleVariantChange(
//                                             index,
//                                             'price',
//                                             e.target.value,
//                                         )
//                                     }
//                                     required
//                                 />
//                                 <input
//                                     type='number'
//                                     placeholder='Factor'
//                                     className='border px-3 py-2 rounded'
//                                     value={variant.factor}
//                                     onChange={(e) =>
//                                         handleVariantChange(
//                                             index,
//                                             'factor',
//                                             e.target.value,
//                                         )
//                                     }
//                                     required
//                                 />
//                                 <button
//                                     type='button'
//                                     onClick={() => removeVariant(index)}
//                                     className='text-red-600 text-sm underline col-span-3'
//                                 >
//                                     Remove Variant
//                                 </button>
//                             </div>
//                         ))}
//                         <button
//                             type='button'
//                             onClick={addVariant}
//                             className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
//                         >
//                             + Add Variant
//                         </button>
//                     </div>
//                 )}

//                 <button
//                     type='submit'
//                     className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700'
//                 >
//                     Update Calculator
//                 </button>
//             </form>
//         </div>
//     )
// }

// 'use client'

// import { useEffect, useState } from 'react'
// import { useSearchParams, useRouter } from 'next/navigation'

// export default function CalculatorFormPage() {
//     const router = useRouter()
//     const searchParams = useSearchParams()
//     const id = searchParams.get('id')

//     const [loading, setLoading] = useState(true)
//     const [name, setName] = useState('')
//     const [hasVariants, setHasVariants] = useState(false)
//     const [price, setPrice] = useState('')
//     const [factor, setFactor] = useState('')
//     const [variants, setVariants] = useState([])

//     useEffect(() => {
//         if (!id) return setLoading(false)

//         const fetchData = async () => {
//             const res = await fetch(`/api/calculator/`)
//             if (res.ok) {
//                 const data = await res.json()
//                 setName(data.name)
//                 setHasVariants(data.hasVariants)
//                 setPrice(data.price || '')
//                 setFactor(data.factor || '')
//                 setVariants(data.variants || [])
//             }
//             setLoading(false)
//         }

//         fetchData()
//     }, [id])

//     const handleVariantChange = (index, field, value) => {
//         const updated = [...variants]
//         updated[index][field] = value
//         setVariants(updated)
//     }

//     const addVariant = () => {
//         setVariants([...variants, { name: '', price: '', factor: '' }])
//     }

//     const removeVariant = (index) => {
//         const updated = variants.filter((_, i) => i !== index)
//         setVariants(updated)
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         const payload = {
//             name,
//             hasVariants,
//             ...(hasVariants
//                 ? { variants }
//                 : { price: Number(price), factor: Number(factor) }),
//         }

//         const res = await fetch(
//             id ? `/api/calculator/${id}` : `/api/calculator`,
//             {
//                 method: id ? 'PUT' : 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload),
//             },
//         )

//         // if (res.ok) {
//         //     router.push('/calculator') // Redirect or show message
//         // }
//     }

//     if (loading) return <p className='p-6 text-center'>Loading...</p>

//     return (
//         <div className='w-full max-w-3xl mx-auto p-6'>
//             <form
//                 onSubmit={handleSubmit}
//                 className='space-y-6 bg-white shadow-lg rounded-2xl p-8 border'
//             >
//                 <h2 className='text-2xl font-bold mb-4'>
//                     {id ? 'Edit' : 'Create'} Calculator
//                 </h2>

//                 <div>
//                     <label className='block mb-1 font-medium'>Name</label>
//                     <input
//                         type='text'
//                         className='w-full border px-4 py-2 rounded'
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className='flex items-center gap-4'>
//                     <label className='font-medium'>Has Variants?</label>
//                     <input
//                         type='checkbox'
//                         checked={hasVariants}
//                         onChange={() => setHasVariants(!hasVariants)}
//                         className='w-5 h-5'
//                     />
//                 </div>

//                 {!hasVariants && (
//                     <>
//                         <div>
//                             <label className='block mb-1 font-medium'>
//                                 Price
//                             </label>
//                             <input
//                                 type='number'
//                                 className='w-full border px-4 py-2 rounded'
//                                 value={price}
//                                 onChange={(e) => setPrice(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className='block mb-1 font-medium'>
//                                 Factor
//                             </label>
//                             <input
//                                 type='number'
//                                 className='w-full border px-4 py-2 rounded'
//                                 value={factor}
//                                 onChange={(e) => setFactor(e.target.value)}
//                                 required
//                             />
//                         </div>
//                     </>
//                 )}

//                 {hasVariants && (
//                     <div className='space-y-4'>
//                         <label className='block font-medium'>Variants</label>
//                         {variants.map((variant, index) => (
//                             <div
//                                 key={index}
//                                 className='grid grid-cols-3 gap-3 items-end border p-4 rounded'
//                             >
//                                 <input
//                                     type='text'
//                                     placeholder='Variant Name'
//                                     className='border px-3 py-2 rounded'
//                                     value={variant.name}
//                                     onChange={(e) =>
//                                         handleVariantChange(
//                                             index,
//                                             'name',
//                                             e.target.value,
//                                         )
//                                     }
//                                     required
//                                 />
//                                 <input
//                                     type='number'
//                                     placeholder='Price'
//                                     className='border px-3 py-2 rounded'
//                                     value={variant.price}
//                                     onChange={(e) =>
//                                         handleVariantChange(
//                                             index,
//                                             'price',
//                                             e.target.value,
//                                         )
//                                     }
//                                     required
//                                 />
//                                 <input
//                                     type='number'
//                                     placeholder='Factor'
//                                     className='border px-3 py-2 rounded'
//                                     value={variant.factor}
//                                     onChange={(e) =>
//                                         handleVariantChange(
//                                             index,
//                                             'factor',
//                                             e.target.value,
//                                         )
//                                     }
//                                     required
//                                 />
//                                 <button
//                                     type='button'
//                                     onClick={() => removeVariant(index)}
//                                     className='text-red-600 text-sm underline col-span-3'
//                                 >
//                                     Remove Variant
//                                 </button>
//                             </div>
//                         ))}
//                         <button
//                             type='button'
//                             onClick={addVariant}
//                             className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
//                         >
//                             + Add Variant
//                         </button>
//                     </div>
//                 )}

//                 <button
//                     type='submit'
//                     className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700'
//                 >
//                     {id ? 'Update' : 'Create'} Calculator
//                 </button>
//             </form>
//         </div>
//     )
// }


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
        const res = await fetch('/api/calculator')
        const data = await res.json()
        setCalculators(data)
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const method = form._id ? 'PATCH' : 'POST'

    //     const res = await fetch('/api/calculator', {
    //         method,
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(form),
    //     })

    //     if (res.ok) {
    //         showToast(form._id ? 'Calculator updated!' : 'Calculator added!')
    //         setForm({
    //             _id: null,
    //             name: '',
    //             hasVariants: false,
    //             price: '',
    //             factor: '',
    //             variants: [],
    //         })
    //         fetchCalculators()
    //     } else {
    //         const err = await res.json().catch(() => null)
    //         showToast(err?.message || 'Failed to save', 'error')
    //     }
    // }

// const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this calculator?')) return

//     const res = await fetch(`/api/calculator?id=${id}`, {
//         method: 'DELETE',
//     })

//     if (res.ok) {
//         showToast('Deleted!')
//         fetchCalculators() // Refresh the list of calculators
//     } else {
//         const err = await res.json()
//         showToast(err?.message || 'Failed to delete', 'error')
//     }
// }

const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(form);
    
    const method = form._id ? 'PATCH' : 'POST'

    const res = await fetch('/api/calculator', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            form._id
                ? {
                      id: form._id, // fix here
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

    const res = await fetch('/api/calculator', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
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
                className='bg-white border shadow p-6 space-y-4 rounded'
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
                    className='w-full p-2 border rounded'
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

                {!form.hasVariants && (
                    <>
                        <input
                            type='number'
                            placeholder='Price'
                            value={form.price}
                            onChange={(e) =>
                                setForm({ ...form, price: e.target.value })
                            }
                            required
                            className='w-full p-2 border rounded'
                        />
                        <input
                            type='number'
                            placeholder='Factor'
                            value={form.factor}
                            onChange={(e) =>
                                setForm({ ...form, factor: e.target.value })
                            }
                            required
                            className='w-full p-2 border rounded'
                        />
                    </>
                )}

                {form.hasVariants && (
                    <div className='space-y-4 w-full'>
                        {form.variants.map((variant, index) => (
                            <div
                                key={index}
                                className='w-3/4 grid grid-cols-3 gap-2 items-start'
                            >
                                <input
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
                                    required
                                    className='p-2 border rounded'
                                />
                                <input
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
                                    required
                                    className='p-2 border rounded'
                                />
                                <input
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
                                    required
                                    className='p-2 border rounded'
                                />
                                <button
                                    type='button'
                                    onClick={() => removeVariant(index)}
                                    className='text-red-600 text-sm mt-1'
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type='button'
                            onClick={addVariant}
                            className='bg-gray-200 px-3 py-1 rounded'
                        >
                            + Add Variant
                        </button>
                    </div>
                )}

                <button
                    type='submit'
                    className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
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
                                className='p-4 border rounded flex justify-between items-start'
                            >
                                <div>
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
                                <div className='space-x-2'>
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
