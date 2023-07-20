import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useSceneStore } from 'src/stores/useSceneStore';
import { ControlsContainer } from '../components/ControlsContainer';
import { Icons } from './IconSelection/IconSelection';
import { Header } from '../components/Header';
import { NodeSettings } from './NodeSettings/NodeSettings';

interface Props {
  onClose: () => void;
}

export const NodeControls = ({ onClose }: Props) => {
  const [tab, setTab] = useState(0);
  const icons = useSceneStore((state) => state.icons);

  const onTabChanged = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <ControlsContainer
      header={
        <Box>
          <Header title="Node" onClose={onClose} />{' '}
          <Tabs value={tab} onChange={onTabChanged}>
            <Tab label="Settings" />
            <Tab label="Icons" />
          </Tabs>
        </Box>
      }
    >
      {tab === 0 && <NodeSettings />}
      {tab === 1 && <Icons icons={icons} onClick={() => {}} />}
    </ControlsContainer>
  );
};
