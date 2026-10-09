import { ImageResponse } from 'next/og';
import { brandSvgDataUri } from '@/lib/og/assets';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Apple touch icon (180) a partir do símbolo, com fundo quente para não ficar transparente. */
export default async function AppleIcon() {
  const symbol = await brandSvgDataUri('logo-symbol');
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F8F7F3',
      }}
    >
      {}
      <img src={symbol} width={150} height={150} alt="" />
    </div>,
    size,
  );
}
