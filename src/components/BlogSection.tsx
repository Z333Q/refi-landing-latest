import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import { blogPosts } from '../data/blog-posts';
import { getImageUrl } from '../lib/imageUrls';

const BlogSection: React.FC = () => {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="section-spacing bg-charcoal-light relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-lighter via-charcoal to-charcoal opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader 
          title="Latest Insights" 
          subtitle="Deep dives into AI trading technology and market analysis" 
        />

        {blogPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <article key={post.id} className="card group hover:shadow-[0_0_25px_rgba(12,212,160,0.15)]">
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="aspect-[16/9] overflow-hidden rounded-lg mb-6">
                  <img
                    src={getImageUrl(post.image)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={400}
                    height={225}
                    loading="lazy"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  
                  <h3 className="text-xl font-bold group-hover:text-mint transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-mint font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            </article>
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
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;