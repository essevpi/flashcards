import { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { dummyData } from './dummyData';

export const AppContext = createContext();

const Providers = ({ children }) => {
  const [data, setData] = useLocalStorage('data', dummyData);
  console.log('GLOBAL:', data);

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

export default Providers;