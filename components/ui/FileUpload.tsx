import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface FileUploadProps {
  label: string;
  fileUrl?: string | null;
  fileName?: string;
  fileType?: 'pdf' | 'image' | 'document';
  maxSize?: number; // in MB
  accept?: string;
  optional?: boolean;
  uploadProgress?: number;
  isUploading?: boolean;
  onFileSelect?: (file: File) => void;
  onFileRemove?: () => void;
  infoText?: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  fileUrl,
  fileName,
  fileType = 'pdf',
  maxSize = 10,
  accept = '.pdf',
  optional = false,
  uploadProgress = 0,
  isUploading = false,
  onFileSelect,
  onFileRemove,
  infoText,
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = () => {
    switch (fileType) {
      case 'pdf':
        return '/icons/new-pdf-icon.svg';
      case 'image':
        return '/icons/image-line.svg';
      default:
        return '/icons/document-line.svg';
    }
  };

  const getFileTypeText = () => {
    switch (fileType) {
      case 'pdf':
        return 'PDF document';
      case 'image':
        return 'Image file';
      default:
        return 'Document';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderFilePreview = () => {
    if (fileType === 'image' && fileUrl) {
      return (
        <div className='w-8 h-8 flex items-center justify-center overflow-hidden rounded'>
          <Image
            src={fileUrl}
            alt={fileName || 'Uploaded image'}
            width={32}
            height={32}
            className='w-8 h-8 object-cover'
          />
        </div>
      );
    }

    return (
      <span className='w-8 h-8 flex items-center justify-center'>
        <Image
          src={getFileIcon()}
          alt={fileType.toUpperCase()}
          width={32}
          height={32}
          className='w-8 h-8'
        />
      </span>
    );
  };

  const renderUploadStatus = () => {
    if (isUploading) {
      return (
        <>
          <span>
            {uploadProgress > 0 ? `${Math.round(uploadProgress)}%` : 'Uploading...'}
          </span>
          <span className='text-blue-600'>Uploading...</span>
          <div className='w-16 h-1 bg-gray-200 rounded-full overflow-hidden'>
            <div
              className='h-full bg-blue-600 transition-all duration-300'
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </>
      );
    }

    return (
      <span className='flex items-center gap-1 text-green-600'>
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          viewBox='0 0 16 16'
        >
          <path
            d='M4 8l3 3 5-5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        Completed
      </span>
    );
  };

  return (
    <div className={className}>
      <div className='flex items-center gap-2 mb-2'>
        <label className='font-bold text-[14px] leading-[20px]'>
          {label}
          {optional && <span className='text-[#B0B0B0] text-[12px] ml-1'>(optional)</span>}
        </label>
        <Image
          src='/icons/information-fill.svg'
          alt='Info'
          width={16}
          height={16}
          className='w-4 h-4'
        />
      </div>

      {fileUrl ? (
        <div className='flex items-center gap-3 border border-[#EBEBEB] rounded-[10px] bg-white px-4 py-3'>
          {renderFilePreview()}
          <div className='flex-1 min-w-0'>
            <div className='font-medium text-sm text-black'>
              {fileName || getFileTypeText()}
            </div>
            <div className='flex items-center gap-2 text-xs text-[#5C5C5C] mt-1'>
              {renderUploadStatus()}
            </div>
          </div>
          <button
            type='button'
            className='text-gray-400 hover:text-red-400'
            onClick={onFileRemove}
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      ) : (
        <div
          className='border-2 border-dashed border-[#E0E0E0] rounded-[10px] p-6 text-center cursor-pointer hover:border-[#EF4F54] transition-colors'
          onClick={handleClick}
        >
          <div className='flex flex-col items-center gap-2'>
            <span className='text-[14px] text-[#B0B0B0]'>
              Click to upload {getFileTypeText().toLowerCase()}
            </span>
            <span className='text-[12px] text-[#B0B0B0]'>
              Max size: {maxSize}MB
            </span>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type='file'
        accept={accept}
        className='hidden'
        onChange={handleFileChange}
      />

      {infoText && (
        <div className='flex items-center gap-2 mt-3 text-[12px] text-[#B0B0B0]'>
          <Image
            src='/icons/information-fill.svg'
            alt='Info'
            width={12}
            height={12}
            className='w-3 h-3'
          />
          <span>{infoText}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload; 