/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock ResizeObserver which is not available in jsdom
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
