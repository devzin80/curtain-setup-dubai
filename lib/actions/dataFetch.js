// Set your base URL depending on environment
const BASE_URL =
    // process.env.NODE_ENV === 'production'
    //     ? 'http://69.62.83.140:3000' // Hostinger VPS IP for production
         'http://localhost:3000' // Localhost for development

export const getLogo = async () => {
    // console.log('Fetching logo from:', BASE_URL);
    
    const res = await fetch(`${BASE_URL}/api/logo`, { cache: 'no-store' })
    const data = await res.json()
    // console.log('Logo data:', data);
    
    return data.logos[0]
}

export const getWhyUs = async () => {
    const res = await fetch(`${BASE_URL}/api/why-we-are-trusted`, {
        cache: 'no-store',
    })
    const data = await res.json()
    return data
}

export const bannerVideo = async () => {
    const res = await fetch(`${BASE_URL}/api/banner-video`, {
        cache: 'no-store',
    })
    console.log('Fetching banner video from:', BASE_URL);
 
    
    
    const data = await res.json()
    console.log('Banner video data:', data);
    return data[0]
}

export const footerLogo = async () => {
    const res = await fetch(`${BASE_URL}/api/footer-logo`, {
        cache: 'no-store',
    })
    const data = await res.json()
    return data[0]
}

export const getSocialMedia = async () => {
    const res = await fetch(`${BASE_URL}/api/social-medias`, {
        cache: 'no-store',
    })
    const data = await res.json()
    return data
}

export const getAddress = async () => {
    const res = await fetch(`${BASE_URL}/api/contact-us`, { cache: 'no-store' })
    const data = await res.json()
    return data[0]
}

export const getNumber = async () => {
    const res = await fetch(`${BASE_URL}/api/phone-number`, {
        cache: 'no-store',
    })
    const data = await res.json()
    return data[0]
}

export const getEmail = async () => {
    const res = await fetch(`${BASE_URL}/api/email`, { cache: 'no-store' })
    const data = await res.json()
    return data[0]
}

export const getProducts = async (category) => {
    const res = await fetch(
        `${BASE_URL}/api/best-selling-products?category=${encodeURIComponent(
            category,
        )}`,
        { cache: 'no-store' },
    )
    const data = await res.json()
    return data
}

export const getProduct = async (slug) => {
    const res = await fetch(
        `${BASE_URL}/api/best-selling-products/${encodeURIComponent(slug)}`,
        { cache: 'no-store' },
    )
    const data = await res.json()
    return data[0]
}

export const getOurProducts = async () => {
    const res = await fetch(`${BASE_URL}/api/our-products`, {
        cache: 'no-store',
    })
    const data = await res.json()
    return data
}

export const getCalculator = async () => {
    const res = await fetch(`${BASE_URL}/api/calculator`, { cache: 'no-store' })
    const data = await res.json()
    return data
}
