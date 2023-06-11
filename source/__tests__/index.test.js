describe('Navigation To About Page', () => {
  // visit page
  beforeAll(async () => {
    await page.goto(
      'https://cse110-sp23-group3.github.io/cse110-sp23-group3/source/index.html'
    );
  });

  it ('Check for existence of About Us button', async () => {
     const aboutButton = await page.$('li a[href="aboutus.html"]');
     expect(aboutButton).not.toBeNull();
  }, 10000);

  
  it ('Click About Us button to go to About Us page', async () => {
    const aboutButton = await page.$('a[href="aboutus.html"]');
    await aboutButton.click();
    await page.waitForNavigation();
    expect(page.url()).toBe('https://cse110-sp23-group3.github.io/cse110-sp23-group3/source/aboutus.html');
  });

  it ('Check that all profiles are present in the grid', async () => {
    const profilesGrid = await page.$$('about-profile');
    let allArePopulated = true;
    let data;
    let plainValue;
    console.log('Checking to make sure all profiles in grid are populated')
    for (let i = 0; i < profilesGrid.length; i++) {
      console.log(`Checking item ${i + 1}/${profilesGrid.length}`);
      data = await profilesGrid[i].getProperty('data');
      plainValue = await data.jsonValue();
      if (plainValue.name.length === 0) {
        allArePopulated = false;
      }
      if (plainValue.role.length === 0) {
        allArePopulated = false;
      }
      if (plainValue.description.length === 0) {
        allArePopulated = false;
      }
      if (plainValue.profilePos.length === 0) {
        allArePopulated = false;
      }
    }
    expect(allArePopulated).toBeTruthy();
  });

  it ('Check that all full length profiles are present', async () => {
    const profilesFull = await page.$$('about-card');
    let allArePopulated = true;
    let data;
    let plainValue;
    console.log('Checking to make sure all full profiles are populated')
    for (let i = 0; i < profilesFull.length; i++) {
      console.log(`Checking item ${i + 1}/${profilesFull.length}`);
      data = await profilesFull[i].getProperty('data');
      plainValue = await data.jsonValue();
      if (plainValue.name.length === 0) {
        allArePopulated = false;
      }
      if (plainValue.role.length === 0) {
        allArePopulated = false;
      }
      if (plainValue.description.length === 0) {
        allArePopulated = false;
      }
      if (plainValue.profilePos.length === 0) {
        allArePopulated = false;
      }
    }
    expect(allArePopulated).toBeTruthy();
  });

  it ('Click back to go back to home page', async () => {
    const backButton = await page.$('a[href="index.html"]');
    await backButton.click();
    await page.waitForNavigation();
    expect(page.url()).toBe('https://cse110-sp23-group3.github.io/cse110-sp23-group3/source/index.html');
  });
});

describe('Navigation To About Page From Disclaimer', () => {
  // visit page
  beforeAll(async () => {
    await page.goto(
      'https://cse110-sp23-group3.github.io/cse110-sp23-group3/source/index.html'
    );
  });

  it ('Check for existence of Disclaimer link', async () => {
     const aboutButton = await page.$('span a[href="./aboutus.html"]');
     expect(aboutButton).not.toBeNull();
  }, 10000);

  
  it ('Click link in disclaimer to go to About Us page', async () => {
    const aboutButton = await page.$('span a[href="./aboutus.html"]');
    await aboutButton.click();
    await page.waitForNavigation();
    expect(page.url()).toBe('https://cse110-sp23-group3.github.io/cse110-sp23-group3/source/aboutus.html');
  });

  it ('Check that all profiles are present in the grid', async () => {
    const profilesGrid = await page.$$('about-profile');
    let allArePopulated = true;
    let data;
    let plainValue;
    console.log('Checking to make sure all profiles in grid are populated')
    for (let i = 0; i < profilesGrid.length; i++) {
      console.log(`Checking item ${i + 1}/${profilesGrid.length}`);
      data = await profilesGrid[i].getProperty('data');
      plainValue = await data.jsonValue();
      if (plainValue.name.length === 0) {
        allArePopulated = false;
      }
      if (plainValue.role.length === 0) {
        allArePopulated = false;
      }
      if (plainValue.description.length === 0) {
        allArePopulated = false;
      }
      if (plainValue.profilePos.length === 0) {
        allArePopulated = false;
      }
    }
    expect(allArePopulated).toBeTruthy();
  });

  it ('Check that all full length profiles are present', async () => {
    const profilesFull = await page.$$('about-card');
    let allArePopulated = true;
    let data;
    let plainValue;
    console.log('Checking to make sure all full profiles are populated')
    for (let i = 0; i < profilesFull.length; i++) {
      console.log(`Checking item ${i + 1}/${profilesFull.length}`);
      data = await profilesFull[i].getProperty('data');
      plainValue = await data.jsonValue();
      if (plainValue.name.length === 0) {
        allArePopulated = false;
      }
      if (plainValue.role.length === 0) {
        allArePopulated = false;
      }
      if (plainValue.description.length === 0) {
        allArePopulated = false;
      }
      if (plainValue.profilePos.length === 0) {
        allArePopulated = false;
      }
    }
    expect(allArePopulated).toBeTruthy();
  });

  it ('Click back to go back to home page', async () => {
    const backButton = await page.$('a[href="index.html"]');
    await backButton.click();
    await page.waitForNavigation();
    expect(page.url()).toBe('https://cse110-sp23-group3.github.io/cse110-sp23-group3/source/index.html');
  });
});

describe ('Test theme switch changes theme homepage', () => {
  // visit page
  beforeAll(async () => {
    await page.goto(
      'https://cse110-sp23-group3.github.io/cse110-sp23-group3/source/index.html'
    );
  });

  it ('Test that clicking the switch toggles the theme', async () => {
    
  });
});
