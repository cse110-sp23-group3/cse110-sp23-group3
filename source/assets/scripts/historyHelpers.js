/**
 * Add the chat array to the browser's local storage as a palm reading record in the palm reading object.
 *
 * @param {Array} chatArr - The current chat array to be saved or added.
 * @param {string} currentSession - The chat key that it will be saved at
 * @param {string} displayName - The name of the chat to be displayed in the sidebar. Pass in an empty string if no name.
 * @returns {void}
 */
export function saveToHistory(chatArr, currentSession, displayName) {
  try {
    // Don't save if it is the default chat
    if (chatArr.length <= 3) {
      return;
    }

    const palmReadings =
      JSON.parse(window.localStorage.getItem('palmReadings')) ?? {};
    palmReadings[currentSession] = { displayName, chatArr };
    window.localStorage.setItem('palmReadings', JSON.stringify(palmReadings));
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get the palm reading history from the browser's local storage.
 * @returns {Object} - The palm reading history object.
 */
export function getHistory() {
  try {
    const palmReadings =
      JSON.parse(window.localStorage.getItem('palmReadings')) ?? {};
    return palmReadings;
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
export function deleteFromHistory(key) {
  try {
    const palmReadings =
      JSON.parse(window.localStorage.getItem('palmReadings')) ?? {};
    delete palmReadings[key];
    window.localStorage.setItem('palmReadings', JSON.stringify(palmReadings));
  } catch (error) {
    console.log(error);
  }
}
