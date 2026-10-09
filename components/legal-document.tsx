import type { LegalSection } from '@/lib/copy/legal';
import { legalUpdatedAt } from '@/lib/copy/legal';

export function LegalDocument({
  title,
  intro,
  sections,
  children,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  children?: React.ReactNode;
}) {
  return (
    <article>
      <h1 className="text-ink-900 text-[36px] font-extrabold sm:text-[44px]">{title}</h1>
      <p className="text-muted-foreground mt-2 text-sm tabular-nums">
        Última atualização: {legalUpdatedAt}
      </p>
      <p className="text-foreground mt-6 text-lg leading-relaxed">{intro}</p>
      {sections.map((section) => (
        <section key={section.title} className="mt-10">
          <h2 className="text-ink-900 text-xl font-extrabold">{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-foreground mt-3 leading-relaxed">
              {paragraph}
            </p>
          ))}
          {section.list ? (
            <ul className="text-foreground mt-3 list-disc space-y-1.5 pl-6 leading-relaxed">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
      {children}
    </article>
  );
}
