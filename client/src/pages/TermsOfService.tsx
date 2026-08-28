export default function TermsOfService() {
    return (
        <div className="relative min-h-screen pt-32 pb-20 overflow-hidden text-neutral-300">
            {/* Ambient Background Glows */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none z-0" />

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider font-mono">
                        Legal Documents
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
                        Terms of Service
                    </h1>
                    <p className="mt-4 text-sm text-neutral-500 font-mono">
                        Last Updated: August 28, 2026
                    </p>
                </div>

                {/* Terms Content */}
                <div className="bg-white/[0.02] border border-white/6 rounded-3xl p-8 md:p-12 backdrop-blur-md space-y-8 leading-relaxed text-sm md:text-base">
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
                        <p className="text-neutral-400">
                            By creating an account, accessing, or using the Create UGC Ads platform at <strong>createugcads.com</strong> (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not register for or use any services provided on the platform.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">2. Account Registration and Responsibilities</h2>
                        <p className="text-neutral-400">
                            To utilize our generative tools, you must register a unique account. You agree to provide accurate, current, and complete information. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your login profile. We reserve the right to suspend accounts displaying fraudulent activity or excessive unauthorized sharing.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">3. Credit System and Subscriptions</h2>
                        <p className="text-neutral-400">
                            Our Service functions on a credit-based subscription model. 
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-neutral-400">
                            <li>Credits are consumed during output generation: 5 credits per image render, and 10 credits per video synthesis.</li>
                            <li>Monthly subscriptions auto-renew on their billing cycle date unless canceled via the billing dashboard before the renewal date.</li>
                            <li>Unused promotional credits do not roll over unless explicitly noted in your plan.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">4. User Content and Intellectual Property Rights</h2>
                        <p className="text-neutral-400">
                            <strong>Your Uploads:</strong> You retain all ownership, intellectual property rights, and copyright to the source assets (product photos, logo files, etc.) you upload to Create UGC Ads.
                        </p>
                        <p className="text-neutral-400">
                            <strong>AI Generations:</strong> Create UGC Ads grants you full commercial rights and ownership to the output images and videos synthesized on our platform. You may utilize them for social media advertising, print media, e-commerce listings, and branding without royalties.
                        </p>
                        <p className="text-neutral-400">
                            <strong>License to Create UGC Ads:</strong> You grant Create UGC Ads a temporary, worldwide, royalty-free license to store, crop, and run calculations on your uploaded files solely to generate your requested outputs and maintain your history.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">5. Prohibited Use and Conduct</h2>
                        <p className="text-neutral-400">
                            You agree not to use the Service to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-neutral-400">
                            <li>Upload files that contain malware, viruses, or harmful scripts.</li>
                            <li>Generate defamatory, obscene, pornographic, hateful, or racially offensive content.</li>
                            <li>Scrape, reverse engineer, or decompile the frontend interface or backend rendering APIs of Create UGC Ads.</li>
                            <li>Attempt to exploit GPU processing nodes or bypass payment walls.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">6. Limitation of Liability and Warranties</h2>
                        <p className="text-neutral-400">
                            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Create UGC Ads makes no warranties, express or implied, regarding the accuracy, completeness, or suitability of generated assets for specific commercial outcomes. We are not liable for business interruptions, conversion drops, or advertising account suspensions resulting from the use of generated imagery.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">7. Governing Law and Dispute Resolution</h2>
                        <p className="text-neutral-400">
                            These Terms shall be governed by and construed in accordance with the laws of <strong>Portugal</strong> and the European Union. Any legal actions or disputes arising out of these Terms shall be resolved in the competent courts of Lisbon, Portugal.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">8. Amendments and Contact Info</h2>
                        <p className="text-neutral-400">
                            We reserve the right to modify these Terms at any time. Continued use of the platform constitutes agreement to the updated Terms. For questions or support, contact:
                        </p>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mt-3 font-mono text-xs md:text-sm space-y-1">
                            <p><strong>Create UGC Ads Support Desk</strong></p>
                            <p>Email: support@createugcads.com</p>
                            <p>Phone: +351 920 792 858</p>
                            <p>Lisbon, Portugal</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
