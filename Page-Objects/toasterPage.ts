import { Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class ToasterPage extends HelperBase {
  constructor(page: Page) {
    super(page)
  }

  async toasterPageValidation() {
    const ToasterPage = this.page.locator('nb-card', { hasText: ' Toaster configuration ' })
    await expect(ToasterPage).toBeVisible()
    await expect(ToasterPage.getByText('Position:')).toBeVisible()
    await expect(ToasterPage.getByText('Title:')).toBeVisible()
    await expect(ToasterPage.getByText('Content:')).toBeVisible()
    await expect(ToasterPage.getByText('Time to hide toast, ms. 0 to persistent toast:')).toBeVisible()
    await expect(ToasterPage.getByText('Toast type:')).toBeVisible()
    await expect(ToasterPage.locator('nb-checkbox', { hasText: 'Hide on click' })).toBeVisible()
    await expect(ToasterPage.locator('nb-checkbox', { hasText: 'Prevent arising of duplicate toast' })).toBeVisible()
    await expect(ToasterPage.locator('nb-checkbox', { hasText: 'Show toast with icon' })).toBeVisible()
    await expect(ToasterPage.getByRole('button', { name: 'Show toast' })).toBeVisible()
    await expect(ToasterPage.getByRole('button', { name: 'Random toast' })).toBeVisible()
  }

  async toasterPosition(PositionOption: string, Title: string, Content: string, PrimaryOption: string, timemout: string) {
    const ToasterPage = this.page.locator('nb-card', { hasText: ' Toaster configuration ' })
    await ToasterPage.locator('nb-icon').first().click()
    await this.page.locator('nb-option', { hasText: PositionOption }).click()
    await ToasterPage.locator('[ng-reflect-name="title"]').clear()
    await ToasterPage.locator('[ng-reflect-name="title"]').fill(Title)
    await ToasterPage.locator('[ng-reflect-name="content"]').clear()
    await ToasterPage.locator('[ng-reflect-name="content"]').fill(Content)
    await ToasterPage.locator('[ng-reflect-name="timeout"]').clear()
    await ToasterPage.locator('[ng-reflect-name="timeout"]').fill(timemout)
    await ToasterPage.locator('nb-icon').nth(1).click()
    await this.page.locator('nb-option', { hasText: PrimaryOption }).click()
    await ToasterPage.getByRole('button', { name: 'Show toast' }).click()
    const Toast = this.page.locator('nb-toast')
    const toastBox = await Toast.last().boundingBox();
    console.log(toastBox)

    if (PositionOption.includes('top')) {
      expect(toastBox?.y).toBeLessThan(200);
    }

    if (PositionOption.includes('bottom')) {
      expect(toastBox?.y).toBeGreaterThan(400);
    }

    if (PositionOption.includes('right')) {
      expect(toastBox?.x).toBeGreaterThan(800);
    }

    if (PositionOption.includes('left')) {
      expect(toastBox?.x).toBeLessThan(200);
    }
    const Toastmessage = await Toast.locator('.content-container').allTextContents()
    console.log(Toastmessage)
    await expect(Toast).toContainText(Title)
    await expect(Toast).toContainText(Content)
    await expect(Toast.last()).toHaveCSS('background-color', 'rgb(0, 149, 255)')
    await expect(Toast.locator('nb-icon svg')).toBeVisible();
    const HideonCLick = await this.page.locator('nb-checkbox', { hasText: 'Hide on click' }).locator('input[type="checkbox"]').isChecked()
    if (HideonCLick) {
      await Toast.click()
      await expect(Toast).toBeHidden()
    }
  }

  async multipleToastScenario(timeout: string) {
    const ToasterPage = this.page.locator('nb-card', { hasText: ' Toaster configuration ' })
    await ToasterPage.locator('[ng-reflect-name="timeout"]').clear()
    await ToasterPage.locator('[ng-reflect-name="timeout"]').fill(timeout)
    for (let i = 0; i < 3; i++) {
      await ToasterPage.getByRole('button', { name: 'Random toast' }).click()
    }
    const Toast = this.page.locator('nb-toast')
    await expect(Toast).toHaveCount(3)
    const FirstToast = Toast.nth(0)
    const SecondToast = Toast.nth(1)
    const ThirdToast = Toast.nth(2)

    const BBFirstToast = await FirstToast.boundingBox()
    const BBSecondToast = await SecondToast.boundingBox()
    const BBThirdToast = await ThirdToast.boundingBox()
    if (!BBFirstToast || !BBSecondToast || !BBThirdToast) {
      throw new Error('Toast not visible');
    }
    console.log(BBFirstToast)
    console.log(BBSecondToast)
    console.log(BBThirdToast)

    expect(BBFirstToast.y).toBeLessThan(BBSecondToast.y)
    expect(BBSecondToast.y).toBeLessThan(BBThirdToast.y)

    expect(BBFirstToast.y + BBFirstToast.height).toBeLessThanOrEqual(BBSecondToast.y)
    expect(BBSecondToast.y + BBSecondToast.height).toBeLessThanOrEqual(BBThirdToast.y)
  }
}