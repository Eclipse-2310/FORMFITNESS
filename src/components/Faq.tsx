import { useState, useRef, useEffect, useMemo } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ, FAQ_CATEGORIES, type FaqCategory } from '@/content';

type Filter = FaqCategory | 'all';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const [filter, setFilter] = useState<Filter>('all');

  const visibleItems = useMemo(() => {
    if (filter === 'all') return FAQ.items;
    return FAQ.items.filter((item) => item.category === filter);
  }, [filter]);

  const handleFilterChange = (f: Filter) => {
    setFilter(f);
    setOpen(null);
  };

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
                Everything from how programmes are built to what happens when life gets in the way.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="mb-6 flex flex-wrap gap-2">
              {FAQ_CATEGORIES.map((cat) => {
                const isActive = filter === cat.key;
                const count =
                  cat.key === 'all'
                    ? FAQ.items.length
                    : FAQ.items.filter((i) => i.category === cat.key).length;
                return (
                  <button
                    key={cat.key}
                    onClick={() => handleFilterChange(cat.key as Filter)}
                    className={[
                      'focus-visible-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-ink text-canvas'
                        : 'bg-canvas-200 text-ink-60 hover:bg-canvas-300 hover:text-ink',
                    ].join(' ')}
                    aria-pressed={isActive}
                  >
                    {cat.label}
                    <span
                      className={[
                        'inline-flex items-center justify-center rounded-full text-xs font-semibold tabular-nums',
                        isActive
                          ? 'bg-canvas/20 text-canvas'
                          : 'bg-canvas-400/50 text-ink-50',
                      ].join(' ')}
                      style={{ minWidth: '1.25rem', height: '1.25rem', padding: '0 0.35rem' }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <dl className="divide-y divide-canvas-400 border-t border-canvas-400">
              {visibleItems.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div key={`${filter}-${i}`}>
                    <dt>
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
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

            {visibleItems.length === 0 && (
              <p className="py-12 text-center text-base text-ink-50">
                No questions in this category yet.
              </p>
            )}
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
