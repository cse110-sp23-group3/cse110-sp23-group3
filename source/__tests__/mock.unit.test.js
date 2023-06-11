/**
 * @jest-environment jsdom
 */

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

