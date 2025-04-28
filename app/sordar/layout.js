import AdminSidebar from "../(Components)/adminSidebar";

export default function RootLayout({ children }) {
    return (
        <div>
            <div className='flex'>
                <AdminSidebar/>
                {children}
                </div>
        </div>
    )
}
