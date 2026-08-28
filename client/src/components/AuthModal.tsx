import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { XIcon, EyeIcon, EyeOffIcon, SparklesIcon, Loader2Icon, LockIcon, MailIcon, UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PrimaryButton } from './Buttons';

export default function AuthModal() {
    const { isAuthModalOpen, authModalMode, closeAuthModal, login, register } = useAuth();
    const { currentTheme } = useTheme();

    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setMode(authModalMode);
        setName('');
        setEmail('');
        setPassword('');
        setShowPassword(false);
    }, [authModalMode, isAuthModalOpen]);

    if (!isAuthModalOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (mode === 'login') {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeAuthModal}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Modal Dialog */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-md bg-neutral-950/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
                >
                    {/* Ambient Glow */}
                    <div
                        className="absolute -top-20 -left-20 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-40"
                        style={{ backgroundColor: currentTheme.accentColor }}
                    />

                    {/* Close Button */}
                    <button
                        onClick={closeAuthModal}
                        className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition cursor-pointer"
                    >
                        <XIcon className="size-5" />
                    </button>

                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold mb-3 text-neutral-300">
                            <SparklesIcon className="size-3.5 text-cyan-400" />
                            <span>Create UGC Ads Account</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                            {mode === 'login' ? 'Welcome back' : 'Create your account'}
                        </h2>
                        <p className="text-xs text-neutral-400 mt-1">
                            {mode === 'login'
                                ? 'Sign in to access your credits & UGC campaigns'
                                : 'Start producing high-converting AI commercial ads'}
                        </p>
                    </div>

                    {/* Mode Tabs */}
                    <div className="flex bg-neutral-900/80 p-1 rounded-2xl border border-white/10 mb-6">
                        <button
                            type="button"
                            onClick={() => setMode('login')}
                            className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                                mode === 'login'
                                    ? 'bg-white/10 text-white shadow-md'
                                    : 'text-neutral-400 hover:text-white'
                            }`}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('register')}
                            className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                                mode === 'register'
                                    ? 'bg-white/10 text-white shadow-md'
                                    : 'text-neutral-400 hover:text-white'
                            }`}
                        >
                            Create Account
                        </button>
                    </div>

                    {/* Auth Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === 'register' && (
                            <div>
                                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Alex Rivera"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    minLength={6}
                                    placeholder="At least 6 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-11 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition p-1 cursor-pointer"
                                >
                                    {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                                </button>
                            </div>
                        </div>

                        <PrimaryButton
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 text-sm font-bold mt-2 shadow-xl shadow-cyan-500/20"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <Loader2Icon className="size-4 animate-spin" />
                                    <span>Processing...</span>
                                </span>
                            ) : mode === 'login' ? (
                                'Sign In to Account'
                            ) : (
                                'Create Free Account'
                            )}
                        </PrimaryButton>
                    </form>

                    {/* Footer switch */}
                    <div className="mt-6 text-center text-xs text-neutral-400">
                        {mode === 'login' ? (
                            <span>
                                Don't have an account yet?{' '}
                                <button
                                    type="button"
                                    onClick={() => setMode('register')}
                                    className="text-cyan-400 hover:underline font-semibold cursor-pointer"
                                >
                                    Create one now
                                </button>
                            </span>
                        ) : (
                            <span>
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setMode('login')}
                                    className="text-cyan-400 hover:underline font-semibold cursor-pointer"
                                >
                                    Sign in here
                                </button>
                            </span>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
