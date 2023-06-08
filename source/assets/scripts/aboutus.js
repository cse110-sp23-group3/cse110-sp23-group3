/* The file path to the JSON file, which contains the data for the profiles.
   This file contains an array of obects. Each object must be in the format accepted by an about-card's data attribute. E.g.:
   [
      {
        "profileSrc": "string",
        "name": "string",
        "role": "string",
        "description": "string",
        "profilePos": "string"
      },
      {
        "profileSrc": "string",
        "name": "string",
        "role": "string",
        "description": "string",
        "profilePos": "string"
      }
   ]
   Note: "profileSrc" is optional; the other keys are not.
 */
const TEAM_PROFILE_PATH = './assets/json/aboutprofiles.json';

window.addEventListener('DOMContentLoaded', init);

/**
 * The main function that runs on this page, after the page has loaded.
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
 */
function addCardsToPage(teamProfiles) {
  const aboutHolder = document.getElementById('about-column');
  for (let i = 0; i < teamProfiles.length; i++) {
    const card = document.createElement('about-card');
    card.data = teamProfiles[i];
    aboutHolder.append(card);
  }
}
