import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ThemeConfig {
    id: string;
    name: string;
    description: string;
    primaryGradient: string;
    accentColor: string;
    bgColor: string;
    swatch: string;
    badgeColor: string;
}

export const themes: ThemeConfig[] = [
    {
        id: 'stripe',
        name: 'Electric Cyan (Default)',
        description: 'Stripe deep ocean & electric blue',
        primaryGradient: 'linear-gradient(135deg, #06B6D4 0%, #0284C7 100%)',
        accentColor: '#06B6D4',
        bgColor: '#030f17',
        swatch: 'from-cyan-500 to-blue-600',
        badgeColor: '#67e8f9'
    },
    {
        id: 'linear',
        name: 'Linear Obsidian',
        description: 'Deep indigo & cyber violet',
        primaryGradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        accentColor: '#8B5CF6',
        bgColor: '#09090b',
        swatch: 'from-indigo-500 to-violet-600',
        badgeColor: '#a5b4fc'
    },
    {
        id: 'claude',
        name: 'Claude Terracotta',
        description: 'Anthropic warm amber & espresso',
        primaryGradient: 'linear-gradient(135deg, #D97706 0%, #EA580C 100%)',
        accentColor: '#F59E0B',
        bgColor: '#12100e',
        swatch: 'from-amber-500 to-orange-600',
        badgeColor: '#fcd34d'
    },
    {
        id: 'vercel',
        name: 'Vercel Monochrome',
        description: 'Pitch OLED black & pure neon',
        primaryGradient: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%)',
        accentColor: '#FFFFFF',
        bgColor: '#000000',
        swatch: 'from-white to-neutral-400',
        badgeColor: '#e2e8f0'
    },
    {
        id: 'supabase',
        name: 'Cyber Emerald',
        description: 'Supabase mint & forest green',
        primaryGradient: 'linear-gradient(135deg, #10B981 0%, #0D9488 100%)',
        accentColor: '#10B981',
        bgColor: '#04120e',
        swatch: 'from-emerald-500 to-teal-600',
        badgeColor: '#6ee7b7'
    },
    {
        id: 'cyberpunk',
        name: 'Neon Rose',
        description: 'Hot pink & cyberpunk coral',
        primaryGradient: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)',
        accentColor: '#F43F5E',
        bgColor: '#14050b',
        swatch: 'from-rose-500 to-pink-600',
        badgeColor: '#fda4af'
    },
    {
        id: 'luxury',
        name: 'Solar Gold',
        description: 'Imperial amber & champagne glow',
        primaryGradient: 'linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)',
        accentColor: '#EAB308',
        bgColor: '#0f0d05',
        swatch: 'from-yellow-400 to-amber-600',
        badgeColor: '#fde047'
    }
];

interface ThemeContextType {
    currentTheme: ThemeConfig;
    setTheme: (themeId: string) => void;
    themes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType>({
    currentTheme: themes[0],
    setTheme: () => {},
    themes
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentTheme, setCurrentThemeState] = useState<ThemeConfig>(() => {
        const saved = localStorage.getItem('ugc_app_theme');
        const found = themes.find((t) => t.id === saved);
        return found || themes[0]; // defaults to Electric Cyan
    });

    const applyThemeToDOM = (t: ThemeConfig) => {
        document.documentElement.setAttribute('data-theme', t.id);
        document.documentElement.style.setProperty('--theme-bg', t.bgColor);
        document.documentElement.style.setProperty('--theme-primary', t.accentColor);
        document.documentElement.style.setProperty('--theme-gradient', t.primaryGradient);
        document.documentElement.style.setProperty('--theme-badge', t.badgeColor);
        document.body.style.backgroundColor = t.bgColor;
    };

    const setTheme = (themeId: string) => {
        const found = themes.find((t) => t.id === themeId);
        if (found) {
            setCurrentThemeState(found);
            localStorage.setItem('ugc_app_theme', found.id);
            applyThemeToDOM(found);
        }
    };

    useEffect(() => {
        applyThemeToDOM(currentTheme);
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
