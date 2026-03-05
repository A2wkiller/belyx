import React from 'react';
import { cn } from './utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = '/assets/placeholder.png',
  width,
  height,
  className,
  priority = false,
  objectFit = 'cover',
  ...props
}) => {
  const isExternal = src.startsWith('http');
  
  // Basic optimization: if it's a Supabase URL, we could append transformation parameters
  // For now, we'll focus on standard HTML optimizations
  
  return (
    <picture>
      {/* If we had multiple formats, we would add <source> tags here */}
      {/* <source srcSet={`${src}?format=avif`} type="image/avif" /> */}
      {/* <source srcSet={`${src}?format=webp`} type="image/webp" /> */}
      <img
        src={src}
        alt={alt || 'Image'}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={cn(
          'max-w-full h-auto',
          objectFit === 'cover' && 'object-cover',
          objectFit === 'contain' && 'object-contain',
          className
        )}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (target.src !== fallbackSrc) {
            target.src = fallbackSrc;
          }
        }}
        {...props}
      />
    </picture>
  );
};
