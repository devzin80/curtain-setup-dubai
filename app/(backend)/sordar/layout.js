
import AdminSidebar from '../../(Components)/adminSidebar'
import { cookies } from 'next/headers'
import LoginPage from '@/app/(Components)/login'
export default function RootLayout({ children }) {
    const cookieStore = cookies()
    const token = cookieStore.get('token') 

    const isLoggedIn = !!token
    return (
        <>
            {isLoggedIn ? (
                <div className='flex bg-gray-50 text-gray-900 min-h-screen'>
                    <div className='hidden md:block'>
                        <AdminSidebar />
                    </div>
                    <div className='flex-1'>{children}</div>
                </div>
            ) : (
                <LoginPage />
            )}
        </>
        
        
    )
}
