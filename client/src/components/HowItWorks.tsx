import Title from './Title';
import { UploadCloudIcon, Wand2Icon, FilmIcon, ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PrimaryButton } from './Buttons';
import { motion } from 'framer-motion';

export default function HowItWorks() {
    const steps = [
        {
            step: '01',
            icon: <UploadCloudIcon className="size-6 text-cyan-400" />,
            title: 'Upload Product & Creator',
            description: 'Upload your product image along with a reference creator or model photo. Our AI scans angles, lighting, and textures.'
        },
        {
            step: '02',
            icon: <Wand2Icon className="size-6 text-indigo-400" />,
            title: 'AI Synthesis & Direction',
            description: 'Advanced vision models naturally blend the model holding and demonstrating your product with hyper-realistic reflections and studio lighting.'
        },
        {
            step: '03',
            icon: <FilmIcon className="size-6 text-emerald-400" />,
            title: 'Export Video & Ad Assets',
            description: 'Generate social-ready 9:16 vertical videos and 4K lifestyle ad creatives ready to launch on TikTok, Meta Ads, and YouTube Shorts.'
        }
    ];

    return (
        <section id="how-it-works" className="py-24 relative z-10 border-t border-white/6 bg-neutral-950/20">
            <div className="max-w-6xl mx-auto px-4">
                <Title
                    title="Workflow"
                    heading="How It Works"
                    description="From raw product photo to high-converting UGC video ad in 3 simple steps."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mt-12">
                    {steps.map((item, i) => (
                        <div
                            key={i}
                            className="relative p-8 rounded-3xl bg-neutral-900/60 border border-white/8 hover:border-cyan-500/30 card-hover flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                                        {item.icon}
                                    </div>
                                    <span className="text-4xl font-black text-white/10 font-mono">
                                        {item.step}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">
                                    {item.title}
                                </h3>

                                <p className="text-neutral-400 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <Link to="/plans">
                        <PrimaryButton className="px-8 py-3.5 text-sm font-semibold flex items-center gap-2">
                            <span>Get Started With a UGC Plan</span> <ArrowRightIcon className="size-4" />
                        </PrimaryButton>
                    </Link>
                </div>
            </div>
        </section>
    );
}
