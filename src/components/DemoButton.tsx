import React, { useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';

interface DemoButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const DemoButton: React.FC<DemoButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  className = '' 
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Calendar scheduling script
    const loadCalendarScript = () => {
      // Check if script is already loaded
      if (document.querySelector('script[src*="calendar.google.com"]')) {
        initializeButton();
        return;
      }

      // Add CSS
      const link = document.createElement('link');
      link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      // Add script
      const script = document.createElement('script');
      script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
      script.async = true;
      
      script.onload = () => {
        initializeButton();
      };
      
      document.head.appendChild(script);
    };

    const initializeButton = () => {
      if (window.calendar && window.calendar.schedulingButton && buttonRef.current) {
        window.calendar.schedulingButton.load({
          url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2Ybb1BrtbGaTzdr0nefeouo0T5zJyAURM-KZxID-3QQtjtJgGQkvot2IMZ_PsussdtXJFfYRC_?gv=true',
          color: '#0CD4A0',
          label: 'Schedule Demo',
          target: buttonRef.current,
        });
      }
    };

    loadCalendarScript();
  }, []);

  const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 group";
  
  const variantClasses = {
    primary: "bg-mint hover:bg-mint-dark text-charcoal hover:shadow-[0_0_20px_rgba(12,212,160,0.3)]",
    secondary: "bg-transparent border-2 border-mint/30 hover:border-mint text-mint hover:shadow-[0_0_20px_rgba(12,212,160,0.15)]"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <div 
      ref={buttonRef}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      <Calendar className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-300" />
      <span>Schedule Demo</span>
    </div>
  );
};

export default DemoButton;