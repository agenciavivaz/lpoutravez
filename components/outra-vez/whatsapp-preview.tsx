import type { CSSProperties } from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type WhatsAppItem =
  | {
      type: 'message';
      from: 'business' | 'customer';
      text: string;
      /** Botões de resposta rápida (só ilustração, não clicáveis). */
      buttons?: readonly string[];
      time?: string;
    }
  | { type: 'separator'; label: string };

type WhatsAppPreviewProps = {
  storeName: string;
  items: readonly WhatsAppItem[];
  /** Entrada em sequência (150 ms por item). Desligada com prefers-reduced-motion. */
  animated?: boolean;
  /** Atraso inicial da sequência, em ms. */
  delayMs?: number;
  className?: string;
};

/**
 * Prévia de WhatsApp (registry/whatsapp-preview.json): único lugar com verde WhatsApp.
 * As cores do chat são de representação do WhatsApp, não da marca Outra Vez.
 */
export function WhatsAppPreview({
  storeName,
  items,
  animated,
  delayMs = 0,
  className,
}: WhatsAppPreviewProps) {
  const style = (index: number): CSSProperties | undefined =>
    animated ? { animationDelay: `${delayMs + index * 150}ms` } : undefined;

  return (
    <div
      data-slot="whatsapp-preview"
      className={cn('flex flex-col overflow-hidden bg-[#E8F2E7] text-[#202020]', className)}
    >
      <div className="flex items-center gap-3 border-b border-black/5 bg-white px-4 py-3">
        <span className="bg-whatsapp grid size-9 shrink-0 place-items-center rounded-full text-white">
          <MessageCircle className="size-5" aria-hidden />
        </span>
        <p className="text-sm font-bold">{storeName}</p>
      </div>
      <ol className="flex flex-1 flex-col gap-2.5 p-3.5 text-[13px] leading-snug">
        {items.map((item, index) => {
          const key = `${item.type}-${index}`;
          const anim = animated ? 'animate-wa-in' : undefined;
          if (item.type === 'separator') {
            return (
              <li key={key} className={cn('my-1 flex justify-center', anim)} style={style(index)}>
                <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#54656F] shadow-[0_1px_1px_rgba(0,0,0,0.06)]">
                  {item.label}
                </span>
              </li>
            );
          }
          const fromBusiness = item.from === 'business';
          return (
            <li
              key={key}
              className={cn('flex', fromBusiness ? 'justify-start' : 'justify-end', anim)}
              style={style(index)}
            >
              <div
                className={cn(
                  'max-w-[88%] rounded-xl px-3 py-2 shadow-[0_1px_1px_rgba(0,0,0,0.08)]',
                  fromBusiness ? 'rounded-bl-[4px] bg-white' : 'rounded-br-[4px] bg-[#D9FDD3]',
                )}
              >
                <p>{item.text}</p>
                {item.time ? (
                  <p className="mt-1 text-right text-[10px] text-[#54656F] tabular-nums">
                    {item.time}
                  </p>
                ) : null}
                {item.buttons?.map((label) => (
                  <p
                    key={label}
                    className="mt-2 border-t border-[#e5e5e5] pt-2 text-center text-[12px] font-bold text-[#11669F]"
                  >
                    {label}
                  </p>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
