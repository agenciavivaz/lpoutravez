import { copy, fill } from '@/lib/copy/pt-BR';
import { site } from '@/lib/site';
import { Logo } from '@/components/brand/logo';

export function Footer() {
  const t = copy.footer;
  // Sem CNPJ confirmado, a linha legal sai sem o trecho " · CNPJ {CNPJ_VIVAZ}" (PRD 17, pergunta 6).
  const legal = site.cnpj ? fill(t.legal, { CNPJ_VIVAZ: site.cnpj }) : t.legal.split(' · CNPJ')[0];
  return (
    <footer className="bg-warm-200 text-foreground">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <Logo height={32} />
          <p className="text-ink-900 mt-4 text-lg font-bold">{copy.meta.slogan}</p>
        </div>
        <nav aria-label={copy.a11y.footerNav}>
          <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-2 lg:justify-end">
            {t.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="hover:text-ink-900 flex min-h-11 items-center rounded-[10px] px-1 text-sm font-semibold underline-offset-4 hover:underline sm:px-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-warm-300 text-warm-700 grid gap-2 border-t pt-6 text-sm lg:col-span-2">
          <p>{legal}</p>
          <p>{t.trademarks}</p>
        </div>
      </div>
    </footer>
  );
}
