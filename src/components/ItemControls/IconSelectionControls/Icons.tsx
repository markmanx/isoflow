import React from 'react';
import { Grid } from '@mui/material';
import { IconCategoryStateWithIcons, Icon } from 'src/types';
import { IconCategory } from './IconCategory';

interface Props {
  iconCategories: IconCategoryStateWithIcons[];
  onClick?: (icon: Icon) => void;
  onMouseDown?: (icon: Icon) => void;
}

export const Icons = ({ iconCategories, onClick, onMouseDown }: Props) => {
  return (
    <Grid container spacing={4} sx={{ py: 4 }}>
      {iconCategories.map((cat) => {
        return (
          <Grid item xs={12} key={`icon-category-${cat.id ?? 'uncategorised'}`}>
            <IconCategory
              {...cat}
              onClick={onClick}
              onMouseDown={onMouseDown}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
