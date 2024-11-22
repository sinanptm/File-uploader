import { EventEmitter } from 'events';

class FileProcessingEvents extends EventEmitter {
    constructor() {
        super();
    }

    emitStatus(status, data = {}) {
        this.emit('statusUpdate', { status, ...data });
    }
}

export default new FileProcessingEvents();