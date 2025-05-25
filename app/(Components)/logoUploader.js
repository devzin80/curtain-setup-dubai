'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

export default function Uploader() {
    const apiPath = `/api/logo`
    const [files, setFiles] = useState([])
    const [uploadId, setUploadId] = useState(null)
    const [logoUrl, setLogoUrl] = useState(null)
    const [showUploader, setShowUploader] = useState(false)
    const inputRef = useRef(null)

    // Fetch existing logo on initial render
useEffect(() => {
    const fetchLogo = async () => {
        try {
            const res = await fetch(apiPath)
            const data = await res.json()

            if (data?.length > 0) {
                const logo = data[0]
                setUploadId(logo._id)
                setLogoUrl(logo.url)
                setShowUploader(false)
            } else {
                setShowUploader(true)
            }
        } catch (err) {
            console.error('Failed to fetch logo:', err)
            setShowUploader(true)
        }
    }
    fetchLogo()
}, [apiPath])


    const handleFiles = (selectedFiles) => {
        const filesArray = Array.from(selectedFiles).map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }))
        setFiles((prev) => [...prev, ...filesArray])
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const droppedFiles = e.dataTransfer.files
        if (droppedFiles.length > 0) {
            handleFiles(droppedFiles)
        }
    }

    

const handleUpdate = async () => {
    if (!files.length || !uploadId) return

    const formData = new FormData()
    formData.append('file', files[0].file)
    formData.append('_id', uploadId)

    try {
        const res = await fetch(apiPath, {
            method: 'PATCH',
            body: formData,
        })
        const data = await res.json()

        if (data?.logo) {
            setLogoUrl(data.logo.url)
            setFiles([])
            setShowUploader(false)
            alert('Logo updated successfully')
        } else {
            console.error('Invalid update response:', data)
        }
    } catch (err) {
        console.error('Update failed:', err)
    }
}




    const handleUpload = async () => {
        if (!files.length) return

        const formData = new FormData()
        files.forEach(({ file }) => formData.append('file', file))

        try {
            const res = await fetch(apiPath, {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()

            if (data?.logos?.length > 0) {
                const uploadedLogo = data.logos[0]
                setUploadId(uploadedLogo._id)
                setLogoUrl(uploadedLogo.url)
                setFiles([])
                setShowUploader(false)
                alert('Uploaded successfully')
            } else {
                console.error('Invalid response:', data)
            }
        } catch (err) {
            console.error('Upload failed:', err)
        }
    }

    const openFilePicker = () => {
        inputRef.current.click()
    }

    const handleDelete = (preview) => {
        setFiles((prev) => prev.filter((f) => f.preview !== preview))
    }

    if (!showUploader && logoUrl) {
        return (
            <div className='flex flex-col items-center justify-center space-y-4'>
                <Image
                    src={logoUrl}
                    alt='Uploaded Logo'
                    width={600}
                    height={600}
                    className='object-contain rounded border border-cyan-600 p-3'
                />
                <button
                    className='cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded'
                    onClick={() => setShowUploader(true)}
                >
                    Change Logo
                </button>
            </div>
        )
    }

    return (
        <div
            className='max-w-5xl mx-auto p-6 border-2 border-dashed border-blue-400 rounded-md cursor-pointer bg-blue-50 hover:bg-blue-100 transition'
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={openFilePicker}
        >
            <input
                type='file'
                multiple
                onChange={(e) => handleFiles(e.target.files)}
                hidden
                ref={inputRef}
            />
            <div className='text-center text-blue-500 font-semibold'>
                Drag & Drop files here or Click to Browse
            </div>

            {files.length > 0 && (
                <>
                    <div className='flex justify-start items-center gap-4 mt-6 flex-wrap'>
                        {files.map((fileObj, idx) => (
                            <div
                                key={idx}
                                className='relative border p-2 rounded group'
                            >
                                {fileObj.preview.endsWith('.mp4') ? (
                                    <video
                                        src={fileObj.preview}
                                        controls
                                        className='w-32 h-32 object-cover rounded'
                                    />
                                ) : (
                                    <Image
                                        src={fileObj.preview}
                                        width={600}
                                        height={600}
                                        alt='file preview'
                                        className='w-2/4 h-2/4 object-cover rounded'
                                    />
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleDelete(fileObj.preview)
                                    }}
                                    className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hidden group-hover:block'
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            uploadId ? handleUpdate() : handleUpload()
                        }}
                        className='mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded cursor-pointer'
                    >
                        {uploadId? 'Update Logo' : 'Upload Logo'}
                    </button>
                </>
            )}
        </div>
    )
}
