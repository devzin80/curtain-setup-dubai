// 'use client'
// import React, { useState, useEffect } from 'react'

// const Calculator = () => {
//     const [calculators, setCalculators] = useState([])
//     const [selectedCalculator, setSelectedCalculator] = useState(null)
//     const [selectedVariantId, setSelectedVariantId] = useState('')
//     const [width, setWidth] = useState(1)
//     const [height, setHeight] = useState(1)
//     const [error, setError] = useState('')

//     useEffect(() => {
//         const fetchCalculators = async () => {
//             try {
//                 const res = await fetch('/api/calculator')
//                 if (!res.ok) {
//                     throw new Error(`HTTP error! Status: ${res.status}`)
//                 }
//                 const text = await res.text()
//                 try {
//                     const data = JSON.parse(text)
//                     setCalculators(data)
//                     if (data.length > 0) {
//                         setSelectedCalculator(data[0])
//                         if (
//                             data[0].hasVariants &&
//                             data[0].variants.length > 0
//                         ) {
//                             setSelectedVariantId(data[0].variants[0]._id)
//                         } else {
//                             setSelectedVariantId('')
//                         }
//                     }
//                 } catch (e) {
//                     console.error('Could not parse JSON', e)
//                     setError('Could not parse calculator data.')
//                 }
//             } catch (e) {
//                 setError('Could not fetch calculators')
//                 console.error('Could not fetch calculators', e)
//             }
//         }
//         fetchCalculators()
//     }, [])

//     const handleCalculatorChange = (e) => {
//         const calculatorId = e.target.value
//         const calculator = calculators.find((c) => c._id === calculatorId)
//         setSelectedCalculator(calculator)
//         if (calculator.hasVariants && calculator.variants.length > 0) {
//             setSelectedVariantId(calculator.variants[0]._id)
//         } else {
//             setSelectedVariantId('')
//         }
//     }

//     const handleVariantChange = (variantId) => {
//         setSelectedVariantId(variantId)
//     }

//     const selectedVariant = selectedCalculator?.variants?.find(
//         (v) => v._id === selectedVariantId,
//     )

//     const calculatePrice = () => {
//         const windowArea = width * height
//         const factor =
//             selectedVariant?.factor || selectedCalculator?.factor || 1
//         const pricePerSqm =
//             selectedVariant?.price || selectedCalculator?.price || 0
//         const effectiveArea = windowArea * factor
//         return effectiveArea * pricePerSqm
//     }

//     const totalPrice = calculatePrice()

//     return (
//         <div className='max-w-2xl mx-auto my-10 p-8 bg-gradient-to-br from-blue-50 to-white shadow-2xl rounded-3xl'>
//             <h1 className='text-center text-4xl font-extrabold mb-8 text-blue-700 tracking-tight'>
//                 Online Price Estimator
//             </h1>
//             {error && <div className='text-red-500'>{error}</div>}
//             <div className='mb-8'>
//                 <label className='block text-lg font-semibold mb-2 text-blue-900'>
//                     Select Product Type
//                 </label>
//                 <select
//                     className='w-full border-2 border-blue-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
//                     value={selectedCalculator?._id || ''}
//                     onChange={handleCalculatorChange}
//                 >
//                     {calculators.map((calculator) => (
//                         <option
//                             key={calculator._id}
//                             value={calculator._id}
//                         >
//                             {calculator.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {selectedCalculator?.hasVariants && (
//                 <div className='mb-8'>
//                     <label className='block text-lg font-semibold mb-2 text-blue-900'>
//                         Select Style
//                     </label>
//                     <div className='flex flex-wrap gap-4'>
//                         {selectedCalculator.variants.map((variant) => (
//                             <button
//                                 key={variant._id}
//                                 className={`flex-1 min-w-[120px] p-4 rounded-xl border-2 transition font-medium shadow-sm ${
//                                     selectedVariantId === variant._id
//                                         ? 'bg-blue-500 text-white border-blue-600 scale-105'
//                                         : 'bg-white text-blue-900 border-blue-200 hover:border-blue-400 hover:bg-blue-50'
//                                 }`}
//                                 onClick={() => handleVariantChange(variant._id)}
//                             >
//                                 <div className='text-base'>{variant.name}</div>
//                                 <div className='text-xs mt-1'>
//                                     Price:{' '}
//                                     <span className='font-bold'>
//                                         {variant.price} AED
//                                     </span>
//                                     <span className='mx-2'>|</span>
//                                     Factor:{' '}
//                                     <span className='font-bold'>
//                                         {variant.factor}
//                                     </span>
//                                 </div>
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8'>
//                 <div>
//                     <label className='block text-lg font-semibold mb-2 text-blue-900'>
//                         Width (meters)
//                     </label>
//                     <input
//                         type='number'
//                         min='0.1'
//                         step='0.01'
//                         value={width}
//                         onChange={(e) => setWidth(Number(e.target.value))}
//                         className='w-full border-2 border-blue-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
//                     />
//                 </div>
//                 <div>
//                     <label className='block text-lg font-semibold mb-2 text-blue-900'>
//                         Height (meters)
//                     </label>
//                     <input
//                         type='number'
//                         min='0.1'
//                         step='0.01'
//                         value={height}
//                         onChange={(e) => setHeight(Number(e.target.value))}
//                         className='w-full border-2 border-blue-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
//                     />
//                 </div>
//             </div>

