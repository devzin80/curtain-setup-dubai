'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from './adminSidebar'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { MdHome } from 'react-icons/md'

const MobileNav = () => {
    const [role, setRole] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        fetch('/api/me')
            .then((res) => res.json())
            .then((data) => {
                setRole(data.role)
            })
            .catch((err) => {
                console.error('Failed to fetch user role:', err)
            })
    }, [])

    const toggleMenu = () => setIsOpen((prev) => !prev)
    const closeMenu = () => setIsOpen(false)

    return (
        <div className='md:hidden relative z-50'>
            {!isOpen && (
                <button
                    onClick={toggleMenu}
                    aria-label='Open Menu'
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
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 0.5 },
                                exit: { opacity: 0 },
                            }}
                            onClick={closeMenu}
                            className='fixed inset-0 bg-black z-40'
                        />

                        {/* Sliding menu */}
                        <motion.div
                            key='menu'
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={{
                                hidden: { x: '100%', scale: 0.95, opacity: 0 },
                                visible: {
                                    x: 0,
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 30,
                                    },
                                },
                                exit: {
                                    x: '100%',
                                    scale: 0.95,
                                    opacity: 0,
                                    transition: {
                                        ease: 'easeInOut',
                                        duration: 0.3,
                                    },
                                },
                            }}
                            className='fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white shadow-xl p-6 flex flex-col z-50'
                        >
                            <button
                                onClick={closeMenu}
                                className='self-end mb-8'
                            >
                                <X size={28} />
                            </button>

                            {!mounted || role === null ? (
                                <div className='text-center mt-4 text-gray-600'>
                                    Loading menu...
                                </div>
                            ) : pathname.startsWith('/sordar') ? (
                                <AdminSidebar
                                    onLinkClick={closeMenu}
                                    role={role}
                                />
                            ) : (
                                <nav className='flex flex-col gap-8 text-base font-semibold text-center mt-4'>
                                    <Link
                                        href='/'
                                        onClick={closeMenu}
                                        className='hover:text-blue-600'
                                    >
                                        <div className='flex items-center justify-center gap-2'>
                                            <MdHome
                                                size={24}
                                                className='text-orange-600'
                                            />
                                            Home
                                        </div>
                                    </Link>
                                    <Link
                                        href='/our-products'
                                        onClick={closeMenu}
                                        className='hover:text-orange-600'
                                    >
                                        Our Products
                                    </Link>
                                    <Link
                                        href='/curtain-cost-estimator'
                                        onClick={closeMenu}
                                        className='hover:text-orange-600'
                                    >
                                        Get Estimate
                                    </Link>
                                    <Link
                                        href='/book-a-free-visit'
                                        onClick={closeMenu}
                                    >
                                        <div className='rounded-xl border-2 px-4 py-2 text-white bg-orange-600 inline-block'>
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
