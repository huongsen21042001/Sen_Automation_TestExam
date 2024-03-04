import { test, expect, chromium, Page } from '@playwright/test';
import LoginPage from '../../pageObjects/login.page';
import DashboardPage from '../../pageObjects/dashboard.page';
import CartPage from '../../pageObjects/cart.page';
import CheckoutPage from'../../pageObjects/checkout.page';

let userName: any;
let password: any;
userName = process.env.username_web;
password = process.env.password_web;

let page: Page;
let loginPage: LoginPage;
let dashboard: DashboardPage
let checkout :CheckoutPage;
let cart : CartPage;

test.beforeAll(async ({ }) => { 
  const browser = await chromium.launch();
  page = await browser.newPage();

  loginPage = new LoginPage(page)
  dashboard = new DashboardPage(page)
  checkout = new CheckoutPage(page)
  cart = new CartPage(page)
});

test.beforeEach(async ({}, testInfo) => {
  testInfo.setTimeout(testInfo.timeout + 60000);
  await test.step(`Open site Sauce Demo`, async () => {
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

  await test.step(`The header label of the home page is displayed`, async () => {
      await dashboard.waitForElement(
          dashboard.headerLabel,
          'visible',
          30000);
    });
  });
  test.afterEach(async ({ browser }) => {
    await page.evaluate(() => window.localStorage.clear());
    await page.evaluate(() => window.sessionStorage.clear());
    await page.reload();
    // await browser.close();
  });

  test('Checkout03 - User checkout successfully', async ({  }) => {

    await test.step(`User select item add to cart`, async () => {
      await dashboard.clickToElement(dashboard.addToCartBtn);
    });  

    await test.step(`User clicks on cart icon`, async () => {
      await dashboard.clickToElement(dashboard.cartIcon);
      await dashboard.pause(3000);
    });  

    await test.step(`User clicks on checkout button`, async () => {
      await cart.clickToElement(cart.checkoutBtn);
      await cart.pause(3000);
    });  

    await test.step(`User enters fistname`, async () => {
      await checkout.fillToElement(checkout.firstNameInput,"Sen")
    });  

    await test.step(`User enters lastname`, async () => {
      await checkout.fillToElement(checkout.lastNameInput,"Test")
    });  

    await test.step(`User enters postal code`, async () => {
      await checkout.fillToElement(checkout.postalCode,"2104")
      await checkout.pause(3000);
    });  

    await test.step(`User clicks on continue button`, async () => {
      await checkout.clickToElement(checkout.continuelBtn);
      await checkout.pause(3000);
    });  

    await test.step(`User clicks on finish button`, async () => {
      await checkout.clickToElement(checkout.finishBtn);
      await checkout.pause(3000);
    });
    
    await test.step(`Expected user checkout successfully`, async () => {
      await checkout.waitForElement(
        checkout.completeMessage,
        "visible",
        30000
      )
    });  

});
test('Checkout04 - User cannot checkout when user does not fill enough payment information', async ({  }) => {

  await test.step(`User select item add to cart`, async () => {
    await dashboard.clickToElement(dashboard.addToCartBtn);
  });  

  await test.step(`User clicks on cart icon`, async () => {
    await dashboard.clickToElement(dashboard.cartIcon);
    await dashboard.pause(3000);
  });  

  await test.step(`User clicks on checkout button`, async () => {
    await cart.clickToElement(cart.checkoutBtn);
    await cart.pause(3000);
  });  

  await test.step(`User enters fistname`, async () => {
    await checkout.fillToElement(checkout.firstNameInput,"")
  });  

  await test.step(`User enters lastname`, async () => {
    await checkout.fillToElement(checkout.lastNameInput,"Tes")
  });  

  await test.step(`User enters postal code`, async () => {
    await checkout.fillToElement(checkout.postalCode,"2104")
    await checkout.pause(3000);
  });  

  await test.step(`User clicks on continue button`, async () => {
    await checkout.clickToElement(checkout.continuelBtn);
    await checkout.pause(3000);
  });  

  await test.step(`Expected the error message with empty username is displayed`, async () => {
    await checkout.waitForElement(
      checkout.firstNameRequired,
      "visible",
      30000
    )
  });  


  

});
