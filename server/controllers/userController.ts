import { Request, Response } from 'express';
import * as Sentry from '@sentry/node';
import { prisma } from '../configs/prisma.js';

// Get User Credits
export const getUserCredits = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { credits: true }
        });

        res.json({ credits: user?.credits ?? 0 });
    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.code || error.message });
    }
};

// Get all user projects
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const projects = await prisma.project.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
        res.json({ projects });
    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.code || error.message });
    }
};

// Get project by id
export const getProjectById = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { projectId } = req.params;

        const project = await prisma.project.findUnique({
            where: { id: projectId, userId }
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({ project });
    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.code || error.message });
    }
};

// Publish / unpublish project
export const toggleProjectPublic = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { projectId } = req.params;

        const project = await prisma.project.findUnique({
            where: { id: projectId, userId }
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (!project?.generatedImage && !project?.generatedVideo) {
            return res.status(400).json({ message: 'Image or video not generated' });
        }

        const updated = await prisma.project.update({
            where: { id: projectId },
            data: { isPublished: !project.isPublished }
        });

        res.json({ isPublished: updated.isPublished });
    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.code || error.message });
    }
};

// Buy / Top-up credits
export const buyCredits = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { planId } = req.body;

        const creditMap: Record<string, { credits: number; name: string; price: string }> = {
            starter: { credits: 60, name: 'Starter Plan', price: '$29' },
            pro: { credits: 250, name: 'Pro Growth Plan', price: '$99' },
            ultra: { credits: 600, name: 'Agency Scale Plan', price: '$199' },
        };

        const plan = creditMap[planId];
        if (!plan) {
            return res.status(400).json({ message: 'Invalid plan selected' });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                credits: { increment: plan.credits }
            }
        });

        res.json({
            success: true,
            message: `Successfully added ${plan.credits} credits to your account!`,
            credits: updatedUser.credits
        });
    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.code || error.message });
    }
};