import { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, TrendingUp, Mail, MessageSquare, Download, Loader2, Lock, LogOut } from 'lucide-react';
import { useAdminAuth, adminFetch, getAdminToken } from '@/lib/admin-auth';

interface StatsData {
  total: number;
  firstDate: string | null;
  lastDate: string | null;
  byInterest: { label: string; count: number }[];
  daily: { date: string; count: number }[];
  weekly: { weekStart: string; count: number }[];
  recent: { name: string; email: string; interest: string; created_at: string }[];
}

const STATS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/inquiry-stats`;
const EXPORT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/export-inquiries-csv`;

export function Dashboard({ onBack }: { onBack: () => void }) {
  const { authenticated, password, setPassword, error, checking, verify, logout } = useAdminAuth();
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await adminFetch(STATS_URL);
      if (!res.ok) throw new Error('Failed to load stats');
      const json = await res.json();
      setData(json);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Could not load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (authenticated && getAdminToken()) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [authenticated, loadData]);

  const handleExport = async () => {
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
    } catch {
      // non-fatal
    }
  };

  return (
    <div className="min-h-screen bg-canvas-100">
      <div className="border-b border-canvas-400 bg-canvas-50">
        <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4 lg:px-10">
          <button
            onClick={onBack}
            className="focus-visible-ring inline-flex items-center gap-2 text-sm font-medium text-ink-50 transition-colors hover:text-ink"
          >
            <ArrowLeft size={18} />
            Back to site
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-serif text-base font-semibold tracking-tight text-ink">
              <span className="font-semibold">FORM</span>
              <span className="text-olive">/</span>
              <span className="font-light">FITNESS</span>
              <span className="ml-2 rounded-full bg-ink px-3 py-1 text-xs font-sans font-medium uppercase tracking-wider text-canvas">
                Dashboard
              </span>
            </div>
            {authenticated && (
              <button
                onClick={logout}
                className="focus-visible-ring inline-flex items-center gap-1.5 rounded-full border border-canvas-400 px-3 py-1.5 text-xs font-medium text-ink-50 transition-colors hover:bg-canvas-300 hover:text-ink"
              >
                <LogOut size={14} />
                Lock
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-content px-6 py-12 lg:px-10 lg:py-16">
        {!authenticated && <PasswordGate password={password} setPassword={setPassword} error={error} checking={checking} onVerify={() => verify(STATS_URL)} />}

        {authenticated && loading && (
          <div className="flex flex-col items-center justify-center py-32 text-ink-50">
            <Loader2 size={32} className="animate-spin text-olive" />
            <p className="mt-4 text-sm">Loading dashboard...</p>
          </div>
        )}

        {authenticated && loadError && !loading && (
          <div className="mx-auto max-w-md rounded-sm border border-canvas-400 bg-canvas-50 px-8 py-12 text-center">
            <p className="text-base text-ink">{loadError}</p>
            <button
              onClick={loadData}
              className="focus-visible-ring mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition-colors hover:bg-olive"
            >
              Try again
            </button>
          </div>
        )}

        {authenticated && data && !loading && (
          <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-serif text-3xl font-light tracking-tight text-ink lg:text-4xl">
                  Inquiry Analytics
                </h1>
                <p className="mt-2 text-sm text-ink-50">
                  {data.total === 0
                    ? 'No inquiries yet.'
                    : `${data.total} total ${data.total === 1 ? 'inquiry' : 'inquiries'}${data.lastDate ? ` — latest ${formatDate(data.lastDate)}` : ''}`}
                </p>
              </div>
              {data.total > 0 && (
                <button
                  onClick={handleExport}
                  className="focus-visible-ring inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-canvas-300"
                >
                  <Download size={16} />
                  Export CSV
                </button>
              )}
            </div>

            {data.total === 0 ? (
              <EmptyState />
            ) : (
              <>
                <SummaryCards data={data} />
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <WeeklyChart weekly={data.weekly} />
                  </div>
                  <div className="lg:col-span-4">
                    <InterestBreakdown byInterest={data.byInterest} />
                  </div>
                </div>
                <DailyChart daily={data.daily} />
                <RecentInquiries recent={data.recent} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PasswordGate({
  password,
  setPassword,
  error,
  checking,
  onVerify,
}: {
  password: string;
  setPassword: (v: string) => void;
  error: string;
  checking: boolean;
  onVerify: () => void;
}) {
  return (
    <div className="mx-auto max-w-sm">
      <div className="rounded-sm border border-canvas-400 bg-canvas-50 px-8 py-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-olive/15 text-olive">
          <Lock size={28} />
        </div>
        <h1 className="mt-6 text-center font-serif text-2xl font-light text-ink">Dashboard Access</h1>
        <p className="mt-3 text-center text-sm leading-relaxed text-ink-50">
          Enter your admin password to view inquiry analytics and export records.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onVerify();
          }}
          className="mt-8 space-y-4"
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
          {error && (
            <p className="text-sm text-red-700">{error}</p>
          )}
          <button
            type="submit"
            disabled={checking || !password}
            className="focus-visible-ring inline-flex w-full items-center justify-center rounded-full bg-ink px-8 py-4 text-base font-medium text-canvas transition-colors hover:bg-olive disabled:cursor-not-allowed disabled:opacity-60"
          >
            {checking ? (
              <>
                <Loader2 size={20} className="mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              'Unlock dashboard'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function SummaryCards({ data }: { data: StatsData }) {
  const last7 = data.daily.slice(-7).reduce((sum, d) => sum + d.count, 0);
  const prev7 = data.daily.slice(-14, -7).reduce((sum, d) => sum + d.count, 0);
  const trend = prev7 === 0 ? (last7 > 0 ? 100 : 0) : Math.round(((last7 - prev7) / prev7) * 100);

  const cards = [
    {
      label: 'Total Inquiries',
      value: data.total.toString(),
      icon: <Mail size={20} />,
    },
    {
      label: 'Last 7 Days',
      value: last7.toString(),
      icon: <MessageSquare size={20} />,
      trend: trend !== 0 ? `${trend > 0 ? '+' : ''}${trend}% vs prior week` : undefined,
    },
    {
      label: 'Top Interest',
      value: data.byInterest[0]?.label ?? '—',
      sub: data.byInterest[0] ? `${data.byInterest[0].count} inquiries` : undefined,
      icon: <TrendingUp size={20} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-sm border border-canvas-400 bg-canvas-50 px-6 py-5"
        >
          <div className="flex items-center gap-3 text-olive">
            {card.icon}
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-50/70">
              {card.label}
            </span>
          </div>
          <p className="mt-3 font-serif text-2xl font-light text-ink">{card.value}</p>
          {card.sub && <p className="mt-1 text-sm text-ink-50">{card.sub}</p>}
          {card.trend && (
            <p className={`mt-1 text-sm ${card.trend.startsWith('+') ? 'text-olive' : 'text-ink-50'}`}>
              {card.trend}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function WeeklyChart({ weekly }: { weekly: { weekStart: string; count: number }[] }) {
  const max = Math.max(1, ...weekly.map((w) => w.count));
  const width = 100;
  const height = 100;
  const barWidth = width / weekly.length;
  const gap = barWidth * 0.25;
  const actualBarWidth = barWidth - gap;

  return (
    <div className="rounded-sm border border-canvas-400 bg-canvas-50 px-6 py-6">
      <h2 className="font-serif text-lg font-light text-ink">Weekly Submissions</h2>
      <p className="mt-1 text-xs text-ink-50/70">Last 12 weeks</p>
      <div className="mt-6" style={{ aspectRatio: '2 / 1' }}>
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-full w-full">
          {weekly.map((w, i) => {
            const barHeight = max > 0 ? (w.count / max) * (height - 4) : 0;
            const x = i * barWidth + gap / 2;
            const y = height - barHeight;
            return (
              <g key={w.weekStart}>
                <rect
                  x={x}
                  y={y}
                  width={actualBarWidth}
                  height={barHeight}
                  fill="#5E6738"
                  rx="0.5"
                  className="transition-all duration-700"
                  style={{ opacity: w.count > 0 ? 1 : 0.2 }}
                >
                  <title>{`${formatDate(w.weekStart)}: ${w.count}`}</title>
                </rect>
              </g>
            );
          })}
          <line x1="0" y1={height - 0.5} x2={width} y2={height - 0.5} stroke="#DDD6C4" strokeWidth="0.4" />
        </svg>
      </div>
      <div className="mt-2 flex justify-between text-xs text-ink-50/50">
        <span>{formatDate(weekly[0]?.weekStart)}</span>
        <span>{formatDate(weekly[weekly.length - 1]?.weekStart)}</span>
      </div>
    </div>
  );
}

function DailyChart({ daily }: { daily: { date: string; count: number }[] }) {
  const max = Math.max(1, ...daily.map((d) => d.count));
  const width = 100;
  const height = 40;
  const stepX = width / Math.max(1, daily.length - 1);

  const points = daily.map((d, i) => {
    const x = i * stepX;
    const y = height - (d.count / max) * (height - 2) - 1;
    return `${x},${y}`;
  });
  const areaPoints = `0,${height} ${points.join(' ')} ${width},${height}`;

  return (
    <div className="rounded-sm border border-canvas-400 bg-canvas-50 px-6 py-6">
      <h2 className="font-serif text-lg font-light text-ink">Daily Trend</h2>
      <p className="mt-1 text-xs text-ink-50/70">Last 30 days</p>
      <div className="mt-6" style={{ aspectRatio: '4 / 1' }}>
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-full w-full">
          <polygon points={areaPoints} fill="#5E6738" opacity="0.12" />
          <polyline
            points={points.join(' ')}
            fill="none"
            stroke="#5E6738"
            strokeWidth="0.6"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {daily.map((d, i) => {
            const x = i * stepX;
            const y = height - (d.count / max) * (height - 2) - 1;
            return (
              d.count > 0 && (
                <circle key={d.date} cx={x} cy={y} r="0.8" fill="#5E6738">
                  <title>{`${formatDate(d.date)}: ${d.count}`}</title>
                </circle>
              )
            );
          })}
        </svg>
      </div>
      <div className="mt-2 flex justify-between text-xs text-ink-50/50">
        <span>{formatDate(daily[0]?.date)}</span>
        <span>Today</span>
      </div>
    </div>
  );
}

function InterestBreakdown({ byInterest }: { byInterest: { label: string; count: number }[] }) {
  const total = byInterest.reduce((sum, i) => sum + i.count, 0);
  const max = Math.max(1, ...byInterest.map((i) => i.count));

  return (
    <div className="rounded-sm border border-canvas-400 bg-canvas-50 px-6 py-6">
      <h2 className="font-serif text-lg font-light text-ink">Areas of Interest</h2>
      <p className="mt-1 text-xs text-ink-50/70">What visitors enquire about</p>
      <div className="mt-6 space-y-4">
        {byInterest.map((item) => {
          const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
          return (
            <div key={item.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink">{item.label}</span>
                <span className="font-medium text-ink-50">{item.count} ({pct}%)</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-canvas-300">
                <div
                  className="h-full rounded-full bg-olive transition-all duration-700"
                  style={{ width: `${(item.count / max) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecentInquiries({ recent }: { recent: StatsData['recent'] }) {
  if (recent.length === 0) return null;

  return (
    <div className="rounded-sm border border-canvas-400 bg-canvas-50 px-6 py-6">
      <h2 className="font-serif text-lg font-light text-ink">Recent Inquiries</h2>
      <p className="mt-1 text-xs text-ink-50/70">Latest 5 submissions</p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-canvas-400 text-xs uppercase tracking-wider text-ink-50/60">
              <th className="pb-3 pr-4 font-semibold">Name</th>
              <th className="pb-3 pr-4 font-semibold">Email</th>
              <th className="pb-3 pr-4 font-semibold">Interest</th>
              <th className="pb-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((r, i) => (
              <tr key={i} className="border-b border-canvas-300/50 last:border-0">
                <td className="py-3 pr-4 font-medium text-ink">{r.name}</td>
                <td className="py-3 pr-4 text-ink-50">{r.email}</td>
                <td className="py-3 pr-4 text-ink-50">{r.interest}</td>
                <td className="py-3 text-ink-50">{formatDate(r.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-sm border border-canvas-400 bg-canvas-50 px-8 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-olive/15 text-olive">
        <Mail size={28} />
      </div>
      <h3 className="mt-6 font-serif text-xl font-light text-ink">No inquiries yet</h3>
      <p className="mt-3 mx-auto max-w-sm text-sm leading-relaxed text-ink-50">
        Once visitors start submitting the contact form, their inquiries will appear here with trends, breakdowns, and recent activity.
      </p>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
