import { useScene } from 'src/hooks/useScene';
import type { EditorModeEnum, MainMenuOptions, NodeSettingsOptions, ToolMenuOptions } from './common';
import type { Model, ModelItem, ViewItem } from './model';
import type { RendererProps } from './rendererProps';
import { Scene } from './scene';

export type InitialData = Model & {
  fitToView?: boolean;
  view?: string;
};

export type NodeIndicatorComponentProps = {
  item: ModelItem;
}

export interface IsoflowProps {
  initialData?: InitialData;
  mainMenuOptions?: MainMenuOptions;
  toolMenuOptions?: ToolMenuOptions;
  nodeSettingsOptions?: NodeSettingsOptions;
  hiddenIcons?: string[];
  extraToolMenuOptions?: React.ReactNode;
  nodeIndicatorComponent?: (props: NodeIndicatorComponentProps) => JSX.Element;
  onModelUpdated?: (Model: Model, {scene}: {
    scene: ReturnType<typeof useScene>
  }) => void;
  width?: number | string;
  height?: number | string;
  enableDebugTools?: boolean;
  editorMode?: keyof typeof EditorModeEnum;
  renderer?: RendererProps;
}
