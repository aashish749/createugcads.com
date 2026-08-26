import { TrendingUpIcon, ZapIcon, DollarSignIcon, VideoIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Metrics() {
    const stats = [
        {
            icon: <TrendingUpIcon className="size-6 text-cyan-400" />,
            value: '3.8x',
            label: 'Higher Ad ROAS',
            desc: 'Compared to static product images'
        },
        {
            icon: <DollarSignIcon className="size-6 text-emerald-400" />,
            value: '85%',
            label: 'Lower Production Cost',
            desc: 'Zero costly studio or model bookings'
        },
        {
            icon: <VideoIcon className="size-6 text-indigo-400" />,
            value: '100K+',
            label: 'UGC Ads Generated',
            desc: 'Powering campaigns globally'
        },
        {
            icon: <ZapIcon className="size-6 text-amber-400" />,
            value: '< 60s',
            label: 'Average Turnaround',
            desc: 'From product upload to final video'
        }
    ];

    return (
        <section className="py-14 border-y border-white/6 bg-neutral-950/40 relative z-10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="p-6 rounded-2xl bg-white/[0.02] border border-white/6 hover:border-cyan-500/30 card-hover flex flex-col items-start"
                        >
                            <div className="p-2.5 rounded-xl bg-white/5 mb-4 border border-white/8">
                                {stat.icon}
                            </div>
                            <div className="text-3xl lg:text-4xl font-extrabold text-white mb-1 font-mono">
                                {stat.value}
                            </div>
                            <div className="text-sm font-semibold text-neutral-200 mb-1">
                                {stat.label}
                            </div>
                            <div className="text-xs text-neutral-400 leading-relaxed">
                                {stat.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
