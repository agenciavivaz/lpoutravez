import { ImageResponse } from 'next/og';
import { copy } from '@/lib/copy/pt-BR';
import { MARKETPLACES } from '@/lib/brands';
import { arimoBold, brandSvgDataUri, jakarta } from '@/lib/og/assets';

export const alt = copy.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Imagem OG (PRD 13 e v2 10): fundo ink-900, laço coral, slogan, faixa "Funciona com" e logo negativo. */
export default async function OpengraphImage() {
  const [symbol, font800, logoFont] = await Promise.all([
    brandSvgDataUri('logo-symbol'),
    jakarta(800),
    arimoBold(),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#1F2A6B',
        padding: '72px 80px',
        position: 'relative',
        fontFamily: 'Jakarta',
      }}
    >
      <svg
        width="560"
        height="560"
        viewBox="0 0 100 100"
        style={{ position: 'absolute', right: -150, bottom: -170 }}
      >
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="12"
        />
        <path
          d="M 63 14.29 A 38 38 0 0 1 84.44 66.06"
          fill="none"
          stroke="#E85D4A"
          strokeWidth="12"
        />
        <path d="M 95.3 71.1 L 73.6 61 L 78.6 79.6 Z" fill="#E85D4A" />
      </svg>
      {/* Lockup do logo-horizontal-negative.svg: símbolo oficial + "Outra Vez" (texto do SVG,
          fonte Arial → Arimo, mesmas métricas). Proporções do arquivo: símbolo 96, texto 54. */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 17 }}>
        <img src={symbol} width={82} height={82} alt="" />
        <span style={{ fontFamily: 'Arimo', fontSize: 46, color: '#F8F7F3' }}>Outra Vez</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          color: '#FFFFFF',
          fontSize: 84,
          lineHeight: 1.08,
          letterSpacing: '-0.035em',
          maxWidth: 820,
        }}
      >
        <span>Vendeu uma vez?</span>
        <span style={{ display: 'flex' }}>
          Venda&nbsp;
          <span style={{ color: '#FFA18C' }}>outra vez.</span>
        </span>
        {/* Faixa "Funciona com" em monocromático (PRD v2 10): só nomes, sem cor de marca. */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 26,
            marginTop: 40,
            fontSize: 26,
            letterSpacing: '-0.01em',
            color: 'rgba(255,255,255,0.62)',
          }}
        >
          <span style={{ color: '#FFFFFF' }}>{copy.logoStrip.label}</span>
          {MARKETPLACES.map((brand) => (
            <span key={brand.id}>{brand.name}</span>
          ))}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Jakarta', data: font800, weight: 800, style: 'normal' },
        { name: 'Arimo', data: logoFont, weight: 700, style: 'normal' },
      ],
    },
  );
}
