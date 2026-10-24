import { useState } from 'react';
import { PROGRAMMES } from '@/content';

export function Programmes() {
  const [active, setActive] = useState(0);
  const block = PROGRAMMES.blocks[active];

  return (
    <section id="programmes" className="bg-ink py-24 text-canvas lg:py-36">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-olive-50">
            {PROGRAMMES.eyebrow}
          </p>
          <h2 className="text-3xl font-light leading-tight tracking-tight text-canvas sm:text-4xl lg:text-5xl">
            {PROGRAMMES.title}
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-canvas/70">{PROGRAMMES.intro}</p>
        </div>

        {/* Programme selector */}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          {PROGRAMMES.blocks.map((b, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`focus-visible-ring rounded-sm border px-5 py-3 text-left text-sm font-medium transition-colors ${
                active === i
                  ? 'border-olive-50 bg-olive text-canvas'
                  : 'border-canvas/20 text-canvas/60 hover:border-canvas/40 hover:text-canvas'
              }`}
              aria-pressed={active === i}
            >
              {b.name}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-canvas/50">{block.audience}</p>

        {/* Programme schedule table */}
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-canvas/15 bg-canvas/10 md:grid-cols-2 lg:grid-cols-4">
          {block.days.map((day, i) => (
            <div key={i} className="bg-ink-300 p-6">
              <div className="mb-4 flex items-baseline justify-between border-b border-canvas/15 pb-3">
                <span className="font-serif text-lg font-medium text-canvas">{day.day}</span>
                <span className="text-xs text-canvas/50">{day.focus}</span>
              </div>
              <ul className="space-y-3">
                {day.exercises.map((ex, j) => (
                  <li key={j} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-canvas/80">{ex.name}</span>
                    <span className="shrink-0 font-mono text-xs text-olive-50">{ex.scheme}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-canvas/40">{PROGRAMMES.disclaimer}</p>
      </div>
    </section>
  );
}
