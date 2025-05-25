'use client'

import { useState, useRef, useEffect } from 'react'

export default function Uploader() {
    const apiPath = `/api/banner-video`
    const [files, setFiles] = useState([])
    const [uploadId, setUploadId] = useState(null)
    const [videoUrl, setVideoUrl] = useState(null)
    const [showUploader, setShowUploader] = useState(false)
    const inputRef = useRef(null)

    // Clean up object URLs to prevent memory leaks
    useEffect(() => {
        return () => {
            files.forEach((f) => URL.revokeObjectURL(f.preview))
        }
    }, [files])

    // Fetch existing video on initial render
    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const res = await fetch(apiPath)
                const data = await res.json()

                if (data?.length > 0) {
                    const video = data[0]
                    setUploadId(video._id)
                    setVideoUrl(video.url)
                    setShowUploader(false)
                } else {
                    setShowUploader(true)
                }
            } catch (err) {
                console.error('Failed to fetch video:', err)
                setShowUploader(true)
            }
        }
        fetchVideo()
    }, [apiPath])

    // Only allow one video at a time
    const handleFiles = (selectedFiles) => {
        if (!selectedFiles.length) return
        const file = selectedFiles[0]
        setFiles([
            {
                file,
                preview: URL.createObjectURL(file),
            },
        ])
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

            if (data?.video) {
                setVideoUrl(data.video.url)
                setFiles([])
                setShowUploader(false)
                alert('Video updated successfully')
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
        formData.append('file', files[0].file)

        try {
            const res = await fetch(apiPath, {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()

            if (data?.videos?.length > 0) {
                const uploadedVideo = data.videos[0]
                setUploadId(uploadedVideo._id)
                setVideoUrl(uploadedVideo.url)
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

    if (!showUploader && videoUrl) {
        return (
            <div className='w-full max-w-5xl flex flex-col items-center justify-center space-y-4'>
                <video
                    src={videoUrl}
                    controls
                    className='w-full h-full object-cover rounded'
                />
                <button
                    className='cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded'
                    onClick={() => setShowUploader(true)}
                >
                    Change Video
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
                accept='video/*'
                onChange={(e) => handleFiles(e.target.files)}
                hidden
                ref={inputRef}
            />
            <div className='text-center text-blue-500 font-semibold'>
                Drag & Drop video here or Click to Browse
            </div>

            {files.length > 0 && (
                <>
                    <div className='flex justify-center items-center gap-4 mt-6 flex-wrap'>
                        {files.map((fileObj, idx) => (
                            <div
                                key={idx}
                                className='relative border p-2 rounded group'
                            >
                                <video
                                    src={fileObj.preview}
                                    controls
                                    className='w-2/4 h-2/4 object-cover rounded'
                                />

                                <button
                                    aria-label='Remove video'
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
                        {uploadId ? 'Update Video' : 'Upload Video'}
                    </button>
                </>
            )}
        </div>
    )
}
