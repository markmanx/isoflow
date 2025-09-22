// Mock implementation of chroma-js for Jest testing
interface ChromaInstance {
  alpha: (value: number) => ChromaInstance;
  css: () => string;
}

const chromaMock = (color?: string): ChromaInstance => ({
  alpha: (value: number) => ({
    alpha: (v: number) => chromaMock(color),
    css: () => `rgba(255, 0, 0, ${value})` // Simple red color with alpha
  }),
  css: () => color || '#ff0000'
});

export default chromaMock;
