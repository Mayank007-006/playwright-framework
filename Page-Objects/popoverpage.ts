import { Page, expect } from '@playwright/test'
import { HelperBase } from './helperBase'

export class PopoverPage extends HelperBase {
  constructor(page: Page) {
    super(page)
  }

  async verifypopverPositionField() {
    const Popoverposition = this.page.locator('nb-card', { hasText: 'Popover Position' })
    await expect(Popoverposition.locator('p')).toHaveText('When popover has not enough space based on the configured placement, it will adjust accordingly trying to fit the screen.')
    await expect(Popoverposition.getByRole('button', { name: 'Left' })).toBeVisible();
    await expect(Popoverposition.getByRole('button', { name: 'Top' })).toBeVisible();
    await expect(Popoverposition.getByRole('button', { name: 'Bottom' })).toBeVisible();
    await expect(Popoverposition.getByRole('button', { name: 'Right' })).toBeVisible();
  }

  async popoverPositionFieldLeftPopover() {
    const Popoverposition = this.page.locator('nb-card', { hasText: 'Popover Position' })
    const LeftPopoverposition = Popoverposition.getByRole('button', { name: 'Left' })
    const Leftpopover = this.page.locator('nb-popover').last();
    await Promise.all([Leftpopover.waitFor({ state: 'visible' }), LeftPopoverposition.hover()])
    await expect(Leftpopover).toBeVisible()
    const buttonBox = await LeftPopoverposition.boundingBox()
    const PopoverBox = await Leftpopover.boundingBox()
    if (!buttonBox || !PopoverBox) {
      throw new Error('Pop up is not visible')
    }
    expect(PopoverBox.x + PopoverBox.width).toBeLessThan(buttonBox.x + buttonBox.width)
    await expect(LeftPopoverposition).toHaveAttribute('ng-reflect-position', 'left')
  }

  async popoverPositionFieldTopPopover() {
    const Popoverposition = this.page.locator('nb-card', { hasText: 'Popover Position' })
    const TopPopoverposition = Popoverposition.getByRole('button', { name: 'Top' })
    const Leftpopover = this.page.locator('nb-popover').last();
    await Promise.all([Leftpopover.waitFor({ state: 'visible' }), TopPopoverposition.hover()])
    await expect(Leftpopover).toBeVisible()
    const buttonBox = await TopPopoverposition.boundingBox()
    const PopoverBox = await Leftpopover.boundingBox()
    if (!buttonBox || !PopoverBox) {
      throw new Error('Pop up is not visible')
    }
    expect(PopoverBox.x).toBeLessThan(buttonBox.x)
    await expect(TopPopoverposition).toHaveAttribute('ng-reflect-position', 'top')
  }

  async popoverPositionFieldRightPopover() {
    const Popoverposition = this.page.locator('nb-card', { hasText: 'Popover Position' })
    const TopPopoverposition = Popoverposition.getByRole('button', { name: 'Right' })
    const RightPopover = this.page.locator('nb-popover').last();
    await Promise.all([RightPopover.waitFor({ state: 'visible' }), TopPopoverposition.hover()])
    await expect(RightPopover).toBeVisible()
    const ButtonBox = await TopPopoverposition.boundingBox()
    const PopoverBox = await RightPopover.boundingBox()
    if (!ButtonBox || !PopoverBox) {
      throw new Error("Element not visible")
    }
    expect(PopoverBox.x).toBeGreaterThan(ButtonBox.x + ButtonBox.width)
    await expect(TopPopoverposition).toHaveAttribute('ng-reflect-position', 'right');
  }

  async simplePopoversValidation() {
    const SimplePopover = this.page.locator('nb-card', { hasText: 'Simple Popovers' })
    await expect(SimplePopover.locator('nb-card-body p')).toHaveText('In a simples form popover can take a string of text to render.')
    await expect(SimplePopover.getByRole('button', { name: 'on click' })).toBeVisible()
    await expect(SimplePopover.getByRole('button', { name: 'on hover' })).toBeVisible()
    await expect(SimplePopover.getByRole('button', { name: 'on hint' })).toBeVisible()
  }

  async simplePopoverOnClick() {
    const SimplePopover = this.page.locator('nb-card', { hasText: 'Simple Popovers' })
    const OnlickBTN = SimplePopover.getByRole('button', { name: 'on click' })
    const PopOver = this.page.locator('nb-popover').last()
    await Promise.all([PopOver.waitFor({ state: 'visible' }), OnlickBTN.click()])
    if (!PopOver) {
      return new Error('Element is not visible')
    }
    const ButtonBox = await OnlickBTN.boundingBox()
    const Popup = await PopOver.boundingBox()
    expect(Popup.y + Popup.height).toBeLessThan(ButtonBox.y)
    await expect(PopOver).toHaveText('Hello, how are you today?')
  }

  async simplePopoveronHover() {
    const SimplePopover = this.page.locator('nb-card', { hasText: 'Simple Popovers' })
    const OnHover = SimplePopover.getByRole('button', { name: 'on hover' })
    const PopOver = this.page.locator('nb-popover').last()
    await Promise.all([PopOver.waitFor({ state: 'visible' }), OnHover.hover()])
    await expect(PopOver).toBeVisible()
    const ButtonBox = await OnHover.boundingBox()
    const PopoverBox = await PopOver.boundingBox()
    if (!ButtonBox || !PopoverBox) {
      throw new Error("Element not visible")
    }
    expect(PopoverBox.y + PopoverBox.height).toBeLessThan(ButtonBox.y)
    await expect(PopOver).toHaveText('Hello, how are you today?')
  }

