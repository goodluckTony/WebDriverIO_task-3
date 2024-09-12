const Page = require("./page");

class PastebinPage extends Page {
  get codeInput() { return $('#postform-text'); };
  get syntaxHighlightningSearchMenu() { return $('#select2-postform-format-container'); };
  get expirationDropdown() { return $('#select2-postform-expiration-container'); };
  get titleInput() { return $('#postform-name'); };
  get createPasteButton() { return $('//button[text()="Create New Paste"]'); };

  async enterCode(code) {
      await this.codeInput.setValue(code);
  }

  async syntaxHighlightning(value, option) {
    await this.syntaxHighlightningSearchMenu.click();
    const syntaxHighlightningSearch = await $('.select2-search__field');
    await syntaxHighlightningSearch.setValue(value);
    const syntaxHighlightningSearchOption = await $(`//li[text()="${option}"]`);
    await syntaxHighlightningSearchOption.click();
  }

  async selectExpiration(option) {
      await this.expirationDropdown.click();
      const expirationOption = await $(`//li[text()="${option}"]`);
      await expirationOption.click();
  }

  async enterTitle(title) {
      await this.titleInput.setValue(title);
  }

  async submitPaste() {
      await this.createPasteButton.click();
  }

  open() {
      super.open('https://pastebin.com');
  }
};

module.exports = new PastebinPage();