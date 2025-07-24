const { test, expect } = require('@playwright/test');
const { DiagnosticsPage } = require('../pages/DiagnosticsPage');

const fs = require('fs');
const path = require('path');
 
test('@regression Get top diagnostic cities and save to JSON', async ({ page }) => {
  try {
    const diagnosticsPage = new DiagnosticsPage(page);
    await diagnosticsPage.goto();
    const cities = await diagnosticsPage.getCityList();
 
    console.log("Cities:", cities);
 
   
    const outputPath = path.join(__dirname, '../data/diagnosticCities.json');
    fs.writeFileSync(outputPath, JSON.stringify({ cities }, null, 2), 'utf-8');
  } catch (error) {
    console.log('Error in Get top diagnostic cities test');
  }
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



