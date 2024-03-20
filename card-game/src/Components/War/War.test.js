import React from 'react';
import { render, waitFor } from '@testing-library/react'
import War from './War.js';

describe('War component', () => {
  test('renders without crashing', () => {
    const { container } = render(<War />);
    expect(container).toBeTruthy();
  });


  test('displays draw cards and restart game button', () => {
    const { getByText } = render(<War />);
    expect(getByText('Draw Cards')).toBeTruthy();
    expect(getByText('Restart Game')).toBeTruthy();
  });

});

