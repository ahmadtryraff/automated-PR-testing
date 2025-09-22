import * as React from 'react';
import { cn } from '@/utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  active?: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rectangular', width, height, animation = 'pulse', active = true, ...props }, ref) => {
    const baseClasses = cn(
      'bg-gray-200',
      {
        'rounded': variant === 'rounded',
        'rounded-full': variant === 'circular',
        'rounded-md': variant === 'rectangular',
        'animate-pulse': animation === 'pulse' && active,
        'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200': animation === 'wave' && active,
      },
      className
    );

    const style: React.CSSProperties = {
      width: width,
      height: height,
    };

    return (
      <div
        ref={ref}
        className={baseClasses}
        style={style}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Ant Design style skeleton components
export const SkeletonTitle = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'> & { width?: string | number }
>(({ width = '60%', height = '16px', className, ...props }, ref) => {
  return (
    <Skeleton
      ref={ref}
      variant="rectangular"
      width={width}
      height={height}
      className={cn('mb-2', className)}
      {...props}
    />
  );
});

SkeletonTitle.displayName = 'SkeletonTitle';

export const SkeletonParagraph = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'> & { 
    rows?: number;
    width?: string | number | (string | number)[];
  }
>(({ rows = 3, width = '100%', height = '16px', className, ...props }, ref) => {
  const widths = Array.isArray(width) ? width : Array(rows).fill(width);
  
  return (
    <div ref={ref} className={cn('space-y-2', className)}>
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          width={widths[index] || widths[widths.length - 1]}
          height={height}
          className={cn(
            index === rows - 1 ? 'w-3/4' : 'w-full'
          )}
          {...props}
        />
      ))}
    </div>
  );
});

SkeletonParagraph.displayName = 'SkeletonParagraph';

export const SkeletonAvatar = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'> & { 
    size?: 'small' | 'default' | 'large';
    shape?: 'circle' | 'square';
  }
>(({ size = 'default', shape = 'circle', className, ...props }, ref) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-10 h-10',
    large: 'w-12 h-12',
  };

  return (
    <Skeleton
      ref={ref}
      variant={shape === 'circle' ? 'circular' : 'rectangular'}
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
});

SkeletonAvatar.displayName = 'SkeletonAvatar';

export const SkeletonButton = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'> & { 
    size?: 'small' | 'default' | 'large';
    shape?: 'circle' | 'round' | 'square';
    block?: boolean;
  }
>(({ size = 'default', shape = 'square', block = false, className, ...props }, ref) => {
  const sizeClasses = {
    small: 'h-6',
    default: 'h-8',
    large: 'h-10',
  };

  const shapeClasses = {
    circle: 'rounded-full',
    round: 'rounded-md',
    square: 'rounded',
  };

  return (
    <Skeleton
      ref={ref}
      variant="rectangular"
      width={block ? '100%' : size === 'small' ? '60px' : size === 'large' ? '100px' : '80px'}
      height={sizeClasses[size]}
      className={cn(shapeClasses[shape], className)}
      {...props}
    />
  );
});

SkeletonButton.displayName = 'SkeletonButton';

export const SkeletonInput = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'> & { 
    size?: 'small' | 'default' | 'large';
  }
>(({ size = 'default', className, ...props }, ref) => {
  const sizeClasses = {
    small: 'h-6',
    default: 'h-8',
    large: 'h-10',
  };

  return (
    <Skeleton
      ref={ref}
      variant="rectangular"
      width="100%"
      height={sizeClasses[size]}
      className={cn('rounded', className)}
      {...props}
    />
  );
});

SkeletonInput.displayName = 'SkeletonInput';

// Complex skeleton components
export const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'> & { 
    showAvatar?: boolean;
    showTitle?: boolean;
    showDescription?: boolean;
    showActions?: boolean;
  }
>(({ 
  showAvatar = true, 
  showTitle = true, 
  showDescription = true, 
  showActions = true, 
  className, 
  ...props 
}, ref) => {
  return (
    <div ref={ref} className={cn('p-4 border border-gray-200 rounded-lg bg-white', className)} {...props}>
      <div className="flex items-start space-x-3">
        {showAvatar && <SkeletonAvatar size="default" />}
        <div className="flex-1 space-y-2">
          {showTitle && <SkeletonTitle width="60%" />}
          {showDescription && <SkeletonParagraph rows={2} />}
          {showActions && (
            <div className="flex space-x-2 pt-2">
              <SkeletonButton size="small" />
              <SkeletonButton size="small" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

SkeletonCard.displayName = 'SkeletonCard';

export const SkeletonTable = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'> & { 
    rows?: number;
    columns?: number;
  }
>(({ rows = 5, columns = 4, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('space-y-2', className)} {...props}>
      {/* Header */}
      <div className="flex space-x-2 pb-2 border-b border-gray-200">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height="1.5rem"
            className="flex-1"
          />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2 py-2">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              variant="rectangular"
              height="1rem"
              className="flex-1"
            />
          ))}
        </div>
      ))}
    </div>
  );
});

SkeletonTable.displayName = 'SkeletonTable';

export const SkeletonSidebar = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('w-64 h-full bg-white border-r border-gray-200 p-4', className)} {...props}>
      <div className="space-y-4">
        {/* Logo */}
        <Skeleton variant="rectangular" width="120px" height="32px" />
        
        {/* Menu items */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <Skeleton variant="circular" width="20px" height="20px" />
            <Skeleton variant="rectangular" width="100px" height="16px" />
          </div>
        ))}
      </div>
    </div>
  );
});

SkeletonSidebar.displayName = 'SkeletonSidebar';

export const SkeletonHeader = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('flex items-center justify-between p-4 border-b border-gray-200 bg-white', className)} {...props}>
      <div className="flex items-center space-x-4">
        <Skeleton variant="rectangular" width="120px" height="32px" />
        <Skeleton variant="rectangular" width="200px" height="16px" />
      </div>
      <div className="flex items-center space-x-3">
        <Skeleton variant="circular" width="32px" height="32px" />
        <Skeleton variant="circular" width="32px" height="32px" />
        <Skeleton variant="circular" width="32px" height="32px" />
      </div>
    </div>
  );
});

SkeletonHeader.displayName = 'SkeletonHeader';

export default Skeleton;