  async simplePopoveronHint() {
    const SimplePopover = this.page.locator('nb-card', { hasText: 'Simple Popovers' })
    const OnHint = SimplePopover.getByRole('button', { name: 'on hint' })
    const PopOver = this.page.locator('nb-popover').last()
    await Promise.all([PopOver.waitFor({ state: 'visible' }), OnHint.hover()])
    await expect(PopOver).toBeVisible()
    const ButtonBox = await OnHint.boundingBox()
    const PopoverBox = await PopOver.boundingBox()
    if (!ButtonBox || !PopoverBox) {
      throw new Error("Element not visible")
    }
    expect(PopoverBox.y + PopoverBox.height).toBeLessThan(ButtonBox.y)
    await expect(PopOver).toHaveText('Hello, how are you today?')
  }

  async templatePopoversValidation() {
    const TemplatePopover = this.page.locator('nb-card', { hasText: 'Template Popovers' })
    await expect(TemplatePopover.locator('p')).toHaveText('You can pass a refference to `ng-template` to be rendered.')
    await expect(TemplatePopover.getByRole('button', { name: 'With tabs' })).toBeVisible()
    await expect(TemplatePopover.getByRole('button', { name: 'With form' })).toBeVisible()
    await expect(TemplatePopover.getByRole('button', { name: 'With card' })).toBeVisible()
  }

  async templatePopoverswithTabs() {
    const TemplatePopover = this.page.locator('nb-card', { hasText: 'Template Popovers' })
    await TemplatePopover.getByRole('button', { name: 'With tabs' }).click()
    const PopOver = this.page.locator('nb-popover').last()
    await expect(PopOver.locator('a').first()).toHaveText('What\'s up?')
    await expect(PopOver.locator('nb-tab').first()).toHaveText(' Such a wonderful day! ')
    await PopOver.locator('a', { hasText: 'Second Tab' }).click()
    await expect(PopOver.locator('a', { hasText: 'Second Tab' })).toHaveText('Second Tab')
    await expect(PopOver.locator('nb-tab', { hasText: 'Indeed!' })).toHaveText('Indeed!')
  }

  async templatePopoverwithForm(Recipient: string, Subject: string, Message: string) {
    const TemplatePopover = this.page.locator('nb-card', { hasText: 'Template Popovers' })
    await TemplatePopover.getByRole('button', { name: 'With form' }).click()
    const PopOver = this.page.locator('nb-popover').last()
    await PopOver.getByPlaceholder('Recipients').fill(Recipient)
    await PopOver.getByPlaceholder('Subject').fill(Subject)
    await PopOver.getByPlaceholder('Message').fill(Message)
    await PopOver.getByRole('button', { name: 'Send' }).click()
    await this.page.locator('body').click();
  }

  async templatePopoverwithCard() {
    const TemplatePopover = this.page.locator('nb-card', { hasText: 'Template Popovers' })
    await TemplatePopover.getByRole('button', { name: 'With card' }).click()
    const popover = this.page.locator('nb-popover').last().locator('nb-card')
    await expect(popover.locator('nb-card-header')).toHaveText(' Hello! ')
    await expect(popover.locator('nb-card-body')).toHaveText(' Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. ')
  }

  async componentPopoversValidation() {
    const ComponentPopovers = this.page.locator('nb-card', { hasText: 'Component Popovers' })
    await expect(ComponentPopovers.locator('p')).toHaveText('Same way popover can render any angular compnoent.')
    await expect(ComponentPopovers.getByRole('button', { name: 'With tabs' })).toBeVisible()
    await expect(ComponentPopovers.getByRole('button', { name: 'With form' })).toBeVisible()
    await expect(ComponentPopovers.getByRole('button', { name: 'With card' })).toBeVisible()
  }

  async componentPopoverswithTabs() {
    const ComponentPopovers = this.page.locator('nb-card', { hasText: 'Component Popovers' })
    await ComponentPopovers.getByRole('button', { name: 'With tabs' }).click()
    const PopOver = this.page.locator('nb-popover').last()
    await expect(PopOver.locator('a').first()).toHaveText('What\'s up?')
    await expect(PopOver.locator('nb-tab').first()).toHaveText(' Such a wonderful day! ')
    await PopOver.locator('a', { hasText: 'Second Tab' }).click()
    await expect(PopOver.locator('a', { hasText: 'Second Tab' })).toHaveText('Second Tab')
    await expect(PopOver.locator('nb-tab', { hasText: 'Indeed!' })).toHaveText('Indeed!')
  }

  async componentPopoverwithForm(Recipient: string, Subject: string, Message: string) {
    const ComponentPopover = this.page.locator('nb-card', { hasText: 'Component Popovers' })
    await ComponentPopover.getByRole('button', { name: 'With form' }).click()
    const PopOver = this.page.locator('nb-popover').last()
    await PopOver.getByPlaceholder('Recipients').fill(Recipient)
    await PopOver.getByPlaceholder('Subject').fill(Subject)
    await PopOver.getByPlaceholder('Message').fill(Message)
    await PopOver.getByRole('button', { name: 'Send' }).click()
    await this.page.locator('body').click();
  }

  async componentPopoverwithCard() {
    const ComponentPopover = this.page.locator('nb-card', { hasText: 'Component Popovers' })
    await ComponentPopover.getByRole('button', { name: 'With card' }).click()
    await expect(ComponentPopover.getByRole('button', { name: 'With card' })).toHaveCSS('background-color', 'rgb(255, 201, 77)')
    const popover = this.page.locator('nb-popover').last().locator('nb-card')
    await expect(popover.locator('nb-card-header')).toHaveText(' Hello! ')
    await expect(popover.locator('nb-card-body')).toHaveText(' Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. ')
  }
}