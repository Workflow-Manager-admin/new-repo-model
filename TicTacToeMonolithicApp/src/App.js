import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * The main component for the Tic Tac Toe Game Application.
 * Manages overall game state, renders the board and controls, displays results, and ensures accessibility.
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  // Toggle light/dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  // Handle user click on a square
  const handleClick = (i) => {
    if (winner || squares[i] || draw) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  // PUBLIC_INTERFACE
  // Start new game (reset the board)
  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setDraw(false);
  };

  // Determine winner or draw after every move
  useEffect(() => {
    const result = calculateWinner(squares);
    setWinner(result);
    // If no winner and no empty squares left, it's a draw.
    if (!result && squares.every(Boolean)) {
      setDraw(true);
    } else {
      setDraw(false);
    }
  }, [squares]);

  // Return game status message
  const getStatusMessage = () => {
    if (winner) return `Winner: ${winner}`;
    if (draw) return "It's a Draw!";
    return `Player Turn: ${xIsNext ? 'X (Player 1)' : 'O (Player 2)'}`;
  };

  return (
    <div className="App">
      <header className="App-header" style={{ minHeight: '100vh' }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <h1 className="title" tabIndex={0}>Tic Tac Toe</h1>
        <div role="status" aria-live="polite" className="game-status">
          {getStatusMessage()}
        </div>
        <Board
          squares={squares}
          onClick={handleClick}
          winnerLine={winner ? getWinningLine(squares) : []}
          isDisabled={!!winner || draw}
        />
        <button
          onClick={restartGame}
          className="btn btn-large"
          aria-label="Restart Game"
          style={{ marginTop: 24 }}
        >
          Restart
        </button>
        <footer className="footer" style={{ marginTop: 40, fontSize: 14, color: 'var(--text-secondary)' }}>
          <div>
            <span>Made with <span aria-label="love">❤️</span> | Powered by React</span>
          </div>
        </footer>
      </header>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Board component renders the 3x3 grid of squares.
 */
function Board({ squares, onClick, winnerLine, isDisabled }) {
  return (
    <div
      className="board"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 0,
        maxWidth: 320,
        margin: '40px auto',
        border: '4px solid var(--border-color)',
        borderRadius: 16,
        boxShadow: '0 4px 20px rgba(40,44,52,0.06)',
        background: 'var(--bg-secondary)'
      }}
      role="grid"
      aria-label="Tic Tac Toe Game Board"
    >
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => onClick(i)}
          highlight={winnerLine && winnerLine.includes(i)}
          position={i}
          disabled={isDisabled || squares[i]}
        />
      ))}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Square component for each cell in the board.
 * Handles accessibility and highlighting on win.
 */
function Square({ value, onClick, highlight, position, disabled }) {
  // Coordinates for aria-label
  const coords = [
    ['Row 1, Column 1'], ['Row 1, Column 2'], ['Row 1, Column 3'],
    ['Row 2, Column 1'], ['Row 2, Column 2'], ['Row 2, Column 3'],
    ['Row 3, Column 1'], ['Row 3, Column 2'], ['Row 3, Column 3']
  ];
  return (
    <button
      className={`square${highlight ? ' highlight' : ''}`}
      onClick={onClick}
      aria-label={`${coords[position]}${value ? `, ${value}` : ', empty'}`}
      aria-disabled={disabled}
      disabled={disabled}
      tabIndex={0}
      style={{
        height: 96,
        width: 96,
        background: 'var(--bg-primary)',
        border: '2px solid var(--border-color)',
        fontSize: 40,
        fontWeight: 'bold',
        color: highlight ? '#e87a41' : 'var(--text-primary)',
        transition: 'background 0.2s, color 0.2s',
        outline: highlight ? '3px solid #e87a41' : 'none',
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      role="gridcell"
    >
      <span>{value}</span>
    </button>
  );
}

/**
 * PUBLIC_INTERFACE
 * Calculate the winner of Tic Tac Toe from current squares.
 */
function calculateWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6] // diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
 * Get the indices for the winning line, for highlighting.
 */
function getWinningLine(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6] // diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return line;
    }
  }
  return [];
}

export default App;
