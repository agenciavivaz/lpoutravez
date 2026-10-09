import { dashboard, percent, store } from '@/lib/mock/loja-exemplo';
import { formatMoney, formatNumber } from '@/lib/format';
import { KpiCard } from '@/components/outra-vez/kpi-card';
import { Funnel } from '@/components/outra-vez/funnel';
import { SalesChart } from '@/components/outra-vez/sales-chart';
import { CreditMeter } from '@/components/outra-vez/credit-meter';
import { IntegrationHealth } from '@/components/outra-vez/integration-health';
import { AppShell, Card, FakeButton, PageTitle, type Device } from './shell';

const d = dashboard;
const revenue = formatMoney(d.revenue.value).replace(',00', '');
const delta = `↗ ${formatMoney(d.revenue.value - d.revenue.previousMonth).replace(',00', '')} a mais que mês passado`;
const withWa = `${percent(d.withWhatsapp.count, d.customers.total)}%`;
const accepted = `${percent(d.acceptedNews.count, d.customers.total)}%`;

function Opportunity({ compact }: { compact?: boolean }) {
  return (
    <div className="bg-primary/10 border-primary/20 rounded-[20px] border p-5">
      <p className="text-coral-700 dark:text-coral-300 text-[11px] font-extrabold tracking-[0.13em] uppercase">
        {d.opportunity.eyebrow}
      </p>
      <p
        className={
          compact
            ? 'mt-1 text-base font-extrabold'
            : 'mt-2 text-xl font-extrabold tracking-[-0.02em]'
        }
      >
        {d.opportunity.title}
      </p>
      {!compact ? <p className="text-muted-foreground mt-1 text-sm">{d.opportunity.text}</p> : null}
      <FakeButton className="mt-4">{d.opportunity.action}</FakeButton>
    </div>
  );
}

export function InicioScreen({ device }: { device: Device }) {
  if (device === 'mobile') {
    return (
      <AppShell device="mobile" active="Início">
        <PageTitle label={d.pageLabel} title={d.greeting} />
        <KpiCard
          label={d.revenue.label}
          value={revenue}
          tone="money"
          delta={delta}
          deltaTone="good"
          className="border-l-accent mt-4 border-l-4"
        />
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <KpiCard compact label={d.customers.label} value={formatNumber(d.customers.total)} />
          <KpiCard compact label={d.withWhatsapp.label} value={withWa} />
        </div>
        <div className="mt-2.5">
          <Opportunity compact />
        </div>
        <Card className="mt-2.5 p-4">
          <p className="mb-3 text-sm font-extrabold">{d.funnelTitle}</p>
          <Funnel steps={d.funnel} />
        </Card>
      </AppShell>
    );
  }
  return (
    <AppShell device="desktop" active="Início">
      <div className="flex items-end justify-between">
        <PageTitle label={d.pageLabel} title={d.greeting} />
        <FakeButton variant="secondary">{d.addCredits}</FakeButton>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-4">
        <KpiCard
          label={d.revenue.label}
          value={revenue}
          tone="money"
          delta={delta}
          deltaTone="good"
        />
        <KpiCard
          label={d.customers.label}
          value={formatNumber(d.customers.total)}
          delta={`${formatNumber(d.customers.newInPeriod)} novos no período`}
        />
        <KpiCard
          label={d.withWhatsapp.label}
          value={withWa}
          delta={`${formatNumber(d.withWhatsapp.count)} clientes encontrados`}
        />
        <KpiCard
          label={d.acceptedNews.label}
          value={accepted}
          delta={`${formatNumber(d.acceptedNews.count)} clientes`}
        />
      </div>
      <div className="mt-4 grid grid-cols-[1.45fr_1fr] gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-sm font-extrabold">{d.weeklySalesTitle}</p>
            <span className="border-border rounded-full border px-2.5 py-1 text-[11px] font-bold">
              {store.period}
            </span>
          </div>
          <SalesChart values={d.weeklySales} className="mt-4 h-40" />
        </Card>
        <Opportunity />
      </div>
      <div className="mt-4 grid grid-cols-[1.45fr_1fr] gap-4">
        <Card>
          <p className="mb-4 text-sm font-extrabold">{d.funnelTitle}</p>
          <Funnel steps={d.funnel} />
        </Card>
        <div className="grid content-start gap-3">
          <CreditMeter balance={d.credits.balance} days={d.credits.days} />
          {d.integrations.map((integration) => (
            <IntegrationHealth
              key={integration.name}
              name={integration.name}
              status={integration.status}
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
