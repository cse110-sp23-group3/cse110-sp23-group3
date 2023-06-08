const functions = require('../assets/scripts/chat.js');

test('Save Array To History', () => {
  functions.saveToHistory([]);
  const palmReadings = JSON.parse(window.localStorage.getItem('palmReadings'));
  expect(palmReadings.values().includes([])).toBeTruthy();
});
