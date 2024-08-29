import { Locator, Page } from "@playwright/test";

export default class PaginaLogin {
  private readonly inputUsername: Locator;
  private readonly inputPassword: Locator;
  private readonly botaoSubmit: Locator;

  constructor(private page: Page) {
    this.inputUsername = page.locator('input[name="username"]');
    this.inputPassword = page.locator('input[name="password"]');
    this.botaoSubmit = page.locator('button[type="submit"]');
  }

  async visitar() {
    await this.page.goto('http://localhost:4200/login');
  }

  async fazerLogin(username: string, password: string) {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
  }

  async clicarNoBotaoSubmit() {
    await this.botaoSubmit.click();
  }

  async capturarMensagemDeErro(): Promise<string> {
    const dialog = await this.page.waitForEvent('dialog');
    const message = dialog.message();
    await dialog.dismiss();
    return message;
  }

  async obterURLAtual() {
    return this.page.url();
  }

  async obterTextoCabecalho() {
    return this.page.locator('h2').innerText();
  }
}
