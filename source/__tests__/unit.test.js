/**
 * @jest-environment jsdom
 */

const functions = require('../assets/scripts/historyHelpers');

test('Save To History', () => {
  functions.saveToHistory([1, 2, 3, 4], 1234);
  const palmReadings = JSON.parse(window.localStorage.getItem('palmReadings'));
  expect(palmReadings[1234]).toEqual([1, 2, 3, 4]);
});
