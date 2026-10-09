import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import tokens from '@/brand/tokens.json';

const css = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8').toLowerCase();

function block(selector: string): string {
  const start = css.indexOf(selector);
  expect(start, selector).toBeGreaterThanOrEqual(0);
  return css.slice(start, css.indexOf('}', start));
}

describe('app/globals.css espelha brand/tokens.json', () => {
  it('tem todas as primitivas 50–950', () => {
    for (const [scale, steps] of Object.entries(tokens.colors)) {
      for (const [step, hex] of Object.entries(steps)) {
        expect(css).toContain(`--color-${scale}-${step}: ${hex.toLowerCase()};`);
      }
    }
  });

  it('tem os semânticos do tema claro', () => {
    const light = block(":root,\n[data-theme='light'] {");
    for (const [name, hex] of Object.entries(tokens.semantic.light)) {
      expect(light, name).toContain(`--${name}: ${hex.toLowerCase()};`);
    }
  });

  it('tem os semânticos do tema escuro', () => {
    const dark = block("[data-theme='dark'] {");
    for (const [name, hex] of Object.entries(tokens.semantic.dark)) {
      expect(dark, name).toContain(`--${name}: ${hex.toLowerCase()};`);
    }
  });
});
