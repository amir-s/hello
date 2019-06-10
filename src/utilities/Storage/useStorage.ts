import { useState, useCallback } from 'react';
import Store from './Store';

export default function useStorage<S>(id: string, initialValue: S): [S, (newValue: S) => void] {
  const persistedValue = Store.get(id);
  const [value, setValue] = useState<S>(persistedValue || initialValue);

  if (!persistedValue) {
    Store.set(id, initialValue);
  }

  const updateValue = useCallback(
    (newValue: S) => {
      Store.set(id, newValue);
      return setValue(newValue);
    },
    [setValue, id]
  );

  return [value, updateValue];
}
