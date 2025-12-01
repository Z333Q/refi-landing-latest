/*
  # Fix RLS Performance and Security Issues

  ## Summary
  Resolves performance and security issues identified by Supabase security scan.

  ## Changes Made

  ### 1. RLS Performance Optimization
  All RLS policies that use `auth.uid()` or `auth.jwt()` have been updated to use
  `(select auth.uid())` or `(select auth.jwt())` to prevent re-evaluation for each row.
  
  **Affected Tables:**
  - `contact_submissions` - Admin read policy
  - `arcade_players` - Update own profile policy
  - `arcade_stats` - Insert and update policies
  - `arcade_achievements` - Insert policy
  - `arcade_leaderboard` - Insert policy

  ### 2. Remove Unused Indexes
  Removed indexes that are not being used in queries to reduce storage and maintenance overhead:
  - `idx_arcade_leaderboard_score`
  - `idx_arcade_leaderboard_played_at`
  - `idx_arcade_leaderboard_player`
  - `idx_arcade_stats_best_score`
  - `idx_arcade_achievements_player`

  ### 3. Fix Function Search Path
  Updated `update_updated_at_column()` function to have an immutable search path for security.

  ## Security Impact
  - Improved query performance at scale
  - Prevents potential security issues from mutable search paths
  - Maintains all existing access controls
*/

-- ============================================================================
-- 1. FIX RLS POLICIES FOR PERFORMANCE
-- ============================================================================

-- Fix contact_submissions admin policy
DROP POLICY IF EXISTS "Admin can read submissions" ON contact_submissions;

CREATE POLICY "Admin can read submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING ((select auth.jwt()) ->> 'email' = 'admin@refi.trading');

-- Fix arcade_players update policy
DROP POLICY IF EXISTS "Players can update own profile" ON arcade_players;

CREATE POLICY "Players can update own profile"
  ON arcade_players
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- Fix arcade_stats insert policy
DROP POLICY IF EXISTS "Players can insert own stats" ON arcade_stats;

CREATE POLICY "Players can insert own stats"
  ON arcade_stats
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = player_id);

-- Fix arcade_stats update policy
DROP POLICY IF EXISTS "Players can update own stats" ON arcade_stats;

CREATE POLICY "Players can update own stats"
  ON arcade_stats
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = player_id)
  WITH CHECK ((select auth.uid()) = player_id);

-- Fix arcade_achievements insert policy
DROP POLICY IF EXISTS "Players can insert own achievements" ON arcade_achievements;

CREATE POLICY "Players can insert own achievements"
  ON arcade_achievements
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = player_id);

-- Fix arcade_leaderboard insert policy
DROP POLICY IF EXISTS "Players can insert own scores" ON arcade_leaderboard;

CREATE POLICY "Players can insert own scores"
  ON arcade_leaderboard
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = player_id);

-- ============================================================================
-- 2. REMOVE UNUSED INDEXES
-- ============================================================================

DROP INDEX IF EXISTS idx_arcade_leaderboard_score;
DROP INDEX IF EXISTS idx_arcade_leaderboard_played_at;
DROP INDEX IF EXISTS idx_arcade_leaderboard_player;
DROP INDEX IF EXISTS idx_arcade_stats_best_score;
DROP INDEX IF EXISTS idx_arcade_achievements_player;

-- ============================================================================
-- 3. FIX FUNCTION SEARCH PATH SECURITY
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;