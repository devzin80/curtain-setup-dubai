'use client'

import dynamic from 'next/dynamic'
import 'suneditor/dist/css/suneditor.min.css'
import { useEffect, useRef } from 'react'

const SunEditor = dynamic(() => import('suneditor-react'), { ssr: false })

export default function Editor({ onChange, content }) {
    const editorRef = useRef(null)

    useEffect(() => {
        if (editorRef.current && content) {
            editorRef.current.setContents(content)
        }
    }, [content])

    return (
        <SunEditor
            getSunEditorInstance={(sunEditor) => {
                editorRef.current = sunEditor
            }}
            onChange={onChange}
            setOptions={{
                buttonList: [
                    [
                        'bold',
                        'italic',
                        'underline',
                        'list',
                        'align',
                        'fontSize',
                        'fontColor',
                        'codeView',
                        'horizontalRule',
                        'link',
                        'image',
                        'imageGallery',
                        'fullScreen',
                        'showBlocks',
                        'codeView',
                        'preview',
                        'print',
                        'save',
                        'undo',
                        'redo',
                    ],
                ],
            }}
        />
    )
}
