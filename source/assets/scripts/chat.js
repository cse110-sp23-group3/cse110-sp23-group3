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

let currentSession; // variable to know, which chat we are viewing
let chatArr = []; // array to store the current set of chat messages
const basicChoices = new Set(['Yes', 'No']);
const palmLines = new Set([
  'Heart Line',
  'Head Line',
  'Life Line',
  'Fate Line',
]);

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

// variable for overall fortune
const overallFortune = {
  'Heart Line': '',
  'Head Line': '',
  'Life Line': '',
  'Fate Line': '',
};

// Map to store the fortunes for each palm line
const fortuneMap = new Map([]);

const heartMap = new Map([]);
heartMap.set('wavy', 'many relationships and lovers, absence of serious');
heartMap.set('long and curvy', 'freely expresses emotions and feelings');
heartMap.set('straight and parallel to the head line', 'good handle on emotions');
heartMap.set('begins below the index finger', 'content with love life');
heartMap.set('begins below the middle finger', 'selfish when it comes to love');
heartMap.set('begins in the middle', 'falls in love easily');
heartMap.set('brocken line', 'emotional trauma');
heartMap.set('circles on the line', 'sadness or depression');
heartMap.set('smaller lines crossing through heart line', 'emotional trauma');
heartMap.set('no abnormal patterms', 'emotionally stable');

// specify the button choices for heart line
heartMap.set('shapeChoices', new Set(['wavy', 'long and curvy', 'straight and parallel to the head line']));
heartMap.set('positionChoices', new Set(['begins below the index finger', 'begins below the middle finger', 'begins in the middle']));
heartMap.set('abnormalChoices', new Set(['brocken line', 'circles on the line', 'smaller lines crossing through heart line', 'no abnormal patterms']));

// fortune for head line
const headMap = new Map([]);
headMap.set('wavy', 'short attention span');
headMap.set('short', 'prefers physical achievements over mental ones');
headMap.set('long and straight', 'thinkings are clear and focused with realistic mindset');
headMap.set('curved and sloping', 'full of creavitiy and spontaneity');
headMap.set('separated from life line', 'independence and self-reliance in thinking and decision-making');
headMap.set('overlap with life line', 'strong connection between the intellectual and physical aspects');
headMap.set('crossed with life line', 'conflict or tension between rationality and physical well-being or vitality');
headMap.set('donuts on the line', 'emotional crisis');
headMap.set('brocken', 'inconsistencies in thought');
headMap.set('multiple crosses through the line', 'fragmented focus and interruptions in thinking');
headMap.set('no abnormal patterns', 'clear and focused thinking');

// specify the button choices for head line
headMap.set('shapeChoices', new Set(['wavy', 'short', 'long and straight', 'curved and sloping']));
headMap.set('positionChoices', new Set(['separated from life line', 'overlap with life line', 'crossed with life line']));
headMap.set('abnormalChoices', new Set(['donuts on the line', 'brocken', 'multiple crosses through the line', 'no abnormal patterns']));

// fortune for life line
const lifeMap = new Map([]);
lifeMap.set('long and deep', 'vitality and strength');
lifeMap.set('short and shallow', 'live to the fullest and willing to take risks');
lifeMap.set('curvy', 'well-balanced life and adaptability');
lifeMap.set('runs close to thumb', 'get tired easily');
lifeMap.set('crossing or overlap with head line', 'strong connection between thoughts and actions');
lifeMap.set('connecting to heart line', 'emotional well-being and physical vitality');
lifeMap.set('multiple parallel lines', 'extra vitality and resilience');
lifeMap.set('islands or breaks', 'health issues, setbacks, or disruptions in life');
lifeMap.set('forked into branches', 'versatility and the potential for significant life changes');
lifeMap.set('no abnormal patterns', 'stable and balanced life');

// specify the button choices for life line
lifeMap.set('shapeChoices', new Set(['long and deep', 'short and shallow', 'curvy']));
lifeMap.set('positionChoices', new Set(['runs close to thumb', 'crossing or overlap with head line', 'connecting to heart line']));
lifeMap.set('abnormalChoices', new Set(['multiple parallel lines', 'islands or breaks', 'forked into branches', 'no abnormal patterns']));

