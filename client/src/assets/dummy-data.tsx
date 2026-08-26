import { UploadIcon, VideoIcon, ZapIcon } from 'lucide-react';

export const featuresData = [
    {
        icon: <UploadIcon className="w-6 h-6" />,
        title: 'Smart Upload',
        desc: 'Drag & drop your assets. We auto-optimize formats and sizes.'
    },
    {
        icon: <ZapIcon className="w-6 h-6" />,
        title: 'Instant Generation',
        desc: 'Optimized models deliver output in seconds with great fidelity.'
    },
    {
        icon: <VideoIcon className="w-6 h-6" />,
        title: 'Video Synthesis',
        desc: 'Bring product shots to life with short-form, social-ready videos.'
    }
];

export const plansData = [
    {
        id: 'starter',
        name: 'Starter',
        price: '$29',
        desc: 'Ideal for solo creators & emerging DTC brands.',
        credits: 60,
        features: [
            '60 Credits / mo',
            'Full 4K Image Generation',
            'No Watermark on Exports',
            'Commercial Ad Usage Rights',
            'Email & Discord Support'
        ]
    },
    {
        id: 'pro',
        name: 'Pro Growth',
        price: '$99',
        desc: 'For high-performing brands & active ad creators.',
        credits: 250,
        features: [
            '250 Credits / mo',
            '4K Imagery & AI Video Ads',
            'No Watermark on Exports',
            'Commercial Ad Usage Rights',
            'Priority GPU Pipeline',
            '24/7 Priority Support'
        ],
        popular: true
    },
    {
        id: 'ultra',
        name: 'Agency Scale',
        price: '$199',
        desc: 'For growth agencies & multi-brand marketing teams.',
        credits: 600,
        features: [
            '600 Credits / mo',
            'Unlimited 4K & Video Synthesis',
            'Dedicated Account Manager',
            'Custom AI Model Fine-tuning',
            'Full Team Multi-Seat Access',
            'Priority Live Chat Support'
        ]
    }
];


export const faqData = [
    {
        question: 'How does the AI generation work?',
        answer: 'We leverage state-of-the-art diffusion models trained on millions of product images to blend your product into realistic scenes while preserving details, lighting and reflections.'
    },
    {
        question: 'Do I own the generated images?',
        answer: 'Yes — you receive full commercial rights to any images and videos generated on the platform. Use them for ads, ecommerce, social media and more.'
    },
    {
        question: 'Can I cancel anytime?',
        answer: 'Yes — you can cancel from your dashboard. You will retain access through the end of your billing period.'
    },
    {
        question: 'What input formats do you support?',
        answer: 'We accept JPG, PNG and WEBP. Outputs are high-resolution PNGs and MP4s optimized for social platforms.'
    }
];

export const footerLinks = [
    {
        title: "Quick Links",
        links: [
            { name: "Home", url: "#" },
            { name: "Features", url: "#" },
            { name: "Pricing", url: "#" },
            { name: "FAQ", url: "#" }
        ]
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", url: "#" },
            { name: "Terms of Service", url: "#" }
        ]
    },
    {
        title: "Connect",
        links: [
            { name: "LinkedIn", url: "https://www.linkedin.com/in/aashis-chalise/" },
            { name: "GitHub", url: "https://github.com/aashish749" }
        ]
    }
];