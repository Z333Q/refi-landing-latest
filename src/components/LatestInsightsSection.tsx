import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blog-posts';
import LocalizedDate from './ui/LocalizedDate';

const LatestInsightsSection: React.FC = () => {
  const { t } = useTranslation();
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-16 bg-charcoal-light relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">{t('blog.title')}</h2>
          
          {blogPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
                className="bg-charcoal rounded-lg border border-gray-700 overflow-hidden hover:border-mint/30 transition-all duration-300 group"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={300}
                    height={169}
                    loading="lazy"
                  />
                </div>
                
                <div className="p-4">
                  <div className="text-xs text-gray-400 mb-2">
                    <LocalizedDate 
                      date={post.date} 
                      format="short"
                    />
                  </div>
                  
                  <h3 className="font-bold mb-2 group-hover:text-mint transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-mint text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                    {t('blog.readMore')} <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No blog posts available yet.</p>
            </div>
          )}
          
          {blogPosts.length > 0 && (
            <div className="mt-12 text-center">
              <Link 
                to="/blog"
                className="inline-flex items-center bg-mint hover:bg-mint-dark text-charcoal font-semibold px-8 py-4 rounded-lg transition-all duration-300 group"
              >
                {t('blog.viewAll')}
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestInsightsSection;