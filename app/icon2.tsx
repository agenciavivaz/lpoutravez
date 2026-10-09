import { ImageResponse } from 'next/og';
import { brandSvgDataUri } from '@/lib/og/assets';

/** Ícone PNG 16×16 a partir de brand/assets/logo-symbol.svg (PRD 13). */
export const size = { width: 16, height: 16 };
export const contentType = 'image/png';

export default async function Icon() {
  const symbol = await brandSvgDataUri('logo-symbol');
  // eslint-disable-next-line @next/next/no-img-element -- next/og não usa next/image
  return new ImageResponse(<img src={symbol} width={16} height={16} alt="" />, size);
}
