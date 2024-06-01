import React, { createContext, useState, useContext } from 'react';

const NavigationProgressContext = createContext();

export const NavigationProgressProvider = ({ children }) => {
  const [isStepCompleted, setIsStepCompleted] = useState(false);

  return (
    <NavigationProgressContext.Provider value={{ isStepCompleted, setIsStepCompleted }}>
      {children}
    </NavigationProgressContext.Provider>
  );
};

export const useNavigationProgress = () => useContext(NavigationProgressContext);
