import React from 'react';
import Isoflow, { DefaultLabelContainer } from 'src/Isoflow';
import { Box, useTheme } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  AreaChart,
  Area,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { icons } from '../icons';
import graphData from './graphData';

const CustomLabel = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '300px',
        height: '125px',
        pt: 2
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={graphData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis width={25} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            fill={theme.customVars.diagramPalette.blue}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export const CustomNode = () => {
  return (
    <Isoflow
      initialScene={{
        icons,
        connectors: [],
        groups: [],
        nodes: [
          {
            id: 'Node1',
            label: 'Requests per minute',
            labelElement: <CustomLabel />,
            iconId: 'server',
            position: {
              x: 0,
              y: 0
            }
          }
        ]
      }}
      height="100%"
    />
  );
};
