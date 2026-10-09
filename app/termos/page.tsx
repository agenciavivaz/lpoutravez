import type { Metadata } from 'next';
import { terms } from '@/lib/copy/legal';
import { LegalDocument } from '@/components/legal-document';
import { SimplePage } from '@/components/simple-page';

export const metadata: Metadata = {
  title: `${terms.title} · Outra Vez`,
  alternates: { canonical: '/termos' },
};

export default function TermsPage() {
  return (
    <SimplePage wide>
      <LegalDocument title={terms.title} intro={terms.intro} sections={terms.sections} />
    </SimplePage>
  );
}
