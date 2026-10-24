import { PHILOSOPHY } from '@/content';

export function Philosophy() {
  return (
    <section id="philosophy" className="bg-canvas-100 py-24 lg:py-36">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Image column */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-sm">
              <img
                src={PHILOSOPHY.image.url}
                alt={PHILOSOPHY.image.alt}
                className="h-[400px] w-full object-cover lg:h-[560px]"
                loading="lazy"
              />
              <div className="absolute bottom-3 right-3 rounded-sm bg-ink/70 px-3 py-1.5 text-xs text-canvas/80 backdrop-blur-sm">
                {PHILOSOPHY.image.credit}
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="lg:col-span-7 lg:pl-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-olive">
              {PHILOSOPHY.eyebrow}
            </p>
            <h2 className="text-3xl font-light leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {PHILOSOPHY.title}
            </h2>
            <div className="mt-8 space-y-6">
              {PHILOSOPHY.body.map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-ink-50 lg:text-lg">
                  {para}
                </p>
              ))}
            </div>

            {/* Principles */}
            <div className="mt-12 border-t border-canvas-400 pt-10">
              <ol className="space-y-8">
                {PHILOSOPHY.principles.map((p, i) => (
                  <li key={i} className="grid grid-cols-[2rem_1fr] gap-4">
                    <span className="font-serif text-lg font-light text-olive">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-50">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
