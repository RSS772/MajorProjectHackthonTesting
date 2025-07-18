import { test, expect } from '@playwright/test';
import { AccountLogin } from '../pages/AccountLogin';
import loginData from '../data/loginData.json';

let accountLogin;

test.beforeEach(async ({ page }) => {
  accountLogin = new AccountLogin(page);
  await accountLogin.gotoLoginPage();
});

test.afterEach(async ({ page }) => {
  console.log('Test finished.');
});

//
// Sanity Suite
//

  test('@sanity Valid Login', async () => {
    await accountLogin.login(loginData.valid.username, loginData.valid.password);
   
  });

  test('@sanity Checkbox validation', async () => {
    const isChecked = await accountLogin.isRememberMeChecked();
    expect(isChecked).toBe(true);
  });



//
//Regression Suite
//

  test('@regression Empty Password Field Error', async () => {
    await accountLogin.login(loginData.emptyPassword.username, loginData.emptyPassword.password);
    const errorMessage = await accountLogin.getPasswordErrorText();
    expect(errorMessage).toContain('Password field cannot be empty');
  })

  test('@regression Empty login input error messages', async () => {
    await accountLogin.login(loginData.emptyBoth.username, loginData.emptyBoth.password);
    const usernameError = await accountLogin.getUsernameErrorText();
    const passwordError = await accountLogin.getPasswordErrorText();
    expect(usernameError).toContain('Mobile Number / Email ID field cannot be empty');
    expect(passwordError).toContain('Password field cannot be empty');
  });

