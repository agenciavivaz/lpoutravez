import { store, whatsapp as w } from '@/lib/mock/loja-exemplo';
import { WhatsAppPreview, type WhatsAppItem } from '@/components/outra-vez/whatsapp-preview';

const items: WhatsAppItem[] = [
  {
    type: 'message',
    from: 'business',
    text: w.pedidoFaturadoOptin.join('\n'),
    buttons: w.optinButtons,
  },
  { type: 'message', from: 'customer', text: w.customerReply },
  { type: 'message', from: 'business', text: w.autoReply },
  { type: 'separator', label: w.daysLater },
  {
    type: 'message',
    from: 'business',
    text: w.horaDeRepor.join('\n'),
    buttons: [w.horaDeReporButton],
  },
];

/** Aba WhatsApp: sempre no celular (PRD 7.5). Único lugar do tour com verde WhatsApp. */
export function WhatsAppScreen() {
  return (
    <div className="flex size-full flex-col bg-[#E8F2E7]">
      <div className="flex h-7 shrink-0 items-center justify-between bg-white px-4 text-[10px] font-extrabold text-[#202020] tabular-nums">
        <span>9:41</span>
        <span aria-hidden>● ●●</span>
      </div>
      <WhatsAppPreview
        storeName={store.name}
        items={items}
        className="flex-1 [&_p]:whitespace-pre-line"
      />
    </div>
  );
}
