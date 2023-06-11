/**
 * Stores the current chat array in the browser's local storage as a palm reading record.
 * If the chatArr is of length less than or equal to 3, it is considered as a default chat and not saved.
 *
 * @param {Array} chatArr - The chat array to be saved.
 * @param {string} currentSession - The session identifier under which the chat will be saved.
 * @param {string} displayName - The name of the chat to be displayed in the sidebar. If there is no name, an empty string should be passed.
 * @returns {void}
 * @throws {Error} If there is a problem with accessing local storage.
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
 * Retrieves the palm reading history from the browser's local storage.
 * @returns {Object} The palm reading history object. If no history is found, an empty object is returned.
 * @throws {Error} If there is a problem with accessing local storage.
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
 * Removes a specified session from the palm reading history stored in the browser's local storage.
 *
 * @param {string} key - The identifier of the session to be deleted.
 * @returns {void}
 * @throws {Error} If there is a problem with accessing local storage.
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
