'use client'

import { useState, useRef, useEffect } from 'react'

export default function Uploader() {
    const apiPath = `/api/banner-video`
    const [files, setFiles] = useState([])
    const [uploadId, setUploadId] = useState(null)
    const [videoUrl, setVideoUrl] = useState(null)
    const [showUploader, setShowUploader] = useState(false)
    const [loading, setLoading] = useState(false)
    const [toastMessage, setToastMessage] = useState(null)

    const inputRef = useRef(null)

    useEffect(() => {
        return () => {
            files.forEach((f) => URL.revokeObjectURL(f.preview))
        }
    }, [files])

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

    const showToast = (message, duration = 3000) => {
        setToastMessage(message)
        setTimeout(() => setToastMessage(null), duration)
    }

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

    const handleUploadOrUpdate = async () => {
        if (!files.length) return

        const formData = new FormData()
        formData.append('file', files[0].file)
        if (uploadId) formData.append('_id', uploadId)

        setLoading(true)
        try {
            const res = await fetch(apiPath, {
                method: uploadId ? 'PATCH' : 'POST',
                body: formData,
            })
            const data = await res.json()

            const updatedVideo = uploadId ? data.video : data.videos?.[0]
            if (updatedVideo) {
                setUploadId(updatedVideo._id)
                setVideoUrl(updatedVideo.url)
                setFiles([])
                setShowUploader(false)
                showToast(
                    uploadId
                        ? 'Video updated successfully'
                        : 'Video uploaded successfully',
                )
            } else {
                showToast('Something went wrong.')
            }
        } catch (err) {
            console.error('Upload failed:', err)
            showToast('Upload failed.')
        } finally {
            setLoading(false)
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
            <div className='w-full max-w-5xl mx-auto flex flex-col items-center justify-center px-4 space-y-4'>
                <video
                    autoPlay
                    muted
                    loop
                    controls
                    className='w-full h-auto max-h-[500px] object-cover rounded'
                >
                    <source
                        src={videoUrl}
                        type='video/mp4'
                    />
                    Your browser does not support the video tag.
                </video>

                <button
                    className='bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded transition'
                    onClick={() => setShowUploader(true)}
                >
                    Change Video
                </button>

                {toastMessage && (
                    <div className='fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-2 px-4 rounded shadow'>
                        {toastMessage}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div
            className='max-w-5xl mx-auto px-4 py-6 border-2 border-dashed border-blue-400 rounded-md cursor-pointer bg-blue-50 hover:bg-blue-100 transition relative'
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

            <div className='text-center text-blue-500 font-semibold text-base md:text-lg'>
                Drag & Drop video here or Click to Browse
            </div>

            {files.length > 0 && (
                <>
                    <div className='flex flex-col md:flex-row justify-center items-center gap-4 mt-6 flex-wrap'>
                        {files.map((fileObj, idx) => (
                            <div
                                key={idx}
                                className='relative border p-2 rounded group w-full sm:w-3/4 md:w-1/2 lg:w-1/3'
                            >
                                <video
                                    src={fileObj.preview}
                                    controls
                                    className='w-full h-auto rounded object-cover'
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
                            handleUploadOrUpdate()
                        }}
                        disabled={loading}
                        className={`mt-6 w-full md:w-auto px-6 py-2 rounded text-white font-medium ${
                            loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        {loading
                            ? 'Uploading...'
                            : uploadId
                            ? 'Update Video'
                            : 'Upload Video'}
                    </button>
                </>
            )}

            {toastMessage && (
                <div className='fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-2 px-4 rounded shadow'>
                    {toastMessage}
                </div>
            )}
        </div>
    )
}
