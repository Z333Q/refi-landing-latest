import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { getBlogPosts } from '../lib/blog';
import type { BlogPost } from '../lib/types';
import { getFaqSchema } from '../components/SeoFaq';
import LocalizedDate from '../components/ui/LocalizedDate';
import { getImageUrl } from '../lib/imageUrls';

const BlogPage: React.FC = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getBlogPosts();
        if (!controller.signal.aborted) {
          setPosts(fetchedPosts);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal pt-24 pb-16 flex items-center justify-center">
        <div className="text-mint text-xl">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog | ReFi.Trading - AI Trading Insights</title>
        <meta name="description" content="Explore the latest insights on AI trading, reinforcement learning, zero-knowledge proofs, and market analysis from the ReFi.Trading team. Deep technical content for traders and developers." />
        <meta property="og:title" content="Blog | ReFi.Trading - AI Trading Insights" />
        <meta property="og:description" content="Explore the latest insights on AI trading, reinforcement learning, zero-knowledge proofs, and market analysis from the ReFi.Trading team." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://refi.trading/blog" />
        <link rel="preload" as="image" href={posts[0]?.image} />
        <link rel="canonical" href="https://refi.trading/blog" />
        
        {/* Blog structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "ReFi.Trading Blog",
              "description": "Insights on AI trading, reinforcement learning, and market analysis",
              "url": "https://refi.trading/blog",
              "publisher": {
                "@type": "Organization",
                "name": "ReFi.Trading",
                "logo": "https://refi.trading/green-logo-only-square.png"
              },
              "blogPost": posts.map(post => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.excerpt,
                "url": `https://refi.trading/blog/${post.slug}`,
                "datePublished": post.date,
                "author": {
                  "@type": "Organization",
                  "name": "ReFi.Trading"
                },
                "image": post.image
              }))
            }),
          }}
        />
        
        {/* Breadcrumb structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://refi.trading"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blog",
                  "item": "https://refi.trading/blog"
                }
              ]
            }),
          }}
        />
      </Helmet>

      <main className="min-h-screen bg-charcoal pt-24 pb-16" role="main">
        <div className="container mx-auto px-4 md:px-6">
          <header className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('blog.title')}
            </h1>
            <p className="text-xl text-gray-300">{t('blog.subtitle')}</p>
          </header>

          <section 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            role="list"
            aria-label="Blog posts"
          >
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="card group hover:shadow-[0_0_25px_rgba(12,212,160,0.15)]"
                role="listitem"
                itemScope 
                itemType="https://schema.org/BlogPosting"
              >
                <meta itemProp="url" content={`https://refi.trading/blog/${post.slug}`} />
                <meta itemProp="datePublished" content={post.date} />
                <meta itemProp="author" content="ReFi.Trading" />
                
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="aspect-[16/9] overflow-hidden rounded-lg mb-6">
                    <img
                      src={getImageUrl(post.image)}
                      alt={`Featured image for ${post.title}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      width={400}
                      height={225}
                      loading="lazy"
                      itemProp="image"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <LocalizedDate 
                        date={post.date} 
                        format="blog"
                      />
                      <span>•</span>
                      <span>{post.readTime} {t('blog.minRead')}</span>
                      {post.tags.includes('Trading') && post.tags.includes('Markets') && (
                        <>
                          <span>•</span>
                          <span className="text-mint text-xs font-medium bg-mint/10 px-2 py-1 rounded">Market Wars Series</span>
                        </>
                      )}
                    </div>
                    
                    <h2 className="text-xl font-bold group-hover:text-mint transition-colors duration-300">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-300 line-clamp-3" itemProp="description">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-mint font-medium group-hover:translate-x-2 transition-transform duration-300">
                      {t('blog.readMore')} <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
};

export default BlogPage;