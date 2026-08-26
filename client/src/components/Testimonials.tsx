import Title from './Title';
import { StarIcon, CheckCircle2Icon } from 'lucide-react';

export default function Testimonials() {
    const reviews = [
        {
            name: 'Sarah Jenkins',
            role: 'Head of Growth at Kroma Skincare',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop',
            content: 'We cut our TikTok creator scouting time from 2 weeks to 2 minutes. Our latest AI UGC video ad achieved a 4.1x ROAS on Meta within the first 48 hours.',
            stars: 5,
            tag: '4.1x ROAS'
        },
        {
            name: 'Marcus Vance',
            role: 'Founder & CMO, Pulse Hydration',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop',
            content: 'Studio shoots used to cost us $3,500 per batch. With this platform, we produce 20+ variations per product in an afternoon for a fraction of the cost.',
            stars: 5,
            tag: '85% Cost Saved'
        },
        {
            name: 'Elena Rostova',
            role: 'Creative Director, Apex Digital Agency',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&fit=crop',
            content: 'The realism is incredible. The AI accurately matches hand perspective, shadows, and studio lighting. Our clients think we booked professional influencers.',
            stars: 5,
            tag: 'Agency Tier'
        }
    ];

    return (
        <section id="testimonials" className="py-24 relative z-10 border-t border-white/6 bg-neutral-950/30">
            <div className="max-w-6xl mx-auto px-4">
                <Title
                    title="Testimonials"
                    heading="Trusted by Boutique DTC Brands & Agencies"
                    description="Hear how performance marketing teams and creators scale their UGC pipelines with our platform."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {reviews.map((rev, i) => (
                        <div
                            key={i}
                            className="p-8 rounded-3xl bg-neutral-900/70 border border-white/8 flex flex-col justify-between hover:border-cyan-500/30 transition-all"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-1 text-amber-400">
                                        {[...Array(rev.stars)].map((_, s) => (
                                            <StarIcon key={s} className="size-4 fill-amber-400" />
                                        ))}
                                    </div>
                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">
                                        {rev.tag}
                                    </span>
                                </div>

                                <p className="text-neutral-300 text-sm leading-relaxed mb-6 italic">
                                    "{rev.content}"
                                </p>
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                                <img
                                    src={rev.avatar}
                                    alt={rev.name}
                                    className="size-10 rounded-full object-cover border border-white/10"
                                />
                                <div>
                                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                                        <span>{rev.name}</span>
                                        <CheckCircle2Icon className="size-3.5 text-cyan-400" />
                                    </div>
                                    <div className="text-xs text-neutral-400">
                                        {rev.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
