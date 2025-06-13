// models/Seo.js
import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
        width: Number,
        height: Number,
        alt: String,
    },
    { _id: false },
)

const structuredDataSchema = new mongoose.Schema(
    {
        type: String,
        data: mongoose.Schema.Types.Mixed,
    },
    { _id: false },
)

const seoSchema = new mongoose.Schema(
    {
        // Basic page targeting
        page: { type: String, required: true, unique: true },
        locale: { type: String, default: 'en' },
        region: { type: String }, // e.g., "US", "FR"

        // ✅ Focus Keyword (added at top-level)
        focusKeyword: { type: String },

        // Standard SEO
        title: String,
        description: String,
        canonicalUrl: String,
        alternateLocales: [
            {
                hrefLang: String,
                href: String,
            },
        ],

        metaTags: {
            keywords: [String],
            robots: { type: String, default: 'index, follow' },
            viewport: {
                type: String,
                default: 'width=device-width, initial-scale=1',
            },
            themeColor: String,
            mobileOptimized: { type: Boolean, default: true },
            author: String,
            generator: String,
            charset: { type: String, default: 'utf-8' },
        },

        openGraph: {
            title: String,
            description: String,
            url: String,
            type: { type: String, default: 'website' },
            locale: String,
            siteName: String,
            images: [imageSchema],
        },

        twitter: {
            card: {
                type: String,
                enum: ['summary', 'summary_large_image', 'app', 'player'],
                default: 'summary_large_image',
            },
            title: String,
            description: String,
            image: String,
            site: String,
            creator: String,
            app: {
                name: String,
                id: String,
                url: String,
            },
        },

        favicons: {
            appleTouchIcon: String,
            icon192: String,
            icon512: String,
            manifest: String,
            maskIcon: String,
            shortcutIcon: String,
        },

        structuredData: [structuredDataSchema], // multiple JSON-LD blocks

        publisher: {
            name: String,
            logo: String,
            url: String,
            type: {
                type: String,
                enum: ['Organization', 'Person'],
                default: 'Organization',
            },
        },

        socialProfiles: [
            {
                platform: String, // e.g., 'facebook', 'linkedin'
                url: String,
            },
        ],

        analytics: {
            googleAnalyticsId: String,
            googleTagManagerId: String,
            facebookPixelId: String,
            hotjarId: String,
        },

        extraHead: {
            scripts: [
                {
                    src: String,
                    async: Boolean,
                    defer: Boolean,
                    type: String,
                    innerHTML: String,
                },
            ],
            noscript: [
                {
                    innerHTML: String,
                },
            ],
            links: [
                {
                    rel: String,
                    href: String,
                    type: String,
                },
            ],
        },

        customMeta: [
            {
                name: String,
                content: String,
                property: String,
            },
        ],

        environment: {
            showInProduction: { type: Boolean, default: true },
            showInStaging: { type: Boolean, default: false },
        },
    },
    { timestamps: true },
)

const SEO = mongoose.models.SEO || mongoose.model('SEO', seoSchema)
export default SEO
