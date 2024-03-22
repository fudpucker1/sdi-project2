//Whoever invented TDD should go to jail
// True
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blackjack from './Blackjack'

describe('Blackjack Game Component', () => {

    test('Renders with the initial state', () => {
        render(<Blackjack />);
        expect(screen.getByText(/Welcome to SDI Casino Blackjack!/i)).toBeInTheDocument();
        expect(screen.getByText(/Balance:/i)).toBeInTheDocument();
        expect(screen.getByText(/bet/i)).toBeInTheDocument();
        expect(screen.getByText(/Deal/i)).toBeInTheDocument();
    });

    test('Allow user to input a bet amount', () => {
        render(<Blackjack />);
        const betInput = screen.getByText(/Bet:/i);
        expect(betInput).toBeInTheDocument();

        fireEvent.change(betInput, {target: {value: '10'}});
        expect(betInput.value).toBe('10')
    });

    test('The game deals initial cards', () => {
        render(<Blackjack />);
        const dealButton = screen.getByText(/Deal/i);
        fireEvent.click(dealButton);

        expect(screen.getByText(/Dealer/i)).toBeInTheDocument();
        expect(screen.getByText(/Player/i)).toBeInTheDocument();
    });

    test('The player is able to use the hit and stand buttons', async () => {
        render(<Blackjack />);
        const hitButton = screen.getByText(/Hit/i);
        fireEvent.click(hitButton);
        expect(screen.getAllByAltText(/of/i)).toHaveLength(3);
        expect(screen.getByText(/Score:/i)).toBeInTheDocument();

        const standButton = screen.getByText(/Stand/i);
        fireEvent.click(standButton);
        expect(await screen.findByText(/Congrats/i)).toBeInTheDocument();

    });
})