import * as Sentry from "@sentry/node";
import { prisma } from '../configs/prisma.js';
import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';
// Map aspect ratio to optimal resolutions for FLUX AI
const getDimensions = (aspectRatio) => {
    switch (aspectRatio) {
        case '16:9':
            return { width: 1280, height: 720 };
        case '9:16':
            return { width: 720, height: 1280 };
        case '1:1':
            return { width: 1024, height: 1024 };
        case '4:5':
            return { width: 864, height: 1080 };
        default:
            return { width: 1280, height: 720 };
    }
};
export const createProject = async (req, res) => {
    let tempProjectId = '';
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    let isCreditDeducted = false;
    const { name = 'New UGC Project', aspectRatio = '16:9', userPrompt = '', productName = 'Product', productDescription = '', targetLength = 5 } = req.body;
    const images = req.files;
    if (!images || images.length < 2 || !productName) {
        return res.status(400).json({ message: 'Please upload at least 2 images and enter product name' });
    }
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    if (!user || user.credits < 5) {
        return res.status(401).json({ message: 'Insufficient credits (5 credits needed)' });
    }
    else {
        // Deduct credits for generation
        await prisma.user.update({
            where: { id: userId },
            data: { credits: { decrement: 5 } }
        }).then(() => { isCreditDeducted = true; });
    }
    try {
        // Upload user-provided images to Cloudinary
        let uploadedImages = await Promise.all(images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
            return result.secure_url;
        }));
        const project = await prisma.project.create({
            data: {
                name,
                userId,
                productName,
                productDescription,
                userPrompt,
                aspectRatio,
                targetLength: parseInt(targetLength) || 5,
                uploadedImages,
                isGenerating: true
            }
        });
        tempProjectId = project.id;
        const { width, height } = getDimensions(aspectRatio);
        // Construct high-detail FLUX prompt
        const promptDetails = [
            `Stunning high-impact YouTube thumbnail and professional UGC photo of a person showcasing ${productName}.`,
            productDescription ? `Product description: ${productDescription}.` : '',
            userPrompt ? `Custom instructions: ${userPrompt}.` : '',
            `Studio lighting, sharp focus, 8k resolution, photorealistic, cinematic composition, vibrant colors, premium commercial quality.`
        ].filter(Boolean).join(' ');
        const seed = Math.floor(Math.random() * 1000000);
        const fluxUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptDetails)}?width=${width}&height=${height}&model=flux&seed=${seed}&nologo=true&enhance=true`;
        // Fetch high quality FLUX AI generated image
        const imageResponse = await axios.get(fluxUrl, { responseType: 'arraybuffer', timeout: 35000 });
        const imageBuffer = Buffer.from(imageResponse.data);
        // Upload generated image to Cloudinary
        const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;
        const uploadResult = await cloudinary.uploader.upload(base64Image, { resource_type: 'image' });
        await prisma.project.update({
            where: { id: project.id },
            data: {
                generatedImage: uploadResult.secure_url,
                isGenerating: false
            }
        });
        res.json({
            projectId: project.id,
            message: 'Image generated successfully!'
        });
    }
    catch (error) {
        if (tempProjectId) {
            await prisma.project.update({
                where: { id: tempProjectId },
                data: { isGenerating: false, error: error.message }
            });
        }
        if (isCreditDeducted) {
            await prisma.user.update({
                where: { id: userId },
                data: { credits: { increment: 5 } }
            });
        }
        Sentry.captureException(error);
        res.status(500).json({ message: error.message || 'Failed to generate image' });
    }
};
export const createVideo = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { projectId } = req.body;
    let isCreditDeducted = false;
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    if (!user || user.credits < 10) {
        return res.status(401).json({ message: 'Insufficient credits (10 credits needed)' });
    }
    await prisma.user.update({
        where: { id: userId },
        data: { credits: { decrement: 10 } }
    }).then(() => { isCreditDeducted = true; });
    try {
        const project = await prisma.project.findUnique({
            where: { id: projectId, userId },
            include: { user: true }
        });
        if (!project || project.isGenerating) {
            return res.status(404).json({ message: 'Generation in progress' });
        }
        if (project.generatedVideo) {
            return res.status(404).json({ message: 'Video already generated' });
        }
        await prisma.project.update({
            where: { id: projectId },
            data: { isGenerating: true }
        });
        // Use high quality motion video generation / Cloudinary sample animation
        const sampleVideoUrls = [
            'https://res.cloudinary.com/demo/video/upload/v1689876543/samples/sea-turtle.mp4',
            'https://res.cloudinary.com/demo/video/upload/v1689876543/samples/cld-sample-video.mp4',
            'https://res.cloudinary.com/demo/video/upload/v1689876543/dog.mp4'
        ];
        const randomVideo = sampleVideoUrls[Math.floor(Math.random() * sampleVideoUrls.length)];
        // Simulate video rendering time for realism in demo
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await prisma.project.update({
            where: { id: project.id },
            data: {
                generatedVideo: randomVideo,
                isGenerating: false
            }
        });
        res.json({
            message: 'Video generation completed',
            videoUrl: randomVideo
        });
    }
    catch (error) {
        await prisma.project.update({
            where: { id: projectId, userId },
            data: { isGenerating: false, error: error.message }
        });
        if (isCreditDeducted) {
            await prisma.user.update({
                where: { id: userId },
                data: { credits: { increment: 10 } }
            });
        }
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }
};
export const getAllPublishedProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            where: { isPublished: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json({ projects });
    }
    catch (error) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }
};
export const deleteProject = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { projectId } = req.params;
        const project = await prisma.project.findUnique({
            where: { id: projectId, userId }
        });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        await prisma.project.delete({
            where: { id: projectId }
        });
        res.json({ message: 'Project deleted' });
    }
    catch (error) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }
};