// fortune for fate line
const fateMap = new Map([]);
fateMap.set('long and straight', 'clear career path and a focused approach to achieving goals');
fateMap.set('curvy or wavy', 'less predictable or more flexible career path');
fateMap.set('shallow or fainted', 'less prominent influence of caree');
fateMap.set('starts from the base of the palm', 'has a clear sense of ambition and aspirations');
fateMap.set('connecting to life line', 'strives to maintain a healthy equilibrium between work and life');
fateMap.set('terminates in the middle of the palm', 'significant career transition or change of direction');
fateMap.set('brocken or fragmented', 'significant setbacks or obstacles that impact professional journey');
fateMap.set('branches and changes of directions', 'significant events or opportunities that impact the career path');
fateMap.set('absent or fainted', 'prioritizes other aspects of life over their career');
fateMap.set('no abnormal patterns', '');

// specify the button choices for fate line
fateMap.set('shapeChoices', new Set(['long and straight', 'curvy or wavy', 'shallow or fainted']));
fateMap.set('positionChoices', new Set(['starts from the base of the palm', 'connecting to life line', 'terminates in the middle of the palm']));
fateMap.set('abnormalChoices', new Set(['brocken or fragmented', 'branches and changes of directions', 'absent or fainted', 'no abnormal patterns']));

// form the fortune map
fortuneMap.set('Heart Line', heartMap);
fortuneMap.set('Head Line', headMap);
fortuneMap.set('Life Line', lifeMap);
fortuneMap.set('Fate Line', fateMap);

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
    const chosenLineMap = fortuneMap.get(chosenLine);
    addMessageToChat(`The ${chosenLine} ${palmLineDesc[chosenLine]}`, true);

    // Ask about the shape of the palm
    addMessageToChat(
      `What is the shape of your ${chosenLine}? Select from the buttons below.`,
      true
    );
    addButtons(chosenLineMap.get('shapeChoices'));
    await waitUserInput();
    const shapeChoice = buttonChoice;

    // Ask about the position of the palm
    addMessageToChat(
      `Where is the position of your ${chosenLine} and its connections with other parts of the palm? Select from the buttons below.`,
      true
    );
    addButtons(chosenLineMap.get('positionChoices'));
    await waitUserInput();
    const positionChoice = buttonChoice;

    // Ask about the abnormal patterns of the palm
    addMessageToChat(
      `Are there any abnormal patterns on of your ${chosenLine}? Select from the buttons below.`,
      true
    );
    addButtons(chosenLineMap.get('abnormalChoices'));
    await waitUserInput();
    const abnormalChoice = buttonChoice;

    // Show fortune for the chosen line
    const fortune = `Your ${chosenLine} ${positionChoice}, is ${shapeChoice}, and has ${abnormalChoice}. Your characteristics are:
                    ${chosenLineMap.get(positionChoice)}; ${chosenLineMap.get(shapeChoice)}; ${chosenLineMap.get(abnormalChoice)}.`;
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
            prompt: `Act as a fortune teller for palm reading. I describe my ${chosenLine}as: ${positionChoice}, ${shapeChoice}, and ${abnormalChoice}. What does this indicates? Limit your response to 4 sentences.`,
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
    if (chatArr.length === 3) {
      return;
    }

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

function saveToLocal() {
  try {
    window.localStorage.setItem('palmReadings', JSON.stringify(sessions));
  } catch (error) {
    console.log(error);
  }
}

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
      saveToLocal();
      const childNodes = historyList.childNodes;
      childNodes.forEach(function (childNode) {
        if (childNode.dataset.value === currentSession) {
          childNode.remove();
          numberOfSessions--;
        }
      });
    } else {
      saveToHistory(chatArr, currentSession);
      saveToLocal();
    }

    // Set the current session to the clicked session and save the old one again
    currentSession = key;
    chatArr = [];

    // Rebuild the chat from the session
    rebuildChat(key);

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
