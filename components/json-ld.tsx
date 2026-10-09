import { copy } from '@/lib/copy/pt-BR';
import { site } from '@/lib/site';

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
        '@id': `${site.url}/#organization`,
        name: 'Outra Vez',
        url: site.url,
        logo: `${site.url}/apple-icon`,
        parentOrganization: { '@type': 'Organization', name: 'Vivaz' },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Outra Vez',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: copy.meta.description,
        url: site.url,
        inLanguage: 'pt-BR',
        publisher: { '@id': `${site.url}/#organization` },
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
