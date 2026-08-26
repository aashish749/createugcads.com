import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, style, ...props }) => {
    const { currentTheme } = useTheme();

    return (
        <button
            style={{
                background: currentTheme?.primaryGradient || 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                color: currentTheme?.id === 'vercel' ? '#000000' : '#ffffff',
                ...style
            }}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold hover:opacity-95 active:scale-95 transition-all duration-200 shadow-md ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export const GhostButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
    <button
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-white/10 bg-white/3 hover:bg-white/6 backdrop-blur-sm active:scale-95 transition-all duration-200 ${className}`}
        {...props}
    >
        {children}
    </button>
);