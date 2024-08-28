import { test, expect } from '@playwright/test';

test('Login com credenciais corretas deve redirecionar para a página de boas-vindas', async ({ page }) => {
  await page.goto('http://localhost:63274/login');

  await page.fill('input[name="username"]', 'alura');
  await page.fill('input[name="password"]', 'alura123');
  await page.click('button[type="submit"]');

  // Verifique o redirecionamento
  await expect(page).toHaveURL('http://localhost:63274/principal');
  await expect(page.locator('h2')).toHaveText('Boas vindas!');
});

test('Login com credenciais incorretas deve exibir alerta', async ({ page }) => {
  await page.goto('http://localhost:63274/login');

  await page.fill('input[name="username"]', 'alura');
  await page.fill('input[name="password"]', 'senhaErrada');
  await page.click('button[type="submit"]');

  // Verifique o alerta
  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('Login ou senha incorretos!');
    await dialog.dismiss();
  });
});
