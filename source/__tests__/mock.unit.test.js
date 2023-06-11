/**
 * @jest-environment jsdom
 */

// only put unit tests here that require mock functions from main.js and/or historyHelpers.js
jest.mock('../assets/scripts/main.js');

describe('rebuildChat', () => {
  // unmock rebuildChat
  rebuildChat.mockRestore();

  beforeEach(() => {
    // values stored in tests will also be available in other tests unless you run
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("adds messages to chat when existing key passed in", () => {
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
            },
            {
              "image": "./assets/images/palm-diagram.jpeg"
            }
        ]
      }
    };

    localStorage.setItem('palmReadings', JSON.stringify(mockData));

    rebuildChat('1686445888833');

    expect(clearChat).toHaveBeenCalledTimes(1);
    expect(addMessageToChat).toHaveBeenCalledTimes(3);
    expect(addMessageToChat).toHaveBeenCalledWith("Hi, I'm Simba!", true);
    expect(addMessageToChat).toHaveBeenCalledWith("Which palm line?", true);
    expect(addImageToChat).toHaveBeenCalledWith("./assets/images/palm-diagram.jpeg", 270, 300);
  });
});

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
