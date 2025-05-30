'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'

const sidebar = [
    {
        name: 'CMS',
        Children: [
            { name: 'Logo', link: '/sordar/logo' },
            { name: 'Hero-banner-video', link: '/sordar/hero-banner-video' },
            { name: 'why-we-are-trusted', link: '/sordar/why-we-are-trusted' },
            { name: 'our-recent-works', link: '/sordar/our-recent-works' },
            { name: 'our-products', link: '/sordar/our-products' },
            {
                name: 'best-selling-products',
                link: '/sordar/best-selling-products',
            },
            {
                name: 'additional-products',
                link: '/sordar/additional-products',
            },
            { name: 'price-calculator', link: '/sordar/price-calculator' },
            { name: 'reviews', link: '/sordar/reviews' },
            {
                name: 'footer',
                Children: [
                    { name: 'footer-logo', link: '/sordar/footer-logo' },
                    { name: 'social-links', link: '/sordar/social-links' },
                    { name: 'privacy-policy', link: '/sordar/privacy-policy' },
                    {
                        name: 'terms-and-conditions',
                        link: '/sordar/terms-and-conditions',
                    },
                    { name: 'contact-us', link: '/sordar/contact-us' },
                    { name: 'phone-number', link: '/sordar/phone-number' },
                    { name: 'email-address', link: '/sordar/email-address' },
                ],
            },
        ],
    },
    {
        name: 'SEO',
        Children: [{ name: 'SEO', link: '/sordar/seo' }],
    },
]

const SidebarItem = ({ item, level = 0, onLinkClick }) => {
    const [isOpen, setIsOpen] = useState(false)
    const hasChildren = !!item.Children

    const toggle = () => {
        if (hasChildren) setIsOpen((prev) => !prev)
    }

    return (
        <div className={`pl-${level * 4} mb-2`}>
            <div
                onClick={toggle}
                className={`flex items-center justify-between cursor-pointer ${
                    hasChildren ? 'font-semibold text-black' : ''
                }`}
            >
                {item.link ? (
                    <Link
                        href={item.link}
                        onClick={onLinkClick}
                        className='block w-full py-2 px-3 rounded hover:bg-blue-100 text-gray-800 text-sm'
                    >
                        {item.name}
                    </Link>
                ) : (
                    <span className='block w-full py-2 px-3 rounded hover:bg-blue-100 text-gray-800 text-sm'>
                        {item.name}
                    </span>
                )}
                {hasChildren &&
                    (isOpen ? (
                        <ChevronUp
                            size={16}
                            className='text-gray-500'
                        />
                    ) : (
                        <ChevronDown
                            size={16}
                            className='text-gray-500'
                        />
                    ))}
            </div>

            {hasChildren && isOpen && (
                <div className='mt-1'>
                    {item.Children.map((child, index) => (
                        <SidebarItem
                            key={index}
                            item={child}
                            level={level + 1}
                            onLinkClick={onLinkClick}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

const AdminSidebar = ({ onLinkClick }) => {
    return (
        <nav className='bg-gray-50 text-black md:border-r-2 md:border-amber-600 p-4 w-64 h-full'>
            {sidebar.map((item, index) => (
                <SidebarItem
                    key={index}
                    item={item}
                    onLinkClick={onLinkClick}
                />
            ))}
        </nav>
    )
}

export default AdminSidebar
