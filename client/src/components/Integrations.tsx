import { LayersIcon } from 'lucide-react';

export default function Integrations() {
    const platforms = [
        { name: 'TikTok Ads', type: '9:16 Vertical Video' },
        { name: 'Meta Reels & Stories', type: 'High CTR Video Ads' },
        { name: 'YouTube Shorts', type: 'Commercial Reach' },
        { name: 'Shopify E-Commerce', type: 'Product Detail Pages' },
        { name: 'Amazon Storefront', type: 'Lifestyle Imagery' },
        { name: 'Instagram Feeds', type: '1:1 & 4:5 Carousel Ads' }
    ];

    return (
        <section className="py-20 border-t border-white/6 bg-neutral-950/40 relative z-10">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-4">
                    <LayersIcon className="size-3.5" /> Ad Channels & Ecosystem
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Optimized for Every Paid Ad Channel
                </h3>

                <p className="text-neutral-400 text-sm max-w-xl mx-auto mb-10">
                    Export high-resolution assets natively formatted with zero quality loss for major ad networks.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {platforms.map((item, i) => (
                        <div
                            key={i}
                            className="p-5 rounded-2xl bg-white/[0.02] border border-white/6 hover:border-cyan-500/30 transition text-center flex flex-col items-center justify-center"
                        >
                            <div className="text-sm font-bold text-white mb-1">
                                {item.name}
                            </div>
                            <div className="text-[11px] text-neutral-400">
                                {item.type}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
