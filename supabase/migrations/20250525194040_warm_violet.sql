/*
  # Contact Form Submissions Schema

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `role` (text, required)
      - `created_at` (timestamp with timezone)
      - `status` (text, default: 'pending')

  2. Security
    - Enable RLS on contact_submissions table
    - Add policy for authenticated users to read their own submissions
    - Add policy for service role to create new submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  role text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow service role to insert new submissions
CREATE POLICY "Service role can create submissions"
  ON contact_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow users to read their own submissions
CREATE POLICY "Users can read own submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (email = current_user);