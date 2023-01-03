// components/common/MenuProvider.js
import { createContext, useContext } from "react";

// Create Context object.
const CamerasContext = createContext();

// Export Provider.
export function CamerasProvider(props) {
  const { value, children } = props;

  return (
    <CamerasContext.Provider value={value}>{children}</CamerasContext.Provider>
  );
}

// Export useContext Hook.
export function useCamerasContext() {
  return useContext(CamerasContext);
}
