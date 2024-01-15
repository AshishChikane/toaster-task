import { createContext, useContext, useState } from "react";

const IntervalContext = createContext();

export const IntervalProvider = ({ children }) => {
  const [intervalValue, setIntervalValue] = useState(null);

  const setNewIntervalValue = (value) => {
    setIntervalValue(value);
  };

  return (
    <IntervalContext.Provider value={{ intervalValue, setNewIntervalValue }}>
      {children}
    </IntervalContext.Provider>
  );
};

export const useIntervalContext = () => {
  return useContext(IntervalContext);
};
