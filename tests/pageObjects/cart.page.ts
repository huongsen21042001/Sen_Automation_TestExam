import { expect, Locator, Page } from "@playwright/test";
import CommonPage from "./page";

export default class CartPage extends CommonPage {
  page: Page;
  constructor(page: Page) {
      super(page);
    this.page = page;
  }
  get continueShoppingBtn(): string {
    return "//button[@id='continue-shopping']";
  }

  get checkoutBtn(): string {
    return "//button[@id='checkout']";
  }

  get removeBtn(){
    return"//button[@id='remove-sauce-labs-backpack']";
  }



}