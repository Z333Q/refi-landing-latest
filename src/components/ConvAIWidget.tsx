import React, { useEffect } from 'react';

const ConvAIWidget: React.FC = () => {
  useEffect(() => {
    // Load the ElevenLabs ConvAI widget script asynchronously after page load
    const loadWidget = () => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
    };
    
    // Delay loading until after critical resources
    if (document.readyState === 'complete') {
      setTimeout(loadWidget, 2000);
    } else {
      window.addEventListener('load', () => setTimeout(loadWidget, 2000));
    }

    // Cleanup function to remove script when component unmounts
    return () => {
      const existingScript = document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <elevenlabs-convai agent-id="agent_01jzhcn38hft3ahcr0ds3qe20a"></elevenlabs-convai>
  );
};

export default ConvAIWidget;