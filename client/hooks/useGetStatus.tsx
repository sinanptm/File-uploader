import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useCallback } from "react";

export type Status = 
  | "uploading" 
  | "scanning" 
  | "processing" 
  | "completed" 
  | "waiting" 
  | "error";

const useGetStatus = (status: Status) => {
    const renderStatusText = useCallback(() => {
        switch (status) {
            case "uploading":
                return "Uploading file to server...";
            case "scanning":
                return "Scanning file contents...";
            case "processing":
                return "Processing and analyzing data...";
            case "completed":
                return "Processing completed successfully";
            case "waiting":
                return "Ready to upload";
            case "error":
                return "Processing failed";
            default:
                return "Ready to upload";
        }
    }, [status]);

    const getStatusBar = useCallback(() => {
        switch (status) {
            case "uploading":
                return "25";
            case "scanning":
                return "50";
            case "processing":
                return "75";
            case "completed":
                return "100";
            case "error":
                return "0";
            case "waiting":
                return "0";
            default:
                return "0";
        }
    }, [status]);

    const getStatusColor = useCallback(() => {
        switch (status) {
            case "uploading":
                return "text-blue-500";
            case "scanning":
                return "text-purple-500";
            case "processing":
                return "text-yellow-500";
            case "completed":
                return "text-green-500";
            case "error":
                return "text-red-500";
            case "waiting":
            default:
                return "text-gray-400";
        }
    }, [status]);


    const renderStatusIcon = useCallback(() => {
        switch (status) {
          case 'completed':
            return <CheckCircle2 className="w-6 h-6 text-green-500" />;
          case 'error':
            return <AlertCircle className="w-6 h-6 text-red-500" />;
          case 'uploading':
          case 'scanning':
          case 'processing':
            return <Loader2 className="w-6 h-6 animate-spin text-blue-500" />;
          default:
            return null;
        }
      }, [status]);

      
    return {
        getStatusBar,
        renderStatusText,
        getStatusColor,
        renderStatusIcon
    };
};

export default useGetStatus;