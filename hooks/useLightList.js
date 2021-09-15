// components/common/MenuProvider.js
import { createContext, useContext } from "react";

// Create Context object.
const LightListContext = createContext();

// Export Provider.
export function LightListProvider(props) {
  const { value, children } = props;

  return (
    <LightListContext.Provider value={value}>
      {children}
    </LightListContext.Provider>
  );
}

// Export useContext Hook.
export function useLightListContext() {
  return useContext(LightListContext);
}
