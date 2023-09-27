import React, { useMemo } from 'react';
import { Grid } from '@mui/material';
import { Icon } from 'src/types';
import { IconCategory } from './IconCategory';

interface Props {
  icons: Icon[];
  onClick?: (icon: Icon) => void;
  onMouseDown?: (icon: Icon) => void;
}

export const Icons = ({ icons, onClick, onMouseDown }: Props) => {
  const categorisedIcons = useMemo(() => {
    const cats: { name?: string; icons: Icon[] }[] = [];

    icons.forEach((icon) => {
      const category = cats.find((cat) => {
        return cat.name === icon.category;
      });

      if (!category) {
        cats.push({ name: icon.category, icons: [icon] });
      } else {
        category.icons.push(icon);
      }
    });

    return cats.sort((a, b) => {
      if (a.name === undefined) {
        return -1;
      }

      if (b.name === undefined) {
        return 1;
      }

      return a.name.localeCompare(b.name);
    });
  }, [icons]);

  return (
    <Grid container spacing={4} sx={{ py: 4 }}>
      {categorisedIcons.map((cat) => {
        return (
          <Grid item xs={12} key={`icon-category-${cat.name}`}>
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
