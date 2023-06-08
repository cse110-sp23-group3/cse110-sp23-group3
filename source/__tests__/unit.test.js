import { saveToHistory, getHistory } from 'assets/scripts/historyHelpers.js';

import { addMessageToChat, clearChat } from 'assets/scripts/main.js';

jest.mock('assets/scripts/historyHelpers.js', () => ({
  saveToHistory: jest.fn(),
  getHistory: jest.fn(),
}));

describe('Add Message To Chat', () => {
  // Here we are using Jest's mock functions to simulate the DOM functions
  // createElement and appendChild are replaced by Jest's mock functions that don't do anything
  // but they keep track of how many times they're called and with what arguments
  document.createElement = jest.fn();
  document.appendChild = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should create and append a message element', () => {
    addMessageToChat('Test message', false);
    // we're asserting that createElement was called once to create a 'div'
    expect(document.createElement).toHaveBeenCalledTimes(1);
    expect(document.createElement).toHaveBeenCalledWith('div');
    // we're asserting that appendChild was called once (to append the message to the chat)
    expect(document.appendChild).toHaveBeenCalledTimes(1);
  });
});

describe('Clear Chat', () => {
  document.getElementById = jest.fn(() => ({
    innerHTML: 'not empty',
  }));

  test('Should clear chat', () => {
    clearChat();
    expect(document.getElementById).toHaveBeenCalledWith('chat-messages');
    expect(document.getElementById().innerHTML).toBe('');
  });
});

describe('Save to History', () => {
  test('Should call saveToHistory with correct parameters', () => {
    const chatArrMock = ['message1', 'message2'];
    const currentSessionMock = '12345';

    saveToHistory(chatArrMock, currentSessionMock);
    expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  });
});

// Mock console log
global.console = {
  log: jest.fn(),
};

describe('getHistory', () => {
  beforeEach(() => {
    // values stored in tests will also be available in other tests unless you run
    localStorage.clear();
  });

  it('should return an empty object if there is no data', () => {
    const history = getHistory();
    expect(history).toEqual({});
  });

  it('should return the stored data if it exists', () => {
    const mockData = { HeartLine: 'Your future is bright!' };
    localStorage.setItem('palmReadings', JSON.stringify(mockData));

    const history = getHistory();
    expect(history).toEqual(mockData);
  });

  it('should catch and log error if localStorage data is not valid JSON', () => {
    const invalidData = '{ HeartLine: Your future is bright!';
    localStorage.setItem('palmReadings', invalidData);

    const history = getHistory();
    expect(console.log).toHaveBeenCalled();
    expect(history).toBeUndefined();
  });
});
