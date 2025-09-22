import { render } from '@testing-library/react';

// This will render and check the error message from the console
// It will not contain the error itself.
// Adapted from https://github.com/facebook/react/issues/11098#issuecomment-412682721
export function renderExpectErrLog(element, expectedError) {

  // Record all errors.
  let topLevelErrors = [];
  function handleTopLevelError(event) {
    topLevelErrors.push(event.error);
    // Prevent logging
    event.preventDefault();
  }

  window.addEventListener('error', handleTopLevelError);
  try {
    render(
      element
    );
  } finally {
    window.removeEventListener('error', handleTopLevelError);
  }

  expect(topLevelErrors.length).toBe(1);
  expect(topLevelErrors[0].message).toContain(expectedError);
}