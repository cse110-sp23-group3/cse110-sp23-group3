// Get references to the necessary elements
const chatForm = document.getElementById('chat-form')
const chatMessages = document.getElementById('chat-messages')

// objects of different line readings
const heartline = {
    "begins below the index finger" : "content with love life",
    "wavy" : "many relationships and lovers, absence of serious",
    "Touches life line" : "heart is broken easily",
    "Begins below the middle finger" : "selfish when it comes to love",
    "long and curvy" : "freely expresses emotions and feelings",
    "circle on the line" : "sadness or depression",
    "Begins in the middle" : "falls in love easily",
    "straight and parallel to the head line" : "good handle on emotions",
    "smaller lines crossing through heart line" : "emotional trauma",
    "straight and short" : "less interest in romance",
    "broken line" : "emotional trauma",
};
const headline = {
    "short line" : "prefers physical achievements over mental ones",
    "curved, sloping line" : "creativity",
    "separated from life line" : "enthusiasm for life",
    "deep, long line" : "thinking is clear and focused",
    "donuts or cross in head line" : "emotional crisis",
    "multiple crosses through head line" : "momentous decisions",
    "wavy line" : "short attention span",
    "straight line" : "thinks realistically",
    "broken head line" : "inconsistencies in thought"
};

const lifeline = {
    "runs close to thumb" : "often tired",
    "long, deep" : "vitality", 
    "curvy" : "plenty of energy",
    "swoops around in a semicircle" : "strength, and enthusiasm",
    "multiple life lines" : "extra vitality",
    "break" : "sudden change in lifestyle",
    "short and shallow" : "manipulated by others",
    "straight and close to the edge of the palm" : "cautious when it comes",
    "circle in line indicates" : "hospitalied or injured",
};

const fateline = {
    "deep line" : "strongly controlled by fate",
    "breaks and changes of direction" : "prone to many changes in life",
    "starts joined to life line" : "self-made individual; develops aspirations early on",
    "joins with the lifeline around in the middle" : "signifies a point at which one's interests must be surrendered to those of others",
    "starts at the base of the thumb and crosses lifeline" : "support offered",
};

const histChats = {
    "History 1": [],
    "History 2": [],
    "History 3": []
  };

// variables
let wait = 0;
let buttonChoice;
let arraySpot = 0;
let hasChosenPalm = false;

// arrays for button choices
let palmLines = ["heartline", "headline", "lifeline", "fateline"];
let basicChoices = ['yes', 'no'];

// holds the values of the palm line looked at
let keys = [];
let values = [];

// holds values of user fortune
let userFortune = [];

// Introduction
addMessageToChat("Hi, I'm Simba!", true);
addMessageToChat("Would you like me to read your palm?", true);
addButtons(palmLines);
loadHist();

// Constantly checking if one of the buttons choices were clicked
window.setInterval( function(){
    if(wait == 1)
    {
        wait = 0;

        // based on the button clicked it will assign keys the keys of an object
        // takes the option chosen off the array for the future when we have to pick another palm line
        if(buttonChoice == "heartline") {
            keys = Object.keys(heartline);
            values = Object.values(heartline);
            arraySpot = 0;
            palmLines = find("heartline", palmLines);
            hasChosenPalm = true;
        } else if(buttonChoice == "headline")
        {
            keys = Object.keys(headline);
            values = Object.values(headline);
            arraySpot = 0;
            palmLines = find("headline", palmLines);
            hasChosenPalm = true;
        } else if(buttonChoice == "lifeline")
        {
            keys = Object.keys(lifeline);
            values = Object.values(lifeline);
            arraySpot = 0;
            palmLines = find("lifeline", palmLines);
            hasChosenPalm = true;
        } else if(buttonChoice == "fateline")
        {
            keys = Object.keys(fateline);
            values = Object.values(fateline);
            arraySpot = 0;
            palmLines = find("fateline", palmLines);
            hasChosenPalm = true;
        }
        let done = arraySpot < keys.length

        // will only print the question keys when a palm has been chosen, and won't try to print more than the # of elements
        if(hasChosenPalm && done) {
            if(palmLines.indexOf('fortune') == -1) {
                palmLines.push('fortune');
            }
            addMessageToChat(keys[arraySpot], true);
            addButtons(basicChoices);

            // adding the corresponding value to their fortune
            if(buttonChoice == 'yes') {
                userFortune.push(values[arraySpot]);
            }
            arraySpot++;
        }

        // Prompts to choose a different line if want to continue
        if(!done && palmLines.length > 1) {
            addMessageToChat("Would you like me to keep reading your palm?", true);
            addButtons(palmLines);
        }

        // If no more choices then print fortune or if fortune button is clicked
        if(buttonChoice == 'fortune' || (palmLines.length == 1 && !done))
        {
            addMessageToChat("Your palm reading results are: ", true);
            addMessageToChat(userFortune, true);
        }
    }
}, 10);

