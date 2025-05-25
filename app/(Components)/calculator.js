'use client'
import { useState } from 'react'

const CurtainCalculator = () => {
    const [curtainType, setCurtainType] = useState('Sheers only')
    const [style, setStyle] = useState('American')
    const [width, setWidth] = useState(100)
    const [height, setHeight] = useState(100)
    const [motorized, setMotorized] = useState(false)

    // Pricing logic based on selected options
    const calculateTotalAmount = () => {
        let basePrice = 50 // Default base price
        let styleMultiplier = style === 'American' ? 2 : 3
        let motorizedPrice = motorized ? 200 : 0

        // Example calculation logic based on area
        let totalAmount =
            basePrice + width * height * 0.1 * styleMultiplier + motorizedPrice
        return totalAmount.toFixed(2)
    }

    return (
        <div className='max-w-lg mx-auto my-8 p-6 bg-white shadow-lg rounded-xl'>
            <h2 className='text-2xl font-bold text-center text-blue-600 mb-6'>
                Curtain Price Calculator
            </h2>

            {/* Curtain Type Selection */}
            <div className='mb-4'>
                <label className='block text-lg font-semibold'>
                    Select Curtain Type
                </label>
                <select
                    value={curtainType}
                    onChange={(e) => setCurtainType(e.target.value)}
                    className='w-full p-3 mt-2 border rounded-lg'
                >
                    <option>Sheers only</option>
                    <option>Blackout only</option>
                    <option>Sheers + Blackout</option>
                    <option>Roman blinds</option>
                    <option>Roller blinds</option>
                </select>
            </div>

            {/* Style Selection */}
            <div className='mb-4'>
                <label className='block text-lg font-semibold'>
                    Choose Style
                </label>
                <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className='w-full p-3 mt-2 border rounded-lg'
                >
                    <option>American (x2 window width)</option>
                    <option>Wavy (x3 window width)</option>
                </select>
            </div>

            {/* Width & Height Sliders */}
            <div className='grid grid-cols-2 gap-4 mb-6'>
                <div>
                    <label className='block text-lg font-semibold'>
                        Width (cm)
                    </label>
                    <input
                        type='range'
                        min='100'
                        max='1000'
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        className='w-full mt-2'
                    />
                    <span className='text-sm block text-center'>
                        {width} cm
                    </span>
                </div>
                <div>
                    <label className='block text-lg font-semibold'>
                        Height (cm)
                    </label>
                    <input
                        type='range'
                        min='100'
                        max='1000'
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className='w-full mt-2'
                    />
                    <span className='text-sm block text-center'>
                        {height} cm
                    </span>
                </div>
            </div>

            {/* Motorized Option */}
            <div className='flex items-center justify-between mb-6'>
                <label className='text-lg font-semibold'>
                    Add Motorized Option?
                </label>
                <input
                    type='checkbox'
                    checked={motorized}
                    onChange={(e) => setMotorized(e.target.checked)}
                    className='h-5 w-5'
                />
            </div>

            {/* Total Price Display */}
            <div className='text-center'>
                <h3 className='text-xl font-bold text-blue-700'>
                    Total Amount
                </h3>
                <p className='text-2xl font-semibold text-blue-900'>
                    {calculateTotalAmount()} AED
                </p>
            </div>
        </div>
    )
}

export default CurtainCalculator
