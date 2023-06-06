// the CSS for each about-profile
const PROFILE_STYLE = `
figure.about-profile {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

@media (max-width: 767px) {
  img {
    width: 50px;
    height: 50px;
  }
}

figcaption {
  text-align: center;
  font-weight: bolder;
}
`;
// the file path to the default profile image
const PROFILE_DEFAULT = './assets/images/profile_images/profile.webp';

/**
 * @classdesc A custom AboutProfile element for the About Page that contains information on one person. Includes a person's name and, optionally, profile picture.
 * @extends HTMLElement
*/
class AboutProfile extends HTMLElement {

  /**
   * @constructor The constructor for the AboutProfile custom HTML element.
   */
  constructor() {
    super();
    const shadowDOM = this.attachShadow({ mode: 'open' });
    const figure = document.createElement('figure');
    figure.classList.add('about-profile');
    const style = document.createElement('style');
    style.textContent = PROFILE_STYLE;
    shadowDOM.append(style, figure);
  }
   /**
   * @description This function sets the data in the profile (profile pic, name). It is called when the about-profile's data attribute is set. The data attribute should be set to a JavaScript object in the format below.
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
    const figure = shadowDOM.lastChild;

    figure.innerHTML = `
    <img src="${
      data.profileSrc ? data.profileSrc : PROFILE_DEFAULT
    }">
    <figcaption class="text-xl">${data.name}</figcaption>`;
  }

  get data() {
    return this.getAttribute('data');
  }
}

customElements.define('about-profile', AboutProfile);
