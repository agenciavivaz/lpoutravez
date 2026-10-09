import type { Metadata } from 'next';
import { fill } from '@/lib/copy/pt-BR';
import { privacy } from '@/lib/copy/legal';
import { site } from '@/lib/site';
import { LegalDocument } from '@/components/legal-document';
import { SimplePage } from '@/components/simple-page';

export const metadata: Metadata = {
  title: `${privacy.title} · Outra Vez`,
  alternates: { canonical: '/privacidade' },
};

export default function PrivacyPage() {
  return (
    <SimplePage wide>
      <LegalDocument title={privacy.title} intro={privacy.intro} sections={privacy.sections}>
        <section className="mt-10">
          <h2 className="text-ink-900 text-xl font-extrabold">{privacy.contactTitle}</h2>
          <p className="text-foreground mt-3 leading-relaxed">
            {site.contactEmail
              ? fill(privacy.contactWithEmail, { email: site.contactEmail })
              : privacy.contactWithoutEmail}
          </p>
        </section>
      </LegalDocument>
    </SimplePage>
  );
}
