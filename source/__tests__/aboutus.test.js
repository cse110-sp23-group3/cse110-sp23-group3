describe('Navigation To About Page', () => {
  // visit page TODO: update to the correct URL
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5501/source/');
  });

  it('Check for existence of About Us button', async() => {
    const aboutUsButton = await page.$('a[href="aboutus.html"]');
    expect(aboutUsButton).not.toBeNull();
  });

  it('Clicking About Us button takes you to About Us page', async() => {
    const aboutUsButton = await page.$('a[href="aboutus.html"]');
    await aboutUsButton.click();
    await page.waitForSelector('div#about-title h1');
    const aboutUsTitle = await page.$('div#about-title h1');
    const aboutUsTitleInnerText = await aboutUsTitle.getProperty('innerText');
    const aboutUsTitleInnerTextJson = await aboutUsTitleInnerText.jsonValue();
    expect(aboutUsTitleInnerTextJson).toBe("About Us");
  });
});
