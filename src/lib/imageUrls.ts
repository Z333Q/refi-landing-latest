// Centralized image URL mapping - using local paths
export const imageUrls = {
  // Main images
  logo: '/green-logo-only-square.png',
  slide3: '/Slide3.png',
  slide8: '/Slide8.png',
  slide10: '/Slide10.png',

  // Partner logos
  logos: {
    alpaca: '/logos/2a85a89-black-alpaca-logo.svg',
    albertaInnovates: '/logos/Alberta_Innovates_logo.svg.png',
    amii: '/logos/amii.webp',
    ventureLab: '/logos/ventureLAB logo - colour with grey.png',
    mongodb: '/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg',
    googleStartups: '/logos/Google_for_Startups_logo.svg.png',
    chainlink: '/logos/chainlink-labs.png',
    tradier: '/logos/tradier.png',
    interactiveBrokers: '/logos/interactive-brokers-cropped.png',
    edmontonUnlimited: '/logos/Edmonton-Unlimited-Logo.webp',
  },

  // Team images
  team: {
    dan: '/blog-images/dan-refi-trading.jpg',
    zeshan: '/blog-images/zeshan-refi-trading.jpg',
  },

  // Blog images
  blog: {
    'brain.png': '/blog-images/brain.png',
    'growth.png': '/blog-images/growth.png',
    'learning.png': '/blog-images/learning.png',
    'automation.png': '/blog-images/automation.png',
    'global-nodes.png': '/blog-images/global-nodes.png',
    'decentralized-brain.png': '/blog-images/decentralized-brain.png',
    'keys.png': '/blog-images/keys.png',
    'cylander.png': '/blog-images/cylander.png',
    'velocity-coins.png': '/blog-images/velocity-coins.png',
    'automation.jpg': '/blog-images/automation.jpg',
    'brain.jpg': '/blog-images/brain.jpg',
  }
};

// Helper function to get image URL with fallback to local path
export function getImageUrl(localPath: string): string {
  // Handle blog images
  if (localPath.startsWith('/blog-images/')) {
    const filename = localPath.replace('/blog-images/', '');
    const blogImage = imageUrls.blog[filename as keyof typeof imageUrls.blog];
    if (blogImage) return blogImage;
  }

  // Map local paths to actual URLs
  const pathMap: Record<string, string> = {
    '/green-logo-only-square.png': imageUrls.logo,
    '/Slide3.png': imageUrls.slide3,
    '/Slide8.png': imageUrls.slide8,
    '/Slide10.png': imageUrls.slide10,
    '/logos/2a85a89-black-alpaca-logo.svg': imageUrls.logos.alpaca,
    '/logos/Alberta_Innovates_logo.svg copy.png': imageUrls.logos.albertaInnovates,
    '/logos/Alberta_Innovates_logo.svg.png': imageUrls.logos.albertaInnovates,
    '/logos/amii.webp': imageUrls.logos.amii,
    '/logos/ventureLAB logo - colour with grey.png': imageUrls.logos.ventureLab,
    '/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg': imageUrls.logos.mongodb,
    '/logos/Google_for_Startups_logo.svg.png': imageUrls.logos.googleStartups,
    '/logos/chainlink-labs.png': imageUrls.logos.chainlink,
    '/logos/tradier.png': imageUrls.logos.tradier,
    '/logos/interactive-brokers-cropped.png': imageUrls.logos.interactiveBrokers,
    '/logos/Edmonton-Unlimited-Logo copy.webp': imageUrls.logos.edmontonUnlimited,
    '/logos/Edmonton-Unlimited-Logo.webp': imageUrls.logos.edmontonUnlimited,
    '/blog-images/dan-refi-trading.jpg': imageUrls.team.dan,
    '/blog-images/zeshan-refi-trading.jpg': imageUrls.team.zeshan,
  };

  return pathMap[localPath] || localPath;
}
