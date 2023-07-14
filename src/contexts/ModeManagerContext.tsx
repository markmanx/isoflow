import React, { createContext, useMemo } from 'react';
import { ModeManager } from '../modes/ModeManager';

interface Props {
  children: React.ReactNode;
}

export const modeManagerContext = createContext(new ModeManager());

export const ModeManagerProvider = ({ children }: Props) => (
  <modeManagerContext.Provider value={new ModeManager()}>
    {children}
  </modeManagerContext.Provider>
);
