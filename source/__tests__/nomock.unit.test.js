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
  addImageToChat,
  rebuildChat,
  timeout,
} from '../assets/scripts/main.js';

describe('Add Message To Chat', () => {
  // Here we are using Jest's mock functions to simulate the DOM functions
  // createElement and appendChild are replaced by Jest's mock functions that don't do anything
  // but they keep track of how many times they're called and with what arguments
  document.createElement = jest.fn();
  document.appendChild = jest.fn();
  //const mockElement = document.createElement('div');
  //const addSpy = jest.spyOn(mockElement.classList, 'add');
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should create and append a message element', () => {
    addMessageToChat('Test message', false);
    // we're asserting that createElement was called once to create a 'div'
    expect(document.createElement).toHaveBeenCalledTimes(1);
    expect(document.createElement).toHaveBeenCalledWith('div');
    // we're asserting that appendChild was called once (to append the message to the chat)
    expect(document.appendChild).toHaveBeenCalledTimes(1);
    //expect(addSpy).toHaveBeenCalledWith('chat-message');
  });
});

describe('Clear Chat', () => {
  document.getElementById = jest.fn(() => ({
    innerHTML: 'not empty',
  }));

  it('Should clear chat', () => {
    clearChat();
    expect(document.getElementById).toHaveBeenCalledWith('chat-messages');
    expect(document.getElementById().innerHTML).toBe('');
  });
});

// Mock console log
global.console = {
  log: jest.fn(),
};

describe('Save to History', () => {
  beforeEach(() => {
    // values stored in tests will also be available in other tests unless you run
    localStorage.clear();
  });

  it('saves generic chat to history when history empty', () => {
    const chatArrMock = ['message1', 'message2', 'message3', 'message4'];
    const currentSessionMock = '12345';
    const sessionNameMock = 'my first session';

    saveToHistory(chatArrMock, currentSessionMock, sessionNameMock);
    
    const palmReadings = JSON.parse(window.localStorage.getItem('palmReadings'));
    expect(palmReadings).toEqual({'12345': {displayName: 'my first session', chatArr: ['message1', 'message2', 'message3', 'message4']}});
  });

  it('does not save when chatArr == 3', () => {
    const chatArrMock = ['message1', 'message2', 'message3'];
    const currentSessionMock = '12345';
    const sessionNameMock = 'my first session';

    saveToHistory(chatArrMock, currentSessionMock, sessionNameMock);
    
    const palmReadings = JSON.parse(window.localStorage.getItem('palmReadings'));
    expect(palmReadings).toBeNull();
  });

  it('does not save when chatArr < 3', () => {
    const chatArrMock = ['message1'];
    const currentSessionMock = '12345';
    const sessionNameMock = 'my first session';

    saveToHistory(chatArrMock, currentSessionMock, sessionNameMock);
    
    const palmReadings = JSON.parse(window.localStorage.getItem('palmReadings'));
    expect(palmReadings).toBeNull();
  });

  it('should log error to console if JSON data is badly formatted', () => {
    window.localStorage.setItem('palmReadings', '{ asdfa![}}}');
    const chatArrMock = ['message1', 'message2', 'message3', 'message4'];
    const currentSessionMock = '12345';
    const sessionNameMock = 'my first session';

    saveToHistory(chatArrMock, currentSessionMock, sessionNameMock);

    expect(console.log).toHaveBeenCalled();
  });

  it('saves generic chat to history when history has stuff in it', () => {
    // pre-existing chats in history
    const mockData = {
      "1686445888833": {
          "displayName": "",
          "chatArr": [
              {
                  "message": "Hi, I'm Simba!",
                  "isIncoming": true
              },
              {
                  "message": "Which palm line?",
                  "isIncoming": true
              },
              {
                  "image": "./assets/images/palm-diagram.jpeg"
              }
          ]
      },
      "1686445888834": {
        "displayName": "",
        "chatArr": [
            {
                "message": "Hi, I'm Simba!",
                "isIncoming": true
            },
            {
                "message": "Which palm line?",
                "isIncoming": true
            },
            {
                "image": "./assets/images/palm-diagram.jpeg"
            }
        ]
      }
    };

    localStorage.setItem('palmReadings', JSON.stringify(mockData));

    // new chat to save
    const chatArrMock = [
      { "message": "Hi, I'm Scar!", "isIncoming": true },
      { "message": "Which palm line?", "isIncoming": true },
      { "image": "./assets/images/palm-diagram.jpeg" },
      { "image": "./assets/images/palm-diagram.jpeg" }
    ];
    const currentSessionMock = '12345';
    const sessionNameMock = 'my first session';

    saveToHistory(chatArrMock, currentSessionMock, sessionNameMock);

    const palmReadings = JSON.parse(window.localStorage.getItem('palmReadings'));
    expect(palmReadings).toEqual(
      {
        "1686445888833": {
            "displayName": "",
            "chatArr": [
                {
                    "message": "Hi, I'm Simba!",
                    "isIncoming": true
                },
                {
                    "message": "Which palm line?",
                    "isIncoming": true
                },
                {
                    "image": "./assets/images/palm-diagram.jpeg"
                }
            ]
        },
        "1686445888834": {
          "displayName": "",
          "chatArr": [
              {
                  "message": "Hi, I'm Simba!",
                  "isIncoming": true
              },
              {
                  "message": "Which palm line?",
                  "isIncoming": true
              },
              {
                  "image": "./assets/images/palm-diagram.jpeg"
              }
          ]
        },
        "12345": {
          "displayName": "my first session",
          "chatArr": [
            { "message": "Hi, I'm Scar!", "isIncoming": true },
            { "message": "Which palm line?", "isIncoming": true },
            { "image": "./assets/images/palm-diagram.jpeg" },
            { "image": "./assets/images/palm-diagram.jpeg" }
          ]
        }
      }
    );
  });
});

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
    const mockData = { 
      key1: 'Your future is bright!',
      key2: 'Your future is dark!'
    };
    window.localStorage.setItem('palmReadings', JSON.stringify(mockData));

    deleteFromHistory('key3');

    const newMockData = JSON.parse(window.localStorage.getItem('palmReadings'));
    expect(newMockData).toEqual({ 
      key1: 'Your future is bright!',
      key2: 'Your future is dark!'
    });
  });

  it('check deleteFromHistory when palmReadings exists but no chats saved', () => {
    const mockData = {};
    window.localStorage.setItem('palmReadings', JSON.stringify(mockData));

    deleteFromHistory('key1');

    const newMockData = JSON.parse(window.localStorage.getItem('palmReadings'));
    expect(newMockData).toEqual({});
  });

  it('should log error to console if JSON data is badly formatted', () => {
    window.localStorage.setItem('palmReadings', '{ asdfa![}}}');

    deleteFromHistory('key1');

    expect(console.log).toHaveBeenCalled();
  });
});

