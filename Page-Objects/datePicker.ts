import { Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class Datepickerpage extends HelperBase {
  constructor(page: Page) {
    super(page)
  }

  async datePickerpageValidation() {
    const CommonDatepickerHeader = this.page.locator('nb-card', { hasText: 'Common Datepicker' })
    await expect(CommonDatepickerHeader).toBeVisible();
    await expect(CommonDatepickerHeader.getByPlaceholder('Form Picker')).toBeEnabled()
    const datepickerwithRange = this.page.locator('nb-card', { hasText: 'Datepicker With Range' })
    await expect(datepickerwithRange).toBeVisible();
    await expect(datepickerwithRange.getByPlaceholder('Range Picker')).toBeEnabled()
    const datepickerDisabled = this.page.locator('nb-card', { hasText: 'Datepicker With Disabled Min Max Values' })
    await expect(datepickerDisabled).toBeVisible();
    await expect(datepickerDisabled.getByPlaceholder('Min Max Picker')).toBeEnabled()
  }

  async verifyingCalenderPopupVisibilityCommonDateicker() {
    const CommonDatepicker = this.page.locator('nb-card', { hasText: 'Common Datepicker' }).getByPlaceholder('Form Picker')
    await CommonDatepicker.click()
    const CalendarPopup = this.page.locator('nb-datepicker-container')
    await expect(CalendarPopup).toBeVisible()
  }

  async verfyingCalendarPopupVisibilityDatepickerRange() {
    const datepickerwithRange = this.page.locator('nb-card', { hasText: 'Datepicker With Range' }).getByPlaceholder('Range Picker')
    const CalendarPopup = this.page.locator('nb-datepicker-container')
    await datepickerwithRange.click()
    await expect(CalendarPopup).toBeVisible();
  }

  async verfyingCalendarPopupVisibilityDatepickerMinMAx() {
    const datepickerMinMax = this.page.locator('nb-card', { hasText: 'Datepicker With Disabled Min Max Values' }).getByPlaceholder('Min Max Picker')
    const CalendarPopup = this.page.locator('nb-datepicker-container')
    await datepickerMinMax.click()
    await expect(CalendarPopup).toBeVisible();
  }

  async selectCommonDatePickerDateFromToday(numberofDaysfromToday: number) {
    const CalendarDateInputField = this.page.getByPlaceholder("Form Picker");
    await CalendarDateInputField.click()
    const dateToAssert = await this.selectDatefromCalendar(numberofDaysfromToday)
    await expect(CalendarDateInputField).toHaveValue(dateToAssert)
  }

  async selectDatePickerInRange(StartDate: number, EndDate: number) {
    const CalendarDateInputField = this.page.getByPlaceholder("Range Picker");
    await CalendarDateInputField.click()
    const StartingDate = await this.selectDatefromCalendar(StartDate)
    const EndingDate = await this.selectDatefromCalendar(EndDate)
    const DateDisplayed = `${StartingDate} - ${EndingDate}`
    await expect(CalendarDateInputField).toHaveValue(DateDisplayed)
  }

  private async selectDatefromCalendar(numberofDaysfromToday: number) {
    let date = new Date()
    date.setDate(date.getDate() + numberofDaysfromToday);
    const expectedDate = date.getDate().toLocaleString()
    const ExpectedMonthshort = date.toLocaleString('En-US', { month: 'short' });
    const ExpectedMonthlong = date.toLocaleString('En-US', { month: "long" });
    const ExpectedYear = date.getFullYear();
    const dateToAssert = `${ExpectedMonthshort} ${expectedDate}, ${ExpectedYear}`
    let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = `${ExpectedMonthlong} ${ExpectedYear}`
    while (!calendarMonthAndYear?.includes(expectedMonthAndYear)) {
      await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
      calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
    }

    await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).click()
    return dateToAssert
  }

  async selectTodaysDate() {
    const CalendarDateInputField = this.page.getByPlaceholder("Form Picker");
    await CalendarDateInputField.click();
    const date = new Date();
    const Day = date.getDate().toString()
    const month = date.toLocaleString('en-us', { 'month': "short" });
    const year = date.getFullYear()
    const expectedDate = `${month} ${Day}, ${year}`
    await this.page.locator('.day-cell.ng-star-inserted').getByText(Day, { exact: true }).click();
    await expect(CalendarDateInputField).toHaveValue(expectedDate);
    await expect(this.page.locator('nb-calendar')).not.toBeVisible()
    await expect(CalendarDateInputField).toHaveValue(expectedDate);
  }

  async selectFutureDate(NumberofDaysfromToday: number) {
    const CalendarDateInputField = this.page.getByPlaceholder("Form Picker");
    await CalendarDateInputField.click();
    let date = new Date();

    date.setDate(date.getDate() + NumberofDaysfromToday);

    const Day = date.getDate().toLocaleString()
    const monthshort = date.toLocaleString('en-us', { 'month': "short" })
    const monthlong = date.toLocaleString('en-us', { "month": "long" })
    const year = date.getFullYear()

    const expectedDate = `${monthshort} ${Day}, ${year}`
    const expectedMonthAndYear = `${monthlong} ${year}`

    let calendarMonthYear = await this.page.locator('nb-calendar-view-mode').textContent();

    while (!calendarMonthYear?.includes(expectedMonthAndYear)) {
      await this.page.locator(".next-month appearance-ghost size-medium shape-rectangle icon-start icon-end status-basic nb-transition").click()
      calendarMonthYear = await this.page.locator('nb-calendar-view-mode').textContent();
    }

    await this.page.locator('.day-cell.ng-star-inserted').getByText(Day, { exact: true }).click();

    await expect(CalendarDateInputField).toHaveValue(expectedDate);
    const value = await CalendarDateInputField.inputValue()
    expect(value).toMatch((/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/))
    await this.page.getByPlaceholder('Form Picker').click();
    const SelectedDay = this.page.locator('nb-calendar-day-cell').locator('.selected day-cell ng-star-inserted')
    await expect(SelectedDay).toHaveClass('selected day-cell ng-star-inserted')
    await expect(SelectedDay).toHaveCSS('background-color', 'rgb(51, 102, 255)')
  }

  async selectFutureMonthAndYear(expectedYear: number, ExpectedMonthshort: string, ExpectedMonthlong: string) {
    await this.page.getByPlaceholder('Form Picker').click();
    await this.page.locator('nb-calendar-view-mode').click();

    while (!(await this.page.getByText(expectedYear.toString()).isVisible().catch(() => false))) {
      await this.page.locator('[data-name="chevron-right"]').click();
      await this.page.getByText(expectedYear.toString(), { exact: true }).click();
      await this.page.getByText(ExpectedMonthshort, { exact: true }).click();
    }

    const displayedMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()
    displayedMonthYear?.trim()

    expect(displayedMonthYear).toContain(`${ExpectedMonthlong} ${expectedYear}`);
  }
}