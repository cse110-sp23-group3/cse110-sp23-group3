import {
  fortuneDescMap,
  lineChoicesMap,
  palmLines,
  palmLineDesc,
  basicChoices,
} from './constants.js';

// When DOM content has loaded, run the main function
window.addEventListener('DOMContentLoaded', main);

// Ensures that the last chat before leaving the page gets saved
window.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') {
    saveToHistory();
  }
});

let next = false; // variable to check if the user has clicked a button
const chatMessages = document.getElementById('chat-messages'); // container for the chat messages

let currentSession; // variable to know which chat we are viewing
let chatArr = []; // array to store the current set of chat messages

// variable for overall fortune
const overallFortune = {
  'Heart Line': '',
  'Head Line': '',
  'Life Line': '',
  'Fate Line': '',
};

let buttonChoice; // variable for the button choice

async function readPalm() {
  // Make temp var to store the default palm lines before reading
  const currentPalmLines = new Set(palmLines);
  while (true) {
    addMessageToChat(
      'Which palm line would you like me to read? Select from the buttons below.',
      true
    );
    addButtons(currentPalmLines);
    await waitUserInput();

    // First describe the location of the chosen line
    const chosenLine = buttonChoice;
    const chosenLineChoicesMap = lineChoicesMap.get(chosenLine);
    const chosenLineFortuneMap = fortuneDescMap.get(chosenLine);
    addMessageToChat(`The ${chosenLine} ${palmLineDesc[chosenLine]}`, true);

    // Ask about the shape of the palm
    addMessageToChat(
      `What is the shape of your ${chosenLine}? Select from the buttons below.`,
      true
    );
    addButtons(chosenLineChoicesMap.get('shapeChoices'));
    await waitUserInput();
    const shapeChoice = buttonChoice;

    // Ask about the position of the palm
    addMessageToChat(
      `Where is the position of your ${chosenLine} and its connections with other parts of the palm? Select from the buttons below.`,
      true
    );
    addButtons(chosenLineChoicesMap.get('positionChoices'));
    await waitUserInput();
    const positionChoice = buttonChoice;

    // Ask about the abnormal patterns of the palm
    addMessageToChat(
      `Are there any abnormal patterns on of your ${chosenLine}? Select from the buttons below.`,
      true
    );
    addButtons(chosenLineChoicesMap.get('abnormalChoices'));
    await waitUserInput();
    const abnormalChoice = buttonChoice;

    // Show fortune for the chosen line
    const fortune = `Your ${chosenLine} ${positionChoice}, is ${shapeChoice}, and has ${abnormalChoice}. Your characteristics are:
                    ${chosenLineFortuneMap.get(
                      positionChoice
                    )}, ${chosenLineFortuneMap.get(
      shapeChoice
    )}, ${chosenLineFortuneMap.get(abnormalChoice)}.`;

    // Update the overall fortune
    overallFortune[chosenLine] = fortune;

    addMessageToChat(fortune, true);

    // ask if the user wants to have a more detailed reading
    addMessageToChat(
      `Would you like a more detailed reading for your ${chosenLine}?`,
      true
    );
    addButtons(basicChoices);
    await waitUserInput();

    // If the user does not want a more detailed reading, continue to the next line
    if (buttonChoice === 'Yes') {
      // Query AI API for chat response.
      let botResponse = await fetch(
        'https://cse110-team3.up.railway.app/api/ask-chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: `Act as a fortune teller for palm reading. I describe my ${chosenLine}as: ${positionChoice}, ${shapeChoice}, and ${abnormalChoice}. What does this indicates? Limit your response to 4 sentences.`,
          }),
        }
      );

      // Fall back to hard-coded response if API fails
      if (botResponse.ok) {
        // Get the bot's response
        botResponse = await botResponse.json();

        // Overwrite the previous simple palm reading response on the overall fortune
        overallFortune[chosenLine] = botResponse.chatResponse;

        // Add the bot's response to the chat
        addMessageToChat(botResponse.chatResponse, true);
      } else {
        addMessageToChat(
          'Sorry, the greater animal gods were not available, come back next time for more detailed readings!',
          true
        );
      }
    }

    currentPalmLines.delete(chosenLine);

    // If now there are no other lines to read, break
    if (currentPalmLines.size === 0) {
      break;
    }

    // Ask the user if they would like to continue with the palm reading
    addMessageToChat('Would you like me to continue reading your palm?', true);
    addButtons(basicChoices);
    await waitUserInput();
    const continueReading = buttonChoice;
    if (continueReading === 'No') {
      break;
    }
  }

  addMessageToChat(
    'That concludes your palm reading! As a recap, your overall fortune is below.',
    true
  );

  for (const line in overallFortune) {
    addMessageToChat(
      `${
        overallFortune[line] === ''
          ? `${line}: No fortune is read on this palm line. Create a new chat to read it if you want!`
          : `${line}: ${overallFortune[line]}`
      }`,
      true
    );
  }
}

