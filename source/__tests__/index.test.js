/**
 * @description This function creates a promise that resolves after a specified number of milliseconds. It's
 * useful for creating delays in an async/await context.
 * @function
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise} A promise that resolves after the specified delay.
 * @exports timeout
 */
export async function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('Navigation To About Page', () => {
  // visit page
  beforeAll(async () => {
    await page.goto(
      'https://cse110-sp23-group3.github.io/cse110-sp23-group3/source/index.html'
    );
  });

  it('Check for existence of About Us button', async () => {
    const aboutButton = await page.$('li a[href="aboutus.html"]');
    expect(aboutButton).not.toBeNull();
  }, 10000);

  it('Click About Us button to go to About Us page', async () => {
    const aboutButton = await page.$('a[href="aboutus.html"]');
    await aboutButton.click();
    await page.waitForNavigation();
    expect(page.url()).toBe(
      'https://cse110-sp23-group3.github.io/cse110-sp23-group3/source/aboutus.html'
    );
  });

  it('Check that all profiles are present in the grid', async () => {
    await timeout(1000);
    const profilesGrid = await page.$$('about-profile');
    const allArePopulated = profilesGrid.length === 10;
    expect(allArePopulated).toBeTruthy();
  });

  it('Check that all full length profiles are present', async () => {
    await timeout(1000);
    const profilesFull = await page.$$('about-card');
    const allArePopulated = profilesFull.length === 10;
    expect(allArePopulated).toBeTruthy();
  });

  it('Click back to go back to home page', async () => {
    const backButton = await page.$('a[href="index.html"]');
    await backButton.click();
    await page.waitForNavigation();
    expect(page.url()).toBe(
      'https://cse110-sp23-group3.github.io/cse110-sp23-group3/source/index.html'
    );
  });
});

describe('Navigation To About Page From Disclaimer', () => {
  // visit page
  beforeAll(async () => {
    await page.goto(
      'https://cse110-sp23-group3.github.io/cse110-sp23-group3/source/index.html'
    );
  });

  it('Check for existence of Disclaimer link', async () => {
    const aboutButton = await page.$('span a[href="./aboutus.html"]');
    expect(aboutButton).not.toBeNull();
  }, 10000);

  it('Click link in disclaimer to go to About Us page', async () => {
    const aboutButton = await page.$('span a[href="./aboutus.html"]');
    await aboutButton.click();
    await page.waitForNavigation();
    expect(page.url()).toBe(
      'https://cse110-sp23-group3.github.io/cse110-sp23-group3/source/aboutus.html'
    );
  }, 10000);

  it('Check that all profiles are present in the grid', async () => {
    await timeout(1000);
    const profilesGrid = await page.$$('about-profile');
    const allArePopulated = profilesGrid.length === 10;
    expect(allArePopulated).toBeTruthy();
  });

  it('Check that all full length profiles are present', async () => {
    await timeout(1000);
    const profilesFull = await page.$$('about-card');
    const allArePopulated = profilesFull.length === 10;
    expect(allArePopulated).toBeTruthy();
  });

  it('Click back to go back to home page', async () => {
    const backButton = await page.$('a[href="index.html"]');
    await backButton.click();
    await page.waitForNavigation();
    expect(page.url()).toBe(
      'https://cse110-sp23-group3.github.io/cse110-sp23-group3/source/index.html'
    );
  });
});

describe('Test theme switch changes theme homepage', () => {
  // visit page
  beforeAll(async () => {
    await page.goto(
      'https://cse110-sp23-group3.github.io/cse110-sp23-group3/source/index.html'
    );
  });

  it('Test that clicking the switch toggles the theme', async () => {});
});
