import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useLabelConnector } from './useLabelConnector';

interface Props {
  labelHeight: number;
  children: React.ReactNode;
  parentContainer: paper.Group;
}

// TODO: Rename all `parentContainer` to `groupContainer`
export const LabelContainer = ({
  children,
  labelHeight,
  parentContainer
}: Props) => {
  const labelConnector = useLabelConnector();
  const {
    init: initLabelConnector,
    updateHeight: updateLabelHeight,
    destroy: destroyLabelConnector
  } = labelConnector;

  useEffect(() => {
    const labelConnectorContainer = initLabelConnector();
    parentContainer.addChild(labelConnectorContainer);

    return () => {
      destroyLabelConnector();
    };
  }, [initLabelConnector, destroyLabelConnector, parentContainer]);

  useEffect(() => {
    updateLabelHeight(labelHeight);
  }, [labelHeight, updateLabelHeight]);

  return (
    <Box
      sx={{
        bgcolor: 'common.white',
        border: '1px solid',
        borderColor: 'grey.500',
        borderRadius: 2,
        overflow: 'hidden',
        py: 1,
        px: 1.5
      }}
    >
      {children}
    </Box>
  );
};
