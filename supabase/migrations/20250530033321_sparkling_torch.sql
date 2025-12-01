-- Drop existing policies
DROP POLICY IF EXISTS "Service role can create submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Users can read own submissions" ON contact_submissions;

-- Allow anyone to insert submissions
CREATE POLICY "Anyone can create submissions"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only allow admin to read submissions
CREATE POLICY "Admin can read submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@refi.trading');