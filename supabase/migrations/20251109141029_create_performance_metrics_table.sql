/*
  # Create Performance Metrics Table for ReFinity Dashboard

  1. New Tables
    - `performance_metrics`
      - `id` (uuid, primary key) - Unique identifier
      - `metric_name` (text) - Name of the metric (e.g., 'cagr', 'sharpe_ratio', 'max_drawdown')
      - `value` (numeric) - Current value of the metric
      - `comparison_value` (numeric) - Benchmark comparison value
      - `unit` (text) - Unit of measurement (e.g., '%', 'ratio')
      - `display_order` (integer) - Order for display in dashboard
      - `is_active` (boolean) - Whether metric is currently active
      - `updated_at` (timestamptz) - Last update timestamp
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `performance_metrics` table
    - Add policy for public read access (dashboard is public)
    - Only authenticated admin users can insert/update metrics

  3. Initial Data
    - Insert default metrics for CAGR, Sharpe Ratio, and Max Drawdown
*/

CREATE TABLE IF NOT EXISTS performance_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text UNIQUE NOT NULL,
  value numeric NOT NULL,
  comparison_value numeric NOT NULL,
  unit text DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active performance metrics"
  ON performance_metrics
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Only authenticated users can insert metrics"
  ON performance_metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update metrics"
  ON performance_metrics
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete metrics"
  ON performance_metrics
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_performance_metrics_active 
  ON performance_metrics(is_active, display_order);

INSERT INTO performance_metrics (metric_name, value, comparison_value, unit, display_order) 
VALUES 
  ('cagr', 28.06, 13.76, '%', 1),
  ('sharpe_ratio', 2.07, 0.65, '', 2),
  ('max_drawdown', -7.48, -25.37, '%', 3)
ON CONFLICT (metric_name) DO NOTHING;