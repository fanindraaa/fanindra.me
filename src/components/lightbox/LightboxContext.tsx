'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface LightboxActionLink {
  label: string;
  url: string;
}

export interface LightboxImage {
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
  aspectRatio?: string;
  actionLink?: LightboxActionLink;
}

export interface LightboxContextType {
  isOpen: boolean;
  images: LightboxImage[];
  currentIndex: number;
  direction: number;
  projectTitle: string;
  projectRoleYear?: string;
  actionLink?: LightboxActionLink;
  openLightbox: (
    images: LightboxImage[],
    initialIndex?: number,
    title?: string,
    roleYear?: string,
    actionLink?: LightboxActionLink
  ) => void;
  closeLightbox: () => void;
  nextImage: () => void;
  prevImage: () => void;
  goToImage: (index: number) => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<LightboxImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectRoleYear, setProjectRoleYear] = useState<string | undefined>(undefined);
  const [actionLink, setActionLink] = useState<LightboxActionLink | undefined>(undefined);

  const openLightbox = useCallback(
    (
      galleryImages: LightboxImage[],
      initialIndex = 0,
      title = '',
      roleYear?: string,
      link?: LightboxActionLink
    ) => {
      if (!galleryImages || galleryImages.length === 0) return;
      setImages(galleryImages);
      setCurrentIndex(Math.max(0, Math.min(initialIndex, galleryImages.length - 1)));
      setDirection(0);
      setProjectTitle(title);
      setProjectRoleYear(roleYear);
      setActionLink(link);
      setIsOpen(true);
    },
    []
  );

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    if (images.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToImage = useCallback(
    (index: number) => {
      if (index === currentIndex || index < 0 || index >= images.length) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex, images.length]
  );

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Global keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLightbox, nextImage, prevImage]);

  return (
    <LightboxContext.Provider
      value={{
        isOpen,
        images,
        currentIndex,
        direction,
        projectTitle,
        projectRoleYear,
        actionLink,
        openLightbox,
        closeLightbox,
        nextImage,
        prevImage,
        goToImage,
      }}
    >
      {children}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
}
