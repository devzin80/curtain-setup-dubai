'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const LogoUploader = () => {
    const [logo, setLogo] = useState(null)
    const [uploading, setUploading] = useState(false)
    const inputRef = useRef(null)



    const fetchLogo = async () => {
        try {
            const res = await fetch('/api/logo')
            const data = await res.json()
            if (data.logo) {
                setLogo(data.logo)
            }
        } catch (err) {
            console.error('Failed to fetch logo:', err)
        }
    }

    useEffect(() => {
        fetchLogo()
    }, [])

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        setUploading(true)
        try {
            const res = await fetch('/api/logo', {
                method: logo ? 'PATCH' : 'POST',
                body: formData,
            })
            const data = await res.json()
            if (data.logo) {
                setLogo(data.logo)
            }
        } catch (err) {
            console.error('Failed to upload logo:', err)
        } finally {
            setUploading(false)
        }
    }

    const openFilePicker = () => {
        inputRef.current?.click()
    }

    return (
        <div className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded-2xl shadow-md'>
            <h2 className='text-lg sm:text-xl font-bold mb-4 text-center'>
                Upload Logo
            </h2>

            <div
                className='w-full p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer hover:border-orange-600 transition'
                onClick={openFilePicker}
            >
                <p className='text-sm sm:text-base text-gray-600'>
                    Click to upload or replace logo
                </p>
                <input
                    type='file'
                    hidden
                    accept='image/*'
                    onChange={handleFileChange}
                    ref={inputRef}
                />
            </div>

            {logo?.url && (
                <div className='mt-4 text-center'>
                    <Image
                        src={logo.url}
                        alt={logo.name}
                        width={120}
                        height={120}
                        className='mx-auto border rounded-lg'
                    />
                    <p className='text-sm text-gray-500 mt-2 truncate'>
                        {logo.name}
                    </p>
                </div>
            )}

            {uploading && (
                <p className='mt-4 text-blue-600 text-center text-sm'>
                    Uploading...
                </p>
            )}
        </div>
    )
}

export default LogoUploader
