import React, { createContext, useRef, useContext } from 'react';
import { createStore, useStore } from 'zustand';
import { ModelStore } from 'src/types';
import { INITIAL_DATA } from 'src/config';

const initialState = () => {
  return createStore<ModelStore>((set, get) => {
    return {
      ...INITIAL_DATA,
      actions: {
        get,
        set
      }
    };
  });
};

const ModelContext = createContext<ReturnType<typeof initialState> | null>(
  null
);

interface ProviderProps {
  children: React.ReactNode;
}

// TODO: Typings below are pretty gnarly due to the way Zustand works.
// see https://github.com/pmndrs/zustand/discussions/1180#discussioncomment-3439061
export const ModelProvider = ({ children }: ProviderProps) => {
  const storeRef = useRef<ReturnType<typeof initialState>>();

  if (!storeRef.current) {
    storeRef.current = initialState();
  }

  return (
    <ModelContext.Provider value={storeRef.current}>
      {children}
    </ModelContext.Provider>
  );
};

export function useModelStore<T>(
  selector: (state: ModelStore) => T,
  equalityFn?: (left: T, right: T) => boolean
) {
  const store = useContext(ModelContext);

  if (store === null) {
    throw new Error('Missing provider in the tree');
  }

  const value = useStore(store, selector, equalityFn);

  return value;
}
