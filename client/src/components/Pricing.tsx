import Title from './Title';
import { plansData } from '../assets/dummy-data';
import { PrimaryButton, GhostButton } from './Buttons';
import { CheckIcon, SparklesIcon, ArrowRightIcon } from 'lucide-react';
import { useClerk, useUser } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
    const { user } = useUser();
    const { openSignUp } = useClerk();
    const navigate = useNavigate();

    const handleSelectPlan = (planId: string) => {
        if (!user) {
            openSignUp();
            return;
        }
        navigate(`/checkout/${planId}`);
    };

    return (
        <section id="pricing" className="py-20 bg-white/3 border-t border-white/6 relative">
            <div className="max-w-6xl mx-auto px-4">
                <Title
                    title="Pricing"
                    heading="Pricing Plans"
                    description="Our Pricing Plans are simple, transparent and flexible. Choose the plan that best suits your needs."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
                    {plansData.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-3xl p-8 flex flex-col justify-between border card-hover transition-all duration-300 ${
                                plan.popular
                                    ? 'bg-gradient-to-b from-cyan-950/40 to-cyan-900/20 border-cyan-500/50 shadow-xl shadow-cyan-500/10 hover:border-cyan-400'
                                    : 'bg-white/4 border-white/8 hover:border-white/15'
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-semibold tracking-wide flex items-center gap-1.5 shadow-md">
                                    <SparklesIcon className="size-3.5" /> Most Popular
                                </div>
                            )}

                            <div>
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                                    <p className="text-gray-400 text-xs mt-1">{plan.desc}</p>
                                </div>

                                <div className="my-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-white font-mono">{plan.price}</span>
                                    <span className="text-neutral-400 text-xs font-medium">/ month</span>
                                </div>

                                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-6">
                                    <div className="text-cyan-300 font-semibold text-sm">
                                        ⚡ {plan.credits} Credits included
                                    </div>
                                    <div className="text-gray-400 text-xs mt-0.5">
                                        Generate up to {Math.floor(plan.credits / 5)} images or {Math.floor(plan.credits / 10)} videos
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2.5 text-sm text-gray-300">
                                            <CheckIcon className="size-4 text-cyan-400 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                {plan.popular ? (
                                    <PrimaryButton
                                        onClick={() => handleSelectPlan(plan.id)}
                                        className="w-full py-3 text-sm font-semibold shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                                    >
                                        <span>Proceed to Checkout</span> <ArrowRightIcon className="size-4" />
                                    </PrimaryButton>
                                ) : (
                                    <GhostButton
                                        onClick={() => handleSelectPlan(plan.id)}
                                        className="w-full py-3 text-sm font-semibold justify-center flex items-center gap-2"
                                    >
                                        <span>Proceed to Checkout</span> <ArrowRightIcon className="size-4" />
                                    </GhostButton>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}