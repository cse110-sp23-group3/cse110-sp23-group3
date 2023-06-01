// When DOM content has loaded, run the main function
window.addEventListener('DOMContentLoaded', main);

let buttonChoice; // variable for the button choice
let next = false; // variable to check if the user has clicked a button
let chatMessage = ''; // variable for the currently stored chat message from the user
let overallFortune = ''; // variable for overall fortune
let chatNumber = 1; // variable to know, which chat we are viewing
let totalChats = 3; // variable for total number of chats

const chatForm = document.getElementById('chat-form'); // form for the chat
const chatMessages = document.getElementById('chat-messages'); // container for the chat messages

// Set of palm lines and basic choices
const palmLines = new Set([
  'heart line',
  'head line',
  'life line',
  'fate line',
]);
const basicChoices = new Set(['yes', 'no']);

let chatArr = []; // array to store the chat messages
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
 * @param {Array} chatArr - The chat array to be saved or added.
 * @returns {void}
 */
function saveToHistory(chatArr) {
  try {
    let palmReadings = JSON.parse(window.localStorage.getItem('palmReadings'));
    console.log(palmReadings);
    if (palmReadings !== null) {
      palmReadings[chatNumber] = chatArr;
    } else {
      palmReadings = { [chatNumber]: chatArr };
    }

    window.localStorage.setItem('palmReadings', JSON.stringify(palmReadings));
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description Creates the old chat by going through the array stored in localStorage
 * @param {integer} localChatNumber - The chat key, which it is stored in the localStorage array
 * @returns {void}
 */
function rebuildChat(localChatNumber) {
  clearChat();
  let palmReadings = JSON.parse(window.localStorage.getItem('palmReadings'));
  chatArr = palmReadings[String(localChatNumber)];
  if(chatArr !== undefined) {
    for(let i = 0; i < chatArr.length; i++) {
      addMessageToChat(chatArr[i]['message'], chatArr[i]['isIncoming'], true);
    }
  } else {
    chatArr = [];
  }
}

/**
 * @description Clears the whole chat
 * @param {}
 * @returns {void}
 */
function clearChat() {
  let container = document.getElementById('chat-messages');
  while(container.hasChildNodes())
  {
    container.removeChild(container.firstChild);
  }
}

/**
 * @description Will make the buttons clickable
 * @param {}
 * @returns {void}
 */
function historyButtons() {
  let buttons = document.querySelectorAll('.history-chat');
    // on click it will print the option chosen and disable all buttons
    buttons.forEach((x) => {
      x.addEventListener('click', function () {
        let localChatNumber = x.textContent;
        console.log(localChatNumber);
        if(chatNumber != localChatNumber && chatNumber <= totalChats)
        {
          chatNumber = localChatNumber;
          rebuildChat(localChatNumber);
          main();
        }
      });
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
  messageBubble.classList.add('message-button');

  // Making a button for each option
  for (const choice of message) {
    const messageText = document.createElement('button');
    messageText.classList.add('choices-text');
    messageText.textContent = choice;

    // Append the message text to the chat message bubble
    messageBubble.appendChild(messageText);

    // Append the chat message bubble to the chat messages container
    messageElement.appendChild(messageBubble);
    chatMessages.appendChild(messageElement);
  }

  // Scroll to the latest message
  chatMessages.scrollTop = chatMessages.scrollHeight;

  const choicesButton = document.querySelectorAll(
    '.choices-text'
  );

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
  // First add message to chatArr
  if (!isRebuilding) {
    chatArr.push({ message, isIncoming });
  }

  // Create a new chat message element
  const messageElement = document.createElement('div');
  messageElement.classList.add(
    'chat-message',
    isIncoming ? 'incoming-message' : 'outgoing-message'
  );

  const messageBubble = document.createElement('div');
  messageBubble.classList.add('message-bubble');

  // If message is incoming, append the message text directly
  if (isIncoming) {
    // Create the typing indicator element
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');

    const typingText = document.createElement('span');
    typingText.classList.add('typing-text');
    typingText.textContent = "...";

    const typingDots = document.createElement('span');
    typingDots.classList.add('typing-dots');
    typingDots.textContent = "...";

    typingIndicator.appendChild(typingText);
    typingIndicator.appendChild(typingDots);

    // Append the typing indicator to the message bubble
    messageBubble.appendChild(typingIndicator);
  } else {
    const messageText = document.createElement('p');
    messageText.classList.add('message-text');
    messageText.textContent = message;

    // Append the message text to the chat message bubble
    messageBubble.appendChild(messageText);
  }

  // If message is incoming, also append an image
  if (isIncoming) {
    const messageImage = document.createElement('img');
    messageImage.src = "assets/styles/bg/simba.png";
    messageImage.style.width = "50px";
    messageImage.classList.add('message-image');
    messageElement.appendChild(messageImage);
  }

  // Append the chat message bubble to the chat messages container
  messageElement.appendChild(messageBubble);

  // Append the message element to the chat messages container
  chatMessages.appendChild(messageElement);

  // Scroll to the latest message
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Show the message text after a delay for incoming messages
  if (isIncoming && !isRebuilding) {
    const typingIndicator = messageBubble.querySelector('.typing-indicator');
    const typingText = messageBubble.querySelector('.typing-text');
    const typingDots = messageBubble.querySelector('.typing-dots');

    const showTypingText = () => {
      typingText.style.opacity = "1";
      typingDots.style.opacity = "0";
    };

    const showTypingDots = () => {
      typingText.style.opacity = "0";
      typingDots.style.opacity = "1";
    };

    const typingInterval = setInterval(() => {
      showTypingText();
      setTimeout(showTypingDots, 500);
    }, 1000);

    setTimeout(() => {
      clearInterval(typingInterval);
      messageBubble.removeChild(typingIndicator);

      const messageText = document.createElement('p');
      messageText.classList.add('message-text');
      messageText.textContent = message;

      // Append the message text to the chat message bubble
      messageBubble.appendChild(messageText);
    }, 2000); // Show the message text after 2 seconds (adjust the delay as needed)
  }
}



/**
 * @description Handles the main chat flow for a simulated palm reading. The chatbot presents a series of choices to the user, gathers responses, and provides the palm reading result.
 * @returns {Promise} - A promise to indicate when the chat process has completed.
 */
async function main() {
  // initialize history buttons to have functionality
  historyButtons();

  // Start the chat with some introductory messages
  addMessageToChat("Hi, I'm Simba!", true);
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

  while (true) {
    // Case where buttonChoice is Yes, then read the palm.
    addMessageToChat(
      'Which palm line would you like me to read? Select from the buttons below.',
      true
    );
    addButtons(palmLines);
    await waitUserInput();

    // Determine which palm line was chosen and read it by asking a series of questions
    let botResponse = '';

    // description of each palm line
    const palmLineDesc = {
      'heart line':
        "runs horizontally across your palm and is the topmost line you'll see. It begins at the edge of your palm on the pinkie side, and runs to just underneath your index or middle finger.",
      'head line':
        'begins under your index finger along the edge of your palm and extends part-way across your palm in a graceful curve flowing in a slightly downward direction.',
      'life line':
        'begins between your thumb and index finger and travels down your palm through the middle.',
      'fate line':
        'is a vertical line running up the palm towards the base of the middle finger.',
    };

    // First describe the location of the chosen line, and then ask the user to describe the line
    addMessageToChat(`The ${buttonChoice} ${palmLineDesc[buttonChoice]}`, true);
    addMessageToChat(
      `How would you describe your ${buttonChoice}? Use adjectives such as "wavy", "long", "curvy", and the start and end locations of the line. Be as specific as possible.`,
      true
    );
    startListening();
    await waitUserInput();
    stopListening();

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

    // palmLines.delete(buttonChoice);

    // If now there are no other lines to read, break
    if (palmLines.size === 0) {
      break;
    }

    // Ask the user if they would like to continue with the palm reading
    addMessageToChat('Would you like me to continue reading your palm?', true);
    addButtons(basicChoices);
    await waitUserInput();
    if (buttonChoice === 'no') {
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

  // Save the chatArr to local storage
  saveToHistory(chatArr);
}
