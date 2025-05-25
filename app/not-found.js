import Link from 'next/link'

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <Link
                href='/'
                className='text-blue-600 underline'
            >
                Go to Homepage
            </Link>
        </div>
    )
}
