// the CSS for each about-card
const CARD_STYLE = `
/* CARD LAYOUT */
article.about-card-left {
  width: 100%;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 100%;
}

article.about-card-right {
  width: 100%;
  display: grid;
  grid-template-columns: 75% 25%;
  grid-template-rows: 100%;
}

div.about-card-inner-holder-right {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
}

div.about-card-inner-holder-left {
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 1;
}

/* PROFILE PICTURE */

img.profile-left {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  grid-column-start: 1;
  grid-column-end: 1;
  align-self: center;
  justify-self: center;
  object-fit: cover;
  z-index: 1;
}

img.profile-right {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  grid-column-start: 2;
  grid-column-end: 2;
  align-self: center;
  justify-self: center;
  object-fit: cover;
  z-index: 1;
}

/* DARKEN PROFILE IF ON MOBILE */
@media (max-width: 767px) {
  img {
    filter: brightness(50%);
  }
}

/* NAME, ROLE, AND DESCRIPTION TEXT */
h1 {
  font-size: 16pt;
  font-weight: bolder;
  z-index: 2;
  position: relative;
}

p {
  z-index: 2;
  position: relative;
}
`

// the file path to the default profile image
const DEFAULT_PROFILE = "./assets/images/profile_images/profile.webp";

/**
 * @classdesc A custom AboutCard element for the About page that contains information about one person. Includes a person's name, role, and description. Optionally includes a profile picture. The profile picture can be either on the right or the left.
 */
class AboutCard extends HTMLElement {

  /**
   * @constructor The constructor for the AboutCard custom HTML element.
   */
  constructor() {
    super();
    let shadowDOM = this.attachShadow({mode: 'open'});
    let article = document.createElement("article");
    let style = document.createElement("style");
    style.textContent = CARD_STYLE;
    shadowDOM.append(style, article);
  }

  /**
   * @description This function sets the data in the card (profile pic, name, etc.). It is called when the about-card's data attribute is set. The data attribute should be set to a JavaScript object in the format below.
   * @param {Object} data - An object containing the data to put into the card in the following format:
   *                        {
   *                          "profileSrc": "string",
   *                          "name": "string",
   *                          "role": "string",
   *                          "description": "string",
   *                          "profilePos": "string"
   *                        }
   *                        The "profileSrc" key is the only optional key. If it is not present, the profile picture defaults to a preset one.
   */
  set data(data) {
    // if argument is empty, return
    if (!data) {
      return;
    }

    let shadowDOM = this.shadowRoot;
    let article = shadowDOM.lastChild;
    
    // the class name of the article determines whether the profile picture is on the right or left
    if (data['profilePos'] === "left") {
      article.classList.add("about-card-left");
    } else if (data['profilePos'] === "right") {
      article.classList.add("about-card-right");
    }
    if (article.classList[0] === "about-card-left") {
      article.innerHTML = `
      <img class="profile-left" src="${data['profileSrc'] ? data['profileSrc'] : DEFAULT_PROFILE}">
      <div class="about-card-inner-holder-right">
        <h1 class="name text-xl">${data['name']} | ${data['role']}</h1>
        <p class="description text-base">${data['description']}</p>
      </div>
      `;
    } else if (article.classList[0] === "about-card-right") {
      article.innerHTML = `
      <img class="profile-right" src="${data['profileSrc'] ? data['profileSrc'] : DEFAULT_PROFILE}">
      <div class="about-card-inner-holder-left">
        <h1 class="name text-xl">${data['name']} | ${data['role']}</h1>
        <p class="description text-base">${data['description']}</p>
      </div>
      `;
    }
  }
}

customElements.define('about-card', AboutCard);
