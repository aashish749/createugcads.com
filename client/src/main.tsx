import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/AuthModal';

createRoot(document.getElementById('root')! as HTMLElement).render(
    <ErrorBoundary>
        <ThemeProvider>
            <AuthProvider>
                <BrowserRouter>
                    <App />
                    <AuthModal />
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    </ErrorBoundary>
);