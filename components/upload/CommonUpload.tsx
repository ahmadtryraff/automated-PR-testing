import React, { useRef } from 'react';

interface CommonUploadProps {
  accept?: string;
  onChange: (file: File | null) => void;
  value?: File | null;
  button?: React.ReactNode;
  label?: string;
  disabled?: boolean;
  maxSize?: number;
}

export default function CommonUpload({
  accept = '*',
  onChange,
  value,
  button,
  label,
  disabled,
  maxSize,
}: CommonUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && maxSize && file.size > maxSize) {
      alert('File is too large!');
      return;
    }
    onChange(file);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept={accept}
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={disabled}
      />
      {label && <span className="text-xs">{label}</span>}
      <span onClick={handleClick} className={disabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}>
        {button}
      </span>
      {value && (
        <span className="ml-2 text-xs text-gray-600 truncate max-w-xs">{value.name}</span>
      )}
    </div>
  );
} 