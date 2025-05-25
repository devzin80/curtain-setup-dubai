import React from 'react'
import Link from 'next/link'

const sidebar = [
    {
        name: 'CMS',
        Children: [
            {
                name: 'Logo',
                link: '/sordar/logo',
            },
            {
                name: 'Hero-banner-video',
                link: '/sordar/hero-banner-video',
            },
            {
                name: 'why-we-are-trusted',
                link: '/sordar/why-we-are-trusted',
            },
            {
                name: 'our-recent-works',
                link: '/sordar/our-recent-works',
            },
            {
                name: 'our-products',
                link: '/sordar/our-products',
            },
            {
                name: 'best-selling-products',
                link: '/sordar/best-selling-products',
            },
            {
                name: 'additional-products',
                link: '/sordar/additional-products',
            },
            {
                name: 'price-calculator',
                link: '/sordar/price-calculator',
            },
            {
                name: 'reviews',
                link: '/sordar/reviews',
            },
            {
                name: 'footer',
                Children: [
                    {
                        name: 'footer-logo',
                        link: '/sordar/footer-logo',
                    },
                    {
                        name: 'social-links',
                        link: '/sordar/social-links',
                    },
                    {
                        name: 'privacy-policy',
                        link: '/sordar/privacy-policy',
                    },
                    {
                        name: 'terms-and-conditions',
                        link: '/sordar/terms-and-conditions',
                    },
                    {
                        name: 'contact-us',
                        link: '/sordar/contact-us',
                    },
                    {
                        name: 'phone-number',
                        link: '/sordar/phone-number',
                    },
                    {
                        name: 'email-address',
                        link: '/sordar/email-address',
                    },
                ],
            },
        ],
    },
    {
        name: 'SEO',
        // added link to SEO
    },
]

// Recursive component
const SidebarItem = ({ item, level = 0 }) => {
    return (
        <div
            style={{ marginLeft: `${level * 16}px` }}
            className='mb-2'
        >
            {item.link ? (
                <Link
                    href={item.link}
                    className='hover:text-amber-500 transition-colors font-medium block'
                >
                    {item.name}
                </Link>
            ) : (
                <div className='font-bold'>{item.name}</div>
            )}

            {item.Children && (
                <div className='mt-2'>
                    {item.Children.map((child, index) => (
                        <SidebarItem
                            key={index}
                            item={child}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

const AdminSidebar = () => {
    return (
        <div className='w-1/4 bg-gray-50 text-black border-r-2 border-amber-600  p-4 '>
            {sidebar.map((item, index) => (
                <SidebarItem
                    key={index}
                    item={item}
                />
            ))}
        </div>
    )
}

export default AdminSidebar
