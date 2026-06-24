import { Page, expect } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class WebTablespage extends HelperBase {
  constructor(page: Page) {
    super(page)
  }

  async webTablePageValidation() {
    const SmartTableHeader = this.page.locator('ngx-smart-table', { hasText: " Smart Table " })
    await expect(SmartTableHeader).toBeVisible()
    const expectedHeaders = ['ID', 'First Name', 'Last Name', 'Username', 'E-mail', 'Age'];
    const actualHeaders = await this.page.locator('table thead tr.ng2-smart-titles th').allTextContents();
    const cleanedHeaders = actualHeaders.map(header => header.trim()).filter(header => header !== 'Actions');
    expect(cleanedHeaders).toEqual(expectedHeaders);
  }

  async verifyFilterPlaceholders() {
    await expect(this.page.getByPlaceholder('ID')).toBeVisible();
    await expect(this.page.getByPlaceholder('First Name')).toBeVisible();
    await expect(this.page.getByPlaceholder('Last Name')).toBeVisible();
    await expect(this.page.getByPlaceholder('Username')).toBeVisible();
    await expect(this.page.getByPlaceholder('E-mail')).toBeVisible();
    await expect(this.page.getByPlaceholder('Age')).toBeVisible();
  }

  async verifyAddBTN() {
    const AddBTN = this.page.locator('.ng2-smart-action-add-add')
    await expect(AddBTN).toBeVisible();
  }

  async addNewRecord(ID: Number, Firstname: string, lastName: string, UserName: string, Email: string, Age: Number) {
    const AddBTN = this.page.locator('.ng2-smart-action-add-add')
    await AddBTN.click()
    const IDField = this.page.locator('tr input-editor').getByPlaceholder('ID')
    await IDField.fill(ID.toString())
    const FirstnameField = this.page.locator('tr input-editor').getByPlaceholder('First Name')
    await FirstnameField.fill(Firstname)

    const LastnameField = this.page.locator('tr input-editor').getByPlaceholder('Last Name')
    await LastnameField.fill(lastName)

    const UsernameField = this.page.locator('tr input-editor').getByPlaceholder('Username')
    await UsernameField.fill(UserName)

    const EmailField = this.page.locator('tr input-editor').getByPlaceholder('E-mail')
    await EmailField.fill(Email)

    const AgeField = this.page.locator('tr input-editor').getByPlaceholder('Age')
    await AgeField.fill(Age.toString())

    await this.page.locator('ng2-st-actions .ng2-smart-action-add-create').click();

    const NewRow = this.page.locator('tr.ng2-smart-row.selected')
    await expect(NewRow.locator('td').nth(1)).toHaveText(ID.toString());
    await expect(NewRow.locator('td').nth(2)).toHaveText(Firstname);
    await expect(NewRow.locator('td').nth(3)).toHaveText(lastName);
    await expect(NewRow.locator('td').nth(4)).toHaveText(UserName);
    await expect(NewRow.locator('td').nth(5)).toHaveText(Email);
    await expect(NewRow.locator('td').nth(6)).toHaveText(Age.toString());

    this.page.once('dialog', async dialog => {
      console.log('Dialog appeared');
      console.log(dialog.message());
      await dialog.accept('ok');
    });
    await this.page.locator('.ng2-smart-action-delete-delete').first().click();
    await expect(NewRow.locator('td').nth(1)).not.toHaveText(ID.toString());
    await expect(NewRow.locator('td').nth(2)).not.toHaveText(Firstname);
    await expect(NewRow.locator('td').nth(3)).not.toHaveText(lastName);
    await expect(NewRow.locator('td').nth(4)).not.toHaveText(UserName);
    await expect(NewRow.locator('td').nth(5)).not.toHaveText(Email);
    await expect(NewRow.locator('td').nth(6)).not.toHaveText(Age.toString());
  }

  async editingAnExistingRecord(UniqueValue: string, UpdatedValue: string) {
    this.page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const TargetRow = await this.page.locator('tr').filter({ hasText: UniqueValue }).first()
    await TargetRow.locator('.nb-edit').click()
    await this.page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await this.page.locator('input-editor').getByPlaceholder('E-mail').fill(UpdatedValue)
    await this.page.locator('.nb-checkmark').click()
    await expect(TargetRow).toContainText(UpdatedValue)
  }

  async deletePopupValidation() {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.page.locator('.ng2-smart-action-delete-delete').first().click();
    const dialog = await dialogPromise;
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toContain('delete');
    await dialog.accept();
  }

  async cancellingDeleteRecordinPopup(ID: Number, Firstname: string, lastName: string, UserName: string, Email: string, Age: Number) {
    const AddBTN = this.page.locator('.ng2-smart-action-add-add')
    await AddBTN.click()
    const IDField = this.page.locator('tr input-editor').getByPlaceholder('ID')
    await IDField.fill(ID.toString())
    const FirstnameField = this.page.locator('tr input-editor').getByPlaceholder('First Name')
    await FirstnameField.fill(Firstname)

    const LastnameField = this.page.locator('tr input-editor').getByPlaceholder('Last Name')
    await LastnameField.fill(lastName)

    const UsernameField = this.page.locator('tr input-editor').getByPlaceholder('Username')
    await UsernameField.fill(UserName)

    const EmailField = this.page.locator('tr input-editor').getByPlaceholder('E-mail')
    await EmailField.fill(Email)

    const AgeField = this.page.locator('tr input-editor').getByPlaceholder('Age')
    await AgeField.fill(Age.toString())

    await this.page.locator('ng2-st-actions .ng2-smart-action-add-create').click();

    const NewRow = this.page.locator('tr.ng2-smart-row.selected')
    await expect(NewRow.locator('td').nth(1)).toHaveText(ID.toString());
    await expect(NewRow.locator('td').nth(2)).toHaveText(Firstname);
    await expect(NewRow.locator('td').nth(3)).toHaveText(lastName);
    await expect(NewRow.locator('td').nth(4)).toHaveText(UserName);
    await expect(NewRow.locator('td').nth(5)).toHaveText(Email);
    await expect(NewRow.locator('td').nth(6)).toHaveText(Age.toString());

    this.page.once('dialog', async dialog => {
      console.log('Dialog appeared');
      console.log(dialog.message());
      await dialog.dismiss();
    });
    await this.page.locator('.ng2-smart-action-delete-delete').first().click();
    await expect(NewRow.locator('td').nth(1)).toHaveText(ID.toString());
    await expect(NewRow.locator('td').nth(2)).toHaveText(Firstname);
    await expect(NewRow.locator('td').nth(3)).toHaveText(lastName);
    await expect(NewRow.locator('td').nth(4)).toHaveText(UserName);
    await expect(NewRow.locator('td').nth(5)).toHaveText(Email);
    await expect(NewRow.locator('td').nth(6)).toHaveText(Age.toString());
  }

  async filterByFirstName(Firstname: string) {
    const FirstNameFilter = this.page.locator('input-filter').getByPlaceholder('First Name')
    await FirstNameFilter.fill(Firstname)
    await this.page.waitForTimeout(3000)
    const Firstnames = this.page.locator('tbody tr')
    for (let FN of await Firstnames.all()) {
      const cellValue = await FN.locator('td').nth(2).textContent()
      expect(cellValue).toEqual(Firstname)
    }
  }

  async filterByAge(Age: string) {
    const AgeFilter = this.page.locator('input-filter').getByPlaceholder('Age')
    await AgeFilter.fill(Age)
    await this.page.waitForTimeout(3000)
    const Ages = this.page.locator('tbody tr')
    for (let age of await Ages.all()) {
      const cellValue = await age.locator('td').last().textContent()
      expect(cellValue).toEqual(Age)
    }
  }

  async noSearchResultValidation(Age: string) {
    const AgeFilter = this.page.locator('input-filter').getByPlaceholder('Age')
    await AgeFilter.fill(Age)
    await this.page.waitForTimeout(3000)
    const NoSearchResultMsg = this.page.locator('tbody tr', { hasText: ' No data found ' })
    await expect(NoSearchResultMsg).toBeVisible()
  }

  async pageNavigationValidation(PageNumber: string) {
    const PageNavigation = this.page.locator('ng2-smart-table-pager').getByText(PageNumber)
    await PageNavigation.click()
    await expect(PageNavigation).toHaveCSS('background-color', 'rgb(51, 102, 255)')
  }

  async verifyAllEmailContainsAttheRate() {
    const rows = this.page.locator('tbody tr')
    for (let row of await rows.all()) {
      const email = (await row.locator('td').nth(5).textContent())?.trim()
      expect(email).toMatch(/@/)
    }
  }

  async verifyAllAgeContainsNumericValues() {
    const rows = this.page.locator('tbody tr')
    for (let row of await rows.all()) {
      const age = (await row.locator('td').last().textContent())?.trim();
      expect(Number(age)).not.toBeNaN()
      expect(Number(age)).toBeGreaterThan(0)
    }
  }
}