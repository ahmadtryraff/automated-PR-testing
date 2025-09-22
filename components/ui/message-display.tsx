import React, { useEffect } from 'react';

interface MessageDisplayProps {
  message: {
    type: 'success' | 'error' | 'warning' | 'info';
    text: string;
  };
  onClose: () => void;
  showRetry?: boolean;
  onRetry?: () => void;
  variant?: 'inline' | 'toast';
  autoDismiss?: boolean;
  dismissDelay?: number;
}

export const MessageDisplay: React.FC<MessageDisplayProps> = ({
  message,
  onClose,
  showRetry = false,
  onRetry,
  variant = 'inline',
  autoDismiss = false,
  dismissDelay = 5000
}) => {
  // Auto-dismiss functionality
  useEffect(() => {
    if (autoDismiss && message.text) {
      const timer = setTimeout(() => {
        onClose();
      }, dismissDelay);
      
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, dismissDelay, message.text, onClose]);

  const getMessageStyles = () => {
    switch (message.type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-[#F8485E] text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getContainerStyles = () => {
    if (variant === 'toast') {
      return 'fixed top-4 right-4 z-50 max-w-sm w-full animate-slide-in-right shadow-lg';
    }
    return 'mb-2';
  };

  const getMessageIcon = () => {
    switch (message.type) {
      case 'success':
        return (
          <svg width='20' height='20' fill='none' viewBox='0 0 20 20'>
            <path
              d='M7 10l3 3 7-7'
              stroke='#fff'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        );
      default:
        return (
          <svg width='20' height='20' fill='none' viewBox='0 0 20 20'>
            <circle cx='10' cy='10' r='9' stroke='#fff' strokeWidth='2' />
            <text
              x='10'
              y='15'
              textAnchor='middle'
              fontSize='12'
              fill='#fff'
            >
              i
            </text>
          </svg>
        );
    }
  };

  return (
    <div className={getContainerStyles()}>
      <div
        className={`flex items-center justify-between px-6 py-3 rounded-lg transition-all ${getMessageStyles()}`}
        style={{ minHeight: 48 }}
      >
        <div className='flex items-center gap-2'>
          {getMessageIcon()}
          <span className="text-sm font-medium">{message.text}</span>
          {message.type === 'error' && showRetry && onRetry && (
            <button
              className='underline ml-2 text-sm hover:no-underline'
              onClick={onRetry}
            >
              Try Again
            </button>
          )}
        </div>
        <button
          className='ml-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center text-lg leading-none'
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default MessageDisplay; 