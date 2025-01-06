import { useState } from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import ReactConfetti from 'react-confetti';

function App() {
  const generateDiceArray = () => {
    const dieArray = [];
    for (let i = 0; i < 10; i++) {
      dieArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return dieArray;
  };

  const [dice, setDice] = useState(generateDiceArray());

  const gameWon = dice.every(
    (die) =>
      die.isHeld && die.isHeld === dice[0].isHeld && die.value === dice[0].value
  );

  const handleRoll = () => {
    gameWon
      ? setDice(generateDiceArray())
      : setDice(() => {
          return dice.map((die) => {
            return die.isHeld
              ? die
              : { ...die, value: Math.ceil(Math.random() * 6) };
          });
        });
  };

  const handleDieClick = (id) => {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die;
      });
    });
  };

  return (
    <main className="container">
      {gameWon && <ReactConfetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls
      </p>
      <div className="dies-container">
        {dice.map((die) => (
          <button
            key={die.id}
            className="die-button"
            onClick={() => handleDieClick(die.id)}
            style={{ backgroundColor: die.isHeld && 'green' }}
          >
            {die.value}
          </button>
        ))}
      </div>
      <button className="roll" onClick={handleRoll}>
        {gameWon ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}

export default App;
