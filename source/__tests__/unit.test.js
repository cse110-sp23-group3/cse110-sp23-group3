/**
 * @jest-environment jsdom
 */

import {
  saveToHistory,
  getHistory,
  deleteFromHistory,
} from '../assets/scripts/historyHelpers.js';

import {
  addMessageToChat,
  clearChat,
  checkIfEnded,
} from '../assets/scripts/main.js';

// jest.mock('../assets/scripts/historyHelpers.js');

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

describe('Delete From History', () => {
  beforeEach(() => {
    // values stored in tests will also be available in other tests unless you run
    localStorage.clear();
  });

  it('check to see if entry is deleted from local storage', () => {
    const mockData = {
      key1: 'Your future is bright!',
      key2: '12345',
      key3: 'deleteMe',
    };
    window.localStorage.setItem('palmReadings', JSON.stringify(mockData));

    deleteFromHistory('key3');

    const newMockData = JSON.parse(window.localStorage.getItem('palmReadings'));
    expect(newMockData).toEqual({
      key1: 'Your future is bright!',
      key2: '12345',
    });
  });

  it('check deleteFromHistory when palmReadings not in local storage', () => {
    deleteFromHistory('deleteMe');

    const newMockData = JSON.parse(window.localStorage.getItem('palmReadings'));
    expect(newMockData).toEqual({});
  });

  it('check deleteFromHistory when one chat session in local storage', () => {
    const mockData = { key1: 'Your future is bright!' };
    window.localStorage.setItem('palmReadings', JSON.stringify(mockData));

    deleteFromHistory('key1');

    const newMockData = JSON.parse(window.localStorage.getItem('palmReadings'));
    expect(newMockData).toEqual({});
  });

  it('check deleteFromHistory when key does not exist', () => {
    const mockData = { key1: 'Your future is bright!' };
    window.localStorage.setItem('palmReadings', JSON.stringify(mockData));

    deleteFromHistory('key3');

    const newMockData = JSON.parse(window.localStorage.getItem('palmReadings'));
    expect(newMockData).toEqual();
  });

  // check deleting key that doesn't exist when localStorage has stuff in it
});

describe('Check if Ended', () => {
  it('check to see that endedSession matches function return', () => {
    const endedSession = true;
    const checkIfEndedOutput = checkIfEnded();
    expect(endedSession).toEqual(checkIfEndedOutput);
  });

  it('check to see that endedSession matches function return', () => {
    expect(checkIfEnded()).toThrow(new ReferenceError());
  });
});

describe('readPalm testing', () => {
  // test('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('rebuildChat', () => {});

describe('clearChat', () => {
  // test('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('createActionsForHistoryButton', () => {
  // test('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('createHistoryButton', () => {
  // test('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('inactivateHistoryButton', () => {
  // test('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('waitUserInput', () => {
  // test('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('addButtons', () => {
  // test('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('addMessageToChat', () => {
  // test('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('loadProfiles testing', () => {
  // test('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('addProfilesToPage testing', () => {
  // test('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('addCardstoPage testing', () => {
  // test('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('toggleMenu testing', () => {
  // test('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('detectScheme testing', () => {
  // test('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('toggleScheme testing', () => {
  // test('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});
