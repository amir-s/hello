import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { useStorage } from 'utilities/Storage';

import './Background.scss';

export interface Photo {
  title: string;
  url: string;
  link: string;
  description: {
    title: string;
    location: string;
    photographer: string;
    source: string;
  };
}

const DEFAULT_PHOTO: Photo = {
  title: '',
  url: '',
  link: '',
  description: {
    title: '',
    location: '',
    photographer: '',
    source: '',
  },
};

export interface Props {
  children?: ReactNode;
}

interface Utils {
  loading: boolean;
  changePhoto(to: 'random' | 'daily'): void;
}

export const backgroundContext = createContext<Photo>(DEFAULT_PHOTO);
export const utilsContext = createContext<Utils>({
  loading: true,
  changePhoto: () => {},
});

export default function Background({ children }: Props) {
  const [lastUpate, setLastUpate] = useStorage('lastUpadte', 0);
  const [photo, setPhoto] = useStorage<Photo>('currentPhoto', DEFAULT_PHOTO);
  const [loading, setLoading] = useState(false);

  const style = {
    backgroundImage: photo ? `url(${photo.url})` : '',
  };

  const changePhoto = async (to: 'random' | 'daily' = 'random') => {
    setLoading(true);

    const response = await fetch(`https://hello-data.amirs.dev/v1/photo/${to === 'random' ? 'random' : ''}`);
    const photo = (await response.json()) as Photo;
    const img = new Image();
    img.src = photo.url;
    img.onload = () => {
      setPhoto(photo);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
  };

  useEffect(() => {
    if (lastUpate + 24 * 60 * 60 * 1000 > new Date().getTime()) return;

    const update = async () => {
      const response = await fetch('https://hello-data.amirs.dev/v1/photo');
      const photo = (await response.json()) as Photo;
      setPhoto(photo);
      setLastUpate(new Date().getTime());
    };

    update();
  }, [lastUpate, setPhoto, setLastUpate]);

  return (
    <div className="Background" style={style}>
      <utilsContext.Provider value={{ changePhoto, loading }}>
        <backgroundContext.Provider value={photo}>{children}</backgroundContext.Provider>
      </utilsContext.Provider>
    </div>
  );
}
