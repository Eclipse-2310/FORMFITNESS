import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/content';

interface NavProps {
  onNavigate: (target: string) => void;
}

export function Nav({ onNavigate }: NavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleLink = (href: string) => {
    setOpen(false);
    onNavigate(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-canvas/95 backdrop-blur-sm border-b border-canvas-400' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 lg:px-10">
        <button
          onClick={() => handleLink('#top')}
          className="focus-visible-ring rounded-sm font-serif text-base font-semibold tracking-tight text-ink lg:text-lg"
          aria-label={`${SITE.name} — back to top`}
        >
          <span className="font-semibold">FORM</span>
          <span className="mx-1 text-olive">/</span>
          <span className="font-light">FITNESS</span>
        </button>

        <ul className="hidden items-center gap-4 md:flex lg:gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleLink(link.href)}
                className="focus-visible-ring rounded-sm text-sm font-medium text-ink-50 transition-colors hover:text-ink"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <WhatsAppButton small />
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="focus-visible-ring rounded-sm p-2 text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="bg-canvas border-b border-canvas-400 px-6 pb-8 pt-2">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleLink(link.href)}
                  className="focus-visible-ring w-full rounded-sm py-3 text-left text-base font-medium text-ink transition-colors hover:bg-canvas-300"
                  tabIndex={open ? 0 : -1}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <WhatsAppButton />
          </div>
        </div>
      </div>
    </header>
  );
}

function WhatsAppButton({ small = false }: { small?: boolean }) {
  return (
    <a
      href={SITE.whatsapp.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`focus-visible-ring inline-flex items-center justify-center rounded-full bg-ink font-medium text-canvas transition-colors hover:bg-olive ${
        small ? 'px-5 py-2 text-sm' : 'w-full px-6 py-3.5 text-base'
      }`}
    >
      Enquire on WhatsApp
    </a>
  );
}
