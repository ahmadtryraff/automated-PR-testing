import React, { useState } from 'react';
import FileUpload from './FileUpload';

// Example usage of the generic FileUpload component
const FileUploadExample: React.FC = () => {
  const [pdfFileUrl, setPdfFileUrl] = useState<string | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [pdfUploadProgress, setPdfUploadProgress] = useState(0);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  const handlePdfUpload = async (file: File) => {
    // Simulate upload progress
    setPdfUploadProgress(0);
    const interval = setInterval(() => {
      setPdfUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Simulate API call
    setTimeout(() => {
      setPdfFileUrl('https://example.com/uploaded-file.pdf');
    }, 2000);
  };

  const handleImageUpload = async (file: File) => {
    // Simulate upload progress
    setImageUploadProgress(0);
    const interval = setInterval(() => {
      setImageUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Simulate API call
    setTimeout(() => {
      setImageFileUrl('https://example.com/uploaded-image.jpg');
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">File Upload Examples</h2>
      
      {/* PDF Upload Example */}
      <div>
        <h3 className="text-lg font-semibold mb-4">PDF Document Upload</h3>
        <FileUpload
          label="Upload PDF Document"
          fileUrl={pdfFileUrl}
          fileType="pdf"
          maxSize={10}
          accept=".pdf"
          uploadProgress={pdfUploadProgress}
          isUploading={pdfUploadProgress < 100 && pdfUploadProgress > 0}
          onFileSelect={handlePdfUpload}
          onFileRemove={() => {
            setPdfFileUrl(null);
            setPdfUploadProgress(0);
          }}
          infoText="Upload your business document in PDF format"
        />
      </div>

      {/* Image Upload Example */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Image Upload</h3>
        <FileUpload
          label="Upload Company Logo"
          fileUrl={imageFileUrl}
          fileType="image"
          maxSize={5}
          accept=".jpg,.jpeg,.png,.gif"
          uploadProgress={imageUploadProgress}
          isUploading={imageUploadProgress < 100 && imageUploadProgress > 0}
          onFileSelect={handleImageUpload}
          onFileRemove={() => {
            setImageFileUrl(null);
            setImageUploadProgress(0);
          }}
          infoText="Upload your company logo (JPG, PNG, GIF)"
        />
      </div>

      {/* Optional Document Upload Example */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Optional Document Upload</h3>
        <FileUpload
          label="Upload Additional Documents"
          fileType="document"
          maxSize={20}
          accept=".pdf,.doc,.docx"
          optional={true}
          onFileSelect={(file) => {
            console.log('File selected:', file.name);
          }}
          onFileRemove={() => {
            console.log('File removed');
          }}
          infoText="This is an optional document upload"
        />
      </div>
    </div>
  );
};

export default FileUploadExample; 