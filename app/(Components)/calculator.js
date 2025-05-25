'use client'
import React, { useEffect, useState } from 'react'

const Calculator = () => {
    const [calculators, setCalculators] = useState([])
    const [selectedCalculator, setSelectedCalculator] = useState(null)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [width, setWidth] = useState(1) // meters
    const [height, setHeight] = useState(1) // meters

    useEffect(() => {
        fetchCalculators()
    }, [])

    const fetchCalculators = async () => {
        const res = await fetch('/api/calculator')
        const data = await res.json()
        setCalculators(data)
        if (data.length > 0) setSelectedCalculator(data[0])
    }

    // Calculate area in m²
    const windowArea = width * height

    // Get factor and price from selected calculator or variant
    let factor = 1
    let pricePerSqm = 0

    if (selectedCalculator) {
        if (selectedCalculator.hasVariants && selectedVariant) {
            factor = selectedVariant.factor
            pricePerSqm = selectedVariant.price
        } else if (!selectedCalculator.hasVariants) {
            factor = selectedCalculator.factor
            pricePerSqm = selectedCalculator.price
        }
    }

    const effectiveArea = windowArea * factor
    const totalPrice = effectiveArea * pricePerSqm

    return (
        <div className='max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg my-6'>
            <h1 className='text-center text-3xl font-bold mb-6'>
                Online Price Estimator
            </h1>

            {/* Calculator Type */}
            <section className='mb-6'>
                <h2 className='text-xl font-semibold mb-2'>
                    Select Product/Calculator
                </h2>
                <select
                    className='w-full border p-2 rounded'
                    value={selectedCalculator?._id || ''}
                    onChange={(e) => {
                        const calc = calculators.find(
                            (c) => c._id === e.target.value,
                        )
                        setSelectedCalculator(calc)
                        setSelectedVariant(null)
                    }}
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
            </section>

            {/* Variant Selection */}
            {selectedCalculator?.hasVariants && (
                <section className='mb-6'>
                    <h2 className='text-xl font-semibold mb-2'>
                        Select Variant
                    </h2>
                    <select
                        className='w-full border p-2 rounded'
                        value={selectedVariant?._id || ''}
                        onChange={(e) => {
                            const variant = selectedCalculator.variants.find(
                                (v) => v._id === e.target.value,
                            )
                            setSelectedVariant(variant)
                        }}
                    >
                        <option value=''>Select a variant</option>
                        {selectedCalculator.variants.map((variant) => (
                            <option
                                key={variant._id}
                                value={variant._id}
                            >
                                {variant.name} (Price: {variant.price} AED,
                                Factor: {variant.factor})
                            </option>
                        ))}
                    </select>
                </section>
            )}

            {/* Width Input */}
            <section className='mb-6'>
                <h2 className='text-xl font-semibold mb-2'>Width (meters):</h2>
                <input
                    type='number'
                    min='0.1'
                    step='0.01'
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className='w-full border p-2 rounded'
                />
            </section>

            {/* Height Input */}
            <section className='mb-6'>
                <h2 className='text-xl font-semibold mb-2'>Height (meters):</h2>
                <input
                    type='number'
                    min='0.1'
                    step='0.01'
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className='w-full border p-2 rounded'
                />
            </section>

            <hr className='my-6' />

            {/* Results */}
            <section className='text-center'>
                <h2 className='text-2xl font-bold mb-2'>
                    Total amount:{' '}
                    {isNaN(totalPrice) ? '—' : totalPrice.toFixed(2)} AED
                </h2>
                <h3 className='text-lg'>
                    Curtains Square:{' '}
                    {isNaN(effectiveArea) ? '—' : effectiveArea.toFixed(2)} m²
                </h3>
            </section>
        </div>
    )
}

export default Calculator

// Available options for curtain types.
