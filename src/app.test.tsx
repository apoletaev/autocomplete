import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app';

test('renders ', () => {
  render(<App />);
  const linkElement = screen.getByTestId('input');
  expect(linkElement).toBeInTheDocument();
});
