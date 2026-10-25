import { useState, useRef, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ } from '@/content';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

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
            <dl className="divide-y divide-canvas-400 border-t border-canvas-400">
              {FAQ.items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div key={i}>
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
