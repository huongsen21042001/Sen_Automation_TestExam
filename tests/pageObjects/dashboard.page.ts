import { expect, Locator, Page } from "@playwright/test";
import CommonPage from "./page";

export default class DashboardPage extends CommonPage {
  page: Page;
  constructor(page: Page) {
      super(page);
    this.page = page;
  }

  get headerLabel(): string {
    return "//div[contains(text(),'Swag Labs')]";
  }

  get cartIcon(){
    return "//a[@class='shopping_cart_link']";
  }

  get menuIcon(){
    return"//div[@class='bm-burger-button']";
  }

  get addToCartBtn(){
    return"//button[@id='add-to-cart-sauce-labs-backpack']";
  }

  //======================== Menu Item List =================

  get allItemMenu(){
    return"//a[contains(text(),'All Items')]";
  }

  get aboutMenu(){
    return"//a[contains(text(),'About')]";
  }

  get logoutMenu(){
    return"//a[contains(text(),'Reset App State')]";
  }

  get iconCloseMenuItem(){
    return "//button[@id='react-burger-cross-btn']";
  }

}