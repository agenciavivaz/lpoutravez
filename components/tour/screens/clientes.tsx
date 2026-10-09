import {
  customer,
  customerAvgTicket,
  customerOrders,
  customerTotal,
} from '@/lib/mock/loja-exemplo';
import { formatDate, formatMoney } from '@/lib/format';
import { ChannelChip } from '@/components/outra-vez/channel-chip';
import { ConsentStatus } from '@/components/outra-vez/consent-status';
import { CustomerTimeline } from '@/components/outra-vez/customer-timeline';
import { RfmBadge } from '@/components/outra-vez/rfm-badge';
import { AppShell, Card, PageTitle, type Device } from './shell';

const c = customer;
const L = c.labels;
const date = (iso: string) => formatDate(`${iso}T12:00:00`);

function Stat({ label, value, money }: { label: string; value: string; money?: boolean }) {
  return (
    <div className="bg-card border-border rounded-[14px] border px-3.5 py-3">
      <p className="text-muted-foreground text-[11px] font-bold">{label}</p>
      <p className={`mt-1 text-lg font-extrabold tabular-nums ${money ? 'text-money' : ''}`}>
        {value}
      </p>
    </div>
  );
}

function Chips() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {c.channels.map((channel) => (
        <ChannelChip key={channel} channel={channel} size="sm" className="min-h-7" />
      ))}
      <RfmBadge segment={c.rfm} />
      <ConsentStatus state={c.consent} />
    </div>
  );
}

export function ClientesScreen({ device }: { device: Device }) {
  const stats = [
    { label: L.totalSpent, value: formatMoney(customerTotal), money: true },
    { label: L.orders, value: String(customerOrders.length) },
    { label: L.avgTicket, value: formatMoney(customerAvgTicket) },
    { label: L.lastPurchase, value: date(c.lastPurchase) },
    { label: L.nextPurchase, value: date(c.nextPurchase) },
  ];
  const whatsapp = (
    <p className="text-sm">
      <span className="text-muted-foreground font-semibold">{L.whatsapp} </span>
      <b className="tabular-nums">{c.whatsappMasked}</b>
      <span className="text-muted-foreground"> · {L.source} </span>
      <i>{c.whatsappSource}</i>
    </p>
  );

  if (device === 'mobile') {
    return (
      <AppShell device="mobile" active="Clientes">
        <PageTitle label={c.pageLabel} title={c.name} />
        <p className="text-muted-foreground mt-1 text-xs tabular-nums">
          CPF {c.cpfMasked} · {c.city}
        </p>
        <div className="mt-3">
          <Chips />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[stats[0]!, stats[1]!, stats[3]!, stats[4]!].map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>
        <div className="mt-3">{whatsapp}</div>
        <p className="mt-4 mb-3 text-sm font-extrabold">{L.history}</p>
        <CustomerTimeline events={c.timeline} />
      </AppShell>
    );
  }
  return (
    <AppShell device="desktop" active="Clientes">
      <div className="flex items-end justify-between gap-6">
        <div>
          <PageTitle label={c.pageLabel} title={c.name} />
          <p className="text-muted-foreground mt-1 text-sm tabular-nums">
            CPF {c.cpfMasked} · {c.city}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <Chips />
      </div>
      <div className="mt-6 grid grid-cols-[1fr_1.1fr] gap-5">
        <div className="grid content-start gap-3">
          <div className="grid grid-cols-3 gap-3">
            {stats.slice(0, 3).map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stats.slice(3).map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </div>
          <Card className="p-4">{whatsapp}</Card>
        </div>
        <Card>
          <p className="mb-4 text-sm font-extrabold">{L.history}</p>
          <CustomerTimeline events={c.timeline} />
        </Card>
      </div>
    </AppShell>
  );
}
