describe('Navigation To About Page', () => {
  // visit page TODO: update to the correct URL
  beforeAll(async () => {
    await page.goto(
      'https://cse110-sp23-group3.github.io/cse110-sp23-group3/source/index.html'
    );
  });

  it('Check for existence of Send button', async () => {
    const sendButton = await page.$('button[type="submit"]');
    expect(sendButton).not.toBeNull();
  });
});
