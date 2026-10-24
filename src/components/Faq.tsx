import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ } from '@/content';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-canvas py-24 lg:py-36">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-olive">
              {FAQ.eyebrow}
            </p>
            <h2 className="text-3xl font-light leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {FAQ.title}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <dl className="divide-y divide-canvas-400 border-t border-canvas-400">
              {FAQ.items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div key={i}>
                    <dt>
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="focus-visible-ring flex w-full items-center justify-between gap-4 py-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="text-base font-medium text-ink lg:text-lg">
                          {item.q}
                        </span>
                        <span className="shrink-0 text-olive">
                          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                        </span>
                      </button>
                    </dt>
                    {isOpen && (
                      <dd className="pb-6 pr-8 text-base leading-relaxed text-ink-50">
                        {item.a}
                      </dd>
                    )}
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
