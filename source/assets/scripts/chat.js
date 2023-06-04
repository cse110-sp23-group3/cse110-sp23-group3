// When DOM content has loaded, run the main function
window.addEventListener('DOMContentLoaded', main);

let initialHistoryLoad = false; // boolean to check if the history has been loaded
let buttonChoice; // variable for the button choice
let next = false; // variable to check if the user has clicked a button

const chatForm = document.getElementById('chat-form'); // form for the chat
const chatMessages = document.getElementById('chat-messages'); // container for the chat messages
const sendButton = document.getElementById('send-button'); // send button for chat box
const delIconHTML = '<img class="delete-icon" src="assets/images/trash-can.svg">'; // inner html for chat history delete button

// Set of palm lines and basic choices
const palmLines = new Set([
  'Heart Line',
  'Head Line',
  'Life Line',
  'Fate Line',
]);
const basicChoices = new Set(['Yes', 'No']);

let isListening = false; // boolean to check if the chat form is listening for a 'submit' event

/**
 * @description Handles the 'submit' event by preventing the default form submission, validating the input, and adding the message to the chat.
 * @param {Event} event - The event object from the 'submit' event.
 */
function handleSubmit(event) {
  event.preventDefault();

  chatMessage = document.getElementById('message').value;

  // If the message is empty, alert the user to enter a message
  if (chatMessage === '') {
    addMessageToChat('Please enter a message!', true);
    return;
  }

  addMessageToChat(chatMessage, false);

  next = true;

  document.getElementById('message').value = '';
}

/**
 * @description Activates a 'submit' event listener on 'chatForm' if not already listening.
 */
function startListening() {
  if (!isListening) {
    chatForm.addEventListener('submit', handleSubmit);
    isListening = true;
  }
}

/**
 * @description Deactivates the 'submit' event listener on 'chatForm' if currently listening.
 */
function stopListening() {
  if (isListening) {
    chatForm.removeEventListener('submit', handleSubmit);
    isListening = false;
  }
}

/**
 * Add the chat array to the browser's local storage as a palm reading record in the palm reading object.
 *
 * @param {Array} currentChatArr - The chat array to be saved or added.
 * @param {integer} key - The chat key that it will be saved at
 * @returns {void}
 */
