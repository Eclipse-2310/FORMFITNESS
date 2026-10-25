export const SITE = {
  name: 'FORM / FITNESS',
  tagline: 'Independent Strength Coaching',
  fictionalNote:
    'This is a fictional portfolio concept. FORM / FITNESS is not a registered business, and no services described here are actually offered.',
  whatsapp: {
    number: '15555550100',
    displayNumber: '+1 (555) 555-0100',
    get link() {
      const msg = encodeURIComponent(
        "Hi — I found your site and I'd like to enquire about a training session.",
      );
      return `https://wa.me/${this.number}?text=${msg}`;
    },
  },
  email: 'hello@formfitness.example',
  location: 'South London (fields, studios, and home visits)',
  hours: 'Mon–Sat, 06:00–20:00',
};

export const NAV_LINKS = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Services', href: '#services' },
  { label: 'Programmes', href: '#programmes' },
  { label: 'Coach', href: '#coach' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const HERO = {
  eyebrow: 'Independent Personal Training',
  headline: 'Strength training that fits an actual life',
  subhead:
    'Structured programmes, honest coaching, and no false promises. Built for busy adults who want to get stronger without restructuring everything else.',
  ctaPrimary: 'Enquire on WhatsApp',
  ctaSecondary: 'See sample programmes',
  image: {
    url: 'https://images.pexels.com/photos/19132573/pexels-photo-19132573.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'A lifter preparing a barbell in a dimly lit gym, focused before a set.',
    credit: 'Photo: Hugazo Boss / Pexels',
  },
};

export const PHILOSOPHY = {
  eyebrow: 'Philosophy',
  title: 'Strong, not complicated',
  body: [
    'Most training advice online is built for people with unlimited time and a complicated relationship with carbs. That is not who I work with.',
    'My clients are people with jobs, commutes, families, and weeks that do not always go to plan. The training has to survive a bad week — a late meeting, a poor night of sleep, a child who would not go to bed — and still move you forward.',
    'That means a small number of exercises done consistently, progressive overload tracked on paper, and a programme you can actually run four days out of five. No novelty for its own sake. No exercises that look impressive on camera but build nothing.',
    'I coach the main lifts — squat, hinge, press, pull — because they give the most return for the time invested. I programme accessory work around your individual gaps, not a generic template. And I write everything down so we can see whether it is working, rather than guessing.',
  ],
  principles: [
    {
      title: 'Consistency over intensity',
      text: 'A session you actually did at 70% beats the perfect session you skipped. Programmes are built to be repeatable, not heroic.',
    },
    {
      title: 'Progress on paper',
      text: 'If it is not tracked, it is not managed. Every session is logged so we can see the trend, not just how today felt.',
    },
    {
      title: 'One thing at a time',
      text: 'You do not need to fix your sleep, diet, mobility, and conditioning simultaneously. We pick the lever that matters most and pull it.',
    },
  ],
  image: {
    url: 'https://images.pexels.com/photos/8611295/pexels-photo-8611295.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'A row of black kettlebells on a gym floor, neatly arranged.',
    credit: 'Photo: RDNE Stock project / Pexels',
  },
};

export const SERVICES = {
  eyebrow: 'Services',
  title: 'Three ways we can work together',
  intro:
    'Every option starts with a conversation about where you are, what you want, and what your weeks actually look like. No package is sold before that.',
  items: [
    {
      number: '01',
      name: '1-to-1 Coaching',
      summary:
        'In-person sessions where I coach you through every set, adjust load on the fly, and fix technique in real time.',
      detail:
        'Best if you are new to barbell training, coming back from a break, or want hands-on coaching on the main lifts. Sessions run 60 minutes in South London — outdoors, at a partner studio, or in your home with portable equipment.',
      points: ['60-minute sessions', 'Technique coaching on every lift', 'Programme adjusted session to session', 'South London: fields, studios, home visits'],
    },
    {
      number: '02',
      name: 'Programme Design',
      summary:
        'A written strength programme built around your schedule, equipment, and goals, with weekly check-ins by message.',
      detail:
        'Best if you train on your own but want structure and accountability. You get a four-week block, exercise videos for anything unfamiliar, and a weekly check-in where we review your logs and adjust the next block.',
      points: ['Custom 4-week training block', 'Exercise demonstrations for unfamiliar movements', 'Weekly message check-in', 'Train at your own gym or home'],
    },
    {
      number: '03',
      name: 'Single Consultation',
      summary:
        'A one-off 90-minute session to review your current training, fix a sticking point, or build a short-term plan.',
      detail:
        'Best if you are experienced and want a second pair of eyes — a form check, a programme review, or a focused plan for the next six weeks. Come with questions; leave with notes.',
      points: ['90-minute single session', 'Technique review on specific lifts', 'Written notes and short-term plan', 'No ongoing commitment'],
    },
  ],
};

export const PROGRAMMES = {
  eyebrow: 'Sample Programmes',
  title: 'What a training week looks like',
  intro:
    'These are illustrative samples, not fixed templates. Every programme is written after our first conversation and adjusted based on how you respond. The structure — main lift, volume work, accessories — stays consistent; the specifics change.',
  disclaimer:
    'Sample programmes are for illustration only. They are not a recommendation to follow without individual assessment.',
  blocks: [
    {
      name: 'Beginner Strength — 3 days',
      audience: 'For someone starting barbell training or returning after a long break',
      days: [
        {
          day: 'Mon',
          focus: 'Squat focus',
          exercises: [
            { name: 'Back squat', scheme: '3×5' },
            { name: 'Bench press', scheme: '3×5' },
            { name: 'Pendlay row', scheme: '3×6' },
            { name: 'Plank', scheme: '3×30s' },
          ],
        },
        {
          day: 'Wed',
          focus: 'Hinge focus',
          exercises: [
            { name: 'Romanian deadlift', scheme: '3×6' },
            { name: 'Overhead press', scheme: '3×5' },
            { name: 'Lat pulldown', scheme: '3×8' },
            { name: 'Hanging knee raise', scheme: '3×10' },
          ],
        },
        {
          day: 'Fri',
          focus: 'Full body',
          exercises: [
            { name: 'Back squat', scheme: '3×5' },
            { name: 'Bench press', scheme: '3×5' },
            { name: 'Single-leg RDL', scheme: '3×8/leg' },
            { name: 'Farmer carry', scheme: '3×30m' },
          ],
        },
      ],
    },
    {
      name: 'Intermediate — 4 days',
      audience: 'For someone with 6+ months of consistent training who wants upper/lower structure',
      days: [
        {
          day: 'Mon',
          focus: 'Upper (heavy)',
          exercises: [
            { name: 'Bench press', scheme: '4×5' },
            { name: 'Weighted pull-up', scheme: '4×5' },
            { name: 'Standing OHP', scheme: '3×6' },
            { name: 'Curl + triceps', scheme: '3×10' },
          ],
        },
        {
          day: 'Tue',
          focus: 'Lower (heavy)',
          exercises: [
            { name: 'Back squat', scheme: '4×5' },
            { name: 'Deadlift', scheme: '1×5 + 2 back-off' },
            { name: 'Bulgarian split squat', scheme: '3×8/leg' },
            { name: 'Cable woodchopper', scheme: '3×10/side' },
          ],
        },
        {
          day: 'Thu',
          focus: 'Upper (volume)',
          exercises: [
            { name: 'Incline DB press', scheme: '4×10' },
            { name: 'Pendlay row', scheme: '4×8' },
            { name: 'Lateral raise', scheme: '3×12' },
            { name: 'Skull crusher', scheme: '3×12' },
          ],
        },
        {
          day: 'Fri',
          focus: 'Lower (volume)',
          exercises: [
            { name: 'Front squat', scheme: '4×8' },
            { name: 'Romanian deadlift', scheme: '4×8' },
            { name: 'Walking lunge', scheme: '3×12/leg' },
            { name: 'Standing calf raise', scheme: '4×12' },
          ],
        },
      ],
    },
  ],
};

export const COACH = {
  eyebrow: 'The Coach',
  name: 'Daniel Okafor',
  role: 'Independent Strength Coach',
  image: {
    url: 'https://images.pexels.com/photos/21633393/pexels-photo-21633393.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Portrait of a man in a gym wearing a black t-shirt, conveying strength and confidence.',
    credit: 'Photo: Marlon Schmeiski / Pexels',
  },
  body: [
    'I have trained people in parks, studios, living rooms, and the corner of a corporate gym that smelled like paint. The setting matters less than the structure.',
    'I came into coaching from my own training — years of trying programmes from books and videos, making mistakes, and slowly figuring out what actually transfers. I am not a former athlete and I do not claim credentials I do not hold. What I offer is attention to detail, honest feedback, and a programme you can run without me hovering.',
    'I work with a small number of clients at a time so that each programme is written for a person, not pulled off a shelf. If I am not the right fit for what you need, I will say so and point you elsewhere.',
  ],
  note: 'Daniel is a fictional persona created for this portfolio concept. The photograph is licensed stock imagery and does not depict a real coach.',
};

export const FAQ = {
  eyebrow: 'FAQ',
  title: 'Questions I hear often',
  items: [
    {
      q: 'Do I need to have trained before?',
      a: 'No. About half the people I work with are starting barbell training for the first time or returning after years away. The first few sessions are spent learning the basics — how to squat, hinge, and press safely — before we add any meaningful load.',
    },
    {
      q: 'I do not have a gym membership. Can we still work together?',
      a: 'Yes. For 1-to-1 coaching I bring the equipment I need — barbells are not always practical, but dumbbells, kettlebells, and bands cover a great deal. For programme design, I will write around whatever you have access to, including a single pair of dumbbells at home.',
    },
    {
      q: 'How long until I see results?',
      a: 'If "results" means getting stronger on the main lifts, most people see clear progress within four to six weeks of consistent training. If it means a specific body composition change, that depends on factors outside the gym — sleep, nutrition, stress — and I will not promise a timeline I cannot control.',
    },
    {
      q: 'What does it cost?',
      a: 'Pricing depends on the option and frequency. Rather than publish numbers that may not fit your situation, I prefer we have a short conversation first. There is no obligation and no pressure to commit.',
    },
    {
      q: 'Do you train people online?',
      a: 'Programme Design is remote by design — you train on your own and we check in by message weekly. 1-to-1 coaching is in-person in South London. I do not currently offer live video coaching.',
    },
    {
      q: 'How are training programmes structured?',
      a: 'Every programme is built around three to four main lifts per session — typically a squat, a hinge, a press, and a pull. Accessory work fills in around those. The structure stays consistent week to week, but the weight, reps, and sets progress on a four-week cycle so you are always doing slightly more than last time. You will always know what you are doing and why.',
    },
    {
      q: 'What if I can only train twice a week?',
      a: 'Twice a week is enough to make meaningful progress, especially for strength. A two-day programme simply uses full-body sessions rather than splitting movements across days. Three sessions is the sweet spot for most people, but two is perfectly workable if that is what your schedule allows.',
    },
    {
      q: 'Can I reschedule or pause sessions?',
      a: 'Yes. Sessions can be rescheduled with 24 hours notice — life happens, and a missed session should not derail your programme. If you need to pause entirely for travel, illness, or a busy period at work, we put the programme on hold and resume where you left off. You do not lose progress by taking a week or two off.',
    },
    {
      q: 'How long is each session?',
      a: '1-to-1 coaching sessions run 60 minutes including warm-up and cool-down. If you are doing Programme Design on your own, sessions are typically 45 to 75 minutes depending on the day — I write the plan so you know roughly how long to budget, and you can adjust rest periods to fit a tighter window when needed.',
    },
    {
      q: 'What if I miss a week of training?',
      a: 'Missing a week is not a problem. When you return, we repeat the last completed week rather than pushing forward — this lets your body re-adapt without excessive soreness. Two or three missed weeks may mean we deload and rebuild slightly, but the strength you have built does not disappear that quickly.',
    },
    {
      q: 'Do programmes include nutrition guidance?',
      a: 'Programme Design includes basic nutrition principles — enough protein, sensible meal timing, and realistic habits — but I am not a registered dietitian and do not write detailed meal plans. If you need specific dietary support I will refer you to someone qualified. Training and nutrition are separate disciplines, and I respect that boundary.',
    },
    {
      q: 'How do you track progress over time?',
      a: 'Every session is logged — weights, sets, reps, and notes on how each lift felt. For 1-to-1 clients I track this during the session. For Programme Design clients, you log your sessions in a shared spreadsheet and we review them in the weekly check-in. You can see your numbers trending up over weeks and months, which is the most honest measure of progress.',
    },
    {
      q: 'Is this a real business?',
      a: 'No. FORM / FITNESS is a fictional portfolio concept built to demonstrate design and front-end work. No services are actually offered, and the WhatsApp link is for demonstration only.',
    },
  ],
};

export const CONTACT = {
  eyebrow: 'Contact',
  title: 'Start with a conversation',
  body: 'The quickest way to get started is a message on WhatsApp. Tell me a bit about your training history, what you are hoping to achieve, and what your typical week looks like. I will reply within a day.',
  note: 'This WhatsApp link is non-functional in the demo. In a live deployment, the number above would connect to the coach directly.',
};

type FooterLink = { label: string; href?: string; view?: string };

export const FOOTER: {
  columns: { heading: string; links: FooterLink[] }[];
  attribution: string;
} = {
  columns: [
    {
      heading: 'Explore',
      links: [
        { label: 'Philosophy', href: '#philosophy' },
        { label: 'Services', href: '#services' },
        { label: 'Sample Programmes', href: '#programmes' },
        { label: 'Coach', href: '#coach' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy Policy', view: 'privacy' },
        { label: 'Terms of Service', view: 'terms' },
        { label: 'Dashboard', view: 'dashboard' },
      ],
    },
  ],
  attribution: 'Built as a front-end portfolio demonstration.',
};

export const PRIVACY_CONTENT = {
  title: 'Privacy Policy',
  status: 'Draft — for demonstration only',
  updated: 'October 2026',
  intro:
    'This privacy policy is a draft placeholder created for the FORM / FITNESS portfolio concept. It is not legal advice and has not been reviewed by a qualified professional. Any real deployment must tailor this document to the actual business, jurisdiction, and data practices involved.',
  sections: [
    {
      heading: 'What data this site collects',
      body: 'This is a fictional portfolio concept, but the contact form is functional. When you submit the form, your name, email, selected service, and message are stored in a secure database so the site owner can review and respond to inquiries. The data is not shared with third parties and is only visible to the site owner through a password-protected dashboard. The WhatsApp link opens a third-party messaging app; any information you send through WhatsApp is handled by WhatsApp, not by this website.',
    },
    {
      heading: 'Cookies',
      body: 'This site does not set cookies. Google Fonts are loaded from Google CDN, which may log request metadata independently of this site. See Google privacy documentation for details on how that service handles data.',
    },
    {
      heading: 'Third-party services',
      body: 'This site loads Google Fonts (font delivery) and images hosted on Pexels. Form submissions are stored using Supabase, a managed database service. If configured, transactional emails are sent through Brevo. No advertising, tracking, or analytics scripts are included.',
    },
    {
      heading: 'If this were a real business',
      body: 'A live personal training business would need to describe how it stores client health information, session notes, and payment details; which jurisdictions apply; how long data is retained; and how clients can request deletion. This draft does not cover those topics because the demo does not process that data.',
    },
    {
      heading: 'Contact',
      body: 'Questions about this demo can be directed to the email listed on the contact section. This is not a monitored business address.',
    },
  ],
};

export const TERMS_CONTENT = {
  title: 'Terms of Service',
  status: 'Draft — for demonstration only',
  updated: 'October 2026',
  intro:
    'These terms are a draft placeholder created for the FORM / FITNESS portfolio concept. They are not a binding agreement and have not been reviewed by a qualified professional. No services are offered through this demo.',
  sections: [
    {
      heading: 'Nature of this website',
      body: 'FORM / FITNESS is a fictional portfolio concept. The training services described on this site are not actually offered. No contract is formed by browsing this site, contacting the demo WhatsApp number, or sending an email to the address listed.',
    },
    {
      heading: 'No professional advice',
      body: 'The sample programmes, philosophy text, and FAQ answers on this site are for illustrative purposes only. They are not medical advice, exercise prescription, or a recommendation to begin any training programme. Any real training programme should be designed with a qualified professional after individual assessment.',
    },
    {
      heading: 'Intellectual property',
      body: 'Written content on this site is original to the portfolio concept. Photographs are licensed stock imagery from Pexels and are used under the Pexels license. Fonts are used under their respective open-source licenses.',
    },
    {
      heading: 'Limitation',
      body: 'Because no services are offered, no liability arises from the use of this demo website. This clause would need substantial revision if this were a real business offering paid training services.',
    },
    {
      heading: 'Changes',
      body: 'This demo may be modified or removed at any time without notice. A live business would need to describe how terms changes are communicated to existing clients.',
    },
  ],
};
