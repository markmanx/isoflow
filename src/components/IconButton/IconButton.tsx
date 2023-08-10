import React, { useMemo } from 'react';
import { Button, Box } from '@mui/material';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

interface Props {
  name: string;
  Icon: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
  size: number;
  tooltipPosition?: TooltipProps['placement'];
  disabled?: boolean;
}

export const IconButton = ({
  name,
  Icon,
  onClick,
  isActive = false,
  size,
  disabled = false,
  tooltipPosition = 'bottom'
}: Props) => {
  const iconColor = useMemo(() => {
    if (isActive) {
      return 'grey.200';
    }

    if (disabled) {
      return 'grey.800';
    }

    return 'grey.500';
  }, [disabled, isActive]);

  return (
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
          m: 0
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            svg: {
              color: iconColor
            }
          }}
        >
          {Icon}
        </Box>
      </Button>
    </Tooltip>
  );
};
