console.log('🚀 Initializing UGC.AI Backend Server...');
import "./configs/instrument.mjs";
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import * as Sentry from "@sentry/node";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
const app = express();
const PORT = process.env.PORT || 5001;
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.get('/', (req, res) => {
    res.send('UGC.AI Backend Server is Live!');
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
