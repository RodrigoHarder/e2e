import { test } from '@playwright/test';
import PaginaLogin from './page-object/login';

test.describe("Página de Login", () => {
  test("Login com credenciais corretas deve redirecionar para a página de boas-vindas", async ({ page }) => {
    const paginaLogin = new PaginaLogin(page);
    await paginaLogin.visitar();
    await paginaLogin.fazerLogin('alura', 'alura123');
    await paginaLogin.verificarRedirecionamentoSucesso();
  });
  
  test("Login com credenciais incorretas deve exibir alerta", async ({ page }) => {
    const paginaLogin = new PaginaLogin(page);
    await paginaLogin.visitar();
    await paginaLogin.fazerLogin('alura', 'senhaErrada');
    await paginaLogin.verificarMensagemDeErro('Login ou senha incorretos!');
  });
});
