const { test, expect } = require('@playwright/test');
const { DiagnosticsPage } = require('../pages/DiagnosticsPage');



test('@sanity Get top diagnostic cities', async ({ page }) => {
  const diagnosticsPage = new DiagnosticsPage(page);
  await diagnosticsPage.goto();
  const cities = await diagnosticsPage.getCityList();
  console.log("Cities:", cities);
});

test('@regression Check for duplicate cities in diagnostics list', async ({ page }) => {
  const diagnosticsPage = new DiagnosticsPage(page);
  await diagnosticsPage.goto();
  const cities = await diagnosticsPage.getCityList();

  const uniqueCities = new Set(cities);
  await expect(uniqueCities.size).toBe(cities.length); // ensure no duplicates
  console.log("No duplicates detected.");
});

test('@sanity Check for presence of popular cities', async ({ page }) => {
  const diagnosticsPage = new DiagnosticsPage(page);
  await diagnosticsPage.goto();
  const cities = await diagnosticsPage.getCityList();

  const mustInclude = ['Mumbai', 'Delhi', 'Chennai'];
  mustInclude.forEach(city => expect(cities).toContain(city));
});