//             <hr className='my-8 border-blue-200' />
//             <div className='text-center'>
//                 <div className='text-3xl font-bold mb-2 text-blue-700'>
//                     Total amount:{' '}
//                     <span className='text-blue-900'>
//                         {totalPrice.toFixed(2)} AED
//                     </span>
//                 </div>
//                 <div className='text-lg text-blue-800'>
//                     Curtains Square:{' '}
//                     <span className='font-semibold'>{width * height} m²</span>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Calculator

'use client'
import React, { useEffect, useState } from 'react'

export default function Calculator() {
    const [calculators, setCalculators] = useState([])
    const [selectedCalculatorId, setSelectedCalculatorId] = useState('')
    const [selectedVariantId, setSelectedVariantId] = useState('')
    const [width, setWidth] = useState(1)
    const [height, setHeight] = useState(1)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchCalculators() {
            try {
                const res = await fetch('/api/calculator')
                if (!res.ok) throw new Error('Failed to fetch calculators')
                const data = await res.json()

                const normalized = data.map((calc, index) => ({
                    ...calc,
                    _id: calc._id ? String(calc._id) : `calc-${index}`,
                    variants: (calc.variants || []).map((v, vIndex) => ({
                        ...v,
                        _id: v._id
                            ? String(v._id)
                            : `variant-${index}-${vIndex}`,
                    })),
                }))

                setCalculators(normalized)

                if (normalized.length > 0) {
                    const firstCalc = normalized[0]
                    setSelectedCalculatorId(firstCalc._id)
                    if (firstCalc.hasVariants && firstCalc.variants.length) {
                        setSelectedVariantId(firstCalc.variants[0]._id)
                    } else {
                        setSelectedVariantId('')
                    }
                }
            } catch (err) {
                setError('Failed to load products')
                console.error(err)
            }
        }
        fetchCalculators()
    }, [])

    function onCalculatorChange(e) {
        const id = e.target.value
        setSelectedCalculatorId(id)

        const calc = calculators.find((c) => c._id === id)
        if (calc?.hasVariants && calc.variants.length > 0) {
            setSelectedVariantId(calc.variants[0]._id)
        } else {
            setSelectedVariantId('')
        }
    }

    function onVariantClick(id) {
        setSelectedVariantId(id)
    }

    const selectedCalculator = calculators.find(
        (c) => c._id === selectedCalculatorId,
    )
    const selectedVariant = selectedCalculator?.variants?.find(
        (v) => v._id === selectedVariantId,
    )
//  total value not fixing . Have to fixe it
//  problem in area
    const area = width * height
    const factor = selectedVariant?.factor ?? selectedCalculator?.factor ?? 1
    const pricePerSqm = Number(
        selectedVariant?.price ?? selectedCalculator?.price ?? 0,
    )
    const totalPrice = area * factor * pricePerSqm

    return (
        <div className='max-w-xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-lg'>
            <h1 className='text-center text-3xl font-bold mb-8 text-blue-700'>
                Price Calculator
            </h1>
            {error && <p className='text-red-500 mb-4 text-center'>{error}</p>}

            <label className='block mb-2 font-semibold text-blue-900'>
                Select Product
            </label>
            <select
                value={selectedCalculatorId}
                onChange={onCalculatorChange}
                className='w-full mb-6 p-3 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
                {calculators.map((calc) => (
                    <option
                        key={calc._id}
                        value={calc._id}
                    >
                        {calc.name}
                    </option>
                ))}
            </select>

            {selectedCalculator?.hasVariants && (
                <>
                    <label className='block mb-2 font-semibold text-blue-900'>
                        Select Style
                    </label>
                    <div className='flex flex-wrap gap-4 mb-6'>
                        {selectedCalculator.variants.map((variant) => {
                            const isSelected = variant._id === selectedVariantId
                            return (
                                <button
                                    key={variant._id}
                                    type='button'
                                    onClick={() => onVariantClick(variant._id)}
                                    className={`flex-1 min-w-[120px] p-4 rounded-lg font-medium border-2 transition ${
                                        isSelected
                                            ? 'bg-blue-600 text-white border-blue-700 scale-105'
                                            : 'bg-white text-blue-800 border-blue-300 hover:border-blue-500 hover:bg-blue-50'
                                    }`}
                                >
                                    <div>{variant.name}</div>
                                    <div className='text-xs mt-1'>
                                        Price:{' '}
                                        <span className='font-semibold'>
                                            {variant.price} AED
                                        </span>{' '}
                                        | Factor:{' '}
                                        <span className='font-semibold'>
                                            {variant.factor}
                                        </span>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </>
            )}

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8'>
                <div>
                    <label className='block mb-2 font-semibold text-blue-900'>
                        Width (m)
                    </label>
                    <input
                        type='number'
                        min='0.1'
                        step='0.01'
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        className='w-full p-3 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div>
                    <label className='block mb-2 font-semibold text-blue-900'>
                        Height (m)
                    </label>
                    <input
                        type='number'
                        min='0.1'
                        step='0.01'
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className='w-full p-3 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
            </div>

            <div className='text-center'>
                <p className='text-2xl font-bold text-blue-700 mb-2'>
                    Total:{' '}
                    <span className='text-blue-900'>
                        {totalPrice.toFixed(2)} AED
                    </span>
                </p>
                <p className='text-blue-800'>
                    Area:{' '}
                    <span className='font-semibold'>{area.toFixed(2)} m²</span>
                </p>
            </div>
        </div>
    )
}

