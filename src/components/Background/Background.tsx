import React, { ReactNode, createContext, useState, useEffect, useCallback } from 'react';
import { useStorage } from 'utilities/Storage';

import photos, { Photo } from './data';

import './Background.scss';

export interface Props {
  children?: ReactNode;
}

export interface BackgroundContext {
  currentPhoto: Photo;
  nextIsLoading: boolean;
  next(): void;
}

export const backgroundContext = createContext<BackgroundContext | null>(null);

export default function Background({ children }: Props) {
  const [lastUpate, setLastUpate] = useStorage('lastBackgroundUpadte', 0);
  const [imageIndex, setImageIndex] = useStorage('imageIndex', rand(photos.length));
  const [nextImageIndex, setNextImageIndex] = useStorage('nextImageIndex', rand(photos.length));

  const [nextIsLoading, setNextIsLoading] = useState(true);

  const image = photos[imageIndex];
  const nextImage = photos[nextImageIndex];

  const style = {
    backgroundImage: `url(https://burst.shopifycdn.com/photos/${image.handle}_2560x.jpg)`,
  };

  useEffect(() => {
    setNextIsLoading(true);

    let cancelled = false;
    let timeout: any;

    const img = new Image();
    img.src = `https://burst.shopifycdn.com/photos/${nextImage.handle}_2560x.jpg`;

    img.onload = () => {
      if (cancelled) return;
      timeout = setTimeout(() => {
        setNextIsLoading(false);
      }, 1000);
    };

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [nextImage]);

  const next = useCallback(() => {
    setImageIndex(nextImageIndex);
    setNextImageIndex(rand(photos.length));
    setLastUpate(new Date().getTime());
  }, [nextImageIndex, setImageIndex, setNextImageIndex, setLastUpate]);

  useEffect(() => {
    if (lastUpate + 3 * 60 * 1000 > new Date().getTime()) return;
    next();
  }, [lastUpate, next]);

  return (
    <div className="Background" style={style}>
      <backgroundContext.Provider
        value={{
          currentPhoto: image,
          next,
          nextIsLoading,
        }}
      >
        {children}
      </backgroundContext.Provider>
    </div>
  );
}

function rand(high: number, low: number = 0) {
  return Math.floor(Math.random() * (high - low)) + low;
}
