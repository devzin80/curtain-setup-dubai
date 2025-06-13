// components/WhatsAppFloatingButton.js
'use client'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const WhatsAppFloatingButton = () => {
    const phoneNumber = '971544985661' // Example: "8801234567890"

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}`
        window.open(url, '_blank')
    }

    return (
        <div
            onClick={handleClick}
            className='fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg cursor-pointer transition duration-300'
        >
            <FaWhatsapp size={28} />
        </div>
    )
}

export default WhatsAppFloatingButton
