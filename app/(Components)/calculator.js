'use client'
import React, { useEffect, useState } from 'react'

const Calculator = () => {
    // const [curtainType, setCurtainType] = useState([])
    // const [selectedStyle, setSelectedStyle] = useState(styles[0])
    // const [width, setWidth] = useState(1) // in centimeters
    // const [height, setHeight] = useState(1) // in centimeters

    const fetchCalculator = async () => {
        const res = await fetch('/api/calculator')
        const data = await res.json()

        return data
        // setProducts(data)
    }

    useEffect(() => {
        fetchCalculator()
    }, [])

    const curtainTypes = [
        'Sheers only',
        'Blackout only',
        'Sheers + Blackout',
        'Roman blinds',
        'Roller blinds',
    ]

    // Style options with multiplier factors.
    // const styles = [
    //     { name: 'American (x2 window width)', factor: 2 },
    //     { name: 'Wavy (x3 window width)', factor: 3 },
    // ]

    // Pricing constants.
    const PRICE_PER_SQM = 50 // Price per effective square meter (AED)
    const MOTORIZED_PRICE = 10 // Fixed cost for the motorized option (AED)

    // State hooks.

    // Calculate the window area (cm converted to m).
    // const windowArea = (width ) * (height )

    // Calculate the effective area based on selected style.
    // const effectiveArea = windowArea * selectedStyle.factor

    // Calculate the total price.
    // const totalPrice =
    //     effectiveArea * PRICE_PER_SQM + (motorized ? MOTORIZED_PRICE : 0)

    return (
        <></>
        // <div className='max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg my-6'>
        //     <h1 className='text-center text-3xl font-bold mb-6'>
        //         Online Price Estimator
        //     </h1>

        //     <section className='mb-6'>
        //         <h2 className='text-xl font-semibold mb-2'>
        //             What kind of curtains are you looking for?
        //         </h2>
        //         {curtainTypes.map((type) => (
        //             <label
        //                 key={type}
        //                 className='block mb-2'
        //             >
        //                 <input
        //                     type='radio'
        //                     name='curtainType'
        //                     value={type}
        //                     checked={curtainType === type}
        //                     onChange={() => setCurtainType(type)}
        //                     className='mr-2'
        //                 />
        //                 {type}
        //             </label>
        //         ))}
        //     </section>

        //     <section className='mb-6'>
        //         <h2 className='text-xl font-semibold mb-2'>Choose style</h2>
        //         {styles.map((styleOption) => (
        //             <label
        //                 key={styleOption.name}
        //                 className='block mb-2'
        //             >
        //                 <input
        //                     type='radio'
        //                     name='style'
        //                     value={styleOption.name}
        //                     checked={selectedStyle.name === styleOption.name}
        //                     onChange={() => setSelectedStyle(styleOption)}
        //                     className='mr-2'
        //                 />
        //                 {styleOption.name}
        //             </label>
        //         ))}
        //     </section>

        //     <section className='mb-6'>
        //         <h2 className='text-xl font-semibold mb-2'>
        //             Width (cm):{' '}
        //             <span className='font-normal text-lg'>{width}</span>
        //         </h2>
        //         <input
        //             type='range'
        //             min='100'
        //             max='1000'
        //             value={width}
        //             onChange={(e) => setWidth(Number(e.target.value))}
        //             className='w-full'
        //         />
        //     </section>

        //     <section className='mb-6'>
        //         <h2 className='text-xl font-semibold mb-2'>
        //             Height (cm):{' '}
        //             <span className='font-normal text-lg'>{height}</span>
        //         </h2>
        //         <input
        //             type='range'
        //             min='100'
        //             max='1000'
        //             value={height}
        //             onChange={(e) => setHeight(Number(e.target.value))}
        //             className='w-full'
        //         />
        //     </section>

        //     <section className='mb-6'>
        //         <label className='flex items-center'>
        //             <input
        //                 type='checkbox'
        //                 checked={motorized}
        //                 onChange={() => setMotorized((prev) => !prev)}
        //                 className='mr-2'
        //             />
        //             <span>
        //                 Add a motorized option? (Adds {MOTORIZED_PRICE} AED)
        //             </span>
        //         </label>
        //     </section>

        //     <hr className='my-6' />

        //     <section className='text-center'>
        //         <h2 className='text-2xl font-bold mb-2'>
        //             Total amount: {totalPrice.toFixed(2)} AED
        //         </h2>
        //         <h3 className='text-lg'>
        //             Curtains Square: {windowArea.toFixed(2)} m²
        //         </h3>
        //     </section>
        // </div>
    )
}

export default Calculator

// Available options for curtain types.
