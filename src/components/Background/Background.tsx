import React, { ReactNode, createContext, useEffect } from 'react';
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

export const backgroundContext = createContext<Photo>(DEFAULT_PHOTO);

export default function Background({ children }: Props) {
  const [lastUpate, setLastUpate] = useStorage('lastUpadte', 0);
  const [photo, setPhoto] = useStorage<Photo>('currentPhoto', DEFAULT_PHOTO);

  const style = {
    backgroundImage: photo ? `url(${photo.url})` : '',
  };

  useEffect(() => {
    if (lastUpate + 3 * 60 * 60 * 1000 > new Date().getTime()) return;

    const update = async () => {
      const response = await fetch('https://bing-wp.herokuapp.com');
      const photo = (await response.json()) as Photo;
      setPhoto(photo);
      setLastUpate(new Date().getTime());
    };
    update();
  }, [lastUpate, setPhoto, setLastUpate]);

  return (
    <div className="Background" style={style}>
      <backgroundContext.Provider value={photo}>{children}</backgroundContext.Provider>
    </div>
  );
}
