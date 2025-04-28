'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'

export default function Uploader() {
    const [files, setFiles] = useState([])
    const [uploadId, setUploadId] = useState(null)
    const inputRef = useRef(null)

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

const handleUpload = async () => {
    if (!files.length) return
    console.log(files);
    
    const formData = new FormData()
    files.forEach(({ file }) => formData.append('file', file))
    
    

    try {
        
        
        const res = await fetch('/api/logo', {
            method: 'POST',
            body: formData,
        })

        // Log the response for debugging
        const data = await res.json()
        console.log('Server response:', data)

        // Ensure the response has the expected structure
        if (data?.logos && data.logos.length > 0) {
            setUploadId(data.logos._id)
            setFiles(
                data.logos?.map((file) => ({
                    file: null,
                    preview: file.url,
                    filename: file.filename,
                })) || [],
            )
        } else {
            console.error('Invalid response format:', data)
        }
    } catch (err) {
        console.error('Upload failed:', err)
    }
}


    const handleDelete = async (filename) => {
        if (!uploadId) {
            setFiles((prev) => prev.filter((f) => f.preview !== filename))
            return
        }

        const res = await fetch(`/api/logo/${uploadId}/${filename}`, {
            method: 'DELETE',
        })

        if (res.ok) {
            setFiles((prev) =>
                prev.filter((file) => file.filename !== filename),
            )
        }
    }

    const openFilePicker = () => {
        inputRef.current.click()
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
                    <div className='flex justify-between items-center gap-4 mt-6'>
                        {files.map((fileObj, idx) => (
                            <div
                                key={idx}
                                className='relative border p-2 rounded group'
                            >
                                {fileObj.preview.endsWith('.mp4') ? (
                                    <video
                                        src={fileObj.preview}
                                        controls
                                        className='w-full h-32 object-cover rounded'
                                    />
                                ) : (
                                    <Image
                                        src={fileObj.preview}
                                        width={600}
                                        height={600}
                                        alt='file preview'
                                        className='w-full h-32 object-cover rounded'
                                    />
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleDelete(
                                            fileObj.filename || fileObj.preview,
                                        )
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
                            handleUpload()
                        }}
                        className='mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded cursor-pointer'
                    >
                        Upload Files
                    </button>
                </>
            )}
        </div>
    )
}
