import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
background-color: #40a913;
padding: 20px;
border-radius: 10px;
box-shadow 0 0 10px rgba(0, 0, 0, 0.5)
color: white;
display: flex;
flex-direction: column;
align-items: center;
`
const HeaderContainer = styled.div `
margin-bottom: 20px;
`

const DealerContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 20px
text-align: center;
`

const PlayerContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: auto;
margin-bottom: 20px
text-align: center;
`

const Card = styled.img`
width: 100px;
margin: 0 5px;
`

const Blackjack = () => {
    const [deckId, setDeckId] = useState(null);
    const [playerCards, setPlayerCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [message, setMessage] = useState('');
    const [playerBet, setPlayerBet] = useState(0)
    const [balance, setBalance] = useState(1000);
    const [gameStarted, setGameStarted] = useState(false)
    const [gameOver, setGameOver] = useState(false)


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
            setGameOver(true);
        } else if (dealerScore > 21 || playerScore > dealerScore) {
            setMessage('Congrats you win!')
            setBalance(balance + playerBet);
            setGameOver(true);
        } else if (playerScore === dealerScore) {
            setMessage('Congrats it\'s a tie!')
            setGameOver(true);
        } else {
            setMessage('Congrats Dealer wins!')
            setBalance(balance - playerBet);
            setGameOver(true);
        }
        setGameOver(true);
    };

    const gameHit = async () => {
        const newPlayerCards = [...playerCards]
        await fetchCards(1, 'player');
        const playerScore = cardValue([...newPlayerCards, ...playerCards])
        if (playerScore > 21) {
            setMessage('Congrats you bust! Dealer wins');
            setBalance(balance - playerBet);
            setGameOver(true);
        }
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
        if (gameOver || balance < playerBet) {
            alert('You don\'t have enough in your balance to play this bet. I reccomend winning a game!');
            return;
        }
        if (playerBet === 0) {
            alert('Please place a bet in order for the house to deal!')
            return;
        }
        setMessage('')
        setPlayerCards([]);
        setDealerCards([])
        await dealInitialCards();
        setPlayerScore(cardValue(playerCards));
        setDealerScore(cardValue(dealerCards));
        setGameStarted(true);
        setGameOver(false);
    };

    const replayGame = () => {
        setPlayerCards([]);
        setDealerCards([]);
        setPlayerScore(0);
        setDealerScore(0);
        setMessage("");
        setPlayerBet(0);
        setGameStarted(false);
        setGameOver(false);
    };



    return (
        <Container>
            <HeaderContainer>
                <h1>Welcome to SDI Casino Blackjack!</h1>
                <div>{`Balance: ${balance}`}</div>
                <div>Bet:
                    <input type='number' value={playerBet} onChange={handleBetChange} />
                    <button onClick={handleDeal} disabled={gameOver || balance < playerBet}>Deal</button>
                </div>
            </HeaderContainer>
            <DealerContainer>
                <div>
                    <h2>Dealer</h2>
                    {/* Dealer's cards */}
                    <DealerContainer>
                        {dealerCards.map((card, index) => (
                        <Card key={index} src={card.image} alt={`${card.value} of ${card.suit}`} />
                        ))}
                    </DealerContainer>
                    <div>{`Score: ${dealerScore}`}</div>
                </div>
            </DealerContainer>
            <PlayerContainer>
                <div style={{ textAlign: 'center' }}>
                    <h2>Player</h2>
                    {/* Player's cards */}
                    <PlayerContainer>
                        {playerCards.map((card, index) => (
                        <Card key={index} src={card.image} alt={`${card.value} of ${card.suit}`} />
                        ))}
                    </PlayerContainer>
                    <div style={{ textAlign: 'center' }}>{`Score: ${playerScore}`}</div>
                    <div>
                        <button onClick={gameHit} disabled={!gameStarted || gameOver}>Hit</button>
                        <button onClick={gameStand} disabled={!gameStarted || gameOver}>Stand</button>
                    </div>
                </div>
            </PlayerContainer>
            <div>{message}</div>
            {gameOver && (
            <div>
                <button onClick={replayGame} disabled={!gameOver}>Replay</button>
            </div>
            )}
        </Container>
    );
};

export default Blackjack