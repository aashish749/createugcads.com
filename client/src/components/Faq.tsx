import { ChevronDownIcon } from 'lucide-react';
import Title from './Title';
import { faqData } from '../assets/dummy-data';

export default function Faq() {
    return (
        <section id="faq" className="py-20 2xl:py-32">
            <div className="max-w-3xl mx-auto px-4">
                <Title
                    title="FAQ"
                    heading="Frequently asked questions"
                    description="Everything you need to know about using the platform. If you have any questions, feel free to contact us."
                />

                <div className="space-y-3">
                    {faqData.map((faq, i) => (
                        <details
                            key={i}
                            className="group bg-white/[0.04] border border-white/6 rounded-2xl select-none transition-colors hover:border-white/12"
                        >
                            <summary className="flex items-center justify-between p-5 cursor-pointer">
                                <h4 className="font-semibold text-white text-sm md:text-base">{faq.question}</h4>
                                <ChevronDownIcon className="size-5 text-neutral-400 group-open:rotate-180 transition-transform duration-200" />
                            </summary>
                            <p className="px-5 pb-5 pt-0 text-sm text-neutral-300 leading-relaxed">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}