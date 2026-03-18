// tests/integracion.spec.js
import { test, expect } from '@playwright/test';
import bebidasMock from './fixtures/bebidas.json' assert { type: 'json' };

test.describe('Integración - APIs', () => {

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
          setup: '¿Por qué el mar está salado?',
          punchline: 'Porque la orilla no le da besos.'
        })
      });
    });
  }

  test('genera tarjetas y el buscador filtra correctamente', async ({ page }) => {
    await mockAPIs(page);

    // Espera a que TODAS las peticiones terminen
    await page.goto('/', { waitUntil: 'networkidle' });

    await expect(page.locator('#tarjetas div')).toHaveCount(2, { timeout: 15000 });
    await expect(page.locator('#tarjetas div').first().locator('h2')).toHaveText('Margarita');

    await page.locator('#buscador').fill('Mojito');
    await expect(page.locator('#tarjetas div')).toHaveCount(1);
    await expect(page.locator('#tarjetas h2')).toHaveText('Mojito');
  });

  test('el modal abre y cierra, y la API de chistes carga', async ({ page }) => {
    await mockAPIs(page);
    await page.goto('/', { waitUntil: 'networkidle' });

    await expect(page.locator('#tarjetas div')).toHaveCount(2, { timeout: 15000 });

    await page.locator('#tarjetas div').first().click();
    const modal = page.locator('body > div').last();
    await expect(modal).toBeVisible();
    await expect(modal.locator('h2')).toHaveText('Margarita');
    await modal.locator('.cerrar').click();
    await expect(modal).not.toBeVisible();

    await expect(page.locator('#chistes p')).toContainText('¿Por qué el mar está salado?');
  });

});