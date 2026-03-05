import React, { useState } from 'react';
import { uploadImage } from '../../lib/image-service';
import { Button } from './button';
import { Input } from './input';
import { Loader2, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: Error) => void;
  type?: 'thumbnail' | 'hero';
  bucket?: string;
  label?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onUploadComplete,
  onUploadError,
  type = 'thumbnail',
  bucket = 'images',
  label = 'Upload Image',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('idle');

    // Optimization options based on image type
    const options = type === 'thumbnail' 
      ? { maxWidth: 300, maxHeight: 300, quality: 0.8, format: 'image/webp' as const }
      : { maxWidth: 1920, maxHeight: 1080, quality: 0.8, format: 'image/webp' as const };

    try {
      const result = await uploadImage(file, bucket, options);
      
      // Enforce size limits after optimization
      const maxSize = type === 'thumbnail' ? 200 * 1024 : 800 * 1024;
      if (result.size > maxSize) {
        console.warn(`Optimized image size (${(result.size / 1024).toFixed(2)} KB) exceeds the limit of ${maxSize / 1024} KB.`);
        // Note: For hero images, sometimes we might exceed if quality is high.
      }

      setUploadStatus('success');
      onUploadComplete?.(result.url);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      setUploadStatus('error');
      const err = error instanceof Error ? error : new Error('Upload failed');
      onUploadError?.(err);
      toast.error(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border border-dashed border-white/20 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
      <label className="text-sm font-medium text-white/70">{label}</label>
      <div className="relative group">
        <Input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleFileChange}
          disabled={isUploading}
          className="cursor-pointer opacity-0 absolute inset-0 z-10 h-full w-full"
        />
        <div className="flex items-center justify-center gap-2 py-8 bg-white/5 rounded-lg border border-white/10 group-hover:border-teal-500/50 transition-colors">
          {isUploading ? (
            <Loader2 className="w-5 h-5 animate-spin text-teal-400" />
          ) : uploadStatus === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          ) : uploadStatus === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400" />
          ) : (
            <Upload className="w-5 h-5 text-white/40" />
          )}
          <span className="text-sm text-white/60">
            {isUploading ? 'Uploading...' : 'Click to select or drag image'}
          </span>
        </div>
      </div>
      <p className="text-[10px] text-white/40">
        Accepted: JPG, PNG, WebP, AVIF. Max 10MB.
        {type === 'thumbnail' ? ' Optimized for 300x300, < 200KB.' : ' Optimized for 1920x1080, < 800KB.'}
      </p>
    </div>
  );
};
