import React, { useState, useEffect } from 'react';
import './War.css';

const War = () => {
  const [deckId, setDeckId] = useState(null);
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [dealerDeck, setdealerDeck] = useState([]);
  const [player1Card, setPlayer1Card] = useState(null);
  const [dealerCard, setdealerCard] = useState(null);
  const [isPlayer1CardDrawn, setIsPlayer1CardDrawn] = useState(false);
  const [isDealerCardDrawn, setIsDealerCardDrawn] = useState(false);
  const [winner, setWinner] = useState(null);
  const [player1CardAnimation, setPlayer1CardAnimation] = useState('');
  const [dealerCardAnimation, setdealerCardAnimation] = useState('');

  useEffect(() => {
    async function createDeck() {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data = await response.json();
      setDeckId(data.deck_id);
    }

    createDeck();
  }, []);

  useEffect(() => {
    compareCards();
  }, [player1Card, dealerCard]);

  const drawCards = async () => {
    setPlayer1CardAnimation('');
    setdealerCardAnimation('');
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
    const data = await response.json();

    setPlayer1CardAnimation('card-battle-animation-left');
    setdealerCardAnimation('card-battle-animation-right');

    if (!data.success) {
      if (player1Deck > dealerDeck){
        setWinner(`Out of Cards - Player 1 Wins!!!!`);
        setdealerCardAnimation('card-fall-animation-right');
        setPlayer1CardAnimation('player-wins-animation');
      } else if (player1Deck < dealerDeck) {
        setWinner(`Out of Cards - Dealer Wins!!!!`);
        setPlayer1CardAnimation('card-fall-animation-left');
        setdealerCardAnimation('player-wins-animation');
      } else {
        setWinner(`Out of Cards - War Never Changes!!!!`);
        setPlayer1CardAnimation('card-fall-animation-left');
        setdealerCardAnimation('card-fall-animation-right');
      }
    } else {
      setPlayer1Card(data.cards[0]);
      setdealerCard(data.cards[1]);
      setIsPlayer1CardDrawn(true);
      setIsDealerCardDrawn(true);
    }
  };

  const compareCards = () => {
    if (player1Card && dealerCard) {
      const player1Value = getValue(player1Card.value);
      const dealerValue = getValue(dealerCard.value);

      if (player1Value > dealerValue) {
        setWinner('Player 1 Wins');
        setdealerCardAnimation('card-fall-animation-right');
        setPlayer1Deck(prevDeck => [...prevDeck, player1Card, dealerCard]);
      } else if (dealerValue > player1Value) {
        setWinner('Player 2 Wins');
        setPlayer1CardAnimation('card-fall-animation-left');
        setdealerDeck(prevDeck => [...prevDeck, player1Card, dealerCard]);
      } else {
        setWinner('War!');
        setPlayer1Deck(prevDeck => [...prevDeck, player1Card]);
        setdealerDeck(prevDeck => [...prevDeck, dealerCard]);
      }
    }
  };

  const getValue = value => {
    switch (value) {
      case 'ACE':
        return 14;
      case 'KING':
        return 13;
      case 'QUEEN':
        return 12;
      case 'JACK':
        return 11;
      default:
        return parseInt(value);
    }
  };

  const restartGame = async () => {
    setWinner(null);
    setPlayer1Deck([]);
    setdealerDeck([]);
    setPlayer1Card(null);
    setdealerCard(null);
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    const data = await response.json();
    if (data.success) {
      drawCards();
    }
  };

  return (
    <div className="game-container">
      <h1>War Game</h1>
      <div className="player-container">
        <div className="player">
          <h3>Player 1</h3>
          {player1Card && (
            <img
              src={player1Card.image}
              alt={player1Card.code}
              className={`card-image ${isPlayer1CardDrawn ? player1CardAnimation : ''}`}
            />
          )}
          <h4 className="deck-size">Deck Size: {player1Deck.length}</h4>
        </div>
        <div className="player">
          <h3>Player 2</h3>
          {dealerCard && (
            <img
              src={dealerCard.image}
              alt={dealerCard.code}
              className={`card-image ${isDealerCardDrawn ? dealerCardAnimation : ''}`}
            />
          )}
          <h4 className="deck-size">Deck Size: {dealerDeck.length}</h4>
        </div>
      </div>
      <div className="buttons-container">
        {winner && (
          <div>
            <h2>{winner}</h2>
          </div>
        )}
        <div>
          <button onClick={drawCards}>Draw Cards</button>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      </div>
    </div>
  );

};

export default War;
