const { test, expect } = require('@playwright/test');
const { CorporateWellnessPage } = require('../pages/CorporateWellnessPage');

test('@sanity Url contains corporate',async({page})=>{
 
  const wellnessPage = new CorporateWellnessPage(page);
  await wellnessPage.goto();
  const url = await page.url();
  console.log("Current URL:", url);
  await expect(url).toContain('corporate');
  console.log("URL contains 'corporate'");
 
});


test('@sanity Validate form does not allow submission with invalid data', async ({ page }) => {
  const wellnessPage = new CorporateWellnessPage(page);
  await wellnessPage.goto();
  await wellnessPage.fillInvalidDetails();
  await expect(wellnessPage.scheduleButton).toBeDisabled();
  console.log("Button was disabled — invalid input correctly prevented submission.");
});

test('@sanity Form enables Schedule Demo button with valid input', async ({ page }) => {
  const wellnessPage = new CorporateWellnessPage(page);
  await wellnessPage.goto();
  await wellnessPage.fillValidDetails();
  await expect(wellnessPage.scheduleButton).toBeEnabled();
});

test('@regression Dropdown values reflect correctly after selection', async ({ page }) => {
  const wellnessPage = new CorporateWellnessPage(page);
  await wellnessPage.goto();

  await wellnessPage.orgSizeSelect.selectOption({ label: '1001-5000' });
  await wellnessPage.interestSelect.selectOption({ label: 'Referring someone' });

  const sizeValue = await wellnessPage.orgSizeSelect.inputValue();
  const interestValue = await wellnessPage.interestSelect.inputValue();

  await expect(sizeValue).toBe('1001-5000');
  await expect(interestValue).toBe('Referring someone');
});
