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
        <div className='w-[30vw] mx-auto bg-white p-6 rounded shadow'>
            <h2 className='text-xl font-bold mb-4 text-center'>Upload Logo</h2>

            <div
                className='w-full p-6 border-2 border-dashed rounded-md text-center cursor-pointer hover:border-blue-600'
                onClick={openFilePicker}
            >
                <p className='text-gray-600'>Click to upload or replace logo</p>
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
                        className='mx-auto border rounded'
                    />
                    <p className='text-sm text-gray-500 mt-1'>{logo.name}</p>
                </div>
            )}

            {uploading && (
                <p className='mt-4 text-blue-600 text-center'>Uploading...</p>
            )}
        </div>
    )
}

export default LogoUploader
