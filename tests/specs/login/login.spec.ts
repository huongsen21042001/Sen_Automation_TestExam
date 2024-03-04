import { test, expect, chromium, Page } from '@playwright/test';
import LoginPage from '../../pageObjects/login.page';
import DashboardPage from '../../pageObjects/dashboard.page';
let userName: any;
let password: any;
userName = process.env.username_web;
password = process.env.password_web;
let page: Page;
let loginPage: LoginPage;
let dashboard: DashboardPage

test.beforeAll(async ({ }) => { 
  const browser = await chromium.launch();
  page = await browser.newPage();

  loginPage = new LoginPage(page)
  dashboard = new DashboardPage(page)
});
test.beforeEach(async ({}, testInfo) => {
  testInfo.setTimeout(testInfo.timeout + 60000);
  });
  test.afterEach(async ({ browser }) => {
    await page.evaluate(() => window.localStorage.clear());
    await page.evaluate(() => window.sessionStorage.clear());
    await page.reload();
    // await browser.close();
  });

  test('Login01 - Login successfully with correct username and password data', async ({  }) => {
    
    await test.step(`Open site Open site Sauce Demo`, async () => {
      await loginPage.openBrowser('/');
    });  

    await test.step(`User enters username`, async () => {
        await loginPage.fillToElement(loginPage.userNameInput, userName);
    });

    await test.step(`User enters password`, async () => {
      await loginPage.fillToElement(loginPage.passwordInput, password);
    });

    await test.step(`User clicks on Login button`, async () => {
      await loginPage.clickToElement(loginPage.signInBtn)
    });

    await test.step(`Expected the header label of the home page is displayed`, async () => {
        await dashboard.waitForElement(
            dashboard.headerLabel,
            'visible',
            30000);
      });
     
   
});

test('Login02 - User login failed with incorrect username', async ({  }) => {
    
  await test.step(`Open site Open site Sauce Demo`, async () => {
    await loginPage.openBrowser('/');
  });  

  await test.step(`User enters username`, async () => {
      await loginPage.fillToElement(loginPage.userNameInput, "sennorita");
  });

  await test.step(`User enters password`, async () => {
    await loginPage.fillToElement(loginPage.passwordInput, password);
  });

  await test.step(`User clicks on Login button`, async () => {
    await loginPage.clickToElement(loginPage.signInBtn)
  });

  await test.step(`Expected the error message with invalid username is displayed`, async () => {
      await loginPage.waitForElement(
        loginPage.invalidDataMessage,
        "visible",
        30000)
      
    });

});