// components/common/MenuProvider.js
import { createContext, useContext } from "react";

// Create Context object.
const LightGroupsContext = createContext();

// Export Provider.
export function LightGroupsProvider(props) {
  const { value, children } = props;

  return (
    <LightGroupsContext.Provider value={value}>
      {children}
    </LightGroupsContext.Provider>
  );
}

// Export useContext Hook.
export function useLightGroupsContext() {
  return useContext(LightGroupsContext);
}
