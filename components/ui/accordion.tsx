'use client';

import * as React from 'react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Accordion = AccordionPrimitive.Root;

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-border border-b', className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'flex min-h-14 flex-1 items-center justify-between gap-4 py-4 text-left font-bold transition-colors [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className="text-muted-foreground size-5 shrink-0 transition-transform duration-150"
          aria-hidden
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/**
 * Conteúdo sempre no HTML (forceMount) para ser indexável (PRD 6.11); fechado = `hidden`.
 */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      forceMount
      data-slot="accordion-content"
      className="data-[state=closed]:hidden"
      {...props}
    >
      <div className={cn('pb-5', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
