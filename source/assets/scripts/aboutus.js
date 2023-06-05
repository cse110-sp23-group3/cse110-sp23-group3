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
const TEAM_PROFILE_PATH = "./assets/json/aboutprofiles.json";

window.addEventListener('DOMContentLoaded', init);

/**
 * The main function that runs on this page, after the page has loaded.
 */
async function init() {
  let teamProfiles = await loadProfiles(TEAM_PROFILE_PATH)
  addProfilesToPage(teamProfiles);
}

/**
 * @description Reads in the profiles from the JSON file.
 * @param {string} filepath - the path to the JSON file that stores the profile data
 * @returns {Promise<Array<Object>>} The data from the JSON file
 */
function loadProfiles(filepath) {
  return fetch(filepath).then(function(response) {
    return response.json();
  });
}

/**
 * @description Adds the profiles to the About Us page
 * @param {Array<Object>>} teamProfiles - An array of Objects containing the profile data.
 * @see {@link AboutCard}
 */
function addProfilesToPage(teamProfiles) {
  const aboutHolder = document.getElementById("about-column");
  for (let i = 0; i < teamProfiles.length; i++) {
    let card = document.createElement('about-card');
    card.data = teamProfiles[i];
    aboutHolder.append(card);
  }
}