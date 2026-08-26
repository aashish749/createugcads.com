import { ArrowRightIcon, PlayIcon, ZapIcon, CheckIcon } from 'lucide-react';
import { PrimaryButton, GhostButton } from './Buttons';
import { motion } from 'framer-motion';

export default function Hero() {
    const trustedUserImages = [
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=50',
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop'
    ];

    const mainImageUrl = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop';

    const galleryStripImages = [
        'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=80&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=80&auto=format&fit=crop',
    ];

    const trustedLogosText = [
        'LUMINA BOTANICS',
        'AEROKIT STUDIO',
        'MODA WEAR',
        'VELOCITY LABS',
        'NORDIC GEAR',
        'ZENITH AUDIO'
    ];

    return (
        <>
            <section id="home" className="relative z-10">
                <div className="max-w-6xl mx-auto px-4 max-md:w-screen max-md:overflow-hidden pt-32 xl:pt-40 pb-20 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full"
                    >
                        <div className="text-left">
                            <a href="#showcase" className="inline-flex items-center gap-3 pl-3 pr-4 py-1.5 rounded-full bg-white/10 mb-6 justify-start hover:bg-white/15 transition-all">
                                <div className="flex -space-x-2">
                                    {trustedUserImages.map((src, i) => (
                                        <img
                                            key={i}
                                            src={src}
                                            alt={`Client ${i + 1}`}
                                            className="size-6 rounded-full border border-black/50"
                                            width={40}
                                            height={40}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-200/90 flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    Trusted by 1,000+ creators
                                </span>
                            </a>

                            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-xl">
                                Create viral UGC <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-400">
                                    in seconds
                                </span>
                            </h1>

                            <p className="text-gray-300 max-w-lg mb-8 text-sm md:text-base leading-relaxed">
                                Upload product images and a model photo — our AI instantly produces professional lifestyle imagery and short-form videos optimized for commercials & Reels.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                                <a href="/plans" className="w-full sm:w-auto">
                                    <PrimaryButton className="max-sm:w-full py-3 px-7">
                                        Start Creating UGC Ads
                                        <ArrowRightIcon className="size-4" />
                                    </PrimaryButton>
                                </a>

                                <a
                                    href="#showcase"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="w-full sm:w-auto"
                                >
                                    <GhostButton className="max-sm:w-full max-sm:justify-center py-3 px-5">
                                        <PlayIcon className="size-4" />
                                        Explore Showcase
                                    </GhostButton>
                                </a>
                            </div>

                            <div className="flex sm:inline-flex overflow-hidden items-center max-sm:justify-center text-sm text-gray-200 bg-white/10 rounded">
                                <div className="flex items-center gap-2 p-2 px-3 sm:px-6.5 hover:bg-white/3 transition-colors">
                                    <ZapIcon className="size-4 text-cyan-400" />
                                    <div>
                                        <div>Seconds to create</div>
                                        <div className="text-xs text-gray-400">
                                            Optimized social formats
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden sm:block h-6 w-px bg-white/6" />

                                <div className="flex items-center gap-2 p-2 px-3 sm:px-6.5 hover:bg-white/3 transition-colors">
                                    <CheckIcon className="size-4 text-emerald-400" />
                                    <div>
                                        <div>Commercial rights</div>
                                        <div className="text-xs text-gray-400">
                                            Use anywhere, no fuss
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: modern mockup card */}
                        <div className="mx-auto w-full max-w-lg">
                            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-black/50 to-transparent card-hover">
                                <div className="relative aspect-16/10 bg-gray-900 group overflow-hidden">
                                    <img
                                        src={mainImageUrl}
                                        alt="agency-work-preview"
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    />

                                    <div className="absolute left-4 top-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-semibold text-neutral-200 border border-white/10">
                                        Social-ready • 9:16 & 16:9
                                    </div>

                                    <div className="absolute right-4 bottom-4">
                                        <a
                                            href="#showcase"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-black/60 backdrop-blur-md hover:bg-black/80 border border-white/15 transition focus:outline-none cursor-pointer"
                                        >
                                            <PlayIcon className="size-4 text-cyan-400" />
                                            <span className="text-xs font-semibold text-white">Preview UGC</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-3 items-center justify-start">
                                {galleryStripImages.map((src, i) => (
                                    <div
                                        key={i}
                                        className="w-14 h-10 rounded-lg overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer"
                                    >
                                        <img
                                            src={src}
                                            alt="project-thumbnail"
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* TRUSTED BRANDS */}
            <section className="border-y border-white/6 bg-white/[0.02] max-md:mt-10">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="text-center mb-4 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                        Trusted by 1,000+ Boutique DTC Brands & Creators
                    </div>
                    <div className="flex flex-wrap gap-8 sm:gap-12 md:gap-16 items-center justify-center">
                        {trustedLogosText.map((logo, i) => (
                            <span
                                key={i}
                                className="text-sm md:text-base font-bold text-neutral-400 hover:text-white tracking-wider transition-colors font-mono"
                            >
                                {logo}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}