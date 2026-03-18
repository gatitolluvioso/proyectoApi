// tests/interfaz.test.js
import { beforeEach, describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __dirname = dirname(fileURLToPath(import.meta.url));
let doc;

describe('Interfaz - Header y Buscador', () => {

  beforeEach(() => {
    const html = readFileSync(resolve(__dirname, '../index.html'), 'utf-8');
    const dom = new JSDOM(html);
    doc = dom.window.document;
  });

  it('muestra el título Menu en el header', () => {
    const titulo = doc.querySelector('header h1');
    expect(titulo).not.toBeNull();
    expect(titulo.textContent.trim()).toBe('Menu');
  });

  it('el buscador existe en el header', () => {
    const buscador = doc.querySelector('.buscar input');
    expect(buscador).not.toBeNull();
  });

  it('el buscador es de tipo texto', () => {
    const buscador = doc.querySelector('.buscar input');
    expect(buscador).not.toBeNull();
    expect(buscador.tagName.toLowerCase()).toBe('input');
  });

  it('el buscador tiene el placeholder correcto', () => {
    const buscador = doc.querySelector('.buscar input');
    expect(buscador).not.toBeNull();
    expect(buscador.getAttribute('placeholder')).toBe('Buscar cocteles...');
  });

});

describe('Interfaz - Footer y Chistes', () => {

  beforeEach(() => {
    const html = readFileSync(resolve(__dirname, '../index.html'), 'utf-8');
    const dom = new JSDOM(html);
    doc = dom.window.document;
  });

  it('el footer tiene el texto de derechos reservados', () => {
    const footer = doc.querySelector('footer');
    expect(footer).not.toBeNull();
    expect(footer.textContent).toContain('Puter Inc.');
  });

  it('el footer muestra el año 2026', () => {
    const footer = doc.querySelector('footer');
    expect(footer.textContent).toContain('2026');
  });

  it('el contenedor de chistes existe en el footer', () => {
    const chistes = doc.getElementById('chistes');
    expect(chistes).not.toBeNull();
  });

  it('el contenedor de tarjetas existe en el body', () => {
    const tarjetas = doc.getElementById('tarjetas');
    expect(tarjetas).not.toBeNull();
  });

});