function saveToHistory(key) {
  try {
    sessions[key] = {
      currentChatArr,
      currentPalmLines: [...currentPalmLines],
      overallFortune,
    };
    console.log(currentPalmLines);
    console.log(sessions[key]);
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
  currentChatArr = sessions[key].currentChatArr;
  currentPalmLines = new Set(sessions[key].currentPalmLines);
  overallFortune = sessions[key].overallFortune;
  if (currentChatArr !== undefined) {
    const length = currentChatArr.length;
    for (let i = 0; i < length; i++) {
      addMessageToChat(currentChatArr[i].message, currentChatArr[i].isIncoming);
    }
  } else {
    currentChatArr = [];
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
}

/**
 * @description this will create the history button with the specified key attatched to it, if no key attached it will create a new one based on the time
 * @param {integer} key - chat key that would be correlating to localStorage key, and if none is available make a new one
 * @returns {void}
 */
function createHistoryButton(key) {
  // Process of creating a new button for a chat session
  const newHistBtnContainer = document.createElement('div');
  newHistBtnContainer.classList.add('history-btn-container');
  const newHistoryButton = document.createElement('button');
  newHistoryButton.textContent = new Date(Number(key)).toLocaleString();
  newHistoryButton.value = key;
  const newDeleteButton = document.createElement('button');
  newDeleteButton.value = key;
  newDeleteButton.innerHTML = delIconHTML;
  newDeleteButton.classList.add('history-delete');
  const histories = document.getElementById('histories');
  newHistoryButton.classList.add('history-chat');
  newHistBtnContainer.appendChild(newHistoryButton);
  newHistBtnContainer.appendChild(newDeleteButton);

  // insert the new button at the top of the list
  histories.insertBefore(newHistBtnContainer, histories.firstChild);

  // Make sure that we are rebuilding the chat whenever one of the history buttons are clicked
  newHistoryButton.addEventListener('click', async function () {
    const tempKey = newHistoryButton.value;
    if (currentSession !== tempKey) {
      saveToHistory(currentSession);

      currentSession = tempKey;
      rebuildChat(tempKey);

      // enable all buttons
      const historyButtons = histories.querySelectorAll('.history-chat');
      historyButtons.forEach((button) => {
        button.disabled = false;
      });
      const deleteButtons = histories.querySelectorAll('.history-delete');
      deleteButtons.forEach((button) => {
        button.disabled = false;
      });

      // disable currently clicked on buttons
      newHistoryButton.disabled = true;
      newDeleteButton.disabled = true;

      await readPalm();
    }
  });

  // Make delete button delete chat when clicked
  newDeleteButton.addEventListener('click', async function() {
    const tempKey = newDeleteButton.value;
    if (currentSession !== tempKey) {
      deleteFromHistory(tempKey);
      saveToHistory(currentSession);
      deleteHistoryButton(tempKey);
    }
  });

  return newHistoryButton;
}

/**
 * @description this will delete the history button with the specified key attatched to it; if that key does not exist, the function does nothing
 * @param {integer} key - chat key that would be correlating to localStorage key
 * @returns {void}
 */
function deleteHistoryButton(key) {
  if (!document.querySelector(`button[class="history-chat"][value="${key}"]`)) {
    return;
  }
  const histButtonToDelete = document.querySelector(`button[class="history-chat"][value="${key}"]`);
  const histButtonParentDiv = histButtonToDelete.parentElement;
  histButtonParentDiv.remove();
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
  choicesButton.forEach((x) => {
    x.addEventListener('click', function () {
      buttonChoice = x.textContent;
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
function addMessageToChat(message, isIncoming = false, isRebuilding = false) {
  // first add message to currentChatArr
  if (!isRebuilding) {
    currentChatArr.push({ message, isIncoming });
  }

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
 * @description Handles the main chat flow for a simulated palm reading. The chatbot presents a series of choices to the user, gathers responses, and provides the palm reading result.
 * @returns {Promise} - A promise to indicate when the chat process has completed.
 */
async function main() {
  // Start listening to 'submit' event
  startListening();

  // Start the chat with some introductory messages
  addMessageToChat("Hi, I'm Simba!", true);
  addMessageToChat('Would you like me to read your palm?', true);
  addButtons(basicChoices);
  await waitUserInput();

  // Case where buttonChoice is No, then obviously don't read the palm and do nothing.
  if (buttonChoice === 'No') {
    addMessageToChat(
      "When you're ready for a palm reading, just reload!",
      true
    );
    return;
  }

  while (true) {
    // Case where buttonChoice is Yes, then read the palm.
    if (
      currentChatArr[currentChatArr.length - 1].message !==
      'Which palm line would you like me to read? Select from the buttons below.'
    ) {
      addMessageToChat(
        'Which palm line would you like me to read? Select from the buttons below.',
        true
      );
    }
    addButtons(currentPalmLines);
    await waitUserInput();

    // Determine which palm line was chosen and read it by asking a series of questions
    let botResponse = '';

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

    // First describe the location of the chosen line, and then ask the user to describe the line
    addMessageToChat(`The ${buttonChoice} ${palmLineDesc[buttonChoice]}`, true);
    addMessageToChat(
      `How would you describe your ${buttonChoice}? Use adjectives such as "wavy", "long", "curvy", and the start and end locations of the line. Be as specific as possible.`,
      true
    );
    sendButton.disabled = false;
    startListening();
    await waitUserInput();
    stopListening();
    sendButton.disabled = true;

    // Show the spinner
    document.getElementById('spinner').style.display = 'block';

    // Query AI API for chat response.
    botResponse = await fetch(
      'https://cse110-team3.up.railway.app/api/ask-chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Act as a fortune teller for palm reading. I describe my ${buttonChoice} as ${chatMessage}, what does this mean? Limit your response to 2 sentences.`,
        }),
      }
    );

    // Get the bot's response
    botResponse = await botResponse.json();

    // Hide the spinner
    document.getElementById('spinner').style.display = 'none';

    // Add the bot's response to the chat
    addMessageToChat(botResponse.chatResponse, true);

    // Add fortune to overall fortune
    overallFortune = overallFortune.concat(` ${botResponse.chatResponse}`);

    currentPalmLines.delete(buttonChoice);

    // If now there are no other lines to read, break
    if (currentPalmLines.size === 0) {
      break;
    }

    // Ask the user if they would like to continue with the palm reading
    addMessageToChat('Would you like me to continue reading your palm?', true);
    addButtons(basicChoices);
    await waitUserInput();
    if (buttonChoice === 'No') {
      break;
    }
  }

  addMessageToChat(`Your overall palm reading is:`, true);
  addMessageToChat(
    `${
      overallFortune === ''
        ? 'Sorry we were not able to determine your fortune. Try again by reloading!'
        : overallFortune
    }`,
    true
  );
}

function resetHistoryButtons(currentHistoryButton) {
  const currentDeleteButton = document.querySelector(`button[value="${currentHistoryButton.value}"][class="history-delete"]`)
  const histories = document.getElementById('histories');
  const historyButtons = histories.querySelectorAll('.history-chat');
  const deleteButtons = histories.querySelectorAll('.history-delete');
  historyButtons.forEach((button) => {
    button.disabled = false;
  });
  deleteButtons.forEach((button) => {
    button.disabled = false;
  });

  // disable currently clicked on button
  currentHistoryButton.disabled = true;
  currentDeleteButton.disabled = true;
}

let sessions; // object to store the palm reading sessions as a sort of state variable that you keep track of until page exit, then you save it to local storage
let overallFortune = ''; // variable for overall fortune
let currentSession; // variable to know, which chat we are viewing
let currentChatArr = []; // array to store the current set of chat messages
let currentPalmLines; // variable to know, which palm lines we have not yet read in the current session
let chatMessage = ''; // variable for the currently stored chat message from the user
/**
 * @description Handles the main chat flow for a simulated palm reading. The chatbot presents a series of choices to the user, gathers responses, and provides the palm reading result.
 * @returns {Promise} - A promise to indicate when the chat process has completed.
 */
async function main() {
  // initially disable the send button
  sendButton.disabled = true;
  if (!initialHistoryLoad) {
    // Check if there are previous palm reading sessions in local storage and load them into the sidebar if there are
    sessions = JSON.parse(window.localStorage.getItem('palmReadings')) ?? {};

    // make buttons for each previous session
    for (const key in sessions) {
      createHistoryButton(key);
    }

    initialHistoryLoad = true;
  }

  // give the new chat button its functionality
  const newChatButton = document.getElementById('new-chat');
  newChatButton.addEventListener('click', async function () {
    saveToHistory(currentSession);
    clearChat();
    currentChatArr = [];
    currentSession = Date.now();
    currentPalmLines = palmLines;
    chatMessage = '';

    // Start a new chat with some introductory messages
    addMessageToChat("Hi, I'm Simba!", true);
    addMessageToChat(
      'DISCLAIMER: This app was written as part of a school assignment. The content of this app and the practice of palm reading are not endorsed or affirmed by the creators.',
      true
    );
    addMessageToChat('Would you like me to read your palm?', true);
    addButtons(basicChoices);
    await waitUserInput();

    // Case where buttonChoice is No, then obviously don't read the palm and do nothing.
    if (buttonChoice === 'no') {
      addMessageToChat(
        "When you're ready for a palm reading, just reload!",
        true
      );
      return;
    }

    const newChat = createHistoryButton(currentSession);

    resetHistoryButtons(newChat);

    await readPalm();
  });

  newChatButton.click();
}
