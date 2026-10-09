import type { CSSProperties } from 'react';
import type { Brand } from '@/lib/brands';
import { cn } from '@/lib/utils';

/**
 * Marca de terceiro, monocromática (PRD v2 7): o símbolo é uma máscara pintada com
 * `currentColor` (nunca a cor-assinatura, nem no hover) e o nome vem escrito ao lado, que também
 * é o nome acessível. Sem SVG, só o nome, no mesmo estilo.
 */
export function BrandMark({ brand, className }: { brand: Brand; className?: string }) {
  return (
    <span
      data-brand={brand.id}
      className={cn(
        'text-muted-foreground inline-flex items-center gap-2 text-base leading-none font-extrabold tracking-[-0.01em] whitespace-nowrap lg:text-lg',
        className,
      )}
    >
      {brand.logo ? (
        <span
          aria-hidden
          data-brand-logo
          className="size-5 shrink-0 bg-current [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] lg:size-6"
          style={{ maskImage: `url(${brand.logo})` } as CSSProperties}
        />
      ) : null}
      {brand.name}
    </span>
  );
}
