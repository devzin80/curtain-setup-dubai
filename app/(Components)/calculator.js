'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Calculator() {
    const [calculators, setCalculators] = useState([])
    const [selectedCalculatorId, setSelectedCalculatorId] = useState('')
    const [selectedVariantId, setSelectedVariantId] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
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

    const factor = selectedVariant?.factor ?? selectedCalculator?.factor ?? 1
    const numericWidth = parseFloat(width) || 0
    const numericHeight = parseFloat(height) || 0

    const effectiveWidth = selectedCalculator?.hasVariants
        ? numericWidth * factor
        : numericWidth

    const area = effectiveWidth * numericHeight

    const pricePerSqm = Number(
        selectedVariant?.price ?? selectedCalculator?.price ?? 0,
    )

    const totalPrice = area * pricePerSqm

    return (
        <div className='max-w-xl mx-auto p-8 m-10 bg-white rounded-xl shadow-lg'>
            <h1 className='text-center text-3xl font-bold mb-8 text-orange-600'>
                Price Calculator
            </h1>
            {error && <p className='text-red-500 mb-4 text-center'>{error}</p>}

            <label className='block mb-2 font-semibold text-orange-600'>
                Select Product
            </label>
            <select
                value={selectedCalculatorId}
                onChange={onCalculatorChange}
                className='w-full mb-6 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-gray-50'
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
                    <label className='block mb-2 font-semibold text-orange-600'>
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
                                    className={`flex-1 min-w-[120px] p-4 rounded-lg font-medium border transition ${
                                        isSelected
                                            ? 'bg-orange-600 text-white  scale-105'
                                            : 'bg-white text-black  hover:border-black '
                                    }`}
                                >
                                    <div>{variant.name}</div>
                                    <div className='text-xs mt-1'>
                                        Price:{' '}
                                        <span className='font-semibold'>
                                            {variant.price} AED
                                        </span>{' '}
                                        | Curtain count:{' '}
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
                    <label className='block mb-2 font-semibold text-orange-600'>
                        Width (m)
                    </label>
                    <input
                        type='number'
                        min='0.1'
                        step='0.01'
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className='w-full p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black border border-black'
                    />
                </div>
                <div>
                    <label className='block mb-2 font-semibold text-orange-600'>
                        Height (m)
                    </label>
                    <input
                        type='number'
                        min='0.1'
                        step='0.01'
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className='w-full p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black border border-black'
                    />
                </div>
            </div>

            <div className='text-center'>
                <p className='text-2xl font-bold text-black mb-2'>
                    Total:{' '}
                    <span className='text-black'>
                        {totalPrice.toFixed(2)} AED
                    </span>
                </p>
                <p className='text-black'>
                    Area:{' '}
                    <span className='font-semibold'>{area.toFixed(2)} m²</span>
                </p>
            </div>

            <div className='text-center mt-6'>
                <Link href='/book-a-free-visit'>
                    <button className='bg-orange-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300'>
                        📅 Book a Free Visit
                    </button>
                </Link>
            </div>
        </div>
    )
}
