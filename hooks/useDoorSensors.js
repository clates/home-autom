// components/common/MenuProvider.js
import { createContext, useContext } from "react";

// Create Context object.
const DoorSensorsContext = createContext();

// Export Provider.
export function DoorSensorsProvider(props) {
  const { value, children } = props;

  return (
    <DoorSensorsContext.Provider value={value}>
      {children}
    </DoorSensorsContext.Provider>
  );
}

// Export useContext Hook.
export function useDoorSensorsContext() {
  return useContext(DoorSensorsContext);
}