/**
 * @description Handles the main chat flow for a simulated palm reading. The chatbot presents a series of choices to the user, gathers responses, and provides the palm reading result.
 * @returns {Promise} - A promise to indicate when the chat process has completed.
 */
async function main() {
  // Check if there are previous palm reading sessions in local storage and load them into the sidebar if there are
  const sessions =
    JSON.parse(window.localStorage.getItem('palmReadings')) ?? {};

  // make buttons for each previous session
  for (const key in sessions) {
    createHistoryButton(key);
  }

  // give the new chat button its functionality
  const newChatButton = document.getElementById('new-chat');
  newChatButton.addEventListener('click', async function () {
    if (chatArr.length === 3) {
      return;
    }

    // Only save to localstorage if there is an existing session that is being looked at
    if (currentSession) {
      saveToHistory();
    }

    // Modify current session to be right now
    currentSession = String(Date.now());

    // Clears the previous chat from the chat box
    clearChat();

    // Start a new chat with some introductory messages
    addMessageToChat("Hi, I'm Simba!", true);
    addMessageToChat(
      'DISCLAIMER: This app was written as part of a school assignment. The content of this app and the practice of palm reading are not endorsed or affirmed by the creators.',
      true
    );

    const newChat = createHistoryButton(currentSession);

    // Inactivate all buttons
    inactivateHistoryButtons();

    // set the new chat to active
    newChat.classList.add('active');

    await readPalm();
  });

  newChatButton.click();
}

/**
 * Add the chat array to the browser's local storage as a palm reading record in the palm reading object.
 *
 * @param {Array} chatArr - The current chat array to be saved or added.
 * @param {integer} key - The chat key that it will be saved at
 * @returns {void}
 */
function saveToHistory() {
  try {
    // Don't save if it is the default chat
    if (chatArr.length <= 3) {
      return;
    }

    const palmReadings =
      JSON.parse(window.localStorage.getItem('palmReadings')) ?? {};
    palmReadings[currentSession] = chatArr;
    window.localStorage.setItem('palmReadings', JSON.stringify(palmReadings));
  } catch (error) {
    console.log(error);
  }
}

/**
 * Deletes a session from the history.
 *
 * @param {string} key - The key of the session to delete.
 * @returns {void}
 */
