'use client';

import NextImage from 'next/image';
import { cn } from '@/utils/cn';

interface ImageProps extends React.ComponentPropsWithoutRef<typeof NextImage> {
  src: string;
  alt: string;
  className?: string;
}

export function Image({ src, alt, className, ...props }: ImageProps) {
  // Handle both relative and absolute paths
  const imageSrc = src.startsWith('http') ? src : src.startsWith('/') ? src : `/${src}`;

  return (
    <NextImage
      src={imageSrc}
      alt={alt}
      className={cn('object-contain', className)}
      {...props}
    />
  );
}

// For SVG icons that don't need Next.js Image optimization
export function Icon({ src, alt, className, ...props }: Omit<ImageProps, 'width' | 'height'>) {
  return (
    <img
      src={src.startsWith('http') ? src : src.startsWith('/') ? src : `/${src}`}
      alt={alt}
      className={cn('object-contain', className)}
      {...props}
    />
  );
} 