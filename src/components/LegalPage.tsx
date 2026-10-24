import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  title: string;
  status: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string }[];
  onBack: () => void;
}

export function LegalPage({
  title,
  status,
  updated,
  intro,
  sections,
  onBack,
}: LegalPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <button
          onClick={onBack}
          className="focus-visible-ring mb-12 inline-flex items-center gap-2 rounded-sm text-sm font-medium text-ink-50 transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} />
          Back to site
        </button>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-olive">
          {status}
        </p>
        <h1 className="text-3xl font-light leading-tight tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-ink-50/60">Last updated: {updated}</p>

        <div className="mt-10 border-l-2 border-olive/30 pl-5">
          <p className="text-base italic leading-relaxed text-ink-50">{intro}</p>
        </div>

        <div className="mt-12 space-y-12">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-semibold text-ink">{section.heading}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-50">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
