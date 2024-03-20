import React, { useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

    const { user, signOut } = useAuthenticator((context) => [context.user]);

    useEffect(() => {

    }, [user])

    const navigate = useNavigate();

    const handleWarClick = () => {
        navigate('/war')
        console.log('war was clicked');
    }

    const handleBlackjackClick = () => {
        navigate('/blackjack')
        console.log('blackjack was clicked');
    }

    const handleLoginClick = () => {
        navigate('/login')
        console.log('Log in was clicked')
    }

    return (
        <div className="home">
            <h2> Homepage</h2>
            { !user ? <h2></h2> : <h2>Welcome, {user.username}</h2>}
            <button onClick={handleWarClick}>War</button>
            <button onClick={handleBlackjackClick}>Blackjack</button>
            { !user ?
            <button onClick={handleLoginClick}>Log in</button>
            :
            <button onClick={signOut}>Log Out</button>
            }

        </div>
    );
}

export default Homepage;


/*

<div className="rules-pane">
    <div className="war-pane">
        <h2>How to Play War</h2.
        <p>War is a simple card game played by two player. Here's how it's played:</p>
        <ol>
            <li>Shuffle the deck and deal the entire deck evenly between the players.</li>
            <li>Each player reaveals the top card of their deck simultaneously.</li>
            <li>The player with the higher card takes both cards and adds them to the bottom of their deck.</li>
            <li>If the cards are of equal value, a "war" occurs. In a war, each player places three additional cards face down and then one card face up. The player with the higher card wins all the cards on the table.</li>
            <li>The game continues until one player has all the cards, or until a predetermined number of rounds.</li>
        </ol>
    </div>

    <div className="blackjack-pane">
        <h2>How to Blackjack</h2.
        <p>Blackjack, also known as 21, is a popular card game. Here's how it's played:</p>
        <ol>
            <li>The dealer deals two cards to each player, including themselves. All cards are dealt face up except one of the dealer's cards, which is dealt face down.</li>
            <li>Players try to get a hand total closer to 21 than the dealer's hand without going over.</li>
            <li>Cards are worth their face value, with face cards (Jack, Queen, King) worth 10 and Aces worth either 1 or 11, whichever is more advantageous.</li>
            <li>After receiving their initial two cars, players have the option to "hit" (receive another card) or "stand" (keep their current hand).</li>
            <li>If the player's hand exceeds 21, they bust and lose their hand.</li>
            <li>Once all players have completed their turns, the dealer reveals their face-down card and must hit until their hand total is 17 or higher.</li>
            <li>The dealer wins ties, except for player blackjacks, which the player wins.</li>
            <li>The game continues with players playing against the dealer until all players have busted, the dealer busts, or all players have chosen to stand.</li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ol>
    </div>
</div>
*/