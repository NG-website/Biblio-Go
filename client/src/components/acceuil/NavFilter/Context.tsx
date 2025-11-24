import  { createContext, useContext, useState, type ReactNode } from "react";
type ContextType = {
    children: ReactNode;
}

interface ContextProps{
  filter : string | null,
    setFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

// Création du contexte
const FilterContext = createContext<ContextProps| null>(null);

// Hook personnalisé pour consommer le contexte
export const Filter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter doit être utilisé dans un FilterProvider");
  }
  return context;
};


// Provider qui enveloppe l'app
export const FilterProvider   = ({ children } : ContextType) => {
  const [filter, setFilter] = useState<string | null>(null);

  return (
    <FilterContext.Provider value={{filter, setFilter}}>
      {children}
    </FilterContext.Provider>
  );
};

const MyColors = createContext()