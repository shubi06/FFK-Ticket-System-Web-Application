import React, { createContext, useState, useEffect, useContext } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300000); // 5 minutes in milliseconds

  useEffect(() => {
    let countdown;
    if (timerStarted) {
      countdown = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 1000) {
            clearInterval(countdown);
            setTimerStarted(false);
            setTimeRemaining(300000); // reset timer
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [timerStarted]);

  return (
    <TimerContext.Provider value={{ timerStarted, setTimerStarted, timeRemaining }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
