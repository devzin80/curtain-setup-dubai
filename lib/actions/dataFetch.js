export const getLogo = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logo`)
    const data = await res.json()
    const logo = data[0]
    return logo
}

export const getWhyUs = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/why-we-are-trusted`,
    )
    const data = await res.json()
    const whyUs = data
    return whyUs
}

export const bannerVideo = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/banner-video`,
    )
    const data = await res.json()
    const bannerVideo = data[0]
    return bannerVideo
}

export const footerLogo = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/footer-logo`,
    )
    const data = await res.json()
    const footerLogo = data[0]
    return footerLogo
}

export const getSocialMedia = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/social-medias`,
    )
    const data = await res.json()
    const socialMedia = data
    return socialMedia
}

export const getAddress = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact-us`,
    )
    const data = await res.json()
    const address = data[0]
    return address
}
export const getNumber = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/phone-number`,
    )
    const data = await res.json()
    const number = data[0]
    return number
}
export const getEmail = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email`)
    const data = await res.json()
    const email = data[0]
    return email
}

export const getProducts = async (category) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/best-selling-products?category=${category}`,
    )
    const data = await res.json()
    const products = data
    return products
}
export const getProduct = async (slug) => {
    console.log('I am from slug', slug)

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/best-selling-products/${slug}`,
    )
    const data = await res.json()
    const product = data[0]
    return product
}

export const getOurProducts = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/our-products`,
    )
    const data = await res.json()
    const ourProducts = data
    return ourProducts
}


export const getCalculator = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/calculator`,
    )
    const data = await res.json()
    const calculator = data
    return calculator
}