// Mock implementation of chroma-js for Jest testing
const chromaMock = (color) => ({
  alpha: (value) => ({
    css: () => `rgba(255, 0, 0, ${value})` // Simple red color with alpha
  }),
  css: () => color || '#ff0000'
});

// Support both default export and named export patterns
chromaMock.default = chromaMock;
module.exports = chromaMock;
module.exports.default = chromaMock;
