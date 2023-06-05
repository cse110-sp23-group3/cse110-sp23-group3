// When DOM content has loaded, run the main function
window.addEventListener('DOMContentLoaded', main);

// document.addEventListener('visibilitychange', function logData() {
//   if (document.visibilityState === 'hidden') {
//     saveToHistory(chatArr, currentSession);
//   }
// });
let numberOfSessions = 1; // variable to keep track of the number of sessions
let sessions; // object to store the palm reading sessions as a sort of state variable that you keep track of until page exit, then you save it to local storage
let next = false; // variable to check if the user has clicked a button
const chatMessages = document.getElementById('chat-messages'); // container for the chat messages
const overallFortune = {
  'Heart Line': '',
  'Head Line': '',
  'Life Line': '',
  'Fate Line': '',
}; // variable for overall fortune
let currentSession; // variable to know, which chat we are viewing
let chatArr = []; // array to store the current set of chat messages
const basicChoices = new Set(['Yes', 'No']);
const palmLines = new Set([
  'Heart Line',
  'Head Line',
  'Life Line',
  'Fate Line',
]);
const wavyOrStraight = new Set(['wavy', 'straight']);
const shortOrLong = new Set(['long', 'short']);
// description of each palm line
const palmLineDesc = {
  'Heart Line':
    "runs horizontally across your palm and is the topmost line you'll see. It begins at the edge of your palm on the pinkie side, and runs to just underneath your index or middle finger.",
  'Head Line':
    'begins under your index finger along the edge of your palm and extends part-way across your palm in a graceful curve flowing in a slightly downward direction.',
  'Life Line':
    'begins between your thumb and index finger and travels down your palm through the middle.',
  'Fate Line':
    'is a vertical line running up the palm towards the base of the middle finger.',
};

const hardCodedFortune = new Map([]);

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
    addMessageToChat(`The ${chosenLine} ${palmLineDesc[chosenLine]}`, true);

    // Ask if it is straight or wavy
    addMessageToChat(
      `Do you have a wavy or straight ${chosenLine}? Select from the buttons below.`,
      true
    );
    addButtons(wavyOrStraight);
    await waitUserInput();
    const wavyOrStraightChoice = buttonChoice;

    // Ask if it is short or long
    addMessageToChat(
      `Do you have a short or long ${chosenLine}? Select from the buttons below.`,
      true
    );
    addButtons(shortOrLong);
    await waitUserInput();
    const longOrShortChoice = buttonChoice;

    // Show fortune for the chosen line
    const fortune = `Your ${chosenLine} is ${wavyOrStraightChoice} and ${longOrShortChoice}, so this means: ${null}.`;
    overallFortune.chosenLine = fortune;
    addMessageToChat(fortune, true);

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
            prompt: `Act as a fortune teller for palm reading. I describe my ${chosenLine} as ${wavyOrStraightChoice} and ${longOrShortChoice}, what does this mean? Limit your response to 2 sentences.`,
          }),
        }
      );

      // Fall back to hard-coded response if API fails
      if (botResponse.ok) {
        // Get the bot's response
        botResponse = await botResponse.json();

        // Add the bot's response to the chat
        overallFortune.chosenLine = botResponse.chatResponse;
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
  let overallFortuneString = '';
  for (const line in overallFortune) {
    if (line === '') {
      continue;
    }

    overallFortuneString += ` ${overallFortune[line]}`;
  }
  addMessageToChat(
    `${
      overallFortuneString === ''
        ? 'Sorry we were not able to determine your fortune. Try again by reloading!'
        : overallFortuneString
    }`,
    true
  );
}

/**
 * @description Handles the main chat flow for a simulated palm reading. The chatbot presents a series of choices to the user, gathers responses, and provides the palm reading result.
 * @returns {Promise} - A promise to indicate when the chat process has completed.
 */
async function main() {
  // Check if there are previous palm reading sessions in local storage and load them into the sidebar if there are
  sessions = JSON.parse(window.localStorage.getItem('palmReadings')) ?? {};

  // make buttons for each previous session
  for (const key in sessions) {
    createHistoryButton(key);
  }

  // give the new chat button its functionality
  const newChatButton = document.getElementById('new-chat');
  newChatButton.addEventListener('click', async function () {
    // Only save to localstorage if there is an existing session that is being looked at
    if (currentSession && !(currentSession in sessions)) {
      saveToHistory(chatArr, currentSession);
    }

    // Modify current session to be a right now
    currentSession = String(Date.now());

    // Clears the previous chat from the chat box
    clearChat();

    // Start a new chat with some introductory messages
    addMessageToChat("Hi, I'm Simba!", true);
    addMessageToChat(
      'DISCLAIMER: This app was written as part of a school assignment. The content of this app and the practice of palm reading are not endorsed or affirmed by the creators.',
      true
    );

    createHistoryButton(currentSession);

    await readPalm();
  });

  newChatButton.click();
}

// Set of palm lines and basic choices

/**
 * Add the chat array to the browser's local storage as a palm reading record in the palm reading object.
 *
 * @param {Array} chatArr - The current chat array to be saved or added.
 * @param {integer} key - The chat key that it will be saved at
 * @returns {void}
 */
function saveToHistory(chatArr, key) {
  try {
    sessions[key] = chatArr;
    window.localStorage.setItem('palmReadings', JSON.stringify(sessions));
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
  delete sessions[key];
}

/**
 * @description Creates the old chat by going through the array stored in localStorage
 * @param {integer} key - The chat key, which it is stored in the localStorage array
 * @returns {void}
 */
function rebuildChat(key) {
  clearChat();
  const chatHistory = sessions[key];

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
  chatLink.textContent = `Chat Session ${numberOfSessions++}`;
  chatLink.classList.add('text-md');

  // Make list item and append the a tag to it then append it to the history list
  const newItem = document.createElement('li');
  newItem.setAttribute('data-value', key);
  newItem.appendChild(chatLink);
  historyList.insertBefore(newItem, historyList.firstChild);

  // Event listeners remain the same...
  chatLink.addEventListener('click', async function () {
    // If the chat link is already active, do nothing
    if (chatLink.classList.contains('active')) {
      return;
    }

    // save it to local storage
    if (chatArr.length === 3) {
      delete sessions[currentSession];
      const childNodes = historyList.childNodes;
      childNodes.forEach(function (childNode) {
        if (childNode.dataset.value === currentSession) {
          childNode.remove();
          numberOfSessions--;
        }
      });
    }

    // Rebuild the chat from the session
    rebuildChat(key);

    // Set the current session to the clicked session and save the old one again
    currentSession = key;
    sessions[key] = chatArr;

    // Set the clicked session to active
    chatLink.classList.add('active');

    // Reset the other sessions to inactive
    const historyButtons = document.querySelectorAll('.text-md');
    historyButtons.forEach((button) => {
      if (button !== chatLink) {
        button.classList.remove('active');
      }
    });
  });

  return chatLink;
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
