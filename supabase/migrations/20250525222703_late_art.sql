/*
  # Insert blog posts
  
  This migration adds initial blog posts to the blog_posts table.
  
  1. Content
    - Adds 4 initial blog posts with full content
    - Each post includes metadata like title, slug, excerpt, etc.
    - Content is properly escaped for SQL insertion
*/

-- Insert blog posts
INSERT INTO blog_posts (slug, title, subtitle, excerpt, content, image, date, read_time, tags)
VALUES
  (
    'wall-street-ai-for-all',
    'Wall Street AI for All',
    'How Reinforcement Learning Agents Are Leveling the Trading Playing Field',
    'Recent advances in reinforcement learning (RL), decentralized infrastructure, and cryptographic verification are transforming what''s possible for individual traders.',
    E'For generations, Wall Street''s technological arms race has left everyday traders struggling to keep up...',
    'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg',
    '2025-05-25',
    8,
    ARRAY['AI', 'Trading', 'Reinforcement Learning', 'Technology']
  ),
  (
    'open-hackable-provable',
    'Open, Hackable, Provable',
    'How Custom Reinforcement Learning Agents Are Changing Modern Trading',
    'The emergence of open, hackable, and provable RL stacks has changed the game. Technical traders can now inspect, customize, and monetize their own reinforcement learning agents.',
    E'In recent years, the world of algorithmic trading has experienced a quiet revolution...',
    'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg',
    '2025-05-26',
    6,
    ARRAY['Open Source', 'Trading', 'Reinforcement Learning', 'Development']
  ),
  (
    'next-rails-of-finance',
    'The Next Rails of Finance',
    'Why Provable, Autonomous AI Trading Protocols Are Capturing Investor Attention',
    'The intersection of artificial intelligence and financial markets has always attracted outsized interest. Now, a new wave of investment is gathering momentum around provable, autonomous trading infrastructure.',
    E'The intersection of artificial intelligence and financial markets has always attracted outsized interest from investors...',
    'https://images.pexels.com/photos/7567596/pexels-photo-7567596.jpeg',
    '2025-05-27',
    7,
    ARRAY['Investment', 'Trading', 'AI', 'Infrastructure']
  ),
  (
    'decentralized-intelligence',
    'Decentralized Intelligence',
    'How Open Protocols Are Redefining the Future of AI Trading',
    'The convergence of artificial intelligence with decentralized systems is giving rise to a new paradigm in financial technology, transforming how trading strategies are developed and deployed.',
    E'In the rapidly evolving landscape of financial technology, a new paradigm is taking shape...',
    'https://images.pexels.com/photos/8370784/pexels-photo-8370784.jpeg',
    '2025-05-28',
    8,
    ARRAY['Decentralization', 'AI', 'Trading', 'Blockchain']
  );