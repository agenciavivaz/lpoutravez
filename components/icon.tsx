import {
  Archive,
  BadgeCheck,
  ChartNoAxesColumn,
  Clock,
  House,
  Lock,
  MessageCircle,
  MessageSquareOff,
  MessageSquareText,
  Plug,
  Repeat,
  ScanSearch,
  Split,
  Store,
  UserCheck,
  Video,
  type LucideIcon,
} from 'lucide-react';

/** Ícones citados por nome em lib/copy/pt-BR.ts. Import explícito para manter o bundle pequeno. */
const icons = {
  Archive,
  BadgeCheck,
  ChartNoAxesColumn,
  Clock,
  House,
  Lock,
  MessageCircle,
  MessageSquareOff,
  MessageSquareText,
  Plug,
  Repeat,
  ScanSearch,
  Split,
  Store,
  UserCheck,
  Video,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = icons[name];
  return <Component className={className} aria-hidden />;
}
