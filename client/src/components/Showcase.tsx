import { useState } from 'react';
import Title from './Title';
import { assets } from '../assets/assets';
import { VideoIcon, CameraIcon, PlayIcon, SparklesIcon, TagIcon } from 'lucide-react';

interface ShowcaseItem {
    title: string;
    category: string;
    type: 'video' | 'image';
    src: string;
    poster?: string;
    tag: string;
    aspectRatio: string;
    description: string;
}

export default function Showcase() {
    const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'image'>('all');

    const showcaseItems: ShowcaseItem[] = [
        {
            title: 'Smartphone Unboxing & Creator Reel',
            category: 'Tech & Electronics',
            type: 'video',
            src: assets.generatedVideo1,
            poster: assets.generated1,
            tag: 'TikTok / Reels Ad',
            aspectRatio: '9:16',
            description: 'Vertical creator unboxing video optimized for TikTok and Instagram Reels commercials.'
        },
        {
            title: 'AeroMax Studio Headphones Commercial',
            category: 'Tech & Audio',
            type: 'video',
            src: assets.generatedVideo2,
            poster: assets.generated4,
            tag: 'YouTube Shorts Ad',
            aspectRatio: '16:9',
            description: 'Cinematic creator commercial demonstrating spatial audio headphones in aesthetic studio lighting.'
        },
        {
            title: 'Velocity Runner Outdoor Lifestyle',
            category: 'Fashion & Footwear',
            type: 'image',
            src: assets.generated3,
            tag: 'Meta Ads Feed',
            aspectRatio: '9:16',
            description: 'Runner model holding high-performance sneakers in sunlit open field setting.'
        },
        {
            title: 'Voyager Pro Airport Jetsetter Shoot',
            category: 'Travel & Luggage',
            type: 'image',
            src: assets.generated2,
            tag: 'Shopify / E-com Banner',
            aspectRatio: '9:16',
            description: 'Stylish traveler model walking with sky-blue hard-shell spinner luggage in sunlit terminal.'
        }
    ];

    const filteredItems = showcaseItems.filter((item) => {
        if (activeFilter === 'all') return true;
        return item.type === activeFilter;
    });

    return (
        <section id="showcase" className="py-24 relative z-10 border-t border-white/6 bg-neutral-950/40">
            <div className="max-w-6xl mx-auto px-4">
                <Title
                    title="Creations"
                    heading="Viral UGC Ads in Action"
                    description="Browse high-converting short-form videos and 4K lifestyle photos generated completely by AI."
                />

                {/* Filter Tabs */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <button
                        onClick={() => setActiveFilter('all')}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                            activeFilter === 'all'
                                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                                : 'bg-white/5 text-neutral-400 hover:text-white border border-white/6'
                        }`}
                    >
                        <SparklesIcon className="size-3.5" /> All Assets
                    </button>
                    <button
                        onClick={() => setActiveFilter('video')}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                            activeFilter === 'video'
                                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                                : 'bg-white/5 text-neutral-400 hover:text-white border border-white/6'
                        }`}
                    >
                        <VideoIcon className="size-3.5" /> Video Ads (MP4)
                    </button>
                    <button
                        onClick={() => setActiveFilter('image')}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                            activeFilter === 'image'
                                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                                : 'bg-white/5 text-neutral-400 hover:text-white border border-white/6'
                        }`}
                    >
                        <CameraIcon className="size-3.5" /> 4K Lifestyle Shoots
                    </button>
                </div>

                {/* Showcase Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {filteredItems.map((item, i) => (
                        <div
                            key={item.title + i}
                            className="group relative rounded-3xl overflow-hidden bg-neutral-900 border border-white/8 hover:border-cyan-500/40 transition-all flex flex-col shadow-xl"
                        >
                            <div className="relative aspect-[9/14] overflow-hidden bg-neutral-950">
                                {item.type === 'video' ? (
                                    <video
                                        src={item.src}
                                        poster={item.poster}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                )}

                                {/* Top Left Tag */}
                                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white flex items-center gap-1.5 border border-white/10">
                                    <TagIcon className="size-3 text-cyan-400" />
                                    <span>{item.tag}</span>
                                </div>

                                {/* Top Right Type Badge */}
                                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-cyan-950/80 backdrop-blur-md text-[10px] font-bold text-cyan-300 flex items-center gap-1 border border-cyan-500/30">
                                    {item.type === 'video' ? (
                                        <>
                                            <VideoIcon className="size-3" />
                                            <span>AI VIDEO</span>
                                        </>
                                    ) : (
                                        <>
                                            <CameraIcon className="size-3" />
                                            <span>4K PHOTO</span>
                                        </>
                                    )}
                                </div>

                                {/* Video Play Hint Overlay on Hover */}
                                {item.type === 'video' && (
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                        <div className="p-3 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                                            <PlayIcon className="size-5 fill-white" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Card Details */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                                            {item.category}
                                        </span>
                                        <span className="text-[11px] font-mono text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded">
                                            {item.aspectRatio}
                                        </span>
                                    </div>

                                    <h3 className="text-base font-bold text-white mb-2 leading-snug">
                                        {item.title}
                                    </h3>

                                    <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="pt-4 mt-4 border-t border-white/6 flex items-center justify-between text-xs text-neutral-400">
                                    <span className="flex items-center gap-1">
                                        <SparklesIcon className="size-3.5 text-cyan-400" /> AI Synthesized
                                    </span>
                                    <span className="text-neutral-500">Commercial Ready</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
