import Image from 'next/image';
import horizontal from '@/brand/assets/logo-horizontal.svg';
import negative from '@/brand/assets/logo-horizontal-negative.svg';
import mono from '@/brand/assets/logo-horizontal-mono.svg';
import symbol from '@/brand/assets/logo-symbol.svg';
import { cn } from '@/lib/utils';

const sources = { positive: horizontal, negative, mono, symbol } as const;

type LogoProps = {
  /** positive = fundo claro · negative = faixa escura · mono = uma cor · symbol = só o "O". */
  variant?: keyof typeof sources;
  className?: string;
  /** Texto alternativo. Use "" quando o logo estiver dentro de um link já rotulado. */
  alt?: string;
  priority?: boolean;
  /** Altura em px. A largura sai da proporção do arquivo (horizontal 420×108). */
  height?: number;
};

/** Logo oficial (brand/assets). Nunca redesenhe: só escolha a variante. */
export function Logo({
  variant = 'positive',
  className,
  alt = 'Outra Vez',
  priority,
  height = 32,
}: LogoProps) {
  const src = sources[variant];
  const width = Math.round((height * src.width) / src.height);
  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      unoptimized
      width={width}
      height={height}
      style={{ width, height }}
      className={cn('max-w-none shrink-0', className)}
    />
  );
}
