describe('Navigation To About Page', () => {
  // visit page TODO: update to the correct URL
  beforeAll(async () => {
    await page.goto(
      'https://cse110-sp23-group3.github.io/cse110-sp23-group3/source/index.html'
    );
  });

  it('Check for existence of About Us button', async () => {
    const aboutUsButton = await page.$('a[href="aboutus.html"]');
    expect(aboutUsButton).not.toBeNull();
  });

  it('Clicking About Us button takes you to About Us page', async () => {
    const aboutUsButton = await page.$('a[href="aboutus.html"]');
    await aboutUsButton.click();
    await page.waitForSelector('div#about-title h1');
    const aboutUsTitle = await page.$('div#about-title h1');
    const aboutUsTitleInnerText = await aboutUsTitle.getProperty('innerText');
    const aboutUsTitleInnerTextJson = await aboutUsTitleInnerText.jsonValue();
    expect(aboutUsTitleInnerTextJson).toBe('About Us');
  });
});
