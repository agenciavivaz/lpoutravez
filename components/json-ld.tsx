import { copy } from '@/lib/copy/pt-BR';
import { CANONICAL_URL } from '@/lib/site';

/**
 * Dados estruturados (PRD 13): Organization, SoftwareApplication (sem aggregateRating: não há
 * avaliações) e FAQPage com as 9 perguntas.
 */
export function JsonLd() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${CANONICAL_URL}/#organization`,
        name: 'Outra Vez',
        url: CANONICAL_URL,
        logo: `${CANONICAL_URL}/apple-icon`,
        parentOrganization: { '@type': 'Organization', name: 'Vivaz' },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Outra Vez',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: copy.meta.description,
        url: CANONICAL_URL,
        // Sem preço público (PRD v2 14): a assinatura aparece na demo.
        featureList: copy.howItWorks.steps.map((step) => step.title),
        inLanguage: 'pt-BR',
        publisher: { '@id': `${CANONICAL_URL}/#organization` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: copy.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify não escapa "<"; troca para não fechar a tag por acidente.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
    />
  );
}
