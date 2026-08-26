import { assets } from '../assets/assets';
import { footerLinks } from '../assets/dummy-data';

export default function Footer() {
    return (
        <footer className="bg-white/[0.02] border-t border-white/6 pt-10 text-gray-300 relative z-10">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-white/10">
                    <div>
                        <img src={assets.logo} alt="UGC.AI" className="h-8" />
                        <p className="max-w-[410px] mt-6 text-sm text-neutral-400 leading-relaxed">
                            Create high-converting UGC video ads and commercial lifestyle imagery in seconds with generative AI.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                        {footerLinks.map((section, index) => (
                            <div key={index}>
                                <h3 className="font-semibold text-base text-white md:mb-5 mb-2">
                                    {section.title}
                                </h3>
                                <ul className="text-sm space-y-2">
                                    {section.links.map(
                                        (link: { name: string; url: string }, i) => (
                                            <li key={i}>
                                                <a
                                                    href={link.url}
                                                    target={link.url.startsWith('http') ? '_blank' : undefined}
                                                    rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                    className="text-neutral-400 hover:text-white transition-colors"
                                                >
                                                    {link.name}
                                                </a>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="py-6 text-center text-xs text-neutral-500 font-mono">
                    © {new Date().getFullYear()} UGC.AI. All rights reserved.
                </p>
            </div>
        </footer>
    );
}