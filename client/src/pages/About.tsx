import { ShieldCheckIcon, SparklesIcon, TargetIcon, UsersIcon } from 'lucide-react';

export default function About() {
    return (
        <div className="relative min-h-screen pt-32 pb-20 overflow-hidden text-neutral-300">
            {/* Ambient Background Glows */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none z-0" />
            <div className="absolute bottom-20 right-[-200px] w-[500px] h-[500px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none z-0" />

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider font-mono">
                        Our Story
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
                        About <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Create UGC Ads</span>
                    </h1>
                    <p className="mt-4 text-lg text-neutral-400 max-w-xl mx-auto">
                        Democratizing studio-quality content creation through cutting-edge generative artificial intelligence.
                    </p>
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white/[0.03] border border-white/6 rounded-3xl p-8 backdrop-blur-md">
                        <div className="p-3 bg-cyan-500/15 border border-cyan-500/30 rounded-2xl w-fit mb-6 text-cyan-300">
                            <TargetIcon className="size-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
                        <p className="text-sm leading-relaxed text-neutral-400">
                            We empower DTC brands, ecommerce stores, and digital agencies to scale their advertising creatives infinitely. By eliminating the high costs, delays, and complexity of traditional studio shoots, we make professional-grade content accessible to startups and enterprises alike.
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/6 rounded-3xl p-8 backdrop-blur-md">
                        <div className="p-3 bg-indigo-500/15 border border-indigo-500/30 rounded-2xl w-fit mb-6 text-indigo-300">
                            <SparklesIcon className="size-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">The Technology</h3>
                        <p className="text-sm leading-relaxed text-neutral-400">
                            Create UGC Ads integrates state-of-the-art diffusion architectures and custom proprietary neural models to blend products seamlessly into lifestyle environments. We preserve exact product dimensions, textures, and geometry, while generating photorealistic lighting and matching shadows.
                        </p>
                    </div>
                </div>

                {/* Core Values Section */}
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 mb-16 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Core Values</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex gap-4">
                            <div className="text-cyan-400 shrink-0">
                                <ShieldCheckIcon className="size-6" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-1">Quality First</h4>
                                <p className="text-sm text-neutral-400">
                                    We never compromise on output resolution and fidelity. Our assets are optimized for high-performing conversion funnels.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="text-cyan-400 shrink-0">
                                <UsersIcon className="size-6" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-1">Customer Obsession</h4>
                                <p className="text-sm text-neutral-400">
                                    From creators to large-scale marketing managers, we shape our features directly based on active community feedback.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Office/Location Legitimacy Info */}
                <div className="text-center py-6 border-t border-white/10 max-w-2xl mx-auto">
                    <p className="text-sm text-neutral-500 leading-relaxed font-mono">
                        Create UGC Ads is operated internationally with representation in Lisbon, Portugal. 
                        For inquiries, feel free to reach out to our dedicated support desk.
                    </p>
                </div>
            </div>
        </div>
    );
}
