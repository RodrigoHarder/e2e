import { test, expect } from '@playwright/test';
import PaginaLogin from './page-object/login';

test.describe("Página de Login", () => {
  test("Login com credenciais corretas deve redirecionar para a página de boas-vindas", async ({ page }) => {
    const paginaLogin = new PaginaLogin(page);
    await paginaLogin.visitar();
    await paginaLogin.fazerLogin('alura', 'alura123');
    await paginaLogin.clicarNoBotaoSubmit();

    expect(await paginaLogin.obterURLAtual()).toBe('http://localhost:4200/principal');
    expect(await paginaLogin.obterTextoCabecalho()).toBe('Boas vindas!');
  });

  test("Login com credenciais incorretas deve exibir alerta", async ({ page }) => {
    const paginaLogin = new PaginaLogin(page);
    await paginaLogin.visitar();
    await paginaLogin.fazerLogin('alura', 'senhaErrada');
    
    const [mensagemErro] = await Promise.all([
      paginaLogin.capturarMensagemDeErro(),
      paginaLogin.clicarNoBotaoSubmit()
    ]);
    expect(mensagemErro).toBe('Login ou senha incorretos!');
  });
});
