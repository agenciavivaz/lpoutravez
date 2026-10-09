import { CircleCheck } from 'lucide-react';
import { journey } from '@/lib/mock/loja-exemplo';
import { formatNumber } from '@/lib/format';
import { JourneyEditor } from '@/components/outra-vez/journey-editor';
import { AppShell, Card, FakeButton, PageTitle, type Device } from './shell';

const j = journey;

function Status() {
  return (
    <span className="text-success bg-success/10 border-border inline-flex min-h-7 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-extrabold">
      <CircleCheck className="size-3.5" aria-hidden />
      {j.status}
    </span>
  );
}

function Numbers({ compact }: { compact?: boolean }) {
  const items = [
    { value: formatNumber(j.inJourney), label: j.labels.inJourney },
    { value: formatNumber(j.boughtAgain30d), label: j.labels.boughtAgain, money: true },
    { value: j.sendWindow, label: j.labels.sendWindow },
  ];
  return (
    <div className={compact ? 'grid grid-cols-3 gap-2' : 'grid gap-3'}>
      {items.map((item) => (
        <Card key={item.label} className={compact ? 'p-3' : 'p-4'}>
          <p
            className={`font-extrabold tabular-nums ${compact ? 'text-base' : 'text-2xl'} ${item.money ? 'text-money' : ''}`}
          >
            {item.value}
          </p>
          <p
            className={`text-muted-foreground ${compact ? 'text-[10px] leading-tight' : 'text-xs'}`}
          >
            {item.label}
          </p>
        </Card>
      ))}
    </div>
  );
}

export function ReguasScreen({ device }: { device: Device }) {
  if (device === 'mobile') {
    return (
      <AppShell device="mobile" active="Réguas">
        <PageTitle label={j.pageLabel} title={j.title} size="md" />
        <div className="mt-2 flex items-center justify-between">
          <Status />
          <FakeButton variant="secondary" className="min-h-9 px-3 text-xs">
            {j.pause}
          </FakeButton>
        </div>
        <JourneyEditor trigger={j.trigger} steps={j.steps} className="mt-4 gap-3" />
        <div className="mt-4">
          <Numbers compact />
        </div>
      </AppShell>
    );
  }
  return (
    <AppShell device="desktop" active="Réguas">
      <div className="flex items-end justify-between">
        <div>
          <PageTitle label={j.pageLabel} title={j.title} />
          <div className="mt-2">
            <Status />
          </div>
        </div>
        <FakeButton variant="secondary">{j.pause}</FakeButton>
      </div>
      <div className="mt-6 grid grid-cols-[1fr_300px] gap-8">
        <JourneyEditor trigger={j.trigger} steps={j.steps} className="max-w-[560px]" />
        <Numbers />
      </div>
    </AppShell>
  );
}
