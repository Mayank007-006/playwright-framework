import { Page } from "@playwright/test";
import { NavigationPage } from '../Page-Objects/Navigagtion'
import { FormLayoutPage } from '../Page-Objects/FormLayouts'
import { Datepickerpage } from '../Page-Objects/datePicker'
import { DialogPage } from "../Page-Objects/dialog"
import { WindowPage } from '../Page-Objects/windowpage';
import { PopoverPage } from '../Page-Objects/popoverpage'
import { ToasterPage } from "../Page-Objects/toasterPage";
import { TooltipPage } from '../Page-Objects/tooltipPage'
import { LoginPage } from '../Page-Objects/loginPage'
import { RegisterPage } from "./registerpage";
import { RequestPasswordPage } from '../Page-Objects/requestPassword';
import { ChangePasswordPage } from "./changePassword";
import { WebTablespage } from "./webTables";

export class PageManager {
  private readonly page: Page
  private readonly navigationPage: NavigationPage;
  private readonly formLayoutPage: FormLayoutPage;
  private readonly dateopickerPage: Datepickerpage;
  private readonly dialogPage: DialogPage;
  private readonly windowpage: WindowPage;
  private readonly popverpage: PopoverPage;
  private readonly toasterpage: ToasterPage;
  private readonly tooltippage: TooltipPage;
  private readonly loginpage: LoginPage;
  private readonly registerpage: RegisterPage;
  private readonly requestpasswordpage: RequestPasswordPage;
  private readonly changepasswordpage: ChangePasswordPage;
  private readonly webTablespage: WebTablespage;

  constructor(page: Page) {
    this.page = page
    this.navigationPage = new NavigationPage(this.page);
    this.formLayoutPage = new FormLayoutPage(this.page);
    this.dateopickerPage = new Datepickerpage(this.page);
    this.dialogPage = new DialogPage(this.page);
    this.windowpage = new WindowPage(this.page);
    this.popverpage = new PopoverPage(this.page);
    this.toasterpage = new ToasterPage(this.page);
    this.tooltippage = new TooltipPage(this.page);
    this.loginpage = new LoginPage(this.page);
    this.registerpage = new RegisterPage(this.page)
    this.requestpasswordpage = new RequestPasswordPage(this.page)
    this.changepasswordpage = new ChangePasswordPage(this.page)
    this.webTablespage = new WebTablespage(this.page)
  }

  Navigateto() {
    return this.navigationPage
  }

  FillFormLayout() {
    return this.formLayoutPage
  }

  DatePickerFunction() {
    return this.dateopickerPage
  }

  DialogPageFunction() {
    return this.dialogPage
  }

  WindowPageFunction() {
    return this.windowpage
  }

  PopoverPageFunction() {
    return this.popverpage
  }

  ToasterPageFunction() {
    return this.toasterpage
  }

  TooltipPageFunction() {
    return this.tooltippage
  }

  LoginPageFunction() {
    return this.loginpage
  }

  RegsiterpageFunction() {
    return this.registerpage
  }

  RequestPasswordFunction() {
    return this.requestpasswordpage
  }

  ChangePasswordFunction() {
    return this.changepasswordpage
  }

  WebTablesFunction() {
    return this.webTablespage
  }
}