import React, { useState } from "react";
import { Node } from "../../../renderer/elements/Node";
import { MarkdownEditor } from "../../MarkdownEditor";
import { Section } from "../../Sidebar/Section";

interface Props {
  node: Node;
}

export const NodeSettings = ({ node }: Props) => {
  const [label, setLabel] = useState("");

  return (
    <Section>
      <MarkdownEditor value={label} onChange={setLabel} />
    </Section>
  );
};
