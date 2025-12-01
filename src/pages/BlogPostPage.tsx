import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getBlogPost } from '../lib/blog';
import { blogPosts } from '../data/blog-posts';
import type { BlogPost } from '../lib/types';
import { getFaqSchema } from '../components/SeoFaq';
import LocalizedDate from '../components/ui/LocalizedDate';
import { useLocalization } from '../lib/l10n';
import { getImageUrl } from '../lib/imageUrls';

const BlogPostPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const l10n = useLocalization(i18n.language);

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        const fetchedPost = await getBlogPost(slug);
        setPost(fetchedPost);
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Calculate previous and next posts for navigation
  const currentPostIndex = blogPosts.findIndex(p => p.slug === slug);
  const previousPost = currentPostIndex > 0 ? blogPosts[currentPostIndex - 1] : null;
  const nextPost = currentPostIndex < blogPosts.length - 1 ? blogPosts[currentPostIndex + 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal pt-24 pb-16 flex items-center justify-center">
        <div className="text-mint text-xl">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Split content into sections and process headings
  const sections = post.content.split('\n\n').reduce((acc, paragraph) => {
    // Check if paragraph starts with heading markers
    if (paragraph.startsWith('# ')) {
      acc.push({ type: 'h1', content: paragraph.replace(/^# /, '') });
    } else if (paragraph.startsWith('## ')) {
      acc.push({ type: 'h2', content: paragraph.replace(/^## /, '') });
    } else if (paragraph.startsWith('### ')) {
      acc.push({ type: 'h3', content: paragraph.replace(/^### /, '') });
    } else {
      acc.push({ type: 'paragraph', content: paragraph });
    }
    return acc;
  }, [] as { type: string; content: string }[]);

  return (
    <>
      <Helmet>
        <title>{`${post.title} | ReFi.Trading`}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | ReFi.Trading`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:tag" content={post.tags.join(', ')} />
        
        {/* Enhanced SEO meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        
        {/* Enhanced Schema.org markup for articles */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.image,
            "datePublished": post.date,
            "dateModified": post.date,
            "publisher": {
              "@type": "Organization",
              "name": "ReFi.Trading",
              "logo": {
                "@type": "ImageObject",
                "url": "https://refi.trading/logo.png"
              }
            },
            "keywords": post.tags.join(','),
            "wordCount": post.content.split(' ').length,
            "timeRequired": `PT${post.readTime}M`,
            "articleSection": "Technology",
            "inLanguage": "en-US"
          })}
        </script>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: getFaqSchema(),
          }}
        />
      </Helmet>

      <article className="min-h-screen bg-charcoal pt-24 pb-16" itemScope itemType="https://schema.org/TechArticle">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            {/* Article Header */}
            <header className="mb-12">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                <LocalizedDate 
                  date={post.date} 
                  format="blog"
                  className="itemProp='datePublished'"
                />
                <span>•</span>
                <span>{post.readTime} {t('blog.minRead')}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" itemProp="headline">
                {post.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed" itemProp="alternativeHeadline">
                {post.subtitle}
              </p>
            </header>

            {/* Featured Image */}
            <figure className="aspect-[16/9] overflow-hidden rounded-lg mb-12">
              <img
                src={getImageUrl(post.image)}
                alt={post.title}
                className="w-full h-full object-cover"
                width={800}
                height={450}
                loading="eager"
              />
            </figure>

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none" itemProp="articleBody">
              {/* Article Summary */}
              <div className="bg-charcoal-lighter rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Key Takeaways</h2>
                <p className="text-gray-300" itemProp="description">{post.excerpt}</p>
              </div>

              {/* Main Content */}
              {sections.map((section, index) => {
                switch (section.type) {
                  case 'h1':
                    return (
                      <h2 
                        key={index}
                        id={`section-${index}`}
                        className="text-3xl font-bold mt-12 mb-6 scroll-mt-24"
                      >
                        {section.content}
                      </h2>
                    );
                  case 'h2':
                    return (
                      <h3 
                        key={index}
                        id={`section-${index}`}
                        className="text-2xl font-bold mt-8 mb-4 scroll-mt-24"
                      >
                        {section.content}
                      </h3>
                    );
                  case 'h3':
                    return (
                      <h4 
                        key={index}
                        id={`section-${index}`}
                        className="text-xl font-bold mt-6 mb-3 scroll-mt-24"
                      >
                        {section.content}
                      </h4>
                    );
                  default:
                    return (
                      <p key={index} className="mb-6 text-gray-300 leading-relaxed">
                        {section.content}
                      </p>
                    );
                }
              })}
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-700">
              {/* Series Navigation */}
              {(previousPost || nextPost) && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Market Wars Series Navigation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {previousPost && (
                      <Link
                        to={`/blog/${previousPost.slug}`}
                        className="group bg-charcoal-lighter rounded-lg p-4 border border-gray-700 hover:border-mint/30 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <ArrowLeft className="h-4 w-4 text-mint" />
                          <span className="text-sm text-gray-400">Previous Article</span>
                        </div>
                        <h4 className="font-semibold group-hover:text-mint transition-colors duration-300">
                          {previousPost.title}
                        </h4>
                      </Link>
                    )}
                    
                    {nextPost && (
                      <Link
                        to={`/blog/${nextPost.slug}`}
                        className="group bg-charcoal-lighter rounded-lg p-4 border border-gray-700 hover:border-mint/30 transition-all duration-300"
                      >
                        <div className="flex items-center justify-end gap-3 mb-2">
                          <span className="text-sm text-gray-400">Next Article</span>
                          <ArrowRight className="h-4 w-4 text-mint" />
                        </div>
                        <h4 className="font-semibold text-right group-hover:text-mint transition-colors duration-300">
                          {nextPost.title}
                        </h4>
                      </Link>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-charcoal-lighter rounded-full text-sm text-gray-300"
                      itemProp="keywords"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPostPage;