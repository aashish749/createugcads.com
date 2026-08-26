import { ArrowRightIcon } from 'lucide-react';
import { PrimaryButton } from './Buttons';

export default function CTA() {
    return (
        <section className="py-20 2xl:pb-32 px-4">
            <div className="container mx-auto max-w-3xl">
                <div className="rounded-3xl bg-gradient-to-b from-cyan-950/30 to-indigo-950/20 border border-cyan-500/20 p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20" />
                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-white tracking-tight">
                            Ready to Scale Your UGC Ad Pipeline?
                        </h2>
                        <p className="max-sm:text-sm text-neutral-300 mb-10 max-w-xl mx-auto leading-relaxed">
                            Join top boutique e-commerce brands and creators producing high-converting creator videos in seconds.
                        </p>
                        <div>
                            <a href="/plans">
                                <PrimaryButton className="px-8 py-3.5 gap-2 text-sm font-bold shadow-xl shadow-cyan-500/25">
                                    Choose Your UGC Plan <ArrowRightIcon size={18} />
                                </PrimaryButton>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}