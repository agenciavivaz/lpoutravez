import {
  Archive,
  BadgeCheck,
  BookUser,
  Clock,
  Link as LinkIcon,
  Lock,
  MessageSquareText,
  Plug,
  Receipt,
  Repeat,
  Search,
  ShieldCheck,
  Store,
  TrendingUp,
  UserCheck,
  Users,
  Video,
  type LucideIcon,
} from 'lucide-react';

/** Ícones citados por nome em lib/copy/pt-BR.ts. Import explícito para manter o bundle pequeno. */
const icons = {
  Archive,
  BadgeCheck,
  BookUser,
  Clock,
  Link: LinkIcon,
  Lock,
  MessageSquareText,
  Plug,
  Receipt,
  Repeat,
  Search,
  ShieldCheck,
  Store,
  TrendingUp,
  UserCheck,
  Users,
  Video,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = icons[name];
  return <Component className={className} aria-hidden />;
}
