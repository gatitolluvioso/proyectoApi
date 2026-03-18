// tests/regresion.spec.js
import { test, expect } from '@playwright/test';
import bebidasMock from './fixtures/bebidas.json' assert { type: 'json' };

test.describe('Regresión visual', () => {

  async function mockAPIs(page) {
    const letras = 'abcdefghijklmnopqrstuvwxyz'.split('');
    for (const letra of letras) {
      await page.route(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`,
        route => {
          const body = letra === 'a'
            ? JSON.stringify(bebidasMock)
            : JSON.stringify({ drinks: null });
          route.fulfill({ status: 200, contentType: 'application/json', body });
        }
      );
    }

    await page.route('https://official-joke-api.appspot.com/random_joke', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          setup: 'Setup fijo para regresión',
          punchline: 'Punchline fijo para regresión'
        })
      });
    });
  }

  test.beforeEach(async ({ page }) => {
    await mockAPIs(page);
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('#tarjetas div')).toHaveCount(2, { timeout: 15000 });
  });

  test('grid de tarjetas y header no cambian visualmente', async ({ page }) => {
    await expect(page.locator('header')).toHaveScreenshot('header.png');
    await expect(page.locator('#tarjetas')).toHaveScreenshot('grid-tarjetas.png');
  });

  test('modal de detalle y vista móvil no cambian visualmente', async ({ page }) => {
    await page.locator('#tarjetas div').first().click();
    const modal = page.locator('body > div').last();
    await expect(modal).toHaveScreenshot('modal-detalle.png');
    await modal.locator('.cerrar').click();

    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('mobile-completo.png');
  });

});