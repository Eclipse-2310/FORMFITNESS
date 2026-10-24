import { useState } from 'react';
import { Loader2, AlertCircle, CheckCircle2, X, Download, Lock } from 'lucide-react';
import { CONTACT, SITE } from '@/content';
import { supabase } from '@/lib/supabase';
import { useAdminAuth, adminFetch, getAdminToken } from '@/lib/admin-auth';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const INTEREST_OPTIONS = [
  '1-to-1 Coaching',
  'Programme Design',
  'Single Consultation',
  'General enquiry',
];

export function Contact() {
  return (
    <section id="contact" className="bg-canvas-100 py-24 lg:py-36">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-olive">
              {CONTACT.eyebrow}
            </p>
            <h2 className="text-3xl font-light leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {CONTACT.title}
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-50">{CONTACT.body}</p>

            <div className="mt-10">
              <a
                href={SITE.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible-ring inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 text-base font-medium text-canvas transition-colors hover:bg-olive"
              >
                Message on WhatsApp
              </a>
            </div>

            <dl className="mt-12 space-y-6">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-50/50">
                  WhatsApp
                </dt>
                <dd className="mt-2 text-base text-ink">{SITE.whatsapp.displayNumber}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-50/50">
                  Email
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="focus-visible-ring rounded-sm text-base text-ink link-underline"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-50/50">
                  Location
                </dt>
                <dd className="mt-2 text-base text-ink">{SITE.location}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-50/50">
                  Hours
                </dt>
                <dd className="mt-2 text-base text-ink">{SITE.hours}</dd>
              </div>
            </dl>

            <ExportButton />
          </div>

          <div className="lg:col-span-7 lg:border-l lg:border-canvas-400 lg:pl-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState(INTEREST_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showBanner, setShowBanner] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const { data, error } = await supabase
      .from('inquiries')
      .insert({ name, email, interest, message })
      .select()
      .single();

    if (error || !data) {
      setStatus('error');
      setErrorMsg('Something went wrong sending your message. Please try again or use WhatsApp.');
      return;
    }

    try {
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-inquiry-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ record: data }),
      });
    } catch {
      // The inquiry is saved; the email notification failing is non-fatal for the user.
    }

    setStatus('idle');
    setName('');
    setEmail('');
    setInterest(INTEREST_OPTIONS[0]);
    setMessage('');
    setShowBanner(true);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-canvas-400 bg-canvas-50 px-6 py-8 lg:px-8 lg:py-10">
      <h3 className="text-xl font-light tracking-tight text-ink">Send a message</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-50/70">
        Fill in the form below and I will get back to you by email.
      </p>

      {showBanner && (
        <div className="mt-6 flex items-start gap-3 rounded-sm border border-olive/30 bg-olive/10 px-4 py-4 text-sm text-ink">
          <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-olive" />
          <div className="flex-1">
            <p className="font-semibold text-ink">Message sent successfully</p>
            <p className="mt-1 leading-relaxed text-ink-50">
              Thanks for getting in touch. I will reply to your email within a day.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss"
            className="focus-visible-ring -mt-1 -mr-1 shrink-0 rounded-full p-1 text-ink-50/60 transition-colors hover:bg-canvas-300 hover:text-ink"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="mt-8 space-y-6">
        <Field label="Name" htmlFor="cf-name">
          <input
            id="cf-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="form-input"
          />
        </Field>

        <Field label="Email" htmlFor="cf-email">
          <input
            id="cf-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="form-input"
          />
        </Field>

        <Field label="I am interested in" htmlFor="cf-interest">
          <select
            id="cf-interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="form-input appearance-none"
          >
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Message" htmlFor="cf-message">
          <textarea
            id="cf-message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me a bit about your training history, what you are hoping to achieve, and what your typical week looks like."
            rows={5}
            className="form-input resize-none"
          />
        </Field>
      </div>

      {status === 'error' && (
        <div className="mt-6 flex items-start gap-3 rounded-sm bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {showBanner && status !== 'submitting' && status !== 'error' && (
        <p className="mt-4 text-center text-xs text-ink-50/50">
          Want to send another? Just fill in the form again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="focus-visible-ring mt-8 inline-flex w-full items-center justify-center rounded-full bg-ink px-8 py-4 text-base font-medium text-canvas transition-colors hover:bg-olive disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 size={20} className="mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          'Send message'
        )}
      </button>
    </form>
  );
}

const EXPORT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/export-inquiries-csv`;

function ExportButton() {
  const { authenticated, password, setPassword, error, checking, verify } = useAdminAuth();
  const [showPrompt, setShowPrompt] = useState(false);
  const [state, setState] = useState<'idle' | 'downloading' | 'done' | 'error'>('idle');

  const handleDownload = async () => {
    if (!authenticated || !getAdminToken()) {
      setShowPrompt(true);
      return;
    }
    setState('downloading');
    try {
      const res = await adminFetch(EXPORT_URL);
      if (!res.ok) throw new Error('Export failed');
      const csv = await res.text();
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setState('done');
      setTimeout(() => setState('idle'), 3000);
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 3000);
    }
  };

  const labels: Record<string, string> = {
    idle: 'Export inquiries (CSV)',
    downloading: 'Preparing...',
    done: 'Downloaded',
    error: 'Export failed — try again',
  };

  return (
    <div className="mt-10 border-t border-canvas-400 pt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-50/50">
        Records
      </p>
      {showPrompt && !authenticated ? (
        <div className="mt-3 max-w-xs rounded-sm border border-canvas-400 bg-canvas-200 px-4 py-4">
          <div className="flex items-center gap-2 text-ink">
            <Lock size={16} className="text-olive" />
            <span className="text-sm font-medium">Admin access required</span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              verify(EXPORT_URL).then((ok) => {
                if (ok) setShowPrompt(false);
              });
            }}
            className="mt-3 space-y-3"
          >
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              autoFocus
              className="form-input"
            />
            {error && <p className="text-xs text-red-700">{error}</p>}
            <button
              type="submit"
              disabled={checking || !password}
              className="focus-visible-ring inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-olive disabled:cursor-not-allowed disabled:opacity-60"
            >
              {checking ? <Loader2 size={16} className="animate-spin" /> : 'Verify access'}
            </button>
            <button
              type="button"
              onClick={() => setShowPrompt(false)}
              className="focus-visible-ring w-full text-center text-xs text-ink-50/60 transition-colors hover:text-ink"
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleDownload}
          disabled={state === 'downloading'}
          className="focus-visible-ring mt-3 inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-2.5 text-sm font-medium text-ink-70 transition-colors hover:bg-canvas-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === 'downloading' ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
          {labels[state]}
        </button>
      )}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-ink-50/70"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
