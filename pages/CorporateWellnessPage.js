export class CorporateWellnessPage {
  constructor(page) {
    this.page = page;

    // XPath selectors targeting the first form instance on the page
    this.nameInput = page.locator('//*[@id="name"]').first();
    this.orgInput = page.locator('//*[@id="organizationName"]').first();
    this.phoneInput = page.locator('//*[@id="contactNumber"]').first();
    this.emailInput = page.locator('//*[@id="officialEmailId"]').first();
    this.orgSizeSelect = page.locator('//*[@id="organizationSize"]').first();
    this.interestSelect = page.locator('//*[@id="interestedIn"]').first();
    this.scheduleButton = page.locator("//header[@id='header']//button[@type='submit'][normalize-space()='Schedule a demo']");
  }

  async goto() {
    try {
      await this.page.goto('https://www.practo.com/plus/corporate',);
    } catch (error) {
      console.error('Error navigating to the page:');
    }
  }

  async fillInvalidDetails() {
    try {
      await this.nameInput.fill('');
      await this.orgInput.fill('FakeOrg');
      await this.phoneInput.fill('123');
      await this.emailInput.fill('invalid@');
      await this.orgSizeSelect.selectOption({ label: '<500' });
      await this.interestSelect.selectOption({ label: 'Taking a demo' });
    } catch (error) {
      console.error('Error filling invalid details:');
    }
  }

  async submitForm() {
    try {
      await this.scheduleButton.click();
    } catch (error) {
      console.error('Error submitting the form:');
    }
  }

  async fillValidDetails() {
    try {
      await this.nameInput.fill('John Doe');
      await this.orgInput.fill('TechCorp Pvt Ltd');
      await this.phoneInput.fill('9876543210');
      await this.emailInput.fill('john@techcorp.com');
      await this.orgSizeSelect.selectOption({ label: '501-1000' });
      await this.interestSelect.selectOption({ label: 'Taking a demo' });
    } catch (error) {
      console.error('Error filling valid details:');
    }
  }
}
