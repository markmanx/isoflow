import React, { useEffect, useRef, useState } from 'react';
import Paper from 'paper';
import { Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

const render = () => {
  if (Paper.view) {
    if (global.requestAnimationFrame) {
      const raf = global.requestAnimationFrame(render);

      return raf;
    }

    Paper.view.update();
  }
};

export const Initialiser = ({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsReady(false);

    if (!containerRef.current) return;

    Paper.settings = {
      insertItems: false,
      applyMatrix: false
    };

    Paper.setup(containerRef.current);

    const rafId = render();

    setIsReady(true);

    return () => {
      setIsReady(false);
      if (rafId) cancelAnimationFrame(rafId);

      Paper.projects.forEach((project) => {
        return project.remove();
      });
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    >
      <canvas
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
      {isReady && children}
    </Box>
  );
};
