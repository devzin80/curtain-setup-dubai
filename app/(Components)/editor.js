'use client'

import dynamic from 'next/dynamic'
import 'suneditor/dist/css/suneditor.min.css'
import { useRef } from 'react'

const SunEditor = dynamic(() => import('suneditor-react'), { ssr: false })

export default function Editor({ onChange, content }) {
    const editorRef = useRef(null)

    return (
        <div className='w-full min-h-[300px]'>
            <SunEditor
                getSunEditorInstance={(sunEditor) => {
                    editorRef.current = sunEditor
                }}
                defaultValue={content || ''}
                onChange={onChange}
                setOptions={{
                    height: 300,
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
                            'preview',
                            'print',
                            'save',
                            'undo',
                            'redo',
                        ],
                    ],
                    resizingBar: true,
                    minHeight: 300,
                    maxHeight: 600,
                }}
                style={{ border: 'none' }} // removes border on editor container
            />
        </div>
    )
}
