import { Montserrat } from 'next/font/google'
import AdminSidebar from '../../(Components)/adminSidebar'
// export const dynamic = 'force-dynamic'
const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
})
export default function RootLayout({ children }) {
    return (
        <div className='flex  bg-gray-50 text-gray-900 '>
            <div className='hidden md:block'>
                <AdminSidebar />
            </div>
            {children}
        </div>
    )
}
