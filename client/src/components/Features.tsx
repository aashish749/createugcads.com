import { featuresData } from '../assets/dummy-data';
import Title from './Title';

export default function Features() {
    return (
        <section id="features" className="py-20 2xl:py-32">
            <div className="max-w-6xl mx-auto px-4">
                <Title
                    title="Features"
                    heading="Built for modern brands"
                    description="Our AI instantly produces professional lifestyle imagery and short-form videos optimized for commercials & Reels."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuresData.map((feature, i) => (
                        <div
                            key={i}
                            className="rounded-2xl p-6 bg-white/[0.03] border border-white/8 hover:border-cyan-500/30 card-hover shadow-lg flex flex-col"
                        >
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                            <p className="text-neutral-300 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}