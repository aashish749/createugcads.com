export default function RefundPolicy() {
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
                        Refund Policy
                    </h1>
                    <p className="mt-4 text-sm text-neutral-500 font-mono">
                        Last Updated: August 28, 2026
                    </p>
                </div>

                {/* Refund Content */}
                <div className="bg-white/[0.02] border border-white/6 rounded-3xl p-8 md:p-12 backdrop-blur-md space-y-8 leading-relaxed text-sm md:text-base">
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">1. Overview of Billing & Resources</h2>
                        <p className="text-neutral-400">
                            At Create UGC Ads (<strong>createugcads.com</strong>), we build cutting-edge artificial intelligence tools to synthesize marketing imagery and videos. When you generate content, we immediately spin up cloud GPU instances (via AWS and other suppliers) to process your diffusion pipelines. Because of the direct compute costs associated with GPU scheduling, we maintain a clear refund and credit policy.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">2. Eligibility for Refunds</h2>
                        <p className="text-neutral-400">
                            We offer a <strong>14-day refund window</strong> for subscription plans and credit purchases, subject to the following condition:
                        </p>
                        <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-neutral-300 text-sm">
                            <span className="font-semibold text-white">Rule:</span> You must not have consumed more than <strong>10%</strong> of the credits provided in your plan. If you have generated more than 2 images or 1 video, the payment is considered partially consumed and is non-refundable.
                        </div>
                        <p className="text-neutral-400 mt-2">
                            If you meet this criterion, we will refund 100% of your transaction fee.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">3. System Glitches and Image Failures</h2>
                        <p className="text-neutral-400">
                            If a generation fails due to a server-side processing error (such as a GPU timeout or platform crash), we will automatically refund the spent credits to your account balance. Please check your "My Generations" dashboard or contact our team if credits were deducted for a failed job.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">4. Cancellation Policy</h2>
                        <p className="text-neutral-400">
                            You may cancel your monthly subscription at any time via your Account Dashboard. Upon cancellation:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-neutral-400">
                            <li>You will not be billed on the next cycle.</li>
                            <li>You retain active access to your remaining credit balance and generated project folders until the end of your current billing period.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">5. How to Initiate a Refund Request</h2>
                        <p className="text-neutral-400">
                            To request a refund, please send an email to <strong>support@createugcads.com</strong> with:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-neutral-400">
                            <li>Your account login email.</li>
                            <li>The date of the transaction and amount.</li>
                            <li>Your transaction receipt or reference ID from Stripe.</li>
                            <li>A brief note explaining the reason for cancellation (we use this to improve our generative models!).</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">6. Processing Times</h2>
                        <p className="text-neutral-400">
                            Once approved, refunds are processed immediately. The funds will return to your original payment method within <strong>5 to 10 business days</strong>, depending on your bank or credit card issuer's terms.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">7. Support Contact</h2>
                        <p className="text-neutral-400">
                            For billing disputes, card changes, and custom credit adjustments, contact:
                        </p>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mt-3 font-mono text-xs md:text-sm space-y-1">
                            <p><strong>Create UGC Ads Billing Operations</strong></p>
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
