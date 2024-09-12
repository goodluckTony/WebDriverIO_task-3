const pastebinPage = require("../pageobjects/pastebin.page");
const PastebinPage = require("../pageobjects/pastebin.page");

describe("Create New Paste", async () => {
  it("should create a new paste with the correct details", async () => {
    await PastebinPage.open();

    const code = `
      git config --global user.name "New Sheriff in Town"
      git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
      git push origin master --force
    `;
    const title = "how to gain dominance among developers";

    await PastebinPage.enterCode(code);
    await pastebinPage.syntaxHighlightning("Bash", "Bash");
    await PastebinPage.selectExpiration("10 Minutes");
    await PastebinPage.enterTitle(title);
    await browser.pause(5000);
    await PastebinPage.submitPaste();



    const pageTitle = await browser.getTitle();
    expect(pageTitle).toContain(title);

    const syntaxHighlighting = await $('//a[text()="Bash"]');
    expect(await syntaxHighlighting.isDisplayed()).toBe(true);

    const displayedCode = await $('.bash').getText();
    await expect(displayedCode).toContain('New Sheriff in Town');

    await browser.pause(5000);
  });
});