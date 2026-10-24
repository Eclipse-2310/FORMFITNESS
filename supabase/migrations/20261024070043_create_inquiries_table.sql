/*
# Create inquiries table for the contact form

1. New Tables
- `inquiries`
  - `id` (uuid, primary key)
  - `name` (text, not null) — visitor's full name
  - `email` (text, not null) — visitor's email address
  - `interest` (text, not null) — which service they are interested in (e.g. "1-to-1 Coaching", "Programme Design", "Single Consultation", "General enquiry")
  - `message` (text, not null) — the visitor's inquiry text
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `inquiries`.
- Grant INSERT to `anon` + `authenticated` so the public contact form can submit without signing in.
- No SELECT/UPDATE/DELETE granted to anon or authenticated — submitted inquiries are private to the site owner and only readable via the service role / dashboard.
- INSERT policy allows anyone to insert (single-tenant, no-auth public contact form).
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  interest text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON inquiries TO anon, authenticated;

DROP POLICY IF EXISTS "anon_can_insert_inquiries" ON inquiries;
CREATE POLICY "anon_can_insert_inquiries"
ON inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);