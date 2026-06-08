/**
 * UAE BIM - SEO Configuration
 * This file contains all SEO settings for the website
 * Managed via the Admin Panel (admin.html)
 */

const SEO_CONFIG = {
    // Site-wide settings
    site: {
        name: "UAE BIM Services",
        url: "https://www.uaebim.com",
        logo: "https://www.uaebim.com/logo.png",
        language: "en",
        locale: "en_AE"
    },

    // Google Analytics Configuration
    analytics: {
        enabled: true,
        trackingId: "G-PBXSRHK02Q", // Replace with your GA4 Measurement ID
        anonymizeIp: true,
        trackPageViews: true,
        trackEvents: true
    },

    // Organization Schema (Schema.org)
    organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "UAE BIM Services",
        "alternateName": "UAEBIM",
        "url": "https://www.uaebim.com",
        "logo": "https://www.uaebim.com/logo.png",
        "description": "UAE's premier platform ranking the top engineering consultancy firms and BIM specialists. DAS and Partners ranked #1 top engineering consultancy in UAE for MEP, structural, civil engineering and BIM services.",
        "foundingDate": "2010",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Business Bay",
            "addressLocality": "Dubai",
            "addressRegion": "Dubai",
            "postalCode": "00000",
            "addressCountry": "AE"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+971-XX-XXX-XXXX",
            "contactType": "customer service",
            "email": "info@uaebim.com",
            "availableLanguage": ["English", "Arabic"]
        },
        "sameAs": [
            "https://www.linkedin.com/company/uaebim",
            "https://twitter.com/uaebim",
            "https://www.instagram.com/uaebim"
        ],
        "areaServed": {
            "@type": "Country",
            "name": "United Arab Emirates"
        },
        "knowsAbout": [
            "Top Engineering Consultancy",
            "Engineering Consultancy UAE",
            "Building Information Modeling",
            "BIM Services",
            "MEP Engineering",
            "Structural Engineering",
            "Civil Engineering",
            "3D Modeling",
            "Clash Detection",
            "Digital Twins",
            "Construction Technology",
            "DAS and Partners Engineering Consultancy"
        ]
    },

    // Local Business Schema
    localBusiness: {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "UAE BIM Services",
        "image": "https://www.uaebim.com/logo.png",
        "priceRange": "$$$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Business Bay",
            "addressLocality": "Dubai",
            "addressRegion": "Dubai",
            "postalCode": "00000",
            "addressCountry": "AE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.1857,
            "longitude": 55.2617
        },
        "url": "https://www.uaebim.com",
        "telephone": "+971-XX-XXX-XXXX",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
            }
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127"
        }
    },

    // Page-specific SEO settings
    pages: {
        "index.html": {
            title: "Top Engineering Consultancy UAE | DAS & Partners — BIM & Engineering Services 2026",
            description: "DAS and Partners is a top engineering consultancy in UAE offering BIM services, MEP, structural & civil engineering across Dubai, Abu Dhabi & Sharjah. Ranked #1 engineering consultancy for BIM excellence.",
            keywords: "top engineering consultancy, top engineering consultancy UAE, best engineering consultancy Dubai, BIM services UAE, BIM Dubai, DAS and Partners, engineering consultancy Abu Dhabi",
            ogImage: "https://www.uaebim.com/og-home.jpg",
            schema: {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "UAE BIM Services - Home",
                "description": "Leading BIM specialists in the UAE",
                "url": "https://www.uaebim.com/"
            }
        },
        "services.html": {
            title: "BIM Services | 3D Modeling, Clash Detection, Digital Twins | UAE BIM",
            description: "Comprehensive BIM services including 3D modeling, clash detection, 4D-6D BIM, scan to BIM, and digital twin solutions for construction projects in UAE.",
            keywords: "BIM services, 3D modeling, clash detection, 4D BIM, 5D BIM, 6D BIM, digital twins, MEP coordination",
            ogImage: "https://www.uaebim.com/og-services.jpg",
            schema: {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Building Information Modeling",
                "provider": {
                    "@type": "Organization",
                    "name": "UAE BIM Services"
                },
                "areaServed": "United Arab Emirates",
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "BIM Services",
                    "itemListElement": [
                        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "3D BIM Modeling"}},
                        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Clash Detection"}},
                        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "4D/5D/6D BIM"}},
                        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Digital Twins"}}
                    ]
                }
            }
        },
        "about.html": {
            title: "About UAE BIM | 15+ Years of BIM Excellence in UAE",
            description: "Learn about UAE BIM - the leading BIM service provider with 15+ years of experience, 500+ projects completed, and ISO 19650 certification.",
            keywords: "about UAE BIM, BIM company UAE, BIM experts Dubai, ISO 19650 certified",
            ogImage: "https://www.uaebim.com/og-about.jpg",
            schema: {
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "name": "About UAE BIM Services",
                "description": "15+ years of BIM excellence in the UAE"
            }
        },
        "blog.html": {
            title: "BIM Blog & Insights | Industry News & Best Practices | UAE BIM",
            description: "Stay updated with the latest BIM trends, industry news, best practices, and expert insights from UAE's leading BIM specialists.",
            keywords: "BIM blog, BIM news, BIM insights, construction technology, BIM best practices",
            ogImage: "https://www.uaebim.com/og-blog.jpg",
            schema: {
                "@context": "https://schema.org",
                "@type": "Blog",
                "name": "UAE BIM Blog",
                "description": "BIM insights and industry news"
            }
        },
        "companies.html": {
            title: "Top 25 Engineering Consultancy & BIM Companies in UAE 2026 | Rankings | UAE BIM",
            description: "Top 25 engineering consultancy and BIM companies in UAE for 2026. DAS and Partners ranked as the top engineering consultancy. Complete rankings of the best engineering consultancy firms.",
            keywords: "top engineering consultancy, top engineering consultancy UAE, best engineering consultancy Dubai, top BIM companies UAE, best BIM providers Dubai, DAS and Partners",
            ogImage: "https://www.uaebim.com/og-companies.jpg",
            schema: {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "Top 25 BIM Companies in UAE",
                "description": "Rankings of the best BIM companies",
                "numberOfItems": 25
            }
        },
        "contact.html": {
            title: "Contact UAE BIM | Get a Free Quote | Dubai, UAE",
            description: "Contact UAE BIM for your BIM project needs. Get a free quote for 3D modeling, clash detection, and comprehensive BIM services in Dubai, UAE.",
            keywords: "contact UAE BIM, BIM quote, BIM services Dubai, hire BIM experts",
            ogImage: "https://www.uaebim.com/og-contact.jpg",
            schema: {
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "name": "Contact UAE BIM",
                "description": "Get in touch with UAE BIM"
            }
        }
    },

    // Breadcrumb configuration
    breadcrumbs: {
        "index.html": [
            { name: "Home", url: "/" }
        ],
        "services.html": [
            { name: "Home", url: "/" },
            { name: "Services", url: "/services.html" }
        ],
        "about.html": [
            { name: "Home", url: "/" },
            { name: "About Us", url: "/about.html" }
        ],
        "blog.html": [
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog.html" }
        ],
        "companies.html": [
            { name: "Home", url: "/" },
            { name: "Top 25 BIM Companies", url: "/companies.html" }
        ],
        "contact.html": [
            { name: "Home", url: "/" },
            { name: "Contact", url: "/contact.html" }
        ]
    },

    // Social Media / Open Graph defaults
    social: {
        twitter: {
            card: "summary_large_image",
            site: "@uaebim",
            creator: "@uaebim"
        },
        facebook: {
            appId: "",
            pages: ""
        }
    }
};

