/**
 * Add the chat array to the browser's local storage as a palm reading record in the palm reading object.
 *
 * @param {Array} chatArr - The current chat array to be saved or added.
 * @param {integer} key - The chat key that it will be saved at
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
