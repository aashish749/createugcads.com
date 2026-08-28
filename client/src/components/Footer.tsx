import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-white/[0.02] border-t border-white/6 pt-10 text-gray-300 relative z-10">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-white/10">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" onClick={scrollToTop}>
                            <img src={assets.logo} alt="Create UGC Ads" className="h-8 md:h-9 w-auto" />
                        </Link>
                        <p className="max-w-[320px] text-sm text-neutral-400 leading-relaxed">
                            Create high-converting UGC video ads and commercial lifestyle imagery in seconds with generative AI.
                        </p>
                        <div className="space-y-3 text-xs text-neutral-400 font-mono">
                            <div className="flex items-center gap-2">
                                <Mail className="size-4 text-cyan-400 shrink-0" />
                                <a href="mailto:support@createugcads.com" className="hover:text-white transition-colors">
                                    support@createugcads.com
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="size-4 text-cyan-400 shrink-0" />
                                <a href="tel:+351920792858" className="hover:text-white transition-colors">
                                    +351 920 792 858
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="size-4 text-cyan-400 shrink-0" />
                                <span>Lisbon, Portugal</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full md:w-[60%] lg:w-[50%]">
                        {/* Product */}
                        <div>
                            <h3 className="font-semibold text-base text-white mb-4">Product</h3>
                            <ul className="text-sm space-y-2.5">
                                <li>
                                    <Link to="/" onClick={scrollToTop} className="text-neutral-400 hover:text-white transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/generate" onClick={scrollToTop} className="text-neutral-400 hover:text-white transition-colors">
                                        Create Ad
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/plans" onClick={scrollToTop} className="text-neutral-400 hover:text-white transition-colors">
                                        Pricing Plans
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/community" onClick={scrollToTop} className="text-neutral-400 hover:text-white transition-colors">
                                        Community
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="font-semibold text-base text-white mb-4">Company</h3>
                            <ul className="text-sm space-y-2.5">
                                <li>
                                    <Link to="/about" onClick={scrollToTop} className="text-neutral-400 hover:text-white transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" onClick={scrollToTop} className="text-neutral-400 hover:text-white transition-colors">
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="font-semibold text-base text-white mb-4">Legal</h3>
                            <ul className="text-sm space-y-2.5">
                                <li>
                                    <Link to="/privacy-policy" onClick={scrollToTop} className="text-neutral-400 hover:text-white transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/terms-of-service" onClick={scrollToTop} className="text-neutral-400 hover:text-white transition-colors">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/refund-policy" onClick={scrollToTop} className="text-neutral-400 hover:text-white transition-colors">
                                        Refund Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <p className="py-6 text-center text-xs text-neutral-500 font-mono">
                    © {new Date().getFullYear()} Create UGC Ads (createugcads.com). All rights reserved.
                </p>
            </div>
        </footer>
    );
}