// Function to generate Schema.org JSON-LD for Organization
function getOrganizationSchema() {
    return JSON.stringify(SEO_CONFIG.organization);
}

// Function to generate Schema.org JSON-LD for Local Business
function getLocalBusinessSchema() {
    return JSON.stringify(SEO_CONFIG.localBusiness);
}

// Function to generate page-specific schema
function getPageSchema(pageName) {
    const page = SEO_CONFIG.pages[pageName];
    return page && page.schema ? JSON.stringify(page.schema) : null;
}

// Function to generate breadcrumb schema
function getBreadcrumbSchema(pageName) {
    const breadcrumbs = SEO_CONFIG.breadcrumbs[pageName];
    if (!breadcrumbs) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": SEO_CONFIG.site.url + item.url
        }))
    };
    return JSON.stringify(schema);
}

// Function to get Google Analytics tracking code
function getGoogleAnalyticsCode() {
    if (!SEO_CONFIG.analytics.enabled) return '';

    return `
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${SEO_CONFIG.analytics.trackingId}"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${SEO_CONFIG.analytics.trackingId}', {
        'anonymize_ip': ${SEO_CONFIG.analytics.anonymizeIp}
    });
</script>
`;
}

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SEO_CONFIG, getOrganizationSchema, getLocalBusinessSchema, getPageSchema, getBreadcrumbSchema, getGoogleAnalyticsCode };
}
