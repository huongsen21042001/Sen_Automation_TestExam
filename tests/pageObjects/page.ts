
import { expect, Locator, Page, Browser, BrowserContext } from "@playwright/test";

export default class CommonPage {
    page: Page;
    browser: Browser;
    browserContext: BrowserContext;
constructor(page: Page, browser: Browser) {
    this.page = page;
    this.browser = browser;
    }
  async openBrowser(url: string) {
    await this.page.goto(url);
  }

  async openNewTab(browser: Browser,url: string) {
    const browserContext =  await browser.newContext();
    const page = await browserContext.newPage();
    await page.goto(url);

  }

  async clickToElement(element: string) {
    await this.pause(2000)
    // await this.page.locator(element).scrollIntoViewIfNeeded();
    await this.page.locator(element).click();
  }

  async dblclickToElemnt(element:string){
    await this.pause(2000);
    await this.page.locator(element).dblclick();

  }

  async fillToElement(element: string, text: string) {
    await this.page.locator(element).fill(text);
  }

  async waitForElement(
    element: string,
    status: "attached" | "detached" | "visible" | "hidden",
    number: number
  ) {
    await this.page
      .locator(element)
      .waitFor({ state: status, timeout: number });
  }
  
  async pause(second: number) {
    await this.page.waitForTimeout(second);
  }
  
}