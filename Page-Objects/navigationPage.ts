import { Locator, Page } from "@playwright/test"
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
  readonly FormLayoutsMenuitem: Locator;
  readonly DatePickerMenuitem: Locator;
  readonly DailogMenuitem: Locator;

  constructor(page: Page) {
    super(page)
    this.FormLayoutsMenuitem = this.page.getByText('Form Layout')
    this.DatePickerMenuitem = this.page.getByText('Datepicker')
    this.DailogMenuitem = this.page.getByText('Dialog')
  }

  async formlayoutspage() {
    await this.selectGroupMenuItem('Forms')
    await this.waitForNumberOfSeconds(2);
    await this.FormLayoutsMenuitem.click();
  }

  async datepickerpage() {
    await this.selectGroupMenuItem('Forms')
    await this.page.waitForTimeout(1000)
    await this.DatePickerMenuitem.click();
  }

  async modalOverlaysDialog() {
    await this.page.getByText('Modal & Overlays').click();
    await this.DailogMenuitem.click();
  }

  async modalOverlaysWindow() {
    await this.page.getByText('Modal & Overlays').click();
    await this.page.getByText('Window').click();
  }

  async modalOverlayspopover() {
    await this.page.getByText('Modal & Overlays').click();
    await this.page.getByText('Popover').click();
  }

  async modalOverlaystoastr() {
    await this.page.getByText('Modal & Overlays').click();
    await this.page.getByText('Toastr').click();
  }

  async modalOverlaystooltip() {
    await this.page.getByText('Modal & Overlays').click();
    await this.page.getByText('Tooltip').click();
  }

  async Calenderpage() {
    await this.page.getByText('Extra Components').click()
    await this.page.getByText('Calendar').click();
  }

  async smarttablepage() {
    await this.page.getByText('Tables & Data').click()
    await this.page.getByText('Smart Table').click();
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle)
    const expandedState = await groupMenuItem.getAttribute("aria-expanded")
    if (expandedState == "false")
      await groupMenuItem.click()
  }

  async LoginpageNavigation() {
    await this.page.getByText('Auth').click();
    await this.page.getByText('Login').click();
  }

  async RegisterpageNavigation() {
    await this.page.getByText('Auth').click();
    await this.page.getByText('Register').click();
  }

  async RequestPassword() {
    await this.page.getByText('Auth').click();
    await this.page.getByText('Request Password').click();
  }

  async Changepassword() {
    await this.page.getByText('Auth').click()
    await this.page.getByText('Reset Password').click()
  }
}