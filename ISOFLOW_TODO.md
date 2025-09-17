# Isoflow TODO List

Based on GitHub issues and community feedback. Each item includes relevant codebase locations for implementation.

## High Priority - Core Functionality

### 1. Implement Undo/Redo System
**Issue**: Undo functionality is mentioned in README but not working
**Priority**: HIGH
**Relevant Codebase Areas**:
- `/src/stores/modelStore.tsx` - Need to add history tracking
- `/src/stores/reducers/` - Modify reducers to support undo stack
- `/src/interaction/useInteractionManager.ts` - Add keyboard shortcuts (Ctrl+Z/Ctrl+Y)
- `/src/components/MainMenu/MainMenu.tsx` - Add undo/redo menu items
- Consider using a library like `zustand-middleware-immer` for undo/redo support

### 2. Fix Tool Selection Persistence
**Issue**: Tool bar resets to select tool after every workspace click
**Priority**: HIGH
**Relevant Codebase Areas**:
- `/src/components/ToolMenu/ToolMenu.tsx` - Tool selection logic
- `/src/stores/uiStateStore.tsx` - Look at `setMode()` function
- `/src/interaction/modes/` - Each mode's exit behavior
- `/src/interaction/useInteractionManager.ts` - Mode switching logic

### 3. Improve Connection Drawing UX
**Issue**: Connections require right-click (not intuitive), no instructions
**Priority**: HIGH
**Relevant Codebase Areas**:
- `/src/interaction/modes/Connector.ts` - Connection drawing logic
- `/src/components/SceneLayers/Connectors/Connector.tsx` - Visual feedback
- `/src/components/ContextMenu/ContextMenu.tsx` - Right-click behavior
- Consider adding visual hints or changing to left-click drag

## Medium Priority - UX Improvements

### 4. Reduce Item Addition Friction
**Issue**: Adding items requires 3+ clicks
**Priority**: MEDIUM
**Suggestions**: 
- Double-click empty cell to open icon picker
- Drag-and-drop from icon panel
- Quick-add shortcuts
**Relevant Codebase Areas**:
- `/src/interaction/modes/PlaceIcon.ts` - Icon placement logic
- `/src/components/ItemControls/IconSelectionControls/` - Icon picker UI
- `/src/interaction/useInteractionManager.ts` - Add double-click handler
- `/src/components/DragAndDrop/DragAndDrop.tsx` - Potential drag-drop implementation

### 5. Fix Automatic Menu Opening
**Issue**: Menu opens automatically when clicking component, opens on drag
**Priority**: MEDIUM
**Suggestions**:
- Add gear icon or three-dots menu trigger
- Prevent menu on drag operations
**Relevant Codebase Areas**:
- `/src/components/ItemControls/ItemControlsManager.tsx` - Control when panel shows
- `/src/stores/uiStateStore.tsx` - `setItemControls()` function
- `/src/interaction/modes/Cursor.ts` - Selection behavior
- `/src/interaction/modes/DragItems.ts` - Drag detection

### 6. Add Menu Trigger for Empty Cells
**Issue**: Should be able to open add menu when clicking empty cell
**Priority**: MEDIUM
**Relevant Codebase Areas**:
- `/src/interaction/modes/Cursor.ts` - Click on empty space handling
- `/src/components/ContextMenu/ContextMenu.tsx` - Context menu for empty space
- `/src/components/UiOverlay/UiOverlay.tsx` - UI overlay management

## Low Priority - Documentation & Project Setup

### 7. Create CONTRIBUTORS.md
**Issue**: Need contribution guidelines
**Priority**: LOW
**Content to Include**:
- Development setup instructions
- Code style guidelines
- PR process
- Testing requirements
- Architecture overview (link to encyclopedia)

### 8. Create Project TODO/Roadmap
**Issue**: Contributors don't know where to start
**Priority**: LOW
**Suggestions**:
- Public roadmap
- Good first issues
- Feature requests board

## Implementation Notes

### State Management Considerations
Most features will require modifications to:
1. **Model Store** (`/src/stores/modelStore.tsx`) - For undo/redo history
2. **UI State Store** (`/src/stores/uiStateStore.tsx`) - For mode persistence
3. **Interaction Manager** (`/src/interaction/useInteractionManager.ts`) - For new interactions

### Testing Requirements
Each feature should include:
- Unit tests in `__tests__` directories
- Integration tests for interaction flows
- Update to `/docs/` if behavior changes

### Design Patterns to Follow
1. Use existing interaction mode pattern in `/src/interaction/modes/`
2. Follow component structure in `/src/components/`
3. Use Zustand actions pattern for state updates
4. Maintain TypeScript strict typing

## Quick Wins (Good First Issues)

1. **Add keyboard shortcut hints** 
   - Location: `/src/components/ToolMenu/ToolMenu.tsx`
   - Add tooltips showing shortcuts

2. **Fix context menu on drag**
   - Location: `/src/interaction/modes/DragItems.ts`
   - Add flag to prevent menu during drag

3. **Add connection instructions**
   - Location: `/src/components/ToolMenu/ToolMenu.tsx` or status bar
   - Show hint when connector tool selected

## Architecture Decisions Needed

1. **Undo/Redo Implementation**
   - Option A: Middleware approach with Zustand
   - Option B: Command pattern with action history
   - Option C: Immer patches for efficient history

2. **Tool Persistence**
   - Option A: Keep tool selected until explicitly changed
   - Option B: Smart mode - persist for multiple operations
   - Option C: User preference setting

3. **Connection UX**
   - Option A: Left-click drag from node to node
   - Option B: Click source, then click target
   - Option C: Keep right-click but add visual hints