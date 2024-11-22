import mongoose, { Schema } from 'mongoose';

const fileSchema = new Schema({
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    buffer: { type: Buffer, required: true },
    status:{ type:String,required:true, default:"uploaded" },
    uploadedAt: { type: Date, default: Date.now }
});

const File = mongoose.model('File', fileSchema);

export default File;
