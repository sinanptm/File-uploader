import fileProcessingEvents from './eventManager.js';
import File from '../model/Files.js';


class FileProcessor {
    constructor(io) {
        this.io = io;
        this.setupEventListeners();
    }

    setupEventListeners() {
        fileProcessingEvents.on('startProcessing', async (fileId) => {
            try {
                this.emitSocketEvent('uploading', {fileId});

                const file = await File.findById(fileId);
                if (!file) {
                    throw new Error('File not found');
                }

                this.emitSocketEvent('scanning', {fileId});
                await this.scanFile(file);

                this.emitSocketEvent('processing', {fileId});
                const processedData = await this.processFile(file);

                this.emitSocketEvent('completed', {
                    fileId,
                    data: processedData
                });

            } catch (error) {
                this.emitSocketEvent('error', {
                    fileId,
                    message: error.message
                });
            }
        });
    }

    async scanFile(file) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({clean:true});
            }, 1000);
        });
    }


    async processFile(file) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({processed: true});
            }, 3000);
        });
    }

    emitSocketEvent(status, data) {
        this.io.emit('fileStatus', {status, ...data});
    }
}

export default FileProcessor;