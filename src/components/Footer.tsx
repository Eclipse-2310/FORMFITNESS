import { FOOTER, SITE } from '@/content';

interface FooterProps {
  onNavigate: (target: string) => void;
  onView: (view: string) => void;
}

export function Footer({ onNavigate, onView }: FooterProps) {
  return (
    <footer className="bg-ink py-16 text-canvas/60">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <button
              onClick={() => onNavigate('#top')}
              className="focus-visible-ring rounded-sm font-serif text-lg font-semibold tracking-tight text-canvas"
            >
              <span className="font-semibold">FORM</span>
              <span className="mx-1 text-olive-50">/</span>
              <span className="font-light">FITNESS</span>
            </button>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-canvas/40">
              {SITE.fictionalNote}
            </p>
          </div>

          {FOOTER.columns.map((col) => (
            <div key={col.heading} className="md:col-span-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-canvas/40">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <button
                        onClick={() => onNavigate(link.href!)}
                        className="focus-visible-ring rounded-sm text-sm text-canvas/60 transition-colors hover:text-canvas"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <button
                        onClick={() => onView(link.view!)}
                        className="focus-visible-ring rounded-sm text-sm text-canvas/60 transition-colors hover:text-canvas"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-canvas/10 pt-8 text-xs text-canvas/30 sm:flex-row sm:items-center sm:justify-between">
          <p>{FOOTER.attribution}</p>
          <p>© 2026 FORM / FITNESS — fictional portfolio concept.</p>
        </div>
      </div>
    </footer>
  );
}
