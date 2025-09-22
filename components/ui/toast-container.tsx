import React from 'react';
import { MessageDisplay } from './message-display';

interface ToastItem {
  id: string;
  message: {
    type: 'success' | 'error' | 'warning' | 'info';
    text: string;
  };
  onClose: () => void;
  showRetry?: boolean;
  onRetry?: () => void;
}

interface ToastContainerProps {
  toasts: ToastItem[];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{ 
            animationDelay: `${index * 0.1}s`,
            transform: `translateY(${index * 8}px)` 
          }}
        >
          <MessageDisplay
            message={toast.message}
            onClose={toast.onClose}
            showRetry={toast.showRetry}
            onRetry={toast.onRetry}
            variant="toast"
          />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer; 