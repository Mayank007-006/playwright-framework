import { test } from '@playwright/test'
import { PageManager } from '../Page-Objects/pageManager';
import { faker } from '@faker-js/faker';

test.describe('Date Picker Page', () => {
    let pm: PageManager;

    test.beforeEach('First Test', async ({ page }) => {
        await page.goto('/');
        pm = new PageManager(page);
        await pm.Navigateto().datepickerpage()
        await page.screenshot({ path: 'Screenshots/DatePickerPage.png' })
    })

    test('Date Picker Page Validation', async ({ page }) => {
        await pm.DatePickerFunction().datePickerpageValidation()
        await page.screenshot({ path: 'Screenshots/DatePickerPageValidation.png' })
    })

    test('Verify Calendar Popup Visibility in Common Date Picker, Date Picker in Range and Date Picker with Min and Max', async ({ page }) => {
        await pm.DatePickerFunction().verifyingCalenderPopupVisibilityCommonDateicker();
        await page.screenshot({ path: 'Screenshots/CalendarPopupVisibilityCommonDatePicker.png' })
        await pm.DatePickerFunction().verfyingCalendarPopupVisibilityDatepickerRange();
        await page.screenshot({ path: 'Screenshots/CalendarPopupVisibilityDatepickerRange.png' })
        await pm.DatePickerFunction().verfyingCalendarPopupVisibilityDatepickerMinMAx();
        await page.screenshot({ path: 'Screenshots/CalendarPopupVisibilityDatepickerMinMax.png' })
    })

    test('Select Todays Date', async ({ page }) => {
        await pm.DatePickerFunction().selectTodaysDate()
        await page.screenshot({ path: 'Screenshots/SelectTodaysDate.png' })
    })

    test('Select Future Date', async ({ page }) => {
        await pm.DatePickerFunction().selectFutureDate(5)
        await page.screenshot({ path: 'Screenshots/SelectFutureDate.png' })
    })

    test('Select Future Month and Year', async ({ page }) => {
        await pm.DatePickerFunction().selectFutureMonthAndYear(2028, 'Jan', 'January')
        await page.screenshot({ path: 'Screenshots/SelectFutureMonthAndYear.png' })
    })

    test('Selecting Date Picker with Range', async ({ page }) => {
        await pm.DatePickerFunction().selectDatePickerWithRange(5)
        await page.screenshot({ path: 'Screenshots/SelectDatePickerWithRange.png' })
    })

    test('Selecting Date Picker with Disabled Min Max Values', async ({ page }) => {
        await pm.DatePickerFunction().selectDatePickerWithDisabledMinMaxValues()
        await page.screenshot({ path: 'Screenshots/SelectDatePickerWithDisabledMinMaxValues.png' })
    })

    






})