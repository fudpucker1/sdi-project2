import React, { useState, useEffect } from 'react'


const Blackjack = () => {
    const [deckId, setDeckId] = useState(null);
    const [playerCards, setPlayerCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [message, setMessage] = useState('');
    const [playerBet, setPlayerBet] = useState(0)
    const [balance, setBalance] = useState(1000);

    useEffect(() => {
        const fetchNewDeck = async () => {
            const response = await fetch ('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6');
            const data = await response.json();
            setDeckId(data.deck_id)
        }
        fetchNewDeck();
    }, []);

    const fetchCards = async (numCards, sendCards) => {
        const response = await fetch (`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numCards}`);
        const data = await response.json();
        if (sendCards === 'player') {
            setPlayerCards([...playerCards, ...data.cards]);
        } else {
            setDealerCards([...dealerCards, ...data.cards]);
        }
    };

    const cardValue = (cards) => {
        let score = 0;
        let aceCount = 0;
        cards.forEach(card => {
            if (card.value === 'KING' || card.value === 'QUEEN' || card.value === 'JACK') {
                score += 10;
            } else if (card.value === 'ACE') {
                aceCount++;
                score += 11;
            } else {
                score += parseInt(card.value)
            }
        });
        while (score > 21 && aceCount > 0) {
            score -= 10;
            aceCount --;
        };
        return score;
    };

    const dealInitialCards = async () => {
        await fetchCards(2, 'player');
        await fetchCards(2, 'dealer');
    };

    const determineWinner = () => {
        const playerScore = cardValue(playerCards);
        const dealerScore = cardValue(dealerCards);
        if (playerScore > 21) {
            setMessage('Congrats you bust! Dealer wins');
            setBalance(balance - playerBet);
        } else if (dealerScore > 21 || playerScore > dealerScore) {
            setMessage('Congrats you win!')
            setBalance(balance + playerBet);
        } else if (playerScore === dealerScore) {
            setMessage('Congrats it\'s a tie!')
        } else {
            setMessage('Congrats Dealer wins!')
            setBalance(balance - playerBet);
        }
    };

    const gameHit = async () => {
        await fetchCards(1, 'player');
    };

    const gameStand = async () => {
        let dealerScore = cardValue(dealerCards);
        while (dealerScore < 17) {
            await fetchCards(1, 'dealer')
            dealerScore = cardValue([...dealerCards, dealerCards[dealerCards.length - 1]])
        }
        determineWinner();
    };

    const handleBetChange = (num) => {
        setPlayerBet(parseInt(num.target.value));
    };

    const handleDeal = async () => {
        if (balance < playerBet) {
            setMessage('You don\'t have enough in your balance to play this bet. I reccomend winning a game!');
            return;
        }
        setMessage('')
        setPlayerCards([]);
        setDealerCards([])
        await dealInitialCards();
        setPlayerScore(cardValue(playerCards));
        setDealerScore(cardValue(dealerCards));
    };

    return (
        <div>
            <h1>Welcome to XXX Casino Blackjack!</h1>
            <div>{`Balance: ${balance}`}</div>
            <div>Bet:
                <input type='number' value={playerBet} onChange={handleBetChange} />
                <button onClick={handleDeal} disabled={balance < playerBet}>Deal</button>
            </div>
            <div>
                <h2>Dealer</h2>
                {dealerCards.map((card, index) => (
                    <img key={index} src={card.image} alt={`${card.value} of ${card.suit}`} />
                ))}
                <div>{`Score: ${dealerScore}`}</div>
            </div>
            <div>
                <h2>Player</h2>
                {playerCards.map((card, index) => (
                    <img key={index} src={card.image} alt={`${card.value} of ${card.suit}`} />
                ))}
                <div>{`Score: ${playerScore}`}</div>
                <div>
                    <button onClick={gameHit}>Hit</button>
                    <button onClick={gameStand}>Stand</button>
                </div>
            </div>
            <div>{message}</div>
            <div>
                <button onClick={replayGame}>Replay</button>
            </div>
        </div>
    );
};

export default Blackjack
