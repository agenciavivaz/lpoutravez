import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionProps = {
  id?: string;
  labelledBy: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
};

/** Faixa de seção com contêiner de 1200 px, gutter de 16 px no mobile e ritmo vertical padrão. */
export function Section({ id, labelledBy, className, innerClassName, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('relative isolate', className)}>
      <div
        className={cn('mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24', innerClassName)}
      >
        {children}
      </div>
    </section>
  );
}

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** dark = faixa ink-900/950: título branco, eyebrow coral-300. */
  tone?: 'light' | 'dark';
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  tone = 'light',
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark';
  return (
    <div className={cn('max-w-[720px]', className)}>
      <p className={cn('eyebrow', dark && 'eyebrow-on-dark')}>{eyebrow}</p>
      <h2 id={id} className={cn('section-h2 mt-4', dark ? 'text-white' : 'text-ink-900')}>
        {title}
      </h2>
      {subtitle ? (
        <p className={cn('mt-4 text-lg', dark ? 'text-ink-100' : 'text-muted-foreground')}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
