# Playwright UI Automation — ngx-admin Practice App

End-to-end UI automation framework built with [Playwright](https://playwright.dev/) and the [Page Object Model](https://playwright.dev/docs/pom) pattern. Tests run against a lightweight [ngx-admin](https://github.com/akveo/ngx-admin) Angular application, covering forms, tables, modals, authentication, and advanced browser interactions.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Application under test | Angular 14, Nebular UI |
| Test framework | Playwright Test 1.51+ |
| Language | TypeScript |
| Test data | Faker.js |
| Reporting | HTML Reporter, video, trace |

---

## Test Coverage

| Area | Spec file | Scenarios |
|------|-----------|-----------|
| **Forms** | `forms.spec.ts` | Inline, grid, basic, block, horizontal, and label-less layouts |
| **Form fixtures** | `test-Fixtures.spec.ts` | Form layouts via custom `pageManager` fixture |
| **Date Picker** | `date.spec.ts` | Page validation, calendar popups, today's date, future dates, range, min/max |
| **Dialog** | `dialog.spec.ts` | Open/close, all dialog types, result return |
| **Window** | `window.spec.ts` | Form windows, template windows, backdrop options |
| **Popover** | `popover.spec.ts` | Position, simple/template/component popovers, tabs, forms, cards |
| **Toastr** | `toaster.spec.ts` | Page validation, position, multiple toast scenarios |
| **Tooltip** | `tooltip.spec.ts` | Icon tooltips, placement (top/right/bottom/left), colored variants |
| **Tables** | `webTables.spec.ts` | Header validation, CRUD, filtering, pagination, data integrity |
| **Login** | `login.spec.ts` | Page validation, error messages, successful login |
| **Register** | `register.spec.ts` | Page validation, error messages, user registration |
| **Request Password** | `requestPassword.spec.ts` | Validation, error messages, request flow, cross-page navigation |
| **Change Password** | `changePassword.spec.ts` | Validation, error messages, reset flow, cross-page navigation |
| **Auto-waiting** | `AutoWaiting.spec.ts` | AJAX waits, selector timeouts, auto-wait behavior |
| **Drag & Drop** | `DragAndDrop.spec.ts` | iFrame interaction, drag-and-drop on external demo site |
| **Locators (practice)** | `ignore.spec.ts` | Locator syntax, user-facing locators, parent/child elements, assertions |
| **Inputs (practice)** | `playingaround.spec.ts` | Input fields, radios, checkboxes, dialogs, tables, date picker concepts |

---

## Architecture

```
tests/                    → Test specifications
Page-Objects/             → Page Object classes
  ├── helperBase.ts       → Shared utilities (waits, page reference)
  ├── pageManager.ts      → Central hub — exposes all page objects
  ├── navigationPage.ts   → Sidebar navigation
  ├── FormLayouts.ts      → Form interaction methods
  ├── datePicker.ts       → Date picker interactions
  ├── dialog.ts           → Dialog interactions
  ├── windowpage.ts       → Window modal interactions
  ├── popoverpage.ts      → Popover interactions
  ├── toasterPage.ts      → Toastr notification interactions
  ├── tooltipPage.ts      → Tooltip interactions
  ├── loginPage.ts        → Login page interactions
  ├── registerpage.ts     → Register page interactions
  ├── requestPassword.ts  → Request password interactions
  ├── changePassword.ts   → Change password interactions
  └── webTables.ts        → Smart table interactions
test-options.ts           → Custom Playwright fixtures
playwright.config.ts      → Global test configuration
Screenshots/              → Screenshots captured during test runs
```

**Page Manager pattern:** Tests interact with a single `PageManager` instance, which delegates to focused page objects. This keeps tests readable and locators maintainable.

```
Test → PageManager → NavigationPage / FormLayoutPage / LoginPage / ...
```

**Custom fixtures** (`test-options.ts`):
- `pageManager` — pre-initialized `PageManager` injected into tests
- `FormlayoutsPage` — navigates to Form Layouts before the test runs
- `globalsQAURL` — configurable external URL for cross-site scenarios (e.g. drag-and-drop demo)

---

## Prerequisites

- **Node.js** 16.x or 18.x (LTS recommended)
- **npm** 8+
- **Git**

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/bondar-artem/pw-practice-app.git
cd pw-practice-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

### 4. Start the application (optional — Playwright can start it automatically)

```bash
npm run start
```

The app will be available at `http://localhost:4200`.

---

## Running Tests

Playwright is configured to start the Angular dev server automatically via `webServer` in `playwright.config.ts`. You do not need to run `npm start` separately unless you prefer to.

### Run the full suite

```bash
npx playwright test
```

### Run feature specs (Page Object Model suite)

```bash
npx playwright test forms.spec.ts date.spec.ts dialog.spec.ts window.spec.ts popover.spec.ts toaster.spec.ts tooltip.spec.ts webTables.spec.ts login.spec.ts register.spec.ts requestPassword.spec.ts changePassword.spec.ts
```

### Run foundational / practice specs

```bash
npx playwright test AutoWaiting.spec.ts DragAndDrop.spec.ts ignore.spec.ts playingaround.spec.ts test-Fixtures.spec.ts
```

### Run on a specific browser

```bash
npx playwright test --project=dev       # Desktop Chrome
npx playwright test --project=firefox   # Desktop Firefox
npx playwright test --project=webkit    # Desktop Safari
```

### Run a single test file

```bash
npx playwright test login.spec.ts
npx playwright test webTables.spec.ts
npx playwright test DragAndDrop.spec.ts
npx playwright test AutoWaiting.spec.ts
```

### Run in headed mode (see the browser)

```bash
npx playwright test --headed
```

### Run in UI mode (interactive debugger)

```bash
npx playwright test --ui
```

### View the HTML report

```bash
npx playwright show-report
```

---

## Project Structure

```
pw-practice-app/
├── Page-Objects/              # Page Object Model classes
│   ├── pageManager.ts
│   ├── helperBase.ts
│   ├── navigationPage.ts
│   ├── FormLayouts.ts
│   ├── datePicker.ts
│   ├── dialog.ts
│   ├── windowpage.ts
│   ├── popoverpage.ts
│   ├── toasterPage.ts
│   ├── tooltipPage.ts
│   ├── loginPage.ts
│   ├── registerpage.ts
│   ├── requestPassword.ts
│   ├── changePassword.ts
│   └── webTables.ts
├── tests/                     # Test specifications
│   ├── forms.spec.ts          # Form layouts (POM)
│   ├── test-Fixtures.spec.ts  # Custom fixture usage
│   ├── date.spec.ts           # Date picker (POM)
│   ├── dialog.spec.ts         # Dialog modals (POM)
│   ├── window.spec.ts         # Window modals (POM)
│   ├── popover.spec.ts        # Popovers (POM)
│   ├── toaster.spec.ts        # Toastr notifications (POM)
│   ├── tooltip.spec.ts        # Tooltips (POM)
│   ├── webTables.spec.ts      # Smart table CRUD & filters (POM)
│   ├── login.spec.ts          # Login flow (POM)
│   ├── register.spec.ts       # Registration flow (POM)
│   ├── requestPassword.spec.ts
│   ├── changePassword.spec.ts
│   ├── AutoWaiting.spec.ts    # Auto-wait and timeout strategies
│   ├── DragAndDrop.spec.ts    # iFrames and drag-and-drop
│   ├── ignore.spec.ts         # Locator syntax and assertions (practice)
│   └── playingaround.spec.ts  # Inputs, tables, date picker (practice)
├── Screenshots/               # Screenshots saved during test execution
├── test-options.ts            # Extended test with custom fixtures
├── playwright.config.ts       # Playwright configuration
└── src/                       # Angular application (ngx-admin)
```

---

## Configuration

Key settings in `playwright.config.ts`:

| Setting | Value |
|---------|-------|
| Base URL | `http://localhost:4200/pages/iot-dashboard` |
| Test directory | `./tests` |
| Parallel execution | Enabled |
| Retries | 1 locally, 2 on CI |
| Video | Recorded on every run (1920×1080) |
| Trace | Captured on first retry |
| Web server | `npm run start` at `http://localhost:4200/` |

External URL for drag-and-drop tests:

```
https://www.globalsqa.com/demo-site/draganddrop/
```

---

## Browsers

| Project | Browser |
|---------|---------|
| `dev` | Desktop Chrome |
| `firefox` | Desktop Firefox |
| `webkit` | Desktop Safari |

---

## Test Data

Dynamic test data is generated with [Faker.js](https://fakerjs.dev/) to avoid hardcoded values and reduce test coupling:

```typescript
const email = `${faker.person.fullName().replace(' ', '')}${faker.number.int(100)}@test.com`
const password = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
```

---

## Application Under Test

This project uses a trimmed-down fork of [ngx-admin](https://github.com/akveo/ngx-admin) — an Angular admin dashboard template. Available pages include:

- IoT Dashboard
- Forms (Layouts, Datepicker)
- Modal & Overlays (Dialog, Window, Popover, Toastr, Tooltip)
- Tables & Data (Smart Table, Tree Grid)
- Auth (Login, Register, Request Password, Reset Password)

Original application: [akveo/ngx-admin](https://github.com/akveo/ngx-admin)

---

## License

MIT — see [LICENSE](LICENSE) for details.

The ngx-admin application is based on the Akveo ngx-admin template. Playwright tests and page objects in this repository are part of this practice project.