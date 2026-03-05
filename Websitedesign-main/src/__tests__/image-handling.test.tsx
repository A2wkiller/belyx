import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OptimizedImage } from '../app/components/ui/OptimizedImage';
import { optimizeImage, uploadImage } from '../app/lib/image-service';

describe('OptimizedImage Component', () => {
  it('renders with correct attributes', () => {
    render(
      <OptimizedImage 
        src="/test.png" 
        alt="Test Image" 
        width={100} 
        height={100} 
      />
    );
    const img = screen.getByAltText('Test Image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
    expect(img).toHaveAttribute('src', '/test.png');
  });

  it('uses fallback on error', () => {
    render(
      <OptimizedImage 
        src="/broken.png" 
        alt="Broken Image" 
        fallbackSrc="/placeholder.png"
      />
    );
    const img = screen.getByAltText('Broken Image');
    img.dispatchEvent(new Event('error'));
    expect(img).toHaveAttribute('src', '/placeholder.png');
  });
});

describe('Image Service', () => {
  it('validates file size', async () => {
    const largeFile = new File([new ArrayBuffer(11 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
    await expect(uploadImage(largeFile)).rejects.toThrow('File size exceeds 10MB limit.');
  });

  it('validates MIME type', async () => {
    const textFile = new File(['hello'], 'test.txt', { type: 'text/plain' });
    await expect(uploadImage(textFile)).rejects.toThrow('Invalid file type.');
  });
});
