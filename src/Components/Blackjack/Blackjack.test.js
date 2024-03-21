//Whoever invented TDD should go to jail
// True
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blackjack from './Blackjack'

describe('Blackjack Game Component', () => {
    test('Renders with the initial state', () => {
        render(<Blackjack />);
        expect(screen.getByText(/Welcome to XXX Casino Blackjack!/i)).toBeInTheDocument();
        expect(screen.getByText(/Balance:/i)).toBeInTheDocument();
        expect(screen.getByText(/bet/i)).toBeInTheDocument();
        expect(screen.getByText(/Deal/i)).toBeInTheDocument();
    });

    test('allow user to input a bet amount', () => {
        render(<Blackjack />);
        //
    })
})