import React from 'react';
import { render, waitFor, screen} from '@testing-library/react';
import War from './War.js';

describe('War component', () => {
  test('renders without crashing', () => {
    render(<War />);
  });

          /*

  test('displays "Player 1" and "Dealer" headers', () => {
    render (<War />);
    expect(screen.getByText("Player 1")).toBeInTheDocument();
    expect(screen.getByText("Dealer")).toBeInTheDocument();
  });

  test('displays "Draw Cards" button', () => {
    render (<War />);
    expect(screen.getByText("Draw Cards")).toBeInTheDocument();
  });

  test('does not initially displays any winner message', () => {
    render (<War />);
    expect(screen.querytByText("Round")).not.toBeInTheDocument();
  });



  test('restart game when "Restart Game" button is clicked', async () => {
    const { getByText, queryByText } = render (<War />);
    userEvent.click(getByText('Draw Cards'));
    await waitFor(() => getByText('Round'));
    userEvent.click(getByText('Restart Game'));
    expect(getByText("Round")).not.toBeInTheDocument();
  } )

*/

});

