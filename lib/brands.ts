/**
 * Marcas citadas na LP (PRD v2 6 e 7). Nomes próprios, não são copy.
 * `logo`: arquivo monocromático em /public/logos/ (currentColor). Sem logo, a LP mostra o nome.
 */

export type Brand = { id: string; name: string; logo: string | null };

export const MARKETPLACES: Brand[] = [
  { id: 'mercado-livre', name: 'Mercado Livre', logo: null },
  { id: 'shopee', name: 'Shopee', logo: null },
  { id: 'amazon', name: 'Amazon', logo: null },
  { id: 'magalu', name: 'Magalu', logo: null },
  { id: 'tiktok-shop', name: 'TikTok Shop', logo: null },
  { id: 'shein', name: 'Shein', logo: null },
];

export type Erp = Brand & { active: boolean };

/** Bling é a única integração ativa; os demais conectamos na implantação. */
export const ERPS: Erp[] = [
  { id: 'bling', name: 'Bling', logo: null, active: true },
  { id: 'tiny', name: 'Tiny (Olist)', logo: null, active: false },
  { id: 'omie', name: 'Omie', logo: null, active: false },
  { id: 'upseller', name: 'UpSeller', logo: null, active: false },
  { id: 'anymarket', name: 'Anymarket', logo: null, active: false },
  { id: 'magis5', name: 'Magis5', logo: null, active: false },
  { id: 'ideris', name: 'Ideris', logo: null, active: false },
  { id: 'eccosys', name: 'Eccosys', logo: null, active: false },
];
