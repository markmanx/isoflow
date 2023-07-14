import React from 'react';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { SvgIconComponent } from '@mui/icons-material';

interface Props {
  name: string;
  Icon: SvgIconComponent;
  isActive?: boolean;
  onClick: () => void;
  size: number;
  tooltipPosition?: TooltipProps['placement'];
}

export const MenuItem = ({
  name,
  Icon,
  onClick,
  isActive,
  size,
  tooltipPosition = 'bottom',
}: Props) => (
  <Tooltip
    title={name}
    placement={tooltipPosition}
    enterDelay={1000}
    enterNextDelay={1000}
    arrow
    sx={{ bgcolor: 'primary.main' }}
  >
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        borderRadius: 0,
        height: size,
        width: size,
        maxWidth: '100%',
        minWidth: 'auto',
        bgcolor: isActive ? 'grey.800' : undefined,
        p: 0,
        m: 0,
      }}
    >
      <Icon sx={{ color: isActive ? 'grey.200' : 'grey.500' }} />
    </Button>
  </Tooltip>
);
