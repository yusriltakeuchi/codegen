// Created on ${DAY}-${MONTH}-${YEAR} by ${USER}

import React, { createContext, useContext, useState, useMemo } from 'react';

export interface ${NAME_PASCAL_CASE}ContextType {
  state: any | null;
  setState: React.Dispatch<React.SetStateAction<any | null>>;
  reset: () => void;
}

const ${NAME_PASCAL_CASE}Context = createContext<${NAME_PASCAL_CASE}ContextType | undefined>(undefined);

export interface ${NAME_PASCAL_CASE}ProviderProps {
  children: React.ReactNode;
}

export const ${NAME_PASCAL_CASE}Provider: React.FC<${NAME_PASCAL_CASE}ProviderProps> = ({ children }) => {
  const [state, setState] = useState<any | null>(null);

  const reset = () => setState(null);

  const value = useMemo(
    () => ({ state, setState, reset }),
    [state]
  );

  return (
    <${NAME_PASCAL_CASE}Context.Provider value={value}>
      {children}
    </${NAME_PASCAL_CASE}Context.Provider>
  );
};

export function use${NAME_PASCAL_CASE}(): ${NAME_PASCAL_CASE}ContextType {
  const context = useContext(${NAME_PASCAL_CASE}Context);
  if (!context) {
    throw new Error('use${NAME_PASCAL_CASE} must be used within a ${NAME_PASCAL_CASE}Provider');
  }
  return context;
}

export default ${NAME_PASCAL_CASE}Context;
