import { Router } from 'express';
import multer from 'multer';
import File from '../model/Files.js';
import fileProcessingEvents from '../utils/eventManager.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post('/upload', upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "File not uploaded" });
        }
        const { originalname, mimetype, size, buffer } = req.file;

        const newFile = new File({
            originalName: originalname,
            mimeType: mimetype,
            size: size,
            buffer: buffer
        });

        await newFile.save();

        fileProcessingEvents.emitStatus('uploading', { fileId: newFile._id });
        
        fileProcessingEvents.emit('startProcessing', newFile._id);

        res.status(201).json({ 
            message: "File uploaded successfully", 
            fileId: newFile._id 
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in uploading file" });
    }
});

export default router;