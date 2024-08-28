import { Locator, Page, expect } from "@playwright/test";

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
    await this.botaoSubmit.click();
  }

  async verificarRedirecionamentoSucesso() {
    await expect(this.page).toHaveURL('http://localhost:4200/principal');
    await expect(this.page.locator('h2')).toHaveText('Boas vindas!');
  }

  async verificarMensagemDeErro(mensagem: string) {
    this.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe(mensagem);
      await dialog.dismiss();
    });
  }
}
