export type Status = "uploading" | "scanning" | "processing" | "completed" | "waiting" | "error";
export interface FileStatus {
    status: Status;
    fileId?: string;
    message?: string;
    data?: any;
}

export interface ProcessingError {
    message: string;
    fileId?: string;
}