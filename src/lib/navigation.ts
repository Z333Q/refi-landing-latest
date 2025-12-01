export const scrollToSection = (sectionId: string, offset: number = 80) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const handleNavigation = (
  href: string,
  currentPath: string,
  navigate: (path: string) => void,
  onMenuClose?: () => void
) => {
  if (onMenuClose) {
    onMenuClose();
  }

  if (href.startsWith('#')) {
    const sectionId = href.substring(1);

    if (currentPath === '/') {
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      navigate(`/${href}`);
    }
  } else if (href.startsWith('/')) {
    navigate(href);
  } else {
    window.location.href = href;
  }
};

export const isActiveSection = (sectionId: string, activeSection: string | null) => {
  return activeSection === sectionId;
};

export const observeSections = (
  sectionIds: string[],
  callback: (sectionId: string) => void
) => {
  const options = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target.id);
      }
    });
  }, options);

  sectionIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }
  });

  return () => {
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.unobserve(element);
      }
    });
  };
};
