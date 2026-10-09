import { describe, expect, it } from 'vitest';
import { isQualified, validateContact, validateStore } from '@/lib/validation/demo';
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

describe('validação da etapa 2 (PRD 9.3)', () => {
  const okStore = {
    storeName: 'Loja da Ana',
    marketplaces: ['Shopee'],
    ordersRange: '1000_3000',
    erp: 'bling',
    erpOther: '',
  };

  it('aceita loja válida', () => {
    expect(validateStore(okStore)).toEqual({});
  });

  it('exige ao menos um canal, faixa e ERP conhecidos', () => {
    const errors = validateStore({
      ...okStore,
      marketplaces: ['Inventado'],
      ordersRange: 'x',
      erp: 'y',
    });
    expect(Object.keys(errors).sort()).toEqual(['erp', 'marketplaces', 'ordersRange']);
  });

  it('Bling e "Não sei" vão para o calendário; o resto para a lista de espera', () => {
    expect(isQualified('bling')).toBe(true);
    expect(isQualified('nao_sei')).toBe(true);
    for (const erp of ['tiny_olist', 'omie', 'outro', 'nenhum'])
      expect(isQualified(erp)).toBe(false);
  });
});
