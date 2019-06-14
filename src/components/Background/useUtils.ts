import { useContext } from 'react';

import { utilsContext } from './Background';

export default function useUtils() {
  const context = useContext(utilsContext)!;
  return context;
}
