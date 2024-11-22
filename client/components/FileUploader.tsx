'use client';
import { ChangeEvent, useState, useCallback } from 'react';
import { Upload, File, AlertCircle } from 'lucide-react';
import useApi from '@/hooks/useApi';
import useGetStatus from '@/hooks/useGetStatus';


const FileUploader = () => {
  const { status, uploadFile, error, setError, processedData } = useApi();
  const [file, setFile] = useState<File | undefined>();
  const { getStatusBar, getStatusColor, renderStatusText, renderStatusIcon } = useGetStatus(status);

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const validMimeTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
      ];

      if (!validMimeTypes.includes(selectedFile.type)) {
        setError('Invalid file type. Please upload an Excel file.');
        setFile(undefined);
        return;
      }
      setFile(selectedFile);
      setError(undefined);
    }
  }, [setError]);

  const handleUpload = useCallback(async () => {
    if (file) {
      try {
        await uploadFile(file);
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }
  }, [file, uploadFile]);

  return (
    <div className="max-w-lg mx-auto p-8">
      <div className="bg-gray-800 rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Excel File Processor
        </h2>

        <div className="mb-6">
          <label
            htmlFor="fileUpload"
            className={`
              flex flex-col items-center justify-center w-full h-64
              border-2 border-dashed rounded-xl cursor-pointer
              transition-colors duration-200
              ${status === 'waiting'
                ? 'border-gray-600 hover:border-gray-500'
                : 'border-gray-700 cursor-not-allowed'
              }
            `}
          >
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <p className="mb-2 text-sm text-gray-400">
                {file?.name ?? 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500">
                Excel files only (.xlsx, .xls)
              </p>
            </div>
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".xlsx,.xls"
              disabled={status !== 'waiting'}
            />
          </label>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 mb-4 text-red-500 bg-red-500/10 rounded-lg">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {file && status === 'waiting' && (
          <div className="flex items-center justify-between mb-6 bg-gray-700/50 p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <File className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-300 truncate max-w-[200px]">
                {file.name}
              </span>
            </div>
            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       transition duration-200 ease-in-out focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-opacity-50"
            >
              Upload
            </button>
          </div>
        )}

        {status !== 'waiting' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                {renderStatusText()}
              </span>
              {renderStatusIcon()}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${getStatusBar()}%` }}
              />
            </div>
          </div>
        )}

        {processedData && (
          <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-2">
              Processing Results
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-64">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                {JSON.stringify(processedData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;