import { SERVICES, SITE } from '@/content';

export function Services() {
  return (
    <section id="services" className="bg-canvas py-24 lg:py-36">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-olive">
            {SERVICES.eyebrow}
          </p>
          <h2 className="text-3xl font-light leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {SERVICES.title}
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-ink-50">{SERVICES.intro}</p>
        </div>

        <div className="mt-16 divide-y divide-canvas-400 border-t border-canvas-400">
          {SERVICES.items.map((service) => (
            <div
              key={service.number}
              className="grid grid-cols-1 gap-6 py-12 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-2">
                <span className="font-serif text-3xl font-light text-olive">
                  {service.number}
                </span>
              </div>
              <div className="lg:col-span-4">
                <h3 className="text-xl font-semibold text-ink lg:text-2xl">{service.name}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-50">{service.summary}</p>
              </div>
              <div className="lg:col-span-4">
                <p className="text-sm leading-relaxed text-ink-50">{service.detail}</p>
              </div>
              <div className="lg:col-span-2">
                <ul className="space-y-2">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-50">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-olive" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href={SITE.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible-ring inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 font-medium text-canvas transition-colors hover:bg-olive"
          >
            Ask which option fits
          </a>
        </div>
      </div>
    </section>
  );
}
