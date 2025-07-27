import { Montserrat } from 'next/font/google'
import './globals.css'
import Header from './header'
import Footer from './footer'
import WhatsAppFloatingButton from './(Components)/whatsapp'
// export const dynamic = 'force-dynamic'

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
})



export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={`${montserrat.className} antialiased select-none`}>
                <Header />
                <WhatsAppFloatingButton />
                {children}
                <Footer />
            </body>
        </html>
    )
}
