import { useState, useRef, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ, FAQ_CATEGORIES, type FaqCategory } from '@/content';

type Group = {
  key: FaqCategory;
  label: string;
  items: typeof FAQ.items;
};

const groups: Group[] = FAQ_CATEGORIES.filter((c) => c.key !== 'all').map((c) => ({
  key: c.key as FaqCategory,
  label: c.label,
  items: FAQ.items.filter((i) => i.category === c.key),
}));

export function Faq() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (id: string) => setOpen(open === id ? null : id);

  return (
    <section id="faq" className="bg-canvas py-24 lg:py-36">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-olive">
                {FAQ.eyebrow}
              </p>
              <h2 className="text-3xl font-light leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
                {FAQ.title}
              </h2>
              <p className="mt-6 max-w-xs text-base leading-relaxed text-ink-50">
                Grouped by topic so you can find what matters to you quickly.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-12">
            {groups.map((group) => (
              <div key={group.key}>
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-olive">
                    {group.label}
                  </h3>
                  <span className="text-sm tabular-nums text-ink-40">
                    {group.items.length}
                  </span>
                  <div className="h-px flex-1 bg-canvas-400" />
                </div>

                <dl className="divide-y divide-canvas-400 border-t border-canvas-400">
                  {group.items.map((item, i) => {
                    const id = `${group.key}-${i}`;
                    const isOpen = open === id;
                    return (
                      <div key={id}>
                        <dt>
                          <button
                            onClick={() => toggle(id)}
                            className="focus-visible-ring group flex w-full items-center justify-between gap-4 py-5 text-left"
                            aria-expanded={isOpen}
                          >
                            <span className="text-base font-medium text-ink transition-colors group-hover:text-olive lg:text-lg">
                              {item.q}
                            </span>
                            <span className="shrink-0 text-olive transition-transform duration-300">
                              {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                            </span>
                          </button>
                        </dt>
                        <Expandable isOpen={isOpen}>
                          <dd className="pb-6 pr-8 text-base leading-relaxed text-ink-50">
                            {item.a}
                          </dd>
                        </Expandable>
                      </div>
                    );
                  })}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Expandable({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    if (isOpen) {
      setHeight(ref.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      ref={ref}
      style={{
        maxHeight: isOpen ? `${height}px` : '0px',
        opacity: isOpen ? 1 : 0,
      }}
      className="overflow-hidden transition-all duration-300 ease-in-out"
    >
      {children}
    </div>
  );
}
