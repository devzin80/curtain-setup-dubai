'use client' // Only this small file is client component

import { usePathname } from 'next/navigation'
import Header from '../header'
import Footer from '../footer'


export default function LayoutWrapper({ children }) {
    const pathname = usePathname()
    const hideLayout = pathname.startsWith('/sordar/')

    return (
        <>
            {!hideLayout && <Header />}
            {children}
            {!hideLayout && <Footer />}
        </>
    )
}
