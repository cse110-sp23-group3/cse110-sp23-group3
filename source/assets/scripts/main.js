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
 * @description Checks if the session has ended.
 * @function
 * @returns {boolean} Returns the value of the 'endedSession' variable.
 */
export function checkIfEnded() {
  return endedSession;
}

/**
 * @description Conducts a palm reading session. Asks the user to choose a palm line to read,
 * and guides them through a series of questions about the shape, position, and any abnormal
 * patterns on the chosen line. After each palm line reading, the user is asked whether they
 * would like to continue with the palm reading. If they choose to continue, they are asked
 * to choose another line to read. Once all lines have been read or the user chooses to stop
 * the reading, a summary of the overall fortune is displayed.
 * @function
 * @async
 * @returns {void} This function doesn't return anything. It ends when the session ends or the user decides not to continue the reading.
 */
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
 * @description This is the main function for the application. It starts by checking if there are
 * any previous palm reading sessions in local storage. If there are, it loads them into the sidebar.
 * Then, it adds functionality to the "new chat" button. When the "new chat" button is clicked, it
 * ends the previous session, saves it to local storage (if it exists), clears the previous chat from
 * the chat box, starts a new chat, and initiates a new palm reading session.
 * @function
 * @async
 * @returns {void} This function doesn't return anything. Its main task is to orchestrate the execution of the program.
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
 * @description This function retrieves a previously stored chat history associated with the provided key from local storage,
 * clears the current chat, and then rebuilds the chat by adding each message from the chat history back into the chat box.
 * @function
 * @param {string} key - The key associated with the chat history in local storage.
 * @returns {void} This function doesn't return anything. Its main task is to rebuild the chat history.
 * @exports rebuildChat
 */
export function rebuildChat(key) {
  clearChat();
  const palmReadings = JSON.parse(window.localStorage.getItem('palmReadings'));
  const chatHistory = palmReadings[key].chatArr;

  chatHistory.forEach(({ message, isIncoming }) => {
    addMessageToChat(message, isIncoming);
  });
}

/**
 * @description This function clears the chat by setting the innerHTML of the chat container to an empty string
 * and resetting the chatArr state variable to an empty array.
 * @function
 * @returns {void} This function doesn't return anything. Its main task is to clear the chat history.
 * @exports clearChat
 */
export function clearChat() {
  const chatContainer = document.getElementById('chat-messages');
  chatContainer.innerHTML = '';

  // reset state variable
  chatArr = [];
}

/**
 * @description This function creates an actions div for a chat history button with edit and delete functionality.
 * The edit functionality allows the user to change the name of the chat, and the delete functionality allows
 * the user to delete the chat from both local storage and the HTML.
 * @function
 * @param {string} key - The key associated with the chat history in local storage.
 * @param {Object} chatLink - The DOM element representing the chat history button.
 * @param {Object} newItem - The DOM element that is the parent of the chat history button.
 * @returns {Object} A DOM element representing the actions div for the chat history button.
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
 * @description This function creates a new button for a chat session with the provided key and displayName.
 * This button is added to the 'history' HTML element. If the displayName is not provided.
 * the function uses the current date and time as the display name for the button.
 * The button has an event listener that saves the current chat to history,
 * sets the current session to the clicked session, clears the chat, and rebuilds the chat from the session.
 * @function
 * @param {string} key - The key associated with the chat history in local storage.
 * @param {string} displayName - The display name for the chat session button.
 * @returns {Object} A DOM element representing the chat session button.
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
 * @description This function inactivates all chat history buttons. It accomplishes this by
 * removing the 'active' class from each button. It fetches all the buttons from the DOM by selecting
 * elements with the 'text-md' class.
 *
 * @function
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
 * @description This function creates a promise that resolves after a specified number of milliseconds. It's
 * useful for creating delays in an async/await context.
 * @function
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise} A promise that resolves after the specified delay.
 * @exports timeout
 */
export async function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @description This function repeatedly pauses the script for short intervals until either the user provides
 * input (signified by the global variable `next` being `true`) or the session ends (signified by the global
 * variable `endedSession` being `true`). After the function is done waiting, it resets `next` to `false`
 * for potential future waits.
 *
 * @function
 * @returns {Promise<void>} A Promise that resolves once user input has been received or the session has ended.
 */
async function waitUserInput() {
  // eslint-disable-next-line no-unmodified-loop-condition
  while (next === false && endedSession === false) {
    await timeout(50); // pauses script
  }
  next = false; // reset var for next wait
}

/**
 * @description This function creates a new chat message element with choice buttons for each element in
 * the provided array. When a button is clicked, the text of the button is printed to the chat, all
 * buttons are disabled, and the global variable `next` is set to `true`. After the buttons are created,
 * they are appended to the chat messages container and the container is scrolled to display the latest
 * message.
 * @function
 * @param {Array<string>} message An array of strings where each string is the text for a choice button.
 * @param {boolean} [isIncoming=true] An optional boolean that indicates whether the message is incoming.
 * If it is incoming, the 'incoming-message' class is added to the message element. Otherwise, the
 * 'outgoing-message' class is added.
 * @returns {void} This function does not return a value.
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
 * @description This function adds a message to the chat. It first adds the message to `chatArr`.
 * Then, it creates a new chat message element and appends the text of the message to the element. If
 * the message is incoming, an image is also appended to the message element. The message element
 * is then appended to the chat messages container, and the container is scrolled to display the
 * latest message.
 * @function
 * @param {string} message The message that will be added to the chat.
 * @param {boolean} [isIncoming=false] An optional boolean that indicates whether the message is incoming.
 * If it is incoming, an image is appended to the message element and the 'incoming-message' class is
 * added to the message element. Otherwise, the 'outgoing-message' class is added.
 * @returns {void} This function does not return a value.
 * @exports addMessageToChat
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
 * @description This function adds an image to the chat. It first adds the image to `chatArr`.
 * Then, it creates a new chat message element and appends the image to the element. The image element
 * has its source, alt text, height, and width set according to the parameters passed to the function.
 * The message element is then appended to the chat messages container, and the container is scrolled
 * to display the latest image.
 * @function
 * @param {string} image The source URL of the image that will be added to the chat.
 * @param {number} height The height of the image in pixels.
 * @param {number} width The width of the image in pixels.
 * @returns {void} This function does not return a value.
 * @exports addImageToChat
 */
export function addImageToChat(image, height, width) {
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
