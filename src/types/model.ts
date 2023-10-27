import z from 'zod';
import { iconSchema } from 'src/validation/icons';
import { modelSchema } from 'src/validation/model';
import { modelItemSchema } from 'src/validation/modelItems';
import { viewSchema, viewItemSchema } from 'src/validation/views';
import {
  connectorSchema,
  anchorSchema,
  connectorStyleOptions
} from 'src/validation/annotations/connector';
import { textBoxSchema } from 'src/validation/annotations/textBox';
import { rectangleSchema } from 'src/validation/annotations/rectangle';
import { Coords } from 'src/types';
import { StoreApi } from 'zustand';
import type { EditorModeEnum, MainMenuOptions } from './common';

export { connectorStyleOptions } from 'src/validation/annotations/connector';

export type Model = z.infer<typeof modelSchema>;
export type ModelItems = Model['items'];
export type Views = Model['views'];
export type Icons = Model['icons'];
export type Icon = z.infer<typeof iconSchema>;
export type ModelItem = z.infer<typeof modelItemSchema>;
export type View = z.infer<typeof viewSchema>;
export type ViewItem = z.infer<typeof viewItemSchema>;
export type ConnectorStyle = keyof typeof connectorStyleOptions;
export type ConnectorAnchor = z.infer<typeof anchorSchema>;
export type Connector = z.infer<typeof connectorSchema>;
export type TextBox = z.infer<typeof textBoxSchema>;
export type Rectangle = z.infer<typeof rectangleSchema>;

export type InitialData = Partial<Model> & {
  zoom?: number;
  scroll?: Coords;
};

export interface IsoflowProps {
  initialData?: InitialData;
  mainMenuOptions?: MainMenuOptions;
  onModelUpdated?: (Model: Model) => void;
  width?: number | string;
  height?: number | string;
  enableDebugTools?: boolean;
  editorMode?: keyof typeof EditorModeEnum;
}

export type ModelStore = Model & {
  actions: {
    get: StoreApi<ModelStore>['getState'];
    set: StoreApi<ModelStore>['setState'];
  };
};
