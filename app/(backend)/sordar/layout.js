'use client'
import AdminSidebar from '../../(Components)/adminSidebar'


import { decodeToken } from '@/lib/auth'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function RootLayout({ children }) {
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)
    // const pathName = usePathname()
    const router = useRouter()

    useEffect(() => {
        const userRole = decodeToken()
        // console.log('userRole is', userRole, 'and pathName is', pathName);
        if (!userRole) {
            // If no role, redirect to login
            router.push('/login')
            return
        }
        
        setRole(userRole)
        setLoading(false)
    }, [router])


    if (loading) return <div className='p-6'>Checking auth...</div>

    return (
        <>
            <div className='flex bg-gray-50 text-gray-900 min-h-screen'>
                <div className='hidden md:block'>
                    <AdminSidebar role={role} />
                </div>
                <div className='flex-1'>{children}</div>
            </div>
        </>
    )
}
