// 'use client'
// import React, { use, useEffect } from 'react'
// import { useState } from 'react'
// import Link from 'next/link'
// import { Menu, X } from 'lucide-react'
// import { AnimatePresence, motion } from 'framer-motion'
// import { usePathname } from 'next/navigation'
// import AdminSidebar from './adminSidebar'

// const overlayVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 0.5 },
//     exit: { opacity: 0 },
// }

// const menuVariants = {
//     hidden: { x: '100%', scale: 0.95, opacity: 0 },
//     visible: {
//         x: 0,
//         scale: 1,
//         opacity: 1,
//         transition: { type: 'spring', stiffness: 300, damping: 30 },
//     },
//     exit: {
//         x: '100%',
//         scale: 0.95,
//         opacity: 0,
//         transition: { ease: 'easeInOut', duration: 0.3 },
//     },
// }

// const MobileNav = () => {
//     const currentPath = usePathname()
//     const [isOpen, setIsOpen] = useState(false)

//     const toggleMenu = () => setIsOpen((prev) => !prev)
//     const closeMenu = () => setIsOpen(false)

//     useEffect(() => {
//         if (isOpen) {
//             document.body.style.overflow = 'hidden'
//         } else {
//             document.body.style.overflow = ''
//         }
//         return () => {
//             document.body.style.overflow = ''
//         }
//     }, [isOpen])

//     return (
//         <div className='md:hidden relative z-50'>
//             {!isOpen && (
//                 <button
//                     onClick={toggleMenu}
//                     aria-label='Open Menu'
//                     className='z-50 relative'
//                 >
//                     <Menu size={28} />
//                 </button>
//             )}

//             <AnimatePresence>
//                 {isOpen && (
//                     <>
//                         {/* Overlay */}
//                         <motion.div
//                             key='overlay'
//                             initial='hidden'
//                             animate='visible'
//                             exit='exit'
//                             variants={overlayVariants}
//                             onClick={closeMenu}
//                             className='fixed inset-0 bg-black z-40'
//                         />

//                         {/* Sliding menu */}
//                         <motion.div
//                             key='menu'
//                             initial='hidden'
//                             animate='visible'
//                             exit='exit'
//                             variants={menuVariants}
//                             className='fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white shadow-xl p-6 flex flex-col z-50'
//                         >
//                             <button
//                                 onClick={closeMenu}
//                                 aria-label='Close Menu'
//                                 className='self-end mb-8 text-black'
//                             >
//                                 <X size={28} />
//                             </button>
//                             {currentPath == '/sordar' &&
//                             currentPath == '/sordar/*' ? (
//                                 <AdminSidebar />
//                             ) : (
//                                 <nav className='flex flex-col gap-8 text-base font-semibold text-center mt-4'>
//                                     <Link
//                                         href='/our-products'
//                                         onClick={closeMenu}
//                                         className='hover:text-blue-600'
//                                     >
//                                         Our Products
//                                     </Link>
//                                     <Link
//                                         href='/curtain-cost-estimator'
//                                         onClick={closeMenu}
//                                         className='hover:text-blue-600'
//                                     >
//                                         Get Estimate
//                                     </Link>
//                                     <Link
//                                         href='/book-a-free-visit'
//                                         onClick={closeMenu}
//                                     >
//                                         <div className='border-blue-400 rounded-xl border-2 px-4 py-2 text-blue-400 inline-block hover:bg-blue-50'>
//                                             Book A Free Visit
//                                         </div>
//                                     </Link>
//                                 </nav>
//                             )}
//                         </motion.div>
//                     </>
//                 )}
//             </AnimatePresence>
//         </div>
//     )
// }

// export default MobileNav


'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import AdminSidebar from './adminSidebar'

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
    exit: { opacity: 0 },
}

const menuVariants = {
    hidden: { x: '100%', scale: 0.95, opacity: 0 },
    visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: {
        x: '100%',
        scale: 0.95,
        opacity: 0,
        transition: { ease: 'easeInOut', duration: 0.3 },
    },
}

const MobileNav = () => {
    const currentPath = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen((prev) => !prev)
    const closeMenu = () => setIsOpen(false)

    useEffect(() => {
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = isOpen ? 'hidden' : originalOverflow

        return () => {
            document.body.style.overflow = originalOverflow
        }
    }, [isOpen])

    return (
        <div className='md:hidden relative z-50'>
            {!isOpen && (
                <button
                    onClick={toggleMenu}
                    aria-label='Open Menu'
                    className='z-50 relative'
                >
                    <Menu size={28} />
                </button>
            )}

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            key='overlay'
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={overlayVariants}
                            onClick={closeMenu}
                            className='fixed inset-0 bg-black z-40'
                        />

                        {/* Sliding menu */}
                        <motion.div
                            key='menu'
                            role='dialog'
                            aria-modal='true'
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={menuVariants}
                            className='fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white shadow-xl p-6 flex flex-col z-50'
                        >
                            <button
                                onClick={closeMenu}
                                aria-label='Close Menu'
                                className='self-end mb-8 text-black'
                            >
                                <X size={28} />
                            </button>
                            {currentPath.startsWith('/sordar') ? (
                                <AdminSidebar onLinkClick={closeMenu} />
                            ) : (
                                <nav className='flex flex-col gap-8 text-base font-semibold text-center mt-4'>
                                    <Link
                                        href='/our-products'
                                        onClick={closeMenu}
                                        className='hover:text-blue-600'
                                    >
                                        Our Products
                                    </Link>
                                    <Link
                                        href='/curtain-cost-estimator'
                                        onClick={closeMenu}
                                        className='hover:text-blue-600'
                                    >
                                        Get Estimate
                                    </Link>
                                    <Link
                                        href='/book-a-free-visit'
                                        onClick={closeMenu}
                                    >
                                        <div className='border-blue-400 rounded-xl border-2 px-4 py-2 text-blue-400 inline-block hover:bg-blue-50'>
                                            Book A Free Visit
                                        </div>
                                    </Link>
                                </nav>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default MobileNav
