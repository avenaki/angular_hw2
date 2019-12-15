import { browser, by, element } from "protractor";

export class AppPage {
  // tslint:disable-next-line:typedef
  navigateTo() {
    // tslint:disable-next-line:no-any
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  // tslint:disable-next-line:typedef
  getTitleText() {
    return element(by.css("app-root .content span")).getText() as Promise<string>;
  }
}
