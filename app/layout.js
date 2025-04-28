import { Montserrat } from 'next/font/google'
import './globals.css'
import LayoutWrapper from './(Components)/layoutWrapper'

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
})

export const metadata = {
    title: 'Urban Interiors Dubai',
    description:
        'An authentic, reliable and cost-friendly website for buying curtains ',
}

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={`${montserrat.className} antialiased`}>
                <LayoutWrapper>{children}</LayoutWrapper>
            </body>
        </html>
    )
}