// finds index of x in array y
// returns index
function find(element, array) {
    const index = array.indexOf(element);
    if(index > -1) 
    {
        array.splice(index, 1);
    }
    return array;
}


// adds buttons for each element of the choices array
function addButtons(message, isIncoming = true) {
    // Create a new chat message element
    const messageElement = document.createElement('div')
    messageElement.classList.add('choices', isIncoming ? 'incoming-message' : 'outgoing-message')

    const messageBubble = document.createElement('div')
    messageBubble.classList.add('message-button')

    // Making a button for each option
    for(let i = 0; i < message.length; i++)
    {
        const messageText = document.createElement('button')
        messageText.classList.add('choices-text')
        messageText.textContent = message[i]

        // Append the message text to the chat message bubble
        messageBubble.appendChild(messageText)

        // Append the chat message bubble to the chat messages container
        messageElement.appendChild(messageBubble)
        chatMessages.appendChild(messageElement)
    }

    // Scroll to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight

    let choicesButton = document.querySelectorAll('button')

    // on click it will print the option chosen and disable all buttons
    choicesButton.forEach(x => {x.addEventListener("click", function(){
        wait++;
        buttonChoice = x.textContent;
        addMessageToChat(buttonChoice, false);
        for(let i = 0; i < choicesButton.length; i++)
        {
            console.log(choicesButton[i]);
            choicesButton[i].disabled = true;
        }
        })
    });
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault() // Prevent the form from submitting

    // Get the user's message from the input field
    const messageInput = document.getElementById('message')
    const message = messageInput.value

    // If the message is empty, alert the user to enter a message
    if (message === '') {
        alert('Please enter a message');
    }

    // Clear the input field
    messageInput.value = ''

    // Create a new chat message element
    addMessageToChat(message, false)

    // TODO: Remove this mockup function call
    // getBotResponse(message)
    mockBotResponse()
}

// Mockup function to simulate a bot response
function mockBotResponse() {
    const botResponse = 'This is a mockup response from the bot'
    addMessageToChat(botResponse, true)
}

/**
 * Function to get the bot's response to the user's message
 * @param {string} message - The user's message
 */
async function getBotResponse(message) {
    // Send the user message to the server
    const response = await fetch('/get-response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })

    // Get the bot's response
    const botResponse = await response.json()

    // Add the bot's response to the chat
    addMessageToChat(botResponse.message)
}

/**
 * Function to add a message to the chat
 * @param {string} message - The message to add to the chat
 */
function addMessageToChat(message, isIncoming = false) {

    // Create a new chat message element
    const messageElement = document.createElement('div')
    messageElement.classList.add('chat-message', isIncoming ? 'incoming-message' : 'outgoing-message')

    const messageBubble = document.createElement('div')
    messageBubble.classList.add('message-bubble')

    const messageText = document.createElement('p')
    messageText.classList.add('message-text')
    messageText.textContent = message

    // Append the message text to the chat message bubble
    messageBubble.appendChild(messageText)

    // Append the chat message bubble to the chat messages container
    messageElement.appendChild(messageBubble)
    chatMessages.appendChild(messageElement)

    // Scroll to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight
}
  
// Load histories into the select dropdown
function loadHist() {
    const userSelect = document.getElementById("hist-select");
    for (let hist in histChats) {
      const option = document.createElement("option");
      option.value = hist;
      option.text = hist;
      userSelect.appendChild(option);
    }
}

// Add a submit event listener to the form
chatForm.addEventListener('submit', handleFormSubmit)