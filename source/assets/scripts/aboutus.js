/**
 * The file path to the JSON file, which contains the data for the profiles.
 * The file includes an array of objects. Each object must conform to the format accepted
 * by the data attribute of an 'about-card'. For example:
 * @example
 * [
 *   {
 *     "profileSrc": "string",
 *     "name": "string",
 *     "role": "string",
 *     "description": "string",
 *     "profilePos": "string"
 *   }
 * ]
 * Note: "profileSrc" is optional; the other keys are not.
 * @constant
 * @type {string}
 */
const TEAM_PROFILE_PATH = './assets/json/aboutprofiles.json';

window.addEventListener('DOMContentLoaded', init);

/**
 * @description The main function that runs on this page, after the page has loaded. It fetches the team profiles from the JSON file and adds the profiles and cards to the page.
 * @returns {Promise<void>} The Promise resolves when the profiles have been fetched and added to the page.
 */
async function init() {
  const teamProfiles = await loadProfiles(TEAM_PROFILE_PATH);
  addProfilesToPage(teamProfiles);
  addCardsToPage(teamProfiles);
}

/**
 * @description Reads in the profiles from the JSON file.
 * @param {string} filepath - the path to the JSON file that stores the profile data
 * @returns {Promise<Array<Object>>} The data from the JSON file
 */
async function loadProfiles(filepath) {
  const response = await fetch(filepath);
  return await response.json();
}

/**
 * @description Adds the about-profiles to the About Us page
 * @param {Array<Object>} teamProfiles - An array of Objects containing the profile data.
 * @see {@link AboutProfile}
 * @returns {void} This function does not return a value.
 */
function addProfilesToPage(teamProfiles) {
  const profileHolder = document.getElementById('about-profile-grid');
  for (let i = 0; i < teamProfiles.length; i++) {
    const profile = document.createElement('about-profile');
    profile.data = teamProfiles[i];
    profileHolder.append(profile);
  }
}

/**
 * @description Adds the about-cards to the About Us page
 * @param {Array<Object>} teamProfiles - An array of Objects containing the profile data.
 * @see {@link AboutCard}
 * @returns {void} This function does not return a value.
 */
function addCardsToPage(teamProfiles) {
  const aboutHolder = document.getElementById('about-column');
  for (let i = 0; i < teamProfiles.length; i++) {
    const card = document.createElement('about-card');
    card.data = teamProfiles[i];
    aboutHolder.append(card);
  }
}
