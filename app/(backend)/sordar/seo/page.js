import SEOADMIN from '@/app/(Components)/seoAdmin'
import { getRoutes } from '@/lib/directories/dir'
import React from 'react'

const SEO = async () => {
    const routes = await getRoutes()
    return <SEOADMIN routes={routes} />
}

export default SEO