describe('Check if Ended', () => {
  it('check to see that endedSession matches function return', () => {
    global.endedSession = true;
    const checkIfEndedOutput = checkIfEnded();
    expect(checkIfEndedOutput).toBeTruthy();
  });

  it('check to see that endedSession matches function return', () => {
    expect(checkIfEnded()).toThrow(new ReferenceError());
  });
});


//possible E2E
describe('readPalm testing', () => {
  // it('Should call saveToHistory with correct parameters', () => {
  // });
});

//E2E
describe('createActionsForHistoryButton', () => {
  // it('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

//E2E
describe('createHistoryButton', () => {
  // it('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('inactivateHistoryButton', () => {
  // it('Should call saveToHistory with correct parameters', () => {
    
  // });
});

describe('timeout', () => {
  it('returns a resolved promise with expected value', async () => {
    const expected = 'Hello, world!';

    const start = Date.now();
    await timeout(1000);
    const end = Date.now();

    const diff = Math.round((end - start)/1000) * 1000;
    expect(diff).toEqual(1000);
  });
});


describe('waitUserInput', () => {
  // it('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('addButtons', () => {
  // it('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('addMessageToChat', () => {
  // it('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('loadProfiles testing', () => {
  // it('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('addProfilesToPage testing', () => {
  // it('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('addCardstoPage testing', () => {
  // it('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('toggleMenu testing', () => {
  // it('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('detectScheme testing', () => {
  // it('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});

describe('toggleScheme testing', () => {
  // it('Should call saveToHistory with correct parameters', () => {
  //   const chatArrMock = ['message1', 'message2'];
  //   const currentSessionMock = '12345';
  //   saveToHistory(chatArrMock, currentSessionMock);
  //   expect(saveToHistory).toHaveBeenCalledWith(chatArrMock, currentSessionMock);
  // });
});
