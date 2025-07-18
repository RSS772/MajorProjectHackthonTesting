import { test, expect } from '@playwright/test';
import { HospitalPage } from '../pages/HospitalPage';


test('@regression Find hospitals in Chennai with filters', async ({ page }) => {
  const hospitalPage = new HospitalPage(page);
  await hospitalPage.navigating();
  await hospitalPage.locatinghospital('Chennai');
  await hospitalPage.hospital('Hospital');
  await hospitalPage.printQualifiedHospitals();
});


test('@regression Get doctors from the first hospital card', async ({ page }) => {
  const hospitalPage = new HospitalPage(page);
  await hospitalPage.navigating();
  await hospitalPage.locatinghospital('Chennai');
  await hospitalPage.hospital('Hospital');
  await hospitalPage.printDoctorsOfFirstHospital();
});
 
test('@regression Enter invalid hospital type and capture message', async ({ page }) => {
    const hospitalPage = new HospitalPage(page);
    await hospitalPage.navigating();
    const errorMessage = await hospitalPage.enterInvalidSearchAndCaptureMessage('%#^&^*');
    console.log("Captured Error Message:", errorMessage)
});

test('@regression Display the hospital price range between range', async ({ page }) => {
  // Instantiate page objects
  const loge = new HospitalPage(page);
  await loge.navigating();
  await loge.locatinghospital('Kerala');
  //  await page.pause();
  await loge.hospital("Hospital")
  // await page.pause();
  await loge.gethospitals(0,1000);
});