import React, { useState, useEffect } from 'react';
import './War.css';

const War = () => {
  const [deckId, setDeckId] = useState(null);
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [dealerDeck, setDealerDeck] = useState([]);
  const [player1Card, setPlayer1Card] = useState(null);
  const [dealerCard, setDealerCard] = useState(null);
  const [isPlayer1CardDrawn, setIsPlayer1CardDrawn] = useState(false);
  const [isDealerCardDrawn, setIsDealerCardDrawn] = useState(false);
  const [winner, setWinner] = useState(null);
  const [player1CardAnimation, setPlayer1CardAnimation] = useState('');
  const [dealerCardAnimation, setDealerCardAnimation] = useState('');

  useEffect(() => {
    async function createDeck() {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data = await response.json();
      setDeckId(data.deck_id);
    }

    createDeck();
  }, []);

  useEffect(() => {
    if (player1Deck.length === 0 && dealerDeck.length === 0) {
      initializeDecks();
    } else {
      drawCards();
    }
  }, [deckId]);

  useEffect(() => {
    compareCards();
  }, [player1Card, dealerCard]);

  const initializeDecks = async () => {
    if (!deckId) return;
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`);
    const data = await response.json();

    const shuffleCards = data.cards;
    const halfLength = shuffleCards.length / 2;
    const player1Half = shuffleCards.slice(0, halfLength);
    const dealerHalf = shuffleCards.slice(halfLength);

    setPlayer1Deck(player1Half);
    setDealerDeck(dealerHalf);
  }

  const drawCards = async () => {
    setPlayer1CardAnimation('');
    setDealerCardAnimation('');

    if (player1Deck.length === 0 || dealerDeck.length === 0){
      determineWinner();
      return;
    }

    const player1NewCard = player1Deck.shift();
    const dealerNewCard = dealerDeck.shift();

    setPlayer1Card(player1NewCard);
    setDealerCard(dealerNewCard);
    setPlayer1CardAnimation('card-battle-animation-left');
    setDealerCardAnimation('card-battle-animation-right');
    setIsPlayer1CardDrawn(true);
    setIsDealerCardDrawn(true);
  };

  const compareCards = (warDeck = []) => {
    if (player1Card && dealerCard) {
      const player1Value = getValue(player1Card.value);
      const dealerValue = getValue(dealerCard.value);

      if (player1Value > dealerValue) {
        setWinner('Player 1 Wins');
        setDealerCardAnimation('card-fall-animation-right');
        setPlayer1Deck(prevDeck => [...prevDeck, ...warDeck, player1Card, dealerCard]);
      } else if (dealerValue > player1Value) {
        setWinner('Player 2 Wins');
        setPlayer1CardAnimation('card-fall-animation-left');
        setDealerDeck(prevDeck => [...prevDeck, ...warDeck, player1Card, dealerCard]);
      } else {
        setWinner('War!');
        handleWar();
      }
    }
  };

  const handleWar = () => {
    const player1WarCards = player1Deck.splice(0, 4);
    const dealerWarCards = dealerDeck.splice(0, 4);

    const player1FaceUpCard = player1WarCards.pop();
    const dealerFaceUpCard = dealerWarCards.pop();

    setPlayer1Card(player1FaceUpCard);
    setDealerCard(dealerFaceUpCard);

    const warDeck = [...player1WarCards, ...dealerWarCards];

    setIsPlayer1CardDrawn(true);
    setIsDealerCardDrawn(true);

    setTimeout(() => {
      compareCards(warDeck);
    }, 1000)
  };

  const determineWinner = () => {
    if (dealerDeck.length === 0) {
      setWinner('Player 1 Wins!!!');
      setDealerCardAnimation('card-fall-animation-right');
      setPlayer1CardAnimation('player-wins-animation');
    } else {
      setWinner('Dealer Wins!!!');
      setPlayer1CardAnimation('card-fall-animation-left');
      setDealerCardAnimation('player-wins-animation');
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
    setDealerDeck([]);
    setPlayer1Card(null);
    setDealerCard(null);
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    const data = await response.json();
    if (data.success) {
      setDeckId(data.deck_id);
      initializeDecks();
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