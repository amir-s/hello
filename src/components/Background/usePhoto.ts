import { useContext } from 'react';

import { backgroundContext } from './Background';

export default function usePhoto() {
  const context = useContext(backgroundContext)!;
  return context.currentPhoto;
}
