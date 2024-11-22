import { useCallback, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import connectSocketIO from "../lib/socket";
import { FileStatus, ProcessingError, Status } from "@/types";
import { uploadData } from "@/lib/api";

const useApi = () => {
    const socketRef = useRef<Socket | null>(null);
    const [status, setStatus] = useState<Status>("waiting");
    const [processedData, setProcessedData] = useState<any>(null);
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = connectSocketIO();
        }
    
        const socket = socketRef.current;

        socket.on('fileStatus', (data: FileStatus) => {
            console.log('File status update:', data);
            setStatus(data.status);
        });

        socket.on('error', (error: ProcessingError) => {
            setError(error.message);
            setStatus('error');
        });

        return () => {
            if (socket) {
                socket.off('fileStatus');
                socket.off('error');
                socket.disconnect();
            }
            socketRef.current = null;
        };
    }, []);

    const uploadFile = useCallback(async (file: File) => {
        try {
            setError(undefined);
            setStatus("uploading");
            setProcessedData(null);

            if (!socketRef.current) {
                throw new Error("Socket connection not established");
            }

            const response = await uploadData(file);
            
            if (!response.fileId) {
                throw new Error("File upload failed - no file ID received");
            }

            return response.fileId;

        } catch (error: any) {
            setError(error.message || "An error occurred during upload");
            setStatus("error");
            throw error;
        }
    }, []);

    const resetStates = useCallback(() => {
        setStatus("waiting");
        setError(undefined);
        setProcessedData(null);
    }, []);

    return {
        status,
        uploadFile,
        error,
        processedData,
        resetStates,
        setError,
    };
};

export default useApi;