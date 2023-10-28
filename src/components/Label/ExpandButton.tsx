import React from 'react';
import { Button as MuiButton } from '@mui/material';
import {
  ExpandMore as ReadMoreIcon,
  ExpandLess as ReadLessIcon
} from '@mui/icons-material';

interface Props {
  isExpanded: boolean;
  onClick: () => void;
}

export const ExpandButton = ({ isExpanded, onClick }: Props) => {
  return (
    <MuiButton
      sx={{
        px: 0.5,
        py: 0,
        height: 'auto',
        minWidth: 0,
        fontSize: '0.7em',
        bottom: 5,
        right: 5,
        color: 'common.white'
      }}
      onClick={onClick}
    >
      {isExpanded ? (
        <ReadLessIcon sx={{ color: 'common.white' }} />
      ) : (
        <ReadMoreIcon sx={{ color: 'common.white' }} />
      )}
    </MuiButton>
  );
};
