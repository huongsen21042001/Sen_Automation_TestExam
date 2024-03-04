

  import { expect, Locator, Page } from "@playwright/test";
  import CommonPage from "./page";

  export default class CheckoutPage extends CommonPage {
    page: Page;
    constructor(page: Page) {
        super(page);
      this.page = page;
    }

    //------------------- Checkout Information -------------------//

    get firstNameInput(): string {
      return "//input[@id='first-name']";
    }

    get lastNameInput(): string {
      return "//input[@id='last-name']";
    }

    get postalCode():string {
      return "//input[@id='postal-code']";
    }

    get cancelBtn() : string{
      return "//button[contains(text(),'Cancel')]";
    }

    get continuelBtn() : string{
      return "//input[@id='continue']";
    }

    get firstNameRequired() :string{
      return"//h3[contains(text(),'Error: First Name is required')]";
    }

    get lastNameRequired() :string{
      return"//h3[contains(text(),'Error: Last Name is required')]";
    }

    get postalCodeRequired() :string{
      return"//h3[contains(text(),'Error: Postal Code is required')]";
    }
    

 //------------------ Checkout Overview --------------------------//

    get finishBtn() : string{
      return "//button[@id='finish']";
    }
//------------------- Checkout Complete -------------------------//

    get completeMessage():string{
      return "//h2[contains(text(),'Thank you for your order!')]"
    }

  }










 