import { HERO, SITE } from '@/content';

interface HeroProps {
  onNavigate: (target: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-canvas pt-28 lg:pt-0">
      <div className="mx-auto grid min-h-screen max-w-content grid-cols-1 items-center gap-0 px-0 lg:grid-cols-12 lg:px-10">
        {/* Text — left 5 cols on desktop */}
        <div className="order-2 px-6 py-12 lg:order-1 lg:col-span-5 lg:px-0 lg:py-0 lg:pr-12">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-olive">
            {HERO.eyebrow}
          </p>
          <h1 className="text-4xl font-light leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {HERO.headline}
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-50">
            {HERO.subhead}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={SITE.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible-ring inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 font-medium text-canvas transition-colors hover:bg-olive"
            >
              {HERO.ctaPrimary}
            </a>
            <button
              onClick={() => onNavigate('#programmes')}
              className="focus-visible-ring inline-flex items-center justify-center rounded-full border border-ink-50/30 px-7 py-3.5 font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas"
            >
              {HERO.ctaSecondary}
            </button>
          </div>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-ink-50/70">
            {SITE.fictionalNote}
          </p>
        </div>

        {/* Image — right 7 cols on desktop */}
        <div className="order-1 relative h-[45vh] min-h-[320px] w-full overflow-hidden lg:order-2 lg:col-span-7 lg:h-screen">
          <img
            src={HERO.image.url}
            alt={HERO.image.alt}
            className="h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute bottom-4 right-4 rounded-sm bg-ink/70 px-3 py-1.5 text-xs text-canvas/80 backdrop-blur-sm">
            {HERO.image.credit}
          </div>
        </div>
      </div>
    </section>
  );
}
