import { expect, Locator, Page } from "@playwright/test";
import CommonPage from "./page";


export default class LoginPage extends CommonPage {
  page: Page;
  constructor(page: Page) {
      super(page);
    this.page = page;
  }
  get userNameInput(): string {
    return "//input[@id='user-name']";
  }

  get passwordInput(): string {
    return "//input[@id='password']";
  }
  
  get signInBtn(): string {
    return "//input[@id='login-button']";
  }

  get requiredUsernameMessage(){
    return "//h3[contains(text(),'Epic sadface: Username is required')]";
  }

  get requiredPasswordMessage(){
    return "//h3[contains(text(),'Epic sadface: Password is required')]";
  }

  get invalidDataMessage(){
    return "//h3[contains(text(),'Epic sadface: Username and password do not match any user in this service')]";
  }

}