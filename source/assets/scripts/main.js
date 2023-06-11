import {
  fortuneDescMap,
  lineChoicesMap,
  palmLines,
  palmLineDesc,
  basicChoices,
} from './constants.js';

import { saveToHistory, deleteFromHistory } from './historyHelpers.js';

// When DOM content has loaded, run the main function
window.addEventListener('DOMContentLoaded', main);

// Ensures that the last chat before leaving the page gets saved
window.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') {
    saveToHistory(chatArr, currentSession, currentChatName);
  }
});

let next = false; // variable to check if the user has clicked a button
let endedSession = false; // variable to check if the session has ended
const chatMessages = document.getElementById('chat-messages'); // container for the chat messages
const chatMessagesContainer = document.querySelector('.chat-messages'); // container for the chat messages
let currentSession; // variable to know which chat we are viewing
let currentChatName; // variable to know which chat we are viewing
let chatArr = []; // array to store the current set of chat messages
let buttonChoice; // variable for the button choice

// variable for overall fortune
let overallFortune = {
  'Heart Line': '',
  'Head Line': '',
  'Life Line': '',
  'Fate Line': '',
};

/**
 * Checks if the session has ended.
 *
 * @returns {boolean} Returns the value of the 'endedSession' variable.
 */
export function checkIfEnded() {
  return endedSession;
}

async function readPalm() {
  const currentPalmLines = new Set(palmLines);
  while (true) {
    if (checkIfEnded()) return;

    addMessageToChat(
      'Which palm line would you like me to read? Select from the buttons below.',
      true
    );
    addImageToChat('./assets/images/palm-diagram.jpeg', 270, 300);
    addButtons(currentPalmLines);
    await waitUserInput();
    if (checkIfEnded()) return;

    const chosenLine = buttonChoice;
    const chosenLineChoicesMap = lineChoicesMap.get(chosenLine);
    const chosenLineFortuneMap = fortuneDescMap.get(chosenLine);
    addMessageToChat(`The ${chosenLine} ${palmLineDesc[chosenLine]}`, true);

    addMessageToChat(
      `What is the shape of your ${chosenLine}? Select from the buttons below.`,
      true
    );
    addButtons(chosenLineChoicesMap.get('shapeChoices'));
    await waitUserInput();
    if (checkIfEnded()) return;

    const shapeChoice = buttonChoice;
    addMessageToChat(
      `Where is the position of your ${chosenLine} and its connections with other parts of the palm? Select from the buttons below.`,
      true
    );
    addButtons(chosenLineChoicesMap.get('positionChoices'));
    await waitUserInput();
    if (checkIfEnded()) return;

    const positionChoice = buttonChoice;
    addMessageToChat(
      `Are there any abnormal patterns on of your ${chosenLine}? Select from the buttons below.`,
      true
    );
    addButtons(chosenLineChoicesMap.get('abnormalChoices'));
    await waitUserInput();
    if (checkIfEnded()) return;

    const abnormalChoice = buttonChoice;
    const fortune = `Your ${chosenLine} ${positionChoice}, is ${shapeChoice}, and has ${abnormalChoice}. Your characteristics are:
                    ${chosenLineFortuneMap.get(positionChoice)}, 
                    ${chosenLineFortuneMap.get(shapeChoice)}, 
                    ${chosenLineFortuneMap.get(abnormalChoice)}.`;

    overallFortune[chosenLine] = fortune;
    addMessageToChat(fortune, true);

    addMessageToChat(
      `Would you like a more detailed reading for your ${chosenLine}?`,
      true
    );
    addButtons(basicChoices);
    await waitUserInput();
    if (checkIfEnded()) return;

    if (buttonChoice === 'Yes') {
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

      if (checkIfEnded()) return;

      if (botResponse.ok) {
        botResponse = await botResponse.json();
        overallFortune[chosenLine] = botResponse.chatResponse;
        addMessageToChat(botResponse.chatResponse, true);
      } else {
        addMessageToChat(
          'Sorry, the greater animal gods were not available, come back next time for more detailed readings!',
          true
        );
      }
    }

    currentPalmLines.delete(chosenLine);
    if (currentPalmLines.size === 0) {
      break;
    }

    addMessageToChat('Would you like me to continue reading your palm?', true);
    addButtons(basicChoices);
    await waitUserInput();
    if (checkIfEnded()) return;

    const continueReading = buttonChoice;
    if (continueReading === 'No') {
      break;
    }
  }

  if (checkIfEnded()) return;

  addMessageToChat(
    'That concludes your palm reading! As a recap, your overall fortune is below.',
    true
  );

  for (const line in overallFortune) {
    if (checkIfEnded()) return;

    addMessageToChat(
      `${
        overallFortune[line] === ''
          ? `${line}: No fortune is read on this palm line. Create a new chat to read it if you want!`
          : `${line}: ${overallFortune[line]}`
      }`,
      true
    );
  }

  // scrol to the bottom of the chat
  chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
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
    createHistoryButton(key, sessions[key].displayName);
  }

  // give the new chat button its functionality
  const newChatButton = document.getElementById('new-chat');
  const firstChat = true;
  newChatButton.addEventListener('click', async function () {
    if (chatArr.length === 3) {
      return;
    }

    endedSession = true; // end the previous session

    // Only save to localstorage if there is an existing session that is being looked at
    if (currentSession) {
      saveToHistory(chatArr, currentSession, currentChatName);
    }

    // Modify current session to be right now
    currentSession = String(Date.now());
    currentChatName = '';

    // Clears the previous chat from the chat box
    clearChat();

    // Start a new chat with some introductory messages
    addMessageToChat("Hi, I'm Simba!", true);

    const newChat = createHistoryButton(currentSession, currentChatName);

    // Inactivate all buttons
    inactivateHistoryButtons();

    // set the new chat to active
    newChat.classList.add('active');

    // reset overall fortune
    overallFortune = {
      'Heart Line': '',
      'Head Line': '',
      'Life Line': '',
      'Fate Line': '',
    };

    if (firstChat) {
      endedSession = false;
    }

    readPalm();
  });

  newChatButton.click();
}