function deleteFromHistory(key) {
  try {
    const palmReadings =
      JSON.parse(window.localStorage.getItem('palmReadings')) ?? {};
    delete palmReadings[key];
    window.localStorage.setItem('palmReadings', JSON.stringify(palmReadings));
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description Creates the old chat by going through the array stored in localStorage
 * @param {integer} key - The chat key, which it is stored in the localStorage array
 * @returns {void}
 */
function rebuildChat(key) {
  clearChat();
  const palmReadings = JSON.parse(window.localStorage.getItem('palmReadings'));
  const chatHistory = palmReadings[key];

  const length = chatHistory.length;
  for (let i = 0; i < length; i++) {
    addMessageToChat(chatHistory[i].message, chatHistory[i].isIncoming);
  }
}

/**
 * @description Clears the whole chat
 * @param {}
 * @returns {void}
 */
function clearChat() {
  const container = document.getElementById('chat-messages');
  container.innerHTML = '';

  // reset state variable
  chatArr = [];
}

/**
 * @description this will create the history button with the specified key attatched to it, if no key attached it will create a new one based on the time
 * @param {integer} key - chat key that would be correlating to localStorage key, and if none is available make a new one
 * @returns {void}
 */
function createHistoryButton(key) {
  // Process of creating a new button for a chat session
  const historyList = document.getElementById('history');

  // create a new a tag for a session
  const chatLink = document.createElement('a');

  // Make the current date in the user's local timezone the text content
  const date = new Date(Number(key));
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };
  const shortenedDateString = date.toLocaleDateString(undefined, options);

  chatLink.textContent = shortenedDateString;
  chatLink.classList.add('text-md');

  // Make list item and append the a tag to it then append it to the history list
  const newItem = document.createElement('li');
  newItem.setAttribute('data-value', key);
  newItem.appendChild(chatLink);
  historyList.insertBefore(newItem, historyList.firstChild);

  // Event listener for the chat link
  chatLink.addEventListener('click', async function () {
    // If the chat link is already active, do nothing
    if (chatLink.classList.contains('active')) {
      return;
    }

    // if current chat is the default chat with only intro messages, then we don't need to save it
    if (chatArr.length <= 3) {
      const childNodes = historyList.childNodes;
      childNodes.forEach(function (childNode) {
        if (childNode.dataset.value === currentSession) {
          childNode.remove();
        }
      });
    } else {
      // save otherwise because it actually contains content
      saveToHistory();
    }

    // Set the current session to the clicked session
    currentSession = key;

    clearChat();

    // Rebuild the chat from the session
    rebuildChat(currentSession);

    // Inactivate all buttons
    inactivateHistoryButtons();

    // Set the clicked session to active
    chatLink.classList.add('active');
  });

  return chatLink;
}

/**
 * @description Inactivates all history buttons in the DOM by removing the 'active' class. History buttons are identified by the class 'text-md'.
 * @returns {void}
 */
function inactivateHistoryButtons() {
  // Reset all buttons to inactive
  const historyButtons = document.querySelectorAll('.text-md');
  historyButtons.forEach((button) => {
    button.classList.remove('active');
  });
}

/**
 * @description Returns a promise that resolves after a specified amount of time.
 * @param {number} ms - The number of milliseconds to wait before the promise should resolve.
 * @returns {Promise} - A promise that resolves after the specified amount of time.
 */
async function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @description Pauses script execution until the 'next' variable is set to true. Resets 'next' to false after resuming.
 * @returns {Promise} - A promise that resolves when 'next' is true.
 */
async function waitUserInput() {
  // eslint-disable-next-line no-unmodified-loop-condition
  while (next === false) await timeout(50); // pauses script
  next = false; // reset var for next wait
}

/**
 * @description Creates chat message buttons from the provided message array. The buttons are added to the chat interface, and an event listener is set up to handle button clicks.
 * @param {Array} message - An array of message options for the buttons.
 * @param {boolean} isIncoming - Optional boolean that specifies whether the message is incoming (default) or outgoing.
 */
function addButtons(message, isIncoming = true) {
  // Create a new chat message element
  const messageElement = document.createElement('div');
  messageElement.classList.add(
    'choices',
    isIncoming ? 'incoming-message' : 'outgoing-message'
  );

  const messageBubble = document.createElement('div');
  messageBubble.classList.add('message-button', 'btn-group');

  // Making a button for each option
  for (const choice of message) {
    const messageText = document.createElement('button');
    messageText.classList.add('choices-text', 'btn', 'outline');
    messageText.textContent = choice;

    // Append the message text to the chat message bubble
    messageBubble.appendChild(messageText);

    // Append the chat message bubble to the chat messages container
    messageElement.appendChild(messageBubble);
    chatMessages.appendChild(messageElement);
  }

  // Scroll to the latest message
  chatMessages.scrollTop = chatMessages.scrollHeight;

  const choicesButton = document.querySelectorAll('.choices-text');

  // on click it will print the option chosen and disable all buttons
  choicesButton.forEach((button) => {
    button.addEventListener('click', function () {
      buttonChoice = button.textContent;
      addMessageToChat(buttonChoice, false);
      for (const choiceButton of choicesButton) {
        choiceButton.disabled = true;
      }
      next = true;
    });
  });
}

/**
 * Function to add a message to the chat
 * @param {string} message - The message to add to the chat
 */
function addMessageToChat(message, isIncoming = false) {
  // first add message to currentChatArr
  chatArr.push({ message, isIncoming });

  // Create a new chat message element
  const messageElement = document.createElement('div');
  messageElement.classList.add(
    'chat-message',
    isIncoming ? 'incoming-message' : 'outgoing-message'
  );

  const messageBubble = document.createElement('div');
  messageBubble.classList.add('message-bubble');

  const messageText = document.createElement('p');
  messageText.classList.add('message-text', 'text-md');
  messageText.textContent = message;

  // Append the message text to the chat message bubble
  messageBubble.appendChild(messageText);

  // If message is incoming, also append an image
  if (isIncoming) {
    // Create a new chat message element
    const messageImage = document.createElement('img');
    messageImage.src = 'assets/images/simba.png';
    messageImage.style.width = '3rem';
    messageImage.style.height = '3rem';

    // Do not display the image
    // if the last message was also incoming
    if (chatArr[chatArr.length - 2]?.isIncoming) {
      messageImage.style.visibility = 'hidden';
    }

    messageImage.alt = 'Simba';
    messageImage.classList.add('message-image');
    messageElement.appendChild(messageImage);
  }

  // Append the chat message bubble to the chat messages container
  messageElement.appendChild(messageBubble);
  chatMessages.appendChild(messageElement);

  // Scroll to the latest message
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
