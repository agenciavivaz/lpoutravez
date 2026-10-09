import { describe, expect, it } from 'vitest';
import { ERPS, validateContact, validateStore } from '@/lib/validation/demo';
import { whatsappHref } from '@/lib/site';
import { maskPhoneInput, parseBrPhone } from '@/lib/phone';

const okContact = {
  name: 'Ana',
  whatsapp: '(11) 98765-4321',
  email: 'ana@sualoja.com.br',
  consent: true,
};

describe('validação da etapa 1 (PRD 9.2)', () => {
  it('aceita contato válido e salva WhatsApp em E.164', () => {
    expect(validateContact(okContact)).toEqual({});
    expect(parseBrPhone(okContact.whatsapp)?.e164).toBe('+5511987654321');
  });

  it('usa as mensagens de erro do PRD', () => {
    const errors = validateContact({
      name: 'A',
      whatsapp: '1133334444',
      email: 'ana@',
      consent: false,
    });
    expect(errors).toEqual({
      name: 'Escreva seu nome.',
      whatsapp: 'Confira o número: DDD + 9 dígitos.',
      email: 'Confira o e-mail. Exemplo: voce@sualoja.com.br',
      consent: 'Marque para a gente poder falar com você.',
    });
  });

  it('recusa DDD inválido e celular sem o 9', () => {
    expect(validateContact({ ...okContact, whatsapp: '(20) 98765-4321' }).whatsapp).toBeDefined();
    expect(validateContact({ ...okContact, whatsapp: '(11) 8765-4321' }).whatsapp).toBeDefined();
  });

  it('aplica a máscara (11) 98765-4321 enquanto digita', () => {
    expect(maskPhoneInput('1')).toBe('(1');
    expect(maskPhoneInput('1198')).toBe('(11) 98');
    expect(maskPhoneInput('11987654321')).toBe('(11) 98765-4321');
    expect(maskPhoneInput('119876543219999')).toBe('(11) 98765-4321');
  });
});

describe('validação da etapa 2 (PRD v2 9.13)', () => {
  const okStore = { site: '', ordersRange: '1000_3000', erp: 'bling', erpOther: '' };

  it('aceita etapa válida com site vazio (opcional)', () => {
    expect(validateStore(okStore)).toEqual({});
    expect(validateStore({ ...okStore, site: 'casalavanda.com.br' })).toEqual({});
  });

  it('exige faixa e ERP conhecidos', () => {
    const errors = validateStore({ ...okStore, ordersRange: 'x', erp: 'y' });
    expect(Object.keys(errors).sort()).toEqual(['erp', 'ordersRange']);
  });

  it('ERPs do select: Bling, Tiny, Omie, UpSeller, Outro', () => {
    expect(ERPS).toEqual(['bling', 'tiny', 'omie', 'upseller', 'outro']);
  });
});

describe('link do WhatsApp (PRD v2 9.13)', () => {
  it('leva o número e a mensagem; sem número, não existe', () => {
    expect(whatsappHref('Oi, quero conhecer o Outra Vez', '5511987654321')).toBe(
      'https://wa.me/5511987654321?text=Oi%2C%20quero%20conhecer%20o%20Outra%20Vez',
    );
    expect(whatsappHref('Oi', '+55 (11) 98765-4321')).toBe('https://wa.me/5511987654321?text=Oi');
    expect(whatsappHref('Oi', null)).toBeNull();
    expect(whatsappHref('Oi', '')).toBeNull();
  });
});
