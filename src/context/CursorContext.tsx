import React, { createContext, useContext, useState, ReactNode } from 'react';

type CursorVariant = 'default' | 'text';

interface CursorContextType {
  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');

  return (
    <CursorContext.Provider value={{ cursorVariant, setCursorVariant }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
