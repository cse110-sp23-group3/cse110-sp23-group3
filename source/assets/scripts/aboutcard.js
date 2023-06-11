// the CSS for each about-card
const CARD_STYLE = `
/* CARD LAYOUTS */

/* GENERAL */
article.about-card-left {
  width: 100%;
  display: grid;
}

article.about-card-right {
  width: 100%;
  display: grid;
}

/* DESKTOP ONLY */

@media (min-width: 768px) {
  article.about-card-left {
    grid-template-columns: 25% 75%;
    grid-template-rows: 100%;
  }

  article.about-card-right {
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
}

/* Mobile Only */

@media (max-width: 767px) {
  article.about-card-left {
    grid-template-columns: 100%;
  }

  article.about-card-right {
    grid-template-columns: 100%;
  }

  div.about-card-inner-holder-right {
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 2;
    grid-row-end: 2;
  }

  div.about-card-inner-holder-left {
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 2;
    grid-row-end: 2;
  }
}

/* PROFILE PICTURE */

/* GENERAL */

img.profile-left {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  align-self: center;
  object-fit: cover;
  z-index: 1;
  border: 1px solid black;
}

img.profile-right {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  align-self: center;
  object-fit: cover;
  z-index: 1;
  border: 1px solid black;
}

/* DESKTOP */
@media (min-width: 768px) {
  img.profile-left {
    grid-column-start: 1;
    grid-column-end: 1;
    justify-self: start;
  }
  img.profile-right {
    grid-column-start: 2;
    grid-column-end: 2;
    justify-self: end;
  }
}

/* MOBILE */
@media (max-width: 767px) {
  img.profile-left {
    grid-column-start: 1;
    grid-column-end: 1;
    justify-self: center;
  }
  img.profile-right {
    grid-column-start: 1;
    grid-column-end: 1;
    justify-self: center;
  }
}

/* NAME, ROLE, AND DESCRIPTION TEXT */

/* MOBILE */

@media (max-width: 767px) {
  h1 {
    text-align: center;
  }
  
  p {
    text-align: center;
  }
}

h1 {
  font-size: 16pt;
  font-weight: bolder;
  z-index: 2;
  position: relative;
  color: var(--text-primary-dark);
}

p {
  z-index: 2;
  position: relative;
  color: var(--text-primary-dark);
}
`;

// the file path to the default profile image
const DEFAULT_PROFILE = './assets/images/profile_images/profile.webp';

/**
 * @classdesc A custom AboutCard element for the About page that contains information about one person. Includes a person's name, role, and description. Optionally includes a profile picture. The profile picture can be either on the right or the left.
 * @extends HTMLElement
 */
class AboutCard extends HTMLElement {
  /**
   * @constructor The constructor for the AboutCard custom HTML element.
   */
  constructor() {
    super();
    const shadowDOM = this.attachShadow({ mode: 'open' });
    const article = document.createElement('article');
    const style = document.createElement('style');
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

    const shadowDOM = this.shadowRoot;
    const article = shadowDOM.lastChild;

    // the class name of the article determines whether the profile picture is on the right or left
    let position = 'right'; // default to right
    if (data.profilePos === 'left') {
      position = 'left';
    }

    // Add class to article
    article.classList.add(`about-card-${position}`);

    // Choose image class and holder class based on position
    const imgClass = `profile-${position}`;
    const holderClass = `about-card-inner-holder-${
      position === 'left' ? 'right' : 'left'
    }`;

    // Set HTML
    article.innerHTML = `
    <img class="${imgClass}" src="${
      data.profileSrc ? data.profileSrc : DEFAULT_PROFILE
    }">
    <div class="${holderClass}">
      <h1 class="name text-xl">${data.name} | ${data.role}</h1>
      <p class="description text-base">${data.description}</p>
    </div>
    `;
  }

  /**
   * @description This function gets the data from the card. It is called when the about-card's data attribute is accessed.
   * @returns {string} The current value of the data attribute of the card.
   */
  get data() {
    return this.getAttribute('data');
  }
}

customElements.define('about-card', AboutCard);
