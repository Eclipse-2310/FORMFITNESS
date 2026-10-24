import { COACH } from '@/content';

export function Coach() {
  return (
    <section id="coach" className="bg-canvas-100 py-24 lg:py-36">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-sm">
              <img
                src={COACH.image.url}
                alt={COACH.image.alt}
                className="w-full object-cover object-top aspect-[3/4]"
                loading="lazy"
              />
              <div className="absolute bottom-3 right-3 rounded-sm bg-ink/70 px-3 py-1.5 text-xs text-canvas/80 backdrop-blur-sm">
                {COACH.image.credit}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-7 lg:pl-4">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-olive">
              {COACH.eyebrow}
            </p>
            <h2 className="text-3xl font-light leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {COACH.name}
            </h2>
            <p className="mt-4 text-base font-medium text-olive">{COACH.role}</p>
            <div className="mt-8 space-y-6">
              {COACH.body.map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-ink-50 lg:text-lg">
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-10 border-l-2 border-olive/30 pl-4">
              <p className="text-sm italic leading-relaxed text-ink-50/70">{COACH.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
