import AdminSidebar from "../../(Components)/adminSidebar";

export default function RootLayout({ children }) {
    return (
        <div>
            <div className='flex h-screen items-stretch overflow-y-scroll'>
                <AdminSidebar/>
                {children}
                </div>
        </div>
    )
}
