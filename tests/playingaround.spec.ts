import { DatePipe } from '@angular/common';
import { test, expect } from '@playwright/test'
import { ExpandOperator } from 'rxjs/internal/operators/expand';

test.beforeEach('Loading URL', async ({ page }) => {
  await page.goto('http://localhost:4200/');
})

test.describe('Form layouts Page', () => {
  test.beforeEach('Navigating to forms page', async ({ page }) => {
    await page.getByTitle('Forms').click();
    await page.getByTitle('Form Layouts').click();
  })

  test('Input Fields', async ({ page }) => {
    const UsingtheGrid = await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: "Email" });
    await UsingtheGrid.fill('test@test.com');
    await UsingtheGrid.clear();
    await UsingtheGrid.pressSequentially('test@test.com', { delay: 500 })

    const Valuetbchecked = await UsingtheGrid.inputValue()
    expect(Valuetbchecked).toEqual('test@test.com1');

    await expect(UsingtheGrid).toHaveValue('test@test.com')
  })

  test('radio buttons', async ({ page }) => {
    const UsingtheGrid = page.locator('nb-card', { hasText: 'Using the Grid' })
    await UsingtheGrid.getByRole('radio', { name: 'Option 1' }).check({ force: true })
    await UsingtheGrid.getByRole('radio', { name: 'Option 1' }).isChecked()
    await expect(UsingtheGrid).toBeVisible()
    await expect(UsingtheGrid).toHaveScreenshot()
  })

  test.skip('Checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();
    const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()) {
      await box.uncheck({ force: true })
      expect(await box.isChecked()).toBeFalsy()
    }
  })

  test.skip('Lists And Dropdowns', async ({ page }) => {
    const DropdownMenu = page.locator('ngx-header nb-select')
    await DropdownMenu.click()

    page.getByRole('list')
    page.getByRole('listitem')

    const Listitems = page.locator('nb-option-list nb-option')
    await expect(Listitems).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await Listitems.filter({ hasText: 'Cosmic' }).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
  })

  test('Working with tooltips', async ({ page }) => {
    await page.getByTitle('Modal & Overlays').click();
    await page.getByTitle('Tooltip').click();
  })

  test('Dialouge Boxes', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    page.on('dialog', dialog => {
      expect(dialog.message()).toEqual('Are you sure you want to delete?')
      dialog.accept()
    })
    await page.locator('table').locator('tr', { hasText: 'ruben@gmail.com' }).locator('.nb-trash').click()
    await expect(page.locator('table tr').nth(9)).not.toHaveText('ruben@gmail.com')
  })

  test('Web Tables', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowid = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText('11') })
    await targetRowid.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear();
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('Test@test.com');
    await page.locator('.nb-checkmark').click()
    await expect(targetRowid.locator('td').nth(5)).toHaveText('Test@test.com');

    const ages = ["20", "30", "40", "200"]
    for (let age of ages) {
      await page.locator('input-filter').getByPlaceholder('Age').clear()
      await page.locator('input-filter').getByPlaceholder('Age').fill(age)
      await page.waitForTimeout(500)
      const AgeRows = page.locator('tbody tr')
      for (let row of await AgeRows.all()) {
        const cellvalue = await row.locator('td').last().textContent()

        if (age == "200") {
          const thismessage = page.locator('tr td').getByText(" No data found ")
          expect(thismessage).toBeTruthy()
        }
        else {
          expect(cellvalue).toEqual(age);
        }
      }
    }
  })

  test('Date Picker Concept', async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const CalendarDateInputField = page.getByPlaceholder("Form Picker");
    CalendarDateInputField.click()
    let date = new Date()
    date.setDate(date.getDate() + 7);
    const expectedDate = date.getDate().toLocaleString()
    const ExpectedMonthshort = date.toLocaleString('En-US', { month: 'short' });
    const ExpectedMonthlong = date.toLocaleString('En-US', { month: "long" });
    const ExpectedYear = date.getFullYear();
    const dateToAssert = `${ExpectedMonthshort} ${expectedDate}, ${ExpectedYear}`
    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent() ?? ''
    const expectedMonthAndYear = `${ExpectedMonthlong} ${ExpectedYear}`
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
      calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent() ?? ''
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click()
    await expect(CalendarDateInputField).toHaveValue(dateToAssert)
  })
})