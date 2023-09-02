import React, { useMemo } from 'react';
import { getTextBoxTo } from 'src/utils';
import { useTextBox } from 'src/hooks/useTextBox';
import { TransformControls } from './TransformControls';

interface Props {
  id: string;
}

export const TextBoxTransformControls = ({ id }: Props) => {
  const textBox = useTextBox(id);

  const to = useMemo(() => {
    return getTextBoxTo(textBox);
  }, [textBox]);

  return <TransformControls from={textBox.tile} to={to} />;
};
