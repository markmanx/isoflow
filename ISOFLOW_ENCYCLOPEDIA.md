# Isoflow Codebase Encyclopedia

## Overview

Isoflow is an open-source React component for drawing isometric network diagrams. This encyclopedia provides a comprehensive guide to navigating and understanding the codebase structure, making it easy to locate specific functionality and understand the architecture.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Core Architecture](#core-architecture)
3. [State Management](#state-management)
4. [Component Organization](#component-organization)
5. [Key Technologies](#key-technologies)
6. [Build System](#build-system)
7. [Testing Structure](#testing-structure)
8. [Development Workflow](#development-workflow)

## Project Structure

```
isoflow/
├── src/                      # Source code
│   ├── Isoflow.tsx          # Main component entry point
│   ├── index.tsx            # Development entry point
│   ├── config.ts            # Configuration constants
│   ├── components/          # React components
│   ├── stores/              # State management (Zustand)
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type definitions
│   ├── schemas/             # Zod validation schemas
│   ├── interaction/         # Interaction handling
│   ├── utils/               # Utility functions
│   ├── assets/              # Static assets
│   └── styles/              # Styling (theme, global styles)
├── docs/                    # Documentation website (Nextra)
├── webpack/                 # Webpack configurations
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Core Architecture

### Entry Points

- **`src/index.tsx`**: Development mode entry with examples
- **`src/Isoflow.tsx`**: Main component for library usage
- **`src/index-docker.tsx`**: Docker-specific entry point

### Provider Hierarchy

```typescript
<ThemeProvider>
  <ModelProvider>     // Core data model
    <SceneProvider>   // Visual state
      <UiStateProvider> // UI interaction state
        <App>
          <Renderer />   // Canvas rendering
          <UiOverlay />  // UI controls
        </App>
      </UiStateProvider>
    </SceneProvider>
  </ModelProvider>
</ThemeProvider>
```

### Data Flow

1. **Model Data** → Items, Views, Icons, Colors
2. **Scene Data** → Connector paths, Text box sizes
3. **UI State** → Zoom, Pan, Selection, Mode

## State Management

### 1. ModelStore (`src/stores/modelStore.tsx`)

**Purpose**: Core business data

**Key Data**:
- `items`: Diagram elements (nodes)
- `views`: Different diagram perspectives
- `icons`: Available icon library
- `colors`: Color palette

**Location**: `/src/stores/modelStore.tsx`
**Types**: `/src/types/model.ts`

### 2. SceneStore (`src/stores/sceneStore.tsx`)

**Purpose**: Visual/rendering state

**Key Data**:
- `connectors`: Path and position data
- `textBoxes`: Size information

**Location**: `/src/stores/sceneStore.tsx`
**Types**: `/src/types/scene.ts`

### 3. UiStateStore (`src/stores/uiStateStore.tsx`)

**Purpose**: User interface state

**Key Data**:
- `zoom`: Current zoom level
- `scroll`: Viewport position
- `mode`: Interaction mode
- `editorMode`: Edit/readonly state

**Location**: `/src/stores/uiStateStore.tsx`
**Types**: `/src/types/ui.ts`

## Component Organization

### Core Components

#### Renderer (`src/components/Renderer/`)
- **Purpose**: Main canvas rendering
- **Key Files**:
  - `Renderer.tsx`: Container component
- **Renders**: All visual layers

#### UiOverlay (`src/components/UiOverlay/`)
- **Purpose**: UI controls overlay
- **Key Files**:
  - `UiOverlay.tsx`: Control panel container

#### SceneLayer (`src/components/SceneLayer/`)
- **Purpose**: Transformable layer wrapper
- **Uses**: GSAP for animations
- **Key Files**:
  - `SceneLayer.tsx`: Transform container

### Scene Layers (`src/components/SceneLayers/`)

#### Nodes (`/Nodes/`)
- **Purpose**: Render diagram nodes/icons
- **Key Files**:
  - `Node.tsx`: Individual node component
  - `Nodes.tsx`: Node collection renderer
- **Icon Types**:
  - `IsometricIcon.tsx`: 3D-style icons
  - `NonIsometricIcon.tsx`: Flat icons

#### Connectors (`/Connectors/`)
- **Purpose**: Lines between nodes
- **Key Files**:
  - `Connector.tsx`: Individual connector
  - `Connectors.tsx`: Connector collection

#### Rectangles (`/Rectangles/`)
- **Purpose**: Background shapes/regions
- **Key Files**:
  - `Rectangle.tsx`: Individual rectangle
  - `Rectangles.tsx`: Rectangle collection

#### TextBoxes (`/TextBoxes/`)
- **Purpose**: Text annotations
- **Key Files**:
  - `TextBox.tsx`: Individual text box
  - `TextBoxes.tsx`: Text box collection

### UI Components

#### MainMenu (`src/components/MainMenu/`)
- **Purpose**: Application menu
- **Features**: Open, Export, Clear

#### ToolMenu (`src/components/ToolMenu/`)
- **Purpose**: Drawing tools palette
- **Tools**: Select, Pan, Add Icon, Draw Rectangle, Add Text

#### ItemControls (`src/components/ItemControls/`)
- **Purpose**: Property panels for selected items
- **Subdirectories**:
  - `/NodeControls/`: Node properties
  - `/ConnectorControls/`: Connector properties
  - `/RectangleControls/`: Rectangle properties
  - `/TextBoxControls/`: Text properties
  - `/IconSelectionControls/`: Icon picker

#### TransformControlsManager (`src/components/TransformControlsManager/`)
- **Purpose**: Selection and manipulation handles
- **Key Files**:
  - `TransformAnchor.tsx`: Resize handles
  - `NodeTransformControls.tsx`: Node-specific controls

### Other Components

- **Grid** (`/Grid/`): Isometric grid overlay
- **Cursor** (`/Cursor/`): Custom cursor display
- **ContextMenu** (`/ContextMenu/`): Right-click menus
- **ZoomControls** (`/ZoomControls/`): Zoom in/out buttons
- **ColorSelector** (`/ColorSelector/`): Color picker UI
- **ExportImageDialog** (`/ExportImageDialog/`): Export to PNG dialog

## Key Technologies

### Core Framework
- **React** (^18.2.0): UI framework
- **TypeScript** (^5.1.6): Type safety
- **Zustand** (^4.3.3): State management
- **Immer** (^10.0.2): Immutable updates

### UI Libraries
- **Material-UI** (@mui/material ^5.11.10): Component library
- **Emotion** (@emotion/react): CSS-in-JS styling

### Graphics & Animation
- **Paper.js** (^0.12.17): Vector graphics
- **GSAP** (^3.11.4): Animations
- **Pathfinding** (^0.4.18): Connector routing

### Validation & Forms
- **Zod** (3.22.2): Schema validation
- **React Hook Form** (^7.43.2): Form handling

### Build Tools
- **Webpack** (^5.76.2): Module bundler
- **Jest** (^29.5.0): Testing framework

## Build System

### Webpack Configurations

- **Development**: `/webpack/dev.config.js`
  - Hot reload enabled
  - Source maps
  - Development server

- **Production**: `/webpack/prod.config.js`
  - Minification
  - Optimizations
  - Library output

- **Docker**: `/webpack/docker.config.js`
  - Docker-specific build

### NPM Scripts

```bash
npm start          # Development server
npm run dev        # Watch mode
npm run build      # Production build
npm test           # Run tests
npm run lint       # TypeScript + ESLint
npm run lint:fix   # Auto-fix issues
```

## Testing Structure

### Test Files Location
- Unit tests: `__tests__` directories
- Test utilities: `/src/fixtures/`

### Key Test Areas
- `/src/schemas/__tests__/`: Schema validation
- `/src/stores/reducers/__tests__/`: State logic
- `/src/utils/__tests__/`: Utility functions

## Development Workflow

### 1. Configuration (`src/config.ts`)

**Key Constants**:
- `TILE_SIZE`: Base tile dimensions
- `DEFAULT_ZOOM`: Initial zoom level
- `DEFAULT_FONT_SIZE`: Text defaults
- `INITIAL_DATA`: Default model state

### 2. Hooks Directory (`src/hooks/`)

**Common Hooks**:
- `useScene.ts`: Merged scene data
- `useModelItem.ts`: Individual item access
- `useConnector.ts`: Connector management
- `useIsoProjection.ts`: Coordinate conversion
- `useDiagramUtils.ts`: Diagram operations

### 3. Interaction System (`src/interaction/`)

**Main File**: `useInteractionManager.ts`

**Interaction Modes** (`/modes/`):
- `Cursor.ts`: Selection mode
- `Pan.ts`: Canvas panning
- `PlaceIcon.ts`: Icon placement
- `Connector.ts`: Drawing connections
- `DragItems.ts`: Moving elements
- `Rectangle/`: Rectangle tools
- `TextBox.ts`: Text editing

### 4. Utilities (`src/utils/`)

**Key Utilities**:
- `CoordsUtils.ts`: Coordinate calculations
- `SizeUtils.ts`: Size computations
- `renderer.ts`: Rendering helpers
- `model.ts`: Model manipulation
- `pathfinder.ts`: Connector routing

### 5. Type System (`src/types/`)

**Core Types**:
- `model.ts`: Business data types
- `scene.ts`: Visual state types
- `ui.ts`: Interface types
- `common.ts`: Shared types
- `interactions.ts`: Interaction types

### 6. Schema Validation (`src/schemas/`)

**Validation Schemas**:
- `model.ts`: Model validation
- `connector.ts`: Connector validation
- `rectangle.ts`: Rectangle validation
- `textBox.ts`: Text box validation
- `views.ts`: View validation

## Navigation Quick Reference

### Need to modify...

**Icons?** → `/src/components/ItemControls/IconSelectionControls/`
**Node rendering?** → `/src/components/SceneLayers/Nodes/`
**Connector drawing?** → `/src/components/SceneLayers/Connectors/`
**Zoom behavior?** → `/src/stores/uiStateStore.tsx` + `/src/components/ZoomControls/`
**Grid display?** → `/src/components/Grid/`
**Export functionality?** → `/src/components/ExportImageDialog/`
**Color picker?** → `/src/components/ColorSelector/`
**Context menus?** → `/src/components/ContextMenu/`
**Keyboard shortcuts?** → `/src/interaction/useInteractionManager.ts`
**Tool selection?** → `/src/components/ToolMenu/`
**Selection handles?** → `/src/components/TransformControlsManager/`

### Want to understand...

**How items are positioned?** → `/src/hooks/useIsoProjection.ts`
**How connectors find paths?** → `/src/utils/pathfinder.ts`
**How state updates work?** → `/src/stores/reducers/`
**How validation works?** → `/src/schemas/`
**Available icons?** → `/src/fixtures/icons.ts`
**Default configurations?** → `/src/config.ts`

## Key Files Reference

| Purpose | File Path |
|---------|-----------|
| Main entry | `/src/Isoflow.tsx` |
| Configuration | `/src/config.ts` |
| Model types | `/src/types/model.ts` |
| UI state types | `/src/types/ui.ts` |
| Model store | `/src/stores/modelStore.tsx` |
| Scene store | `/src/stores/sceneStore.tsx` |
| UI store | `/src/stores/uiStateStore.tsx` |
| Main renderer | `/src/components/Renderer/Renderer.tsx` |
| UI overlay | `/src/components/UiOverlay/UiOverlay.tsx` |
| Interaction manager | `/src/interaction/useInteractionManager.ts` |
| Coordinate utils | `/src/utils/CoordsUtils.ts` |
| Public API hook | `/src/hooks/useIsoflow.ts` |

This encyclopedia serves as a comprehensive guide to the Isoflow codebase. Use the table of contents and quick references to efficiently navigate to the areas you need to modify or understand.