/**
 * @description Creates an actions div for a history button with 'edit' and 'delete' functionalities.
 * The 'edit' button, when clicked, prompts the user to input a new chat name. If the user enters a new name,
 * the chat name in local storage and on the HTML page is updated.
 * The 'delete' button, when clicked, removes the chat from local storage and the HTML page.
 * If the chat being deleted is currently active, the chat is cleared.
 * @param {string} key - The chat key, which is stored in local storage
 * @param {Object} chatLink - The DOM element of the chat link that is clicked on in the history
 * @param {Object} newItem - The new DOM element created in the chat history
 * @returns {Object} The 'actions' div element, which contains both 'edit' and 'delete' buttons for the specific chat history item
 */
function rebuildChat(key) {
  clearChat();
  const palmReadings = JSON.parse(window.localStorage.getItem('palmReadings'));
  const chatHistory = palmReadings[key].chatArr;

  chatHistory.forEach(({ message, isIncoming }) => {
    addMessageToChat(message, isIncoming);
  });
}

/**
 * @description Clears the whole chat
 * @param {}
 * @returns {void}
 */
function clearChat() {
  const chatContainer = document.getElementById('chat-messages');
  chatContainer.innerHTML = '';

  // reset state variable
  chatArr = [];
}

/**
 * Creates an actions div for a history button with both 'edit' and 'delete' functionalities.
 * The 'edit' button, when clicked, prompts the user to input a new chat name. If the user enters a new name, the chat name in local storage and the HTML page are updated.
 * The 'delete' button, when clicked, removes the chat from local storage and the HTML page. If the chat being deleted is currently active, it clears the chat.
 *
 * @function createActionsForHistoryButton
 * @param {string} key - The key identifier for the chat, used to fetch or update the chat data in local storage.
 * @param {Object} chatLink - The DOM element of the chat link that is clicked on in the history.
 * @param {Object} newItem - The new DOM element created in the chat history.
 * @returns {Object} The 'actions' div element, which contains both 'edit' and 'delete' buttons for the specific chat history item.
 */
function createActionsForHistoryButton(key, chatLink, newItem) {
  const actions = document.createElement('div');
  actions.classList.add('actions');

  const editButton = document.createElement('button');
  editButton.classList.add('text-md');
  editButton.setAttribute('aria-label', 'edit');

  const editIcon = document.createElement('img');
  editIcon.setAttribute('src', './assets/images/ic_edit.svg');
  editIcon.setAttribute('alt', 'edit');
  editIcon.classList.add('sidebar__icons', 'white');

  editButton.appendChild(editIcon);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('text-md');
  deleteButton.setAttribute('aria-label', 'delete');

  const deleteIcon = document.createElement('img');
  deleteIcon.setAttribute('src', './assets/images/ic_delete.svg');
  deleteIcon.setAttribute('alt', 'delete');
  deleteIcon.classList.add('sidebar__icons', 'white');
  deleteButton.appendChild(deleteIcon);

  actions.appendChild(editButton);
  actions.appendChild(deleteButton);

  // Add event listener to the edit button
  editButton.addEventListener('click', () => {
    const newName = prompt('Please enter new chat name:');
    if (newName) {
      if (chatLink.classList.contains('active')) {
        currentChatName = newName;
      }

      // Update the key in local storage
      const palmReadings =
        JSON.parse(localStorage.getItem('palmReadings')) || {};
      palmReadings[key] = {
        displayName: newName,
        chatArr: palmReadings[key] ? palmReadings[key].chatArr : chatArr,
      };
      localStorage.setItem('palmReadings', JSON.stringify(palmReadings));

      // Update the chat name in the HTML
      chatLink.textContent = newName;
    }
  });

  // Add event listener to the delete button
  deleteButton.addEventListener('click', () => {
    // Remove the key from local storage
    deleteFromHistory(key);

    if (chatLink.classList.contains('active')) {
      endedSession = true; // end the previous session
      clearChat(); // If the deleted chat is the current chat, clear the chat
    }

    // Remove the chat from the HTML
    newItem.parentNode.removeChild(newItem);
  });

  return actions;
}

/**
 * @description this will create the history button with the specified key attatched to it, if no key attached it will create a new one based on the time
 * @param {integer} key - chat key that would be correlating to localStorage key, and if none is available make a new one
 * @returns {void}
 */
function createHistoryButton(key, displayName) {
  // Process of creating a new button for a chat session
  const historyList = document.getElementById('history');

  // create a new a tag for a session
  const chatLink = document.createElement('a');

  // Make the current date in the user's local timezone the text content
  if (displayName === '') {
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
  } else {
    chatLink.textContent = displayName;
  }

  chatLink.classList.add('text-md');

  // Make list item and append the a tag to it then append it to the history list
  const newItem = document.createElement('li');
  newItem.setAttribute('data-value', key);
  newItem.appendChild(chatLink);
  const actions = createActionsForHistoryButton(key, chatLink, newItem);
  newItem.appendChild(actions);
  historyList.insertBefore(newItem, historyList.firstChild);

  // Event listener for the chat link
  chatLink.addEventListener('click', async function () {
    // If the chat link is already active, do nothing
    if (chatLink.classList.contains('active')) {
      return;
    }

    endedSession = true; // end the previous session

    // if current chat is the default chat with only intro messages, then we don't need to save it
    if (chatArr.length <= 3) {
      const childNodes = historyList.childNodes;
      childNodes.forEach(function (childNode) {
        if (childNode.dataset.value === currentSession) {
          childNode.remove();
        }
      });
    } else {
      console.log(currentChatName);
      // save otherwise because it actually contains content
      saveToHistory(chatArr, currentSession, currentChatName);
    }

    // Set the current session to the clicked session
    currentSession = key;
    const palmReadings = JSON.parse(
      window.localStorage.getItem('palmReadings')
    );
    currentChatName = palmReadings[key].displayName;

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
  while (next === false && endedSession === false) {
    await timeout(50); // pauses script
  }
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
  message.forEach((choice) => {
    const messageText = document.createElement('button');
    messageText.classList.add('choices-text', 'btn', 'outline');
    messageText.textContent = choice;

    // on click it will print the option chosen and disable all buttons
    messageText.addEventListener('click', function () {
      buttonChoice = this.textContent;
      addMessageToChat(buttonChoice, false);
      const choiceButtons = document.querySelectorAll('.choices-text');
      choiceButtons.forEach((choiceButton) => {
        choiceButton.disabled = true;
      });
      next = true;
    });

    // Append the message text to the chat message bubble
    messageBubble.appendChild(messageText);
  });

  // Append the chat message bubble to the chat messages container
  messageElement.appendChild(messageBubble);
  chatMessages.appendChild(messageElement);

  // Scroll to the latest message
  chatMessagesContainer.scrollTop = chatMessages.scrollHeight;
}

/**
 * Function to add a message to the chat
 * @param {string} message - The message to add to the chat
 */
export function addMessageToChat(message, isIncoming = false) {
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

/**
 * Function to add the image of palm reading to the chat
 * @param {string} image - The image to add to the chat
 * @param {number} height - The height of the image in pixels
 * @param {number} width - The width of the image in pixels
 */
function addImageToChat(image, height, width) {
  // first add message to currentChatArr
  chatArr.push({ image });

  // Create a new chat message element
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message');
  messageElement.style.marginLeft = '150px';

  const messageBubble = document.createElement('div');
  messageBubble.classList.add('message-bubble');
  messageBubble.style.display = 'none';
  
  const messageImage = document.createElement('img');
  messageImage.src = image;
  messageImage.alt = 'A diagram that exaplains palm lines to be read';
  messageImage.style.height = `${height}px`;
  messageImage.style.width = `${width}px`;
  messageImage.classList.add('message-image');
  messageElement.appendChild(messageImage);

  // Append the chat message bubble to the chat messages container
  messageElement.appendChild(messageBubble);
  chatMessages.appendChild(messageElement);

  // Scroll to the latest message
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
