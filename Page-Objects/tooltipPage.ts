import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class TooltipPage extends HelperBase {
  constructor(page: Page) {
    super(page)
  }

  async tooltipPageValidation() {
    const TooltipWithIcon = this.page.locator('nb-card', { hasText: 'Tooltip With Icon' })
    await expect(TooltipWithIcon).toBeVisible()
    await expect(TooltipWithIcon.getByRole('button', { name: 'Show Tooltip' }).nth(0)).toBeVisible()
    await expect(TooltipWithIcon.getByRole('button', { name: 'Show Tooltip' }).nth(1)).toBeVisible()

    const TooltipPlacements = this.page.locator('nb-card', { hasText: 'Tooltip Placements' })
    await expect(TooltipPlacements).toBeVisible()
    await expect(TooltipPlacements.getByRole('button', { name: 'Top' })).toBeVisible()
    await expect(TooltipPlacements.getByRole('button', { name: 'Right' })).toBeVisible()
    await expect(TooltipPlacements.getByRole('button', { name: 'Bottom' })).toBeVisible()
    await expect(TooltipPlacements.getByRole('button', { name: 'Left' })).toBeVisible()
    const Buttons = TooltipPlacements.getByRole('button')
    await expect(Buttons).toHaveText([
      "Top",
      "Right",
      "Bottom",
      "Left"
    ])

    const ColoredToolTips = this.page.locator('nb-card', { hasText: 'Colored Tooltips' })
    await expect(ColoredToolTips).toBeVisible()
    await expect(ColoredToolTips.getByRole('button', { name: 'Default' })).toBeVisible()
    await expect(ColoredToolTips.getByRole('button', { name: 'Primary' })).toBeVisible()
    await expect(ColoredToolTips.getByRole('button', { name: 'Success' })).toBeVisible()
    await expect(ColoredToolTips.getByRole('button', { name: 'Danger' })).toBeVisible()
    await expect(ColoredToolTips.getByRole('button', { name: 'Info' })).toBeVisible()
    await expect(ColoredToolTips.getByRole('button', { name: 'Warning' })).toBeVisible()
    const Button = ColoredToolTips.getByRole('button')
    await expect(Button).toHaveText([
      "Default",
      "Primary",
      "Success",
      "Danger",
      "Info",
      "Warning"
    ])
  }

  async tooltipwithiconMessage() {
    const TooltipWithIcon = this.page.locator('nb-card', { hasText: 'Tooltip With Icon' })
    const ShowTooltipBTN = TooltipWithIcon.getByRole('button', { name: 'Show Tooltip' }).first()
    const Tooltip = this.page.locator('nb-tooltip')

    await Promise.all([Tooltip.waitFor({ state: 'visible' }), ShowTooltipBTN.hover()])
    await expect(Tooltip).toBeVisible()
    await expect(Tooltip).toHaveText('This is a tooltip')
    await expect(ShowTooltipBTN).toHaveAttribute('nbtooltipicon', 'home-outline')
    const ButtonBox = await ShowTooltipBTN.boundingBox()
    const Tooltipbox = await Tooltip.boundingBox()
    expect(Tooltipbox.y + Tooltipbox.height).toBeLessThan(ButtonBox.y)
    await Tooltip.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    await expect(Tooltip).toHaveCSS('background-color', 'rgb(21, 26, 48)')
  }

  async tooltipwithiconIcon() {
    const TooltipWithIcon = this.page.locator('nb-card', { hasText: 'Tooltip With Icon' })
    const ShowTooltipBTN = TooltipWithIcon.getByRole('button', { name: 'Show Tooltip' }).nth(1)
    const Tooltip = this.page.locator('nb-tooltip').last()
    await Promise.all([Tooltip.waitFor({ state: 'visible' }), ShowTooltipBTN.hover()])
    await expect(Tooltip).toBeVisible()
    await expect(ShowTooltipBTN).toHaveAttribute('nbtooltipicon', 'alert-triangle')
    await expect(ShowTooltipBTN).toHaveAttribute('nbtooltipstatus', 'danger')
    const ButtonBox = await ShowTooltipBTN.boundingBox()
    const Tooltipbox = await Tooltip.boundingBox()
    expect(Tooltipbox.y + Tooltipbox.height).toBeLessThan(ButtonBox.y)
    const bgColor = await Tooltip.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    console.log(bgColor);
    await expect(Tooltip).toHaveCSS('background-color', 'rgb(255, 61, 113)')
  }

  async tooltipPlacements() {
    const TooltipPlacements = this.page.locator('nb-card', { hasText: 'Tooltip Placements' })
    const Positions = ['Top', 'Right', 'Bottom', 'Left']
    for (const position of Positions) {
      const button = TooltipPlacements.getByRole('button', { name: position });
      const Tooltip = this.page.locator('nb-tooltip').last()
      await Promise.all([Tooltip.waitFor({ state: 'visible' }), button.hover()])
      await expect(Tooltip).toBeVisible()
      const ButtonBox = await button.boundingBox()
      const Tooltipbox = await Tooltip.boundingBox()
      if (!ButtonBox || !Tooltipbox) {
        throw new Error('Element not visible');
      }
      if (position === 'Top') {
        expect(Tooltipbox.y + Tooltipbox.height).toBeLessThan(ButtonBox.y)
        await expect(button).toHaveAttribute('nbtooltipplacement', 'top')
      }
      else if (position === 'Right') {
        expect(Tooltipbox.x).toBeLessThan(ButtonBox.x);
        await expect(button).toHaveAttribute('nbtooltipplacement', 'right')
      }
      else if (position === 'Bottom') {
        expect(Tooltipbox.y).toBeGreaterThan(ButtonBox.y + ButtonBox.height);
        await expect(button).toHaveAttribute('nbtooltipplacement', 'bottom')
      }
      else if (position === 'Left') {
        expect(Tooltipbox.x + Tooltipbox.width).toBeLessThan(ButtonBox.x);
        await expect(button).toHaveAttribute('nbtooltipplacement', 'left')
      }
      await expect(Tooltip).toHaveText('This is a tooltip')
      await expect(Tooltip).toHaveCSS('background-color', 'rgb(21, 26, 48)')
    }
  }

  async tooltiPlacementTop() {
    const TooltipPlacements = this.page.locator('nb-card', { hasText: 'Tooltip Placements' })
    const TopBTN = TooltipPlacements.getByRole('button', { name: 'Top' })
    const Tooltip = this.page.locator('nb-tooltip').last()
    await Promise.all([Tooltip.waitFor({ state: 'visible' }), TopBTN.hover()])
    await expect(Tooltip).toBeVisible()
    expect(TopBTN).toHaveAttribute('nbtooltip', 'This is a tooltip')
    expect(TopBTN).toHaveAttribute('nbtooltipplacement', 'top')
    const ButtonBox = await TopBTN.boundingBox();
    const TooltipBox = await Tooltip.boundingBox();
    if (!ButtonBox || !TooltipBox) {
      throw new Error('Element not visible');
    }
    expect(TooltipBox.y + TooltipBox.height).toBeLessThan(ButtonBox.y)
    await expect(Tooltip).toHaveText('This is a tooltip')
    await expect(Tooltip).toHaveCSS('background-color', 'rgb(21, 26, 48)')
  }

  async tooltiPlacementRight() {
    const TooltipPlacements = this.page.locator('nb-card', { hasText: 'Tooltip Placements' })
    const RightBTN = TooltipPlacements.getByRole('button', { name: 'Right' })
    const Tooltip = this.page.locator('nb-tooltip').last()
    await Promise.all([Tooltip.waitFor({ state: 'visible' }), RightBTN.hover()])
    await expect(Tooltip).toBeVisible()
    expect(RightBTN).toHaveAttribute('nbtooltip', 'This is a tooltip')
    expect(RightBTN).toHaveAttribute('nbtooltipplacement', 'right')
    const ButtonBox = await RightBTN.boundingBox();
    const TooltipBox = await Tooltip.boundingBox();
    if (!ButtonBox || !TooltipBox) {
      throw new Error('Element not visible');
    }
    await expect(Tooltip).toHaveText('This is a tooltip')
    await expect(Tooltip).toHaveCSS('background-color', 'rgb(21, 26, 48)')
  }

  async tooltiPlacementBottom() {
    const TooltipPlacements = this.page.locator('nb-card', { hasText: 'Tooltip Placements' })
    await this.page.click('body');
    const BottomBTN = TooltipPlacements.getByRole('button', { name: 'Bottom' })
    const Tooltip = this.page.locator('nb-tooltip').last()
    await Promise.all([Tooltip.waitFor({ state: 'visible' }), BottomBTN.hover()])
    await expect(Tooltip).toBeVisible()
    expect(BottomBTN).toHaveAttribute('nbtooltip', 'This is a tooltip')
    expect(BottomBTN).toHaveAttribute('nbtooltipplacement', 'bottom')
    const ButtonBox = await BottomBTN.boundingBox();
    const TooltipBox = await Tooltip.boundingBox();
    if (!ButtonBox || !TooltipBox) {
      throw new Error('Element not visible');
    }
    console.log(TooltipBox)
    expect(TooltipBox.y).toBeGreaterThan(ButtonBox.y + ButtonBox.height);
    await expect(Tooltip).toHaveText('This is a tooltip')
    await expect(Tooltip).toHaveCSS('background-color', 'rgb(21, 26, 48)')
  }

  async tooltiPlacementLeft() {
    const TooltipPlacements = this.page.locator('nb-card', { hasText: 'Tooltip Placements' })
    const LeftBTN = TooltipPlacements.getByRole('button', { name: 'Left' })
    const Tooltip = this.page.locator('nb-tooltip').last()
    await Promise.all([Tooltip.waitFor({ state: 'visible' }), LeftBTN.hover()])
    await expect(Tooltip).toBeVisible()
    expect(LeftBTN).toHaveAttribute('nbtooltip', 'This is a tooltip')
    expect(LeftBTN).toHaveAttribute('nbtooltipplacement', 'left')
    const ButtonBox = await LeftBTN.boundingBox();
    const TooltipBox = await Tooltip.boundingBox();
    if (!ButtonBox || !TooltipBox) {
      throw new Error('Element not visible');
    }
    console.log(TooltipBox)
    expect(TooltipBox.x + TooltipBox.width).toBeLessThan(ButtonBox.x);
    await expect(Tooltip).toHaveText('This is a tooltip')
    await expect(Tooltip).toHaveCSS('background-color', 'rgb(21, 26, 48)')
  }

  async coloredTooltipDefault() {
    const TooltipPlacements = this.page.locator('nb-card', { hasText: 'Colored Tooltips' })
    const DefaultBTN = TooltipPlacements.getByRole('button', { name: 'Default' })
    const Tooltip = this.page.locator('nb-tooltip').last()

    await Promise.all([Tooltip.waitFor({ state: 'visible' }), DefaultBTN.hover()])
    await expect(Tooltip).toBeVisible()
    await expect(Tooltip).toHaveText('This is a tooltip')
    const ButtonBox = await DefaultBTN.boundingBox()
    const Tooltipbox = await Tooltip.boundingBox()
    if (!ButtonBox || !Tooltipbox) {
      throw new Error('Element not visible');
    }
    expect(Tooltipbox.y + Tooltipbox.height).toBeLessThan(ButtonBox.y)
    await Tooltip.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    await expect(Tooltip).toHaveCSS('background-color', 'rgb(21, 26, 48)')
  }

  async coloredTooltipPrimary() {
    const TooltipPlacements = this.page.locator('nb-card', { hasText: 'Colored Tooltips' })
    const PrimaryBTN = TooltipPlacements.getByRole('button', { name: 'Primary' })
    const Tooltip = this.page.locator('nb-tooltip').last()

    await Promise.all([Tooltip.waitFor({ state: 'visible' }), PrimaryBTN.hover()])
    await expect(Tooltip).toBeVisible()
    await expect(Tooltip).toHaveText('This is a tooltip')
    const ButtonBox = await PrimaryBTN.boundingBox()
    const Tooltipbox = await Tooltip.boundingBox()
    if (!ButtonBox || !Tooltipbox) {
      throw new Error('Element not visible');
    }
    expect(Tooltipbox.y + Tooltipbox.height).toBeLessThan(ButtonBox.y)

    await Tooltip.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    await expect(Tooltip).toHaveCSS('background-color', 'rgb(51, 102, 255)')
  }

  async coloredTooltipSuccess() {
    const TooltipPlacements = this.page.locator('nb-card', { hasText: 'Colored Tooltips' })
    const SuccessBTN = TooltipPlacements.getByRole('button', { name: 'Success' })
    const Tooltip = this.page.locator('nb-tooltip').last()

    await Promise.all([Tooltip.waitFor({ state: 'visible' }), SuccessBTN.hover()])
    await expect(Tooltip).toBeVisible()
    await expect(Tooltip).toHaveText('This is a tooltip')
    const ButtonBox = await SuccessBTN.boundingBox()
    const Tooltipbox = await Tooltip.boundingBox()
    if (!ButtonBox || !Tooltipbox) {
      throw new Error('Element not visible');
    }
    expect(Tooltipbox.y + Tooltipbox.height).toBeLessThan(ButtonBox.y)

    await Tooltip.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    await expect(Tooltip).toHaveCSS('background-color', 'rgb(0, 214, 143)')
  }

  async coloredTooltipDanger() {
    const TooltipPlacements = this.page.locator('nb-card', { hasText: 'Colored Tooltips' })
    const DangerBTN = TooltipPlacements.getByRole('button', { name: 'Danger' })
    const Tooltip = this.page.locator('nb-tooltip').last()

    await Promise.all([Tooltip.waitFor({ state: 'visible' }), DangerBTN.hover()])
    await expect(Tooltip).toBeVisible()
    await expect(Tooltip).toHaveText('This is a tooltip')
    const ButtonBox = await DangerBTN.boundingBox()
    const Tooltipbox = await Tooltip.boundingBox()
    if (!ButtonBox || !Tooltipbox) {
      throw new Error('Element not visible');
    }
    expect(Tooltipbox.y + Tooltipbox.height).toBeLessThan(ButtonBox.y)

    await Tooltip.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    await expect(Tooltip).toHaveCSS('background-color', 'rgb(255, 61, 113)')
  }

  async coloredTooltipInfo() {
    const TooltipPlacements = this.page.locator('nb-card', { hasText: 'Colored Tooltips' })
    const InfoBTN = TooltipPlacements.getByRole('button', { name: 'Info' })
    const Tooltip = this.page.locator('nb-tooltip').last()

    await Promise.all([Tooltip.waitFor({ state: 'visible' }), InfoBTN.hover()])
    await expect(Tooltip).toBeVisible()
    await expect(Tooltip).toHaveText('This is a tooltip')
    const ButtonBox = await InfoBTN.boundingBox()
    const Tooltipbox = await Tooltip.boundingBox()
    if (!ButtonBox || !Tooltipbox) {
      throw new Error('Element not visible');
    }
    expect(Tooltipbox.y + Tooltipbox.height).toBeLessThan(ButtonBox.y)

    await Tooltip.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    await expect(Tooltip).toHaveCSS('background-color', 'rgb(0, 149, 255)')
  }

  async coloredTooltipWarning() {
    const TooltipPlacements = this.page.locator('nb-card', { hasText: 'Colored Tooltips' })
    const WarningBTN = TooltipPlacements.getByRole('button', { name: 'Warning' })
    const Tooltip = this.page.locator('nb-tooltip').last()

    await Promise.all([Tooltip.waitFor({ state: 'visible' }), WarningBTN.hover()])
    await expect(Tooltip).toBeVisible()
    await expect(Tooltip).toHaveText('This is a tooltip')
    const ButtonBox = await WarningBTN.boundingBox()
    const Tooltipbox = await Tooltip.boundingBox()
    if (!ButtonBox || !Tooltipbox) {
      throw new Error('Element not visible');
    }
    expect(Tooltipbox.y + Tooltipbox.height).toBeLessThan(ButtonBox.y)

    const bgColor = await Tooltip.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    console.log(bgColor);
    await expect(Tooltip).toHaveCSS('background-color', 'rgb(255, 170, 0)')
  }
}