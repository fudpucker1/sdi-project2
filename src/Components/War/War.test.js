import React from 'react';
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import War from './War.js';

jest.mock('node-fetch', () => jest.fn());

describe('War component', () => {
  test('renders without crashing', () => {
    const { container } = render(<War />);
    expect(container).toBeTruthy();
  });

  test('displays "Player 1" and "Dealer" headers', () => {
    const { getByText } = render (<War />);
    expect(getByText("Player 1")).toBeInTheDocument();
    expect(getByText("Dealer")).toBeInTheDocument();
  });

  test('displays "Draw Cards" button', () => {
    const { getByText } = render (<War />);
    expect(getByText("Draw Cards")).toBeInTheDocument();
  });

  test('does not initially displays any winner message', () => {
    const { getByText } = render (<War />);
    expect(getByText("Round")).not.toBeInTheDocument();
  });

        /*

  test('restart game when "Restart Game" button is clicked', async () => {
    const { getByText, queryByText } = render (<War />);
    userEvent.click(getByText('Draw Cards'));
    await waitFor(() => getByText('Round'));
    userEvent.click(getByText('Restart Game'));
    expect(getByText("Round")).not.toBeInTheDocument();
  } )

*/

});

