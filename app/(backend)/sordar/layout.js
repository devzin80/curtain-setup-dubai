import AdminSidebar from "../../(Components)/adminSidebar";

export default function RootLayout({ children }) {
    return (
        <div>
            <div className='flex h-screen '>
                <AdminSidebar/>
                {children}
                </div>
        </div>
    )
}
