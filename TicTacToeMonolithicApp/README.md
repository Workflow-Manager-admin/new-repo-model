# Tic Tac Toe React App

A responsive, accessible 2-player Tic Tac Toe game built with React. All logic and state run fully in the browser.

## Features

- Local 2-player (X/O) mode: play on one device
- Visually clear, accessible board and controls
- Win and draw states with highlighting and messages
- "Restart" for quick replay
- Theme switcher: Light/Dark support
- Responsive/mobile UI
- Keyboard/tab/ARIA accessible
- Modern, light color scheme
- Cypress e2e tests, CI support (`npm run e2e-test`)

## Usage

- Click/tap on empty squares to play ("X" always goes first)
- If a player wins, their winning row, column, or diagonal is highlighted
- If all squares are filled and no winner: "It's a Draw"
- Click "Restart" for a new game
- Use the theme toggle for light/dark mode

## Development

- `npm start` — run locally
- `npm test` — run React tests
- `npm run e2e-test` — run Cypress headless e2e tests

## Folder structure

- `/src` — main React source code and styles
- `/cypress` — Cypress e2e tests

## Accessibility

- All game cells can be reached by keyboard (tab/focus/focus-visible)
- ARIA labels for board, cells, status
- Color contrasts meet accessibility standards

## License

MIT
