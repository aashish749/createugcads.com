import React, { useState } from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon } from 'lucide-react';
import { PrimaryButton } from '../components/Buttons';
import toast from 'react-hot-toast';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('support');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) {
            toast.error('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            toast.success('Your message has been sent successfully! Our team will get back to you shortly.');
            setName('');
            setEmail('');
            setSubject('support');
            setMessage('');
            setIsSubmitting(false);
        }, 1200);
    };

    return (
        <div className="relative min-h-screen pt-32 pb-20 overflow-hidden text-neutral-300">
            {/* Ambient Background Glows */}
            <div className="absolute top-20 left-1/3 w-[800px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none z-0" />
            <div className="absolute bottom-20 right-[-100px] w-[500px] h-[500px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none z-0" />

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider font-mono">
                        Get In Touch
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
                        Contact <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Our Support</span>
                    </h1>
                    <p className="mt-4 text-base text-neutral-400 max-w-xl mx-auto">
                        Have questions about plans, credits, or custom models? We are here to help 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white/[0.03] border border-white/6 rounded-3xl p-6 backdrop-blur-md flex items-start gap-4">
                            <div className="p-3 bg-cyan-500/15 border border-cyan-500/30 rounded-2xl text-cyan-300 shrink-0">
                                <MailIcon className="size-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-1">Email Support</h4>
                                <a href="mailto:support@createugcads.com" className="text-sm text-cyan-400 hover:underline">
                                    support@createugcads.com
                                </a>
                                <p className="text-xs text-neutral-500 mt-1 font-mono">Response time: &lt; 12 hours</p>
                            </div>
                        </div>

                        <div className="bg-white/[0.03] border border-white/6 rounded-3xl p-6 backdrop-blur-md flex items-start gap-4">
                            <div className="p-3 bg-cyan-500/15 border border-cyan-500/30 rounded-2xl text-cyan-300 shrink-0">
                                <PhoneIcon className="size-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-1">Phone Line</h4>
                                <a href="tel:+351920792858" className="text-sm text-cyan-400 hover:underline">
                                    +351 920 792 858
                                </a>
                                <p className="text-xs text-neutral-500 mt-1 font-mono">Portugal Support (GMT+1)</p>
                            </div>
                        </div>

                        <div className="bg-white/[0.03] border border-white/6 rounded-3xl p-6 backdrop-blur-md flex items-start gap-4">
                            <div className="p-3 bg-cyan-500/15 border border-cyan-500/30 rounded-2xl text-cyan-300 shrink-0">
                                <MapPinIcon className="size-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-1">Office Location</h4>
                                <p className="text-sm text-neutral-400">
                                    Lisbon, Portugal
                                </p>
                                <p className="text-xs text-neutral-500 mt-1 font-mono">Serving global digital brands</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7 bg-white/[0.02] border border-white/6 rounded-3xl p-8 backdrop-blur-md">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-neutral-300 mb-2" htmlFor="name">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Jane Doe"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-neutral-300 mb-2" htmlFor="email">
                                    Business Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="jane@company.com"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-neutral-300 mb-2" htmlFor="subject">
                                    Inquiry Subject
                                </label>
                                <select
                                    id="subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
                                >
                                    <option value="support">Billing & Tech Support</option>
                                    <option value="sales">Custom / Agency Solutions</option>
                                    <option value="partnership">Business Partnerships</option>
                                    <option value="general">General Inquiry</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-neutral-300 mb-2" htmlFor="message">
                                    Your Message *
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="How can we help your brand scale creatives?"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm resize-none"
                                />
                            </div>

                            <PrimaryButton
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 mt-4 cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <span>Sending message...</span>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <SendIcon className="size-4" />
                                    </>
                                )}
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
