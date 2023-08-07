import React, { createContext, useContext, useRef } from 'react';
import { createStore, useStore } from 'zustand';
import { CoordsUtils, incrementZoom, decrementZoom } from 'src/utils';
import { UiState, UiStateActions } from 'src/types';

interface Actions {
  actions: UiStateActions;
}

type UiStateStore = UiState & Actions;

const initialState = () => {
  return createStore<UiStateStore>((set, get) => {
    return {
      isToolbarVisible: true,
      mode: {
        type: 'CURSOR',
        showCursor: true,
        mousedown: null
      },
      mouse: {
        position: { screen: CoordsUtils.zero(), tile: CoordsUtils.zero() },
        mousedown: null,
        delta: null
      },
      itemControls: null,
      contextMenu: null,
      scroll: {
        position: { x: 0, y: 0 },
        offset: { x: 0, y: 0 }
      },
      zoom: 1,
      rendererSize: { width: 0, height: 0 },
      actions: {
        setMode: (mode) => {
          set({ mode });
        },
        incrementZoom: () => {
          const { zoom } = get();
          set({ zoom: incrementZoom(zoom) });
        },
        decrementZoom: () => {
          const { zoom } = get();
          set({ zoom: decrementZoom(zoom) });
        },
        setZoom: (zoom) => {
          set({ zoom });
        },
        setScroll: ({ position, offset }) => {
          set({ scroll: { position, offset: offset ?? get().scroll.offset } });
        },
        setSidebar: (itemControls) => {
          set({ itemControls });
        },
        setContextMenu: (contextMenu) => {
          set({ contextMenu });
        },
        setMouse: (mouse) => {
          set({ mouse });
        },
        setRendererSize: (rendererSize) => {
          set({ rendererSize });
        },
        setToolbarVisibility: (visible) => {
          set({ isToolbarVisible: visible });
        }
      }
    };
  });
};

const UiStateContext = createContext<ReturnType<typeof initialState> | null>(
  null
);

interface ProviderProps {
  children: React.ReactNode;
}

// TODO: Typings below are pretty gnarly due to the way Zustand works.
// see https://github.com/pmndrs/zustand/discussions/1180#discussioncomment-3439061
export const UiStateProvider = ({ children }: ProviderProps) => {
  const storeRef = useRef<ReturnType<typeof initialState>>();

  if (!storeRef.current) {
    storeRef.current = initialState();
  }

  return (
    <UiStateContext.Provider value={storeRef.current}>
      {children}
    </UiStateContext.Provider>
  );
};

export function useUiStateStore<T>(selector: (state: UiStateStore) => T) {
  const store = useContext(UiStateContext);

  if (store === null) {
    throw new Error('Missing provider in the tree');
  }

  const value = useStore(store, selector);
  return value;
}
