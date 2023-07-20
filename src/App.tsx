import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { theme } from 'src/styles/theme';
import { ToolMenu } from 'src/components/ToolMenu';
import { SceneInput } from 'src/validation/SceneSchema';
import { useSceneStore, Scene } from 'src/stores/useSceneStore';
import { GlobalStyles } from 'src/styles/GlobalStyles';
import { Renderer } from 'src/renderer/Renderer';
import { nodeInputToNode } from 'src/utils';
import { Coords } from 'src/utils/Coords';
import { ItemControlsManager } from './components/ItemControls/ItemControlsManager';

interface Props {
  initialScene: SceneInput;
  width?: number | string;
  height: number | string;
}

const InnerApp = React.memo(
  ({ height, width }: Pick<Props, 'height' | 'width'>) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Box
        sx={{
          width: width ?? '100%',
          height,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Renderer />
        <ItemControlsManager />
        <ToolMenu />
      </Box>
    </ThemeProvider>
  )
);

const App = ({ initialScene, width, height }: Props) => {
  const sceneActions = useSceneStore((state) => state.actions);
  // const setOnSceneChange = useAppState((state) => state.setOnSceneChange);

  // useEffect(() => {
  //   if (!onSceneChange) return;

  //   setOnSceneChange(onSceneChange);
  // }, [setOnSceneChange, onSceneChange]);

  useEffect(() => {
    const nodes = initialScene.nodes.map((nodeInput) =>
      nodeInputToNode(nodeInput)
    );

    sceneActions.set({ ...initialScene, nodes, gridSize: new Coords(51, 51) });
  }, [initialScene, sceneActions]);

  return <InnerApp height={height} width={width} />;
};

export { Scene };
export default App;
