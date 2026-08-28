export default function PrivacyPolicy() {
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
                        Privacy Policy
                    </h1>
                    <p className="mt-4 text-sm text-neutral-500 font-mono">
                        Last Updated: August 28, 2026
                    </p>
                </div>

                {/* Policy Content */}
                <div className="bg-white/[0.02] border border-white/6 rounded-3xl p-8 md:p-12 backdrop-blur-md space-y-8 leading-relaxed text-sm md:text-base">
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">1. Introduction</h2>
                        <p className="text-neutral-400">
                            Welcome to Create UGC Ads (operated at <strong>createugcads.com</strong>). We respect your privacy and are committed to protecting the personal data of our users. This Privacy Policy details how we collect, process, store, and share your personal information when you use our content generation platform, mobile services, and API integrations.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
                        <p className="text-neutral-400">
                            To deliver our generative media solutions, we collect several categories of information:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-neutral-400">
                            <li><strong>Account Data:</strong> When you sign up, we collect your name, email address, password, and authentication tokens.</li>
                            <li><strong>Uploaded Assets:</strong> We collect and process product images, background imagery, and assets you upload to generate commercial visuals.</li>
                            <li><strong>Billing Information:</strong> Payments are processed securely via third-party gateways (e.g., Stripe). We do not store full credit card details on our servers; we only store billing profiles and transaction receipts.</li>
                            <li><strong>Technical Logs:</strong> Your IP address, browser metadata, operating system type, and interaction metrics on our app interface.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">3. How We Use Your Information</h2>
                        <p className="text-neutral-400">
                            We utilize the collected information for the following business and operations activities:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-neutral-400">
                            <li>To provision, maintain, and optimize the Create UGC Ads platform and rendering engines.</li>
                            <li>To process subscriptions, track credit allocations, and manage billing profiles.</li>
                            <li>To troubleshoot pipeline issues and answer customer requests via our support channel.</li>
                            <li>To enforce our Terms of Service and prevent fraudulent use of GPU rendering credits.</li>
                            <li>To comply with statutory financial audits and legal requests.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">4. Data Sharing and Third Parties</h2>
                        <p className="text-neutral-400">
                            We do not sell, rent, or trade your personal data. We disclose personal data only to standard service providers, including:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-neutral-400">
                            <li><strong>Cloud Infrastructure Providers:</strong> AWS and other cloud providers for hosting data, database services, and executing GPU diffusion tasks.</li>
                            <li><strong>Payment Processors:</strong> Stripe, for secure payment processing.</li>
                            <li><strong>Analytics:</strong> Google Analytics and other performance measurement tools.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">5. Data Retention and Security</h2>
                        <p className="text-neutral-400">
                            We retain account metadata for as long as your account remains active. Uploaded asset files are stored securely and may be deleted automatically or manually by the user from their dashboard. We protect all inbound and outbound traffic using SSL/TLS encryption protocols and secure storage buckets.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">6. Your GDPR and Privacy Rights</h2>
                        <p className="text-neutral-400">
                            Depending on your location (such as the European Union under GDPR), you have specific rights:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-neutral-400">
                            <li>The right to request access to and correction of your personal data.</li>
                            <li>The right to request deletion ("Right to be Forgotten") of your account details and uploads.</li>
                            <li>The right to restrict or object to certain aspects of data processing.</li>
                            <li>The right to data portability.</li>
                        </ul>
                        <p className="text-neutral-400 mt-2">
                            To exercise any of these options, please reach out to us at <strong>support@createugcads.com</strong>.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">7. Contact Details</h2>
                        <p className="text-neutral-400">
                            If you have questions regarding this Privacy Policy, our data standards, or GDPR inquiries, contact:
                        </p>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mt-3 font-mono text-xs md:text-sm space-y-1">
                            <p><strong>Create UGC Ads Support Department</strong></p>
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
