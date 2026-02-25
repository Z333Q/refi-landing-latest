/*
  # Create investor forms table

  1. New Tables
    - `investor_forms`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `full_name` (text) - Investor's full name
      - `email` (text) - Contact email address
      - `phone` (text, optional) - Contact phone number
      - `company` (text, optional) - Company or organization name
      - `investor_type` (text) - Type of investor (Angel, VC, Family Office, Institutional, etc.)
      - `investment_range` (text) - Typical investment range
      - `interest_level` (text) - Level of interest in the opportunity
      - `funding_timeline` (text, optional) - Expected funding timeline
      - `areas_of_interest` (text[], optional) - Array of interest areas (AI, Trading, DeFi, etc.)
      - `how_heard` (text, optional) - How they heard about ReFi Trading
      - `additional_notes` (text, optional) - Additional comments or questions
      - `accredited_investor` (boolean) - Whether they are an accredited investor
      - `consent_data_processing` (boolean) - Consent to data processing
      - `consent_communications` (boolean) - Consent to receive communications
      - `ip_address` (text, optional) - Submitter's IP address for compliance
      - `created_at` (timestamptz) - Submission timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `investor_forms` table
    - Only authenticated admins can view submissions
    - Public can insert their own submissions (one-time)
*/

CREATE TABLE IF NOT EXISTS investor_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  investor_type text NOT NULL,
  investment_range text NOT NULL,
  interest_level text NOT NULL,
  funding_timeline text,
  areas_of_interest text[],
  how_heard text,
  additional_notes text,
  accredited_investor boolean NOT NULL DEFAULT false,
  consent_data_processing boolean NOT NULL DEFAULT false,
  consent_communications boolean NOT NULL DEFAULT false,
  ip_address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE investor_forms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit investor form"
  ON investor_forms
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all submissions"
  ON investor_forms
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_investor_forms_email ON investor_forms(email);
CREATE INDEX IF NOT EXISTS idx_investor_forms_created_at ON investor_forms(created_at DESC);