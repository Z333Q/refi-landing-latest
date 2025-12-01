import React from 'react';

interface PolicyPageProps {
  title: string;
  content: string;
}

const PolicyPage: React.FC<PolicyPageProps> = ({ title, content }) => {
  const updatedContent = title === "Privacy Policy" ? 
    content + "\n\nThird-Party Services: This site may use third-party services and cookies from Google Analytics (ar_debug) to enhance functionality and analyze usage. These cookies may be blocked by some browsers and are subject to the respective third-party privacy policies. Images are served from our content delivery network or generated as placeholders to ensure optimal performance." :
    content;

  return (
    <div className="min-h-screen bg-charcoal pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">{title}</h1>
          <div className="prose prose-invert max-w-none">
            <div className="bg-charcoal-lighter rounded-lg p-8">
              {updatedContent.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;