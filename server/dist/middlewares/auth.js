import jwt from 'jsonwebtoken';
import * as Sentry from '@sentry/node';
const JWT_SECRET = process.env.JWT_SECRET || 'ugc_ai_default_secret_key_2026';
export const requireAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token required' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token missing' });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        Sentry.captureException(error);
        return res.status(401).json({ message: 'Invalid or expired session token' });
    }
};
// Backwards compatibility alias
export const protect = requireAuth;
