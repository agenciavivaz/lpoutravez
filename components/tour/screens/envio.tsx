import { bulkSend } from '@/lib/mock/loja-exemplo';
import { SendCostDialog } from '@/components/outra-vez/send-cost-dialog';
import { AppShell, PageTitle, type Device } from './shell';

/** Lista de envios esmaecida atrás do diálogo — só formas, sem dados inventados. */
function FadedList({ rows }: { rows: number }) {
  return (
    <div aria-hidden className="mt-6 grid gap-3 opacity-50">
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className="bg-card border-border flex items-center gap-4 rounded-[14px] border p-4"
        >
          <span className="bg-muted size-9 rounded-[10px]" />
          <span className="grid flex-1 gap-2">
            <span className="bg-muted h-3 w-2/5 rounded-full" />
            <span className="bg-muted h-2.5 w-1/4 rounded-full" />
          </span>
          <span className="bg-muted h-7 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function EnvioScreen({ device }: { device: Device }) {
  const dialog = (
    <SendCostDialog
      template={bulkSend.template}
      recipients={bulkSend.recipients}
      excluded={bulkSend.excluded}
      estimatedCost={bulkSend.estimatedCost}
      confirmLabel={bulkSend.confirm}
      backLabel={bulkSend.back}
      className={device === 'mobile' ? 'p-5' : 'w-[520px]'}
    />
  );
  return (
    <AppShell device={device} active="Envios">
      <div className="relative h-full">
        <PageTitle
          label={bulkSend.pageLabel}
          title={bulkSend.pageLabel}
          size={device === 'mobile' ? 'md' : 'lg'}
        />
        <FadedList rows={device === 'mobile' ? 6 : 7} />
        <div
          className={`absolute inset-0 flex justify-center bg-[rgb(24_24_23/0.28)] ${
            device === 'mobile' ? '-mx-4 items-end px-3 pb-4' : '-m-8 items-center'
          }`}
        >
          {dialog}
        </div>
      </div>
    </AppShell>
  );
}
