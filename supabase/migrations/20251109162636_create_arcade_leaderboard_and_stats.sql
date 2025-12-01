/*
  # Create Arcade Game Leaderboard and Stats System

  ## Summary
  Creates tables to persist player statistics, achievements, and leaderboard data for the ReFinity: Market Wars arcade game.

  ## New Tables Created
  
  ### `arcade_players`
  Stores player identity and profile information:
  - `id` (uuid, primary key) - Unique player identifier
  - `email` (text, unique) - Player email (optional)
  - `username` (text) - Display name
  - `created_at` (timestamptz) - When player account was created
  - `last_played_at` (timestamptz) - Last game session timestamp
  
  ### `arcade_stats`
  Stores cumulative player statistics across all games:
  - `player_id` (uuid, foreign key) - References arcade_players
  - `total_games` (integer) - Total games played
  - `total_trades` (integer) - Total trades executed
  - `best_score` (integer) - Highest score achieved
  - `total_xp` (integer) - Cumulative experience points
  - `current_level` (integer) - Player's current level
  - `perfect_rounds` (integer) - Count of flawless games
  - `fastest_reaction` (integer) - Fastest reaction time in ms
  - `longest_streak` (integer) - Best trading streak
  - `total_event_trades` (integer) - Trades during market events
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### `arcade_achievements`
  Tracks unlocked achievements per player:
  - `player_id` (uuid, foreign key) - References arcade_players
  - `achievement_id` (text) - Achievement identifier
  - `unlocked_at` (timestamptz) - When achievement was earned
  - Primary key: (player_id, achievement_id)
  
  ### `arcade_leaderboard`
  Stores individual game scores for leaderboard rankings:
  - `id` (uuid, primary key) - Unique game session ID
  - `player_id` (uuid, foreign key) - References arcade_players
  - `score` (integer) - Final score for this game
  - `level` (integer) - Player level during game
  - `trades` (integer) - Number of trades in this game
  - `longest_streak` (integer) - Best streak in this game
  - `chapter` (integer) - Which chapter was played
  - `played_at` (timestamptz) - Game completion timestamp
  
  ## Security
  - RLS enabled on all tables
  - Players can read all leaderboard data (for rankings)
  - Players can only insert/update their own stats
  - Public can view leaderboard but not modify

  ## Indexes
  - Created indexes for common query patterns:
    - Leaderboard queries by score and date
    - Player stats lookups
    - Achievement queries
*/

-- Create arcade_players table
CREATE TABLE IF NOT EXISTS arcade_players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  username text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_played_at timestamptz DEFAULT now()
);

ALTER TABLE arcade_players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a player profile"
  ON arcade_players
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Players can view all profiles"
  ON arcade_players
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Players can update own profile"
  ON arcade_players
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create arcade_stats table
CREATE TABLE IF NOT EXISTS arcade_stats (
  player_id uuid PRIMARY KEY REFERENCES arcade_players(id) ON DELETE CASCADE,
  total_games integer DEFAULT 0,
  total_trades integer DEFAULT 0,
  best_score integer DEFAULT 0,
  total_xp integer DEFAULT 0,
  current_level integer DEFAULT 1,
  perfect_rounds integer DEFAULT 0,
  fastest_reaction integer DEFAULT 9999,
  longest_streak integer DEFAULT 0,
  total_event_trades integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE arcade_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view stats"
  ON arcade_stats
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Players can insert own stats"
  ON arcade_stats
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = player_id);

CREATE POLICY "Players can update own stats"
  ON arcade_stats
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = player_id)
  WITH CHECK (auth.uid() = player_id);

-- Create arcade_achievements table
CREATE TABLE IF NOT EXISTS arcade_achievements (
  player_id uuid REFERENCES arcade_players(id) ON DELETE CASCADE,
  achievement_id text NOT NULL,
  unlocked_at timestamptz DEFAULT now(),
  PRIMARY KEY (player_id, achievement_id)
);

ALTER TABLE arcade_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view achievements"
  ON arcade_achievements
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Players can insert own achievements"
  ON arcade_achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = player_id);

-- Create arcade_leaderboard table
CREATE TABLE IF NOT EXISTS arcade_leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES arcade_players(id) ON DELETE CASCADE,
  score integer NOT NULL,
  level integer DEFAULT 1,
  trades integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  chapter integer DEFAULT 1,
  played_at timestamptz DEFAULT now()
);

ALTER TABLE arcade_leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view leaderboard"
  ON arcade_leaderboard
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Players can insert own scores"
  ON arcade_leaderboard
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = player_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_arcade_leaderboard_score ON arcade_leaderboard(score DESC);
CREATE INDEX IF NOT EXISTS idx_arcade_leaderboard_played_at ON arcade_leaderboard(played_at DESC);
CREATE INDEX IF NOT EXISTS idx_arcade_leaderboard_player ON arcade_leaderboard(player_id);
CREATE INDEX IF NOT EXISTS idx_arcade_stats_best_score ON arcade_stats(best_score DESC);
CREATE INDEX IF NOT EXISTS idx_arcade_achievements_player ON arcade_achievements(player_id);
