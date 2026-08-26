import { DollarSignIcon, FolderEditIcon, GalleryHorizontalEnd, MenuIcon, SparkleIcon, XIcon, PaletteIcon, CheckIcon, LogOutIcon } from 'lucide-react';

import { GhostButton, PrimaryButton } from './Buttons';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const navigate = useNavigate();
    const { user, openSignIn, openSignUp, logout, refreshUser } = useAuth();
    const { currentTheme, setTheme, themes } = useTheme();

    const [isOpen, setIsOpen] = useState(false);
    const [themeMenuOpen, setThemeMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const themeMenuRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const { pathname } = useLocation();

    const navLinks = [
        { name: 'Home', href: '/#' },
        { name: 'Create', href: '/generate' },
        { name: 'Community', href: '/community' },
        { name: 'Plans', href: '/plans' },
    ];

    useEffect(() => {
        if (user) {
            refreshUser();
        }

        const handleCreditsUpdated = () => {
            refreshUser();
        };

        window.addEventListener('credits-updated', handleCreditsUpdated);
        return () => {
            window.removeEventListener('credits-updated', handleCreditsUpdated);
        };
    }, [pathname]);

    // Close menus on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
                setThemeMenuOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const userInitials = user?.name
        ? user.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
        : 'U';

    return (
        <nav className="fixed top-5 left-0 right-0 z-50 px-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl">
                <Link to="/" onClick={() => scrollTo(0, 0)} className="flex items-center gap-2">
                    <img src={assets.logo} alt="UGC.AI" className="h-8" />
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
                    {navLinks.map((link) => (
                        <Link
                            onClick={() => scrollTo(0, 0)}
                            to={link.href}
                            key={link.name}
                            className="hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    {/* Theme Switcher */}
                    <div className="relative" ref={themeMenuRef}>
                        <button
                            onClick={() => {
                                setThemeMenuOpen(!themeMenuOpen);
                                setUserMenuOpen(false);
                            }}
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
                            title="Choose Color Theme"
                        >
                            <PaletteIcon className="size-4" style={{ color: currentTheme.accentColor }} />
                            <span className="text-xs font-semibold hidden lg:inline-block font-mono">
                                {currentTheme.name.split(' ')[0]}
                            </span>
                        </button>

                        <AnimatePresence>
                            {themeMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 mt-2 w-64 p-2 rounded-2xl bg-neutral-950/95 backdrop-blur-2xl border border-white/15 shadow-2xl z-50"
                                >
                                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                                        <div className="text-xs font-bold text-white">Color Themes</div>
                                        <div className="text-[11px] text-neutral-400">Select active aesthetic</div>
                                    </div>

                                    <div className="space-y-1 max-h-72 overflow-y-auto">
                                        {themes.map((t) => {
                                            const isSelected = currentTheme.id === t.id;
                                            return (
                                                <button
                                                    key={t.id}
                                                    onClick={() => {
                                                        setTheme(t.id);
                                                        setThemeMenuOpen(false);
                                                    }}
                                                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition cursor-pointer ${
                                                        isSelected
                                                            ? 'bg-white/10 text-white'
                                                            : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <div className={`size-4 rounded-full bg-gradient-to-tr ${t.swatch} border border-white/20 shrink-0`} />
                                                        <div>
                                                            <div className="text-xs font-semibold">{t.name}</div>
                                                            <div className="text-[10px] text-neutral-400">{t.description}</div>
                                                        </div>
                                                    </div>

                                                    {isSelected && <CheckIcon className="size-3.5 text-white shrink-0 ml-2" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* User Auth Section */}
                    {!user ? (
                        <div className="hidden md:flex items-center gap-3">
                            <button
                                onClick={openSignIn}
                                className="text-sm font-medium text-gray-300 hover:text-white transition max-sm:hidden cursor-pointer"
                            >
                                Sign in
                            </button>
                            <PrimaryButton onClick={openSignUp} className="max-sm:text-xs hidden sm:inline-block">
                                Get Started
                            </PrimaryButton>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2" ref={userMenuRef}>
                            <GhostButton
                                onClick={() => navigate('/plans')}
                                className="border-none text-gray-300 sm:py-1.5 cursor-pointer font-mono text-xs"
                            >
                                ⚡ {user.credits} Credits
                            </GhostButton>

                            {/* User Avatar & Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setUserMenuOpen(!userMenuOpen);
                                        setThemeMenuOpen(false);
                                    }}
                                    className="size-9 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 border border-white/20 flex items-center justify-center text-xs font-bold text-white shadow-md hover:opacity-90 transition cursor-pointer"
                                >
                                    {userInitials}
                                </button>

                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 mt-2 w-60 p-2 rounded-2xl bg-neutral-950/95 backdrop-blur-2xl border border-white/15 shadow-2xl z-50"
                                        >
                                            {/* User Profile Header */}
                                            <div className="p-3 border-b border-white/10 mb-1">
                                                <div className="text-xs font-bold text-white truncate">{user.name}</div>
                                                <div className="text-[11px] text-neutral-400 truncate">{user.email}</div>
                                                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-300">
                                                    ⚡ {user.credits} Credits Balance
                                                </div>
                                            </div>

                                            {/* Action Items */}
                                            <div className="space-y-1 text-xs">
                                                <button
                                                    onClick={() => {
                                                        navigate('/generate');
                                                        setUserMenuOpen(false);
                                                    }}
                                                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition cursor-pointer text-left"
                                                >
                                                    <SparkleIcon className="size-4 text-cyan-400" />
                                                    <span>Create UGC Ad</span>
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        navigate('/my-generations');
                                                        setUserMenuOpen(false);
                                                    }}
                                                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition cursor-pointer text-left"
                                                >
                                                    <FolderEditIcon className="size-4 text-indigo-400" />
                                                    <span>My Generations</span>
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        navigate('/community');
                                                        setUserMenuOpen(false);
                                                    }}
                                                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition cursor-pointer text-left"
                                                >
                                                    <GalleryHorizontalEnd className="size-4 text-emerald-400" />
                                                    <span>Community Gallery</span>
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        navigate('/plans');
                                                        setUserMenuOpen(false);
                                                    }}
                                                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition cursor-pointer text-left"
                                                >
                                                    <DollarSignIcon className="size-4 text-amber-400" />
                                                    <span>Upgrade Plans</span>
                                                </button>

                                                <div className="border-t border-white/10 my-1 pt-1">
                                                    <button
                                                        onClick={() => {
                                                            logout();
                                                            setUserMenuOpen(false);
                                                        }}
                                                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition cursor-pointer text-left"
                                                    >
                                                        <LogOutIcon className="size-4" />
                                                        <span>Sign Out</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}

                    {!user && (
                        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-1 text-neutral-300 hover:text-white">
                            <MenuIcon className="size-6" />
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`flex flex-col items-center justify-center gap-6 text-lg font-medium fixed inset-0 bg-black/90 backdrop-blur-xl z-50 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:text-cyan-400 transition"
                    >
                        {link.name}
                    </a>
                ))}

                {!user ? (
                    <>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                openSignIn();
                            }}
                            className="font-medium text-gray-300 hover:text-white transition"
                        >
                            Sign in
                        </button>
                        <PrimaryButton
                            onClick={() => {
                                setIsOpen(false);
                                openSignUp();
                            }}
                        >
                            Get Started
                        </PrimaryButton>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                navigate('/generate');
                            }}
                            className="text-white hover:text-cyan-400"
                        >
                            Create UGC Ad
                        </button>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                navigate('/my-generations');
                            }}
                            className="text-white hover:text-cyan-400"
                        >
                            My Generations
                        </button>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                logout();
                            }}
                            className="text-rose-400"
                        >
                            Sign Out
                        </button>
                    </>
                )}

                <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition cursor-pointer"
                >
                    <XIcon className="size-6" />
                </button>
            </div>
        </nav>
    );
}