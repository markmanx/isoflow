import React, { useMemo } from 'react';
import Isoflow from 'src/Isoflow';
import { initialData } from '../initialData';

export const BasicEditor = () => {
    const [tickTockClock, setTickTockClock] = React.useState(0);
    const memoizedInitialData = useMemo(() => ({ ...initialData, fitToView: true }), []);

    React.useEffect(() => {
      const interval = setInterval(() => {
        console.log('tick', tickTockClock);
        setTickTockClock((prev) => prev + 1);
      }, 100);
      return () => clearInterval(interval);
    }, []);

    return <Isoflow initialData={memoizedInitialData} mainMenuOptions={[]} />;
};
