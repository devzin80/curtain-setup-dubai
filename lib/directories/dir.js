import Product from '@/app/(backend)/models/product.model'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Support __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Point to your app directory
const appDir = path.join(__dirname, '../../app')

// Fetch slugs from DB (for dynamic routes like [product])
async function fetchSlugsFromDb() {
    const slugs = await Product.find({}, 'slug').lean()
    return slugs.map((item) => item.slug)
}

export async function getRoutes(dir = appDir, prefix = '') {
    let routes = []
    let finalRoutes = []

    const files = fs.readdirSync(dir)

    for (const file of files) {
        const fullPath = path.join(dir, file)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
            if (file.startsWith('(') && file.endsWith(')')) {
                // Skip route groups from path
                routes = routes.concat(await getRoutes(fullPath, prefix))
            } else if (file.startsWith('@')) {
                // Skip parallel routes
                routes = routes.concat(await getRoutes(fullPath, prefix))
            } else {
                routes = routes.concat(
                    await getRoutes(fullPath, path.join(prefix, file)),
                )
            }
        }

        if (
            stat.isFile() &&
            ['page.jsx', 'page.js', 'page.tsx', 'page.ts'].includes(file)
        ) {
            let rawRoute = prefix || '/'
            rawRoute = rawRoute.replace(/\\/g, '/')

            routes.push({
                route: rawRoute,
            })
        }
    }

    // Remove invalid/empty and sordar/* routes
    const filteredRoutes = routes
        .filter((item) => item && item.route)
        .filter(
            (item) =>
                !item.route.startsWith('sordar/') && item.route !== 'sordar',
        )

    for (const { route } of filteredRoutes) {
        // Handle dynamic routes
        const dynamicMatch = route.match(/\[([^\]]+)\]/) // e.g., [product]

        if (dynamicMatch) {
            const basePath = route.split('/[')[0] // e.g., 'products'

            // Only for known dynamic route: products/[product]
            if (basePath === 'products') {
                const slugs = await fetchSlugsFromDb()

                slugs.forEach((slug) => {
                    finalRoutes.push({
                        route: `${basePath}/${slug}`,
                    })
                })
            }

            continue // Skip pushing raw dynamic route
        }

        // Add static route
        finalRoutes.push({ route })
    }

    return finalRoutes
}
