import { CircleCheck, Plug } from 'lucide-react';
import { onboarding as o } from '@/lib/mock/loja-exemplo';
import { ImportProgress } from '@/components/outra-vez/import-progress';
import { OnboardingStepper } from '@/components/outra-vez/onboarding-stepper';
import { AppShell, Card, FakeButton, type Device } from './shell';

const stepLabel = `${o.labels.step} ${o.current} ${o.labels.of} ${o.steps.length}`;

function Body({ compact }: { compact?: boolean }) {
  return (
    <>
      <p className="text-muted-foreground text-xs font-bold tabular-nums">{stepLabel}</p>
      <h3
        className={`mt-1 font-extrabold tracking-[-0.03em] ${compact ? 'text-2xl' : 'text-[30px]'}`}
      >
        {o.title}
      </h3>
      <ImportProgress items={o.import} doneLabel={o.labels.done} className="mt-5" />
      <div className="border-success/30 bg-success/10 mt-5 flex gap-3 rounded-[14px] border p-3.5">
        <CircleCheck className="text-success mt-0.5 size-5 shrink-0" aria-hidden />
        <p className="text-sm font-semibold">{o.ready}</p>
      </div>
      <FakeButton className="mt-5">{o.action}</FakeButton>
    </>
  );
}

export function BlingScreen({ device }: { device: Device }) {
  if (device === 'mobile') {
    return (
      <AppShell device="mobile" active={null}>
        <div className="flex gap-1.5" aria-hidden>
          {o.steps.map((step, index) => (
            <span
              key={step}
              className={`h-1.5 flex-1 rounded-full ${
                index + 1 < o.current
                  ? 'bg-success'
                  : index + 1 === o.current
                    ? 'bg-primary'
                    : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <div className="border-border bg-card mt-4 flex items-center gap-3 rounded-[14px] border p-3">
          <span className="bg-primary/10 text-primary grid size-9 place-items-center rounded-[10px]">
            <Plug className="size-4" aria-hidden />
          </span>
          <p className="text-sm font-extrabold">Bling</p>
          <span className="text-success ml-auto inline-flex items-center gap-1 text-xs font-extrabold">
            <CircleCheck className="size-4" aria-hidden />
            Conectado
          </span>
        </div>
        <div className="mt-5">
          <Body compact />
        </div>
      </AppShell>
    );
  }
  return (
    <AppShell device="desktop" active={null}>
      <div className="mx-auto grid h-full max-w-[1100px] grid-cols-[300px_1fr] gap-10 pt-6">
        <Card className="h-fit">
          <OnboardingStepper steps={o.steps} current={o.current} />
        </Card>
        <Card className="h-fit p-8">
          <Body />
        </Card>
      </div>
    </AppShell>
  );
}
