import React, { useState } from 'react';
import { MarkdownEditor } from '../../../MarkdownEditor';
import { Section } from '../../../Sidebar/Section';

export const NodeSettings = () => {
  const [label, setLabel] = useState('');

  return (
    <Section>
      <MarkdownEditor value={label} onChange={setLabel} />
    </Section>
  );
};
