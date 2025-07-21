import { expect } from '@playwright/test';

export class HospitalPage {
  constructor(page) {
    this.page = page;
    this.locationlocator = this.page.getByPlaceholder('Search location');
    this.hospitaltype = this.page.getByPlaceholder('Search doctors, clinics, hospitals, etc.');
    this.hospitalselec = this.page.locator('//div[@class="c-omni-suggestion-group"][1]/div[4]');
  }

  async navigating() {
    try {
      console.log('Navigating to the URL');
      await this.page.goto('https://www.practo.com/', { waitUntil: 'domcontentloaded' });
    } catch (error) {
      console.error('Error during navigation:');
    }
  }

  async locatinghospital(city) {
    try {
      console.log(`Filling location with: ${city}`);
      await this.locationlocator.fill(city);
    } catch (error) {
      console.error('Error while filling location field:');
    }
  }

  async hospital(type) {
    try {
      console.log(`Filling hospital type: ${type}`);
      await this.hospitaltype.fill(type);
      await this.hospitalselec.waitFor({ state: 'visible' });
      await this.hospitalselec.click();
    } catch (error) {
      console.error('Error during hospital type selection:');
    }
  }

  async printQualifiedHospitals() {
    try {
      await this.page.waitForSelector('.left .c-estb-card', { timeout: 10000 });

      const hospitalCards = await this.page.locator('.left .c-estb-card').all();
      const qualifiedHospitals = [];

      for (const card of hospitalCards) {
        try {
          const name = (await card.locator('.line-1').textContent()).trim();
          const ratingText = (await card.locator('.c-feedback .u-bold').textContent()).trim();
          const availabilityText = (await card.locator('.pd-right-2px-text-green').textContent()).trim();
          const locationText = (await card.locator('.c-locality-info').textContent()).trim();

          const ratingValue = parseFloat(ratingText);

          if (ratingValue > 3.5 && availabilityText.includes('24x7')) {
            qualifiedHospitals.push({
              name,
              rating: ratingValue,
              availability: availabilityText,
              location: locationText,
            });
          }

        } catch (error) {
          console.warn('Skipped a hospital due to missing or malformed data:');
        }
      }

      console.log('Qualified Hospitals:', qualifiedHospitals);
    } catch (error) {
      console.error('Error while fetching hospital cards:');
    }
  }

  async enterInvalidSearchAndCaptureMessage(invalidText) {
 
      await this.hospitaltype.click(); // Ensure focus
      await this.hospitaltype.fill(invalidText);
 
      await this.page.waitForTimeout(10000);
 
      await this.page.keyboard.press('Enter');
 
      // Wait for error message to appear
      const messageLocator = this.page.locator('.u-bold.u-large-font');
      await messageLocator.waitFor(); // Ensure it's visible
 
      const errMessage = await messageLocator.textContent();
 
      return errMessage;
  }




//  async printDoctorsOfFirstHospital() {
 
//         await this.page.waitForLoadState('domcontentloaded');
       
//         const firstHospital = await this.page.locator("(//div[@class='c-estb-card'])[1]");
//         //wait until it exists in DOM
//         await firstHospital.waitFor({ state: 'attached' });
//         //wait until it is visible
//         await expect(firstHospital).toBeVisible({timeout: 10000});
//         await expect(firstHospital).toBeEnabled();
        
//         try{
//           await firstHospital.click({timeout: 5000});
          
//         }catch(erroe){
//           console.warn("Clicked fail, retrying with force click")
//           await firstHospital.click({force: true});
//         }
       
//         await this.page.waitForLoadState('domcontentloaded');
 
//         const doctorNames = await this.page.locator('//h2[@class="doctor-name"]').all();
//         const names = [];
   
//         for (const doc of doctorNames) {
//           const name = (await doc.textContent()).trim();
//           names.push(name);
//         }
   
//         console.log("Doctors in first hospital:", names);
//     }
 


  async gethospitals(lowRange, highRange) {
    try {
      await this.page.waitForSelector('.c-estb-card', { timeout: 10000 });


      const hospitalCardsnow = await this.page.locator('.c-estb-card').all();
      console.log("Hospital cards found:", hospitalCardsnow.length);

      const rateHospitals = [];

      for (const card of hospitalCardsnow) {
        try {
          // Extract hospital name
          const hospitalName = (await card.locator('h2.line-1').textContent()).trim();

          // Extract rate text and parse numeric value
          const rateText = await card.locator('.c-estb-info .u-bold').first().textContent();
          // console.log(`Hospital: ${hospitalName}, Rate Text: ${rateText}`);

          let numericRate = null;
          if (rateText.includes('-')) {
            const match = rateText.match(/₹?\s*(\d+)\s*-\s*₹?\s*(\d+)/);
            if (match) {
              const minRate = parseInt(match[1], 10);
              const maxRate = parseInt(match[2], 10);
              numericRate = maxRate
            }
          } else {
            numericRate = parseInt(rateText.replace(/[^\d]/g, ''), 10);
          }
          // console.log(`Hospital: ${hospitalName}, Rate Text: "${rateText}"`);

          // Filter based on range
          if (numericRate > lowRange && numericRate < highRange) {
            rateHospitals.push(hospitalName);
          }
        } catch (innerError) {
          console.warn("Error processing individual card:");
        }
      }

      console.log(`Hospitals with rate in range ${lowRange} - ${highRange}:`, rateHospitals);
      return rateHospitals;

    } catch (error) {
      console.error("Error in getHospitals function:");
    }
  }
}



