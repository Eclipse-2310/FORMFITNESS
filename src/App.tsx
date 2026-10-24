import { useCallback, useState } from 'react';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Philosophy } from '@/components/Philosophy';
import { Services } from '@/components/Services';
import { Programmes } from '@/components/Programmes';
import { Coach } from '@/components/Coach';
import { Faq } from '@/components/Faq';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { LegalPage } from '@/components/LegalPage';
import { Dashboard } from '@/components/Dashboard';
import { PRIVACY_CONTENT, TERMS_CONTENT } from '@/content';

type View = 'home' | 'privacy' | 'terms' | 'dashboard';

export default function App() {
  const [view, setView] = useState<View>('home');

  const scrollTo = useCallback((target: string) => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [view]);

  const handleView = useCallback((v: string) => {
    setView(v as View);
  }, []);

  if (view === 'privacy') {
    return (
      <LegalPage
        title={PRIVACY_CONTENT.title}
        status={PRIVACY_CONTENT.status}
        updated={PRIVACY_CONTENT.updated}
        intro={PRIVACY_CONTENT.intro}
        sections={PRIVACY_CONTENT.sections}
        onBack={() => {
          setView('home');
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  if (view === 'terms') {
    return (
      <LegalPage
        title={TERMS_CONTENT.title}
        status={TERMS_CONTENT.status}
        updated={TERMS_CONTENT.updated}
        intro={TERMS_CONTENT.intro}
        sections={TERMS_CONTENT.sections}
        onBack={() => {
          setView('home');
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  if (view === 'dashboard') {
    return (
      <Dashboard
        onBack={() => {
          setView('home');
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-canvas">
      <Nav onNavigate={scrollTo} />
      <main>
        <Hero onNavigate={scrollTo} />
        <Philosophy />
        <Services />
        <Programmes />
        <Coach />
        <Faq />
        <Contact />
      </main>
      <Footer onNavigate={scrollTo} onView={handleView} />
    </div>
  );
}
