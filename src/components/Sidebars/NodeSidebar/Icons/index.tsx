import React from "react";
import { useMemo } from "react";
import Grid from "@mui/material/Grid";
import { IconCategory } from "./IconCategory";
import { IconI } from "../../../../validation/SceneSchema";

interface Props {
  icons: IconI[];
  onClick: (icon: IconI) => void;
}

export const Icons = ({ icons, onClick }: Props) => {
  const categorisedIcons = useMemo(() => {
    const _categories: { name?: string; icons: IconI[] }[] = [];

    icons.forEach((icon) => {
      const category = _categories.find((cat) => cat.name === icon.category);

      if (!category) {
        _categories.push({ name: icon.category, icons: [icon] });
      } else {
        category.icons.push(icon);
      }
    });

    return _categories.sort((a, b) => {
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
    <Grid container spacing={4}>
      {categorisedIcons.map((cat) => (
        <Grid item xs={12} key={`icon-category-${cat.name}`}>
          <IconCategory {...cat} onClick={onClick} />
        </Grid>
      ))}
    </Grid>
  );
};
