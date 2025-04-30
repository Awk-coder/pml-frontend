import React from 'react';

// Mock all layout components
jest.mock('../../components/layout/SquaresBackground', () => ({
  __esModule: true,
  default: () => null
}));

jest.mock('../../components/layout/Navbar', () => ({
  __esModule: true,
  default: () => null
}));

jest.mock('../../components/common/Logo', () => ({
  __esModule: true,
  default: () => null
}));

// Add any other problematic components here 