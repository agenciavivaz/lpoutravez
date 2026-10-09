import { ImageResponse } from 'next/og';
import { brandSvgDataUri } from '@/lib/og/assets';

/** Ícone PNG 512×512 a partir de brand/assets/logo-symbol.svg (PRD 13). */
export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default async function Icon() {
  const symbol = await brandSvgDataUri('logo-symbol');
  // eslint-disable-next-line @next/next/no-img-element -- next/og não usa next/image
  return new ImageResponse(<img src={symbol} width={512} height={512} alt="" />, size);
}
