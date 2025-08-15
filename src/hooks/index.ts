import { useState, useEffect } from 'react';

/**
 * Hook to detect mobile/tablet devices
 * Returns true for devices with width <= 1024px or touch capability
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(width <= 1024 || isTouchDevice);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isMobile;
};

/**
 * Hook to detect scroll position and add/remove header styles
 */
export const useScrolled = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};

/**
 * Hook to manage menu open/close state with escape key support
 */
export const useMenuToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return { isOpen, openMenu, closeMenu, toggleMenu };
};

/**
 * Hook for smooth scrolling to elements
 */
export const useSmoothScroll = () => {
  const scrollToElement = (elementId: string, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const yPosition = element.offsetTop - offset;
      window.scrollTo({
        top: yPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return { scrollToElement, scrollToTop };
};

/**
 * Hook to manage local storage state
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};

/**
 * Hook to debounce values (useful for search, resize events, etc.)
 */
export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook to detect if user prefers reduced motion
 */
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

/**
 * Hook to lock/unlock body scrolling (for modals, overlays, etc.)
 */
export const useScrollLock = () => {
  const lockScroll = () => {
    // Store current scroll position
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Store in data attributes for restoration
    document.body.dataset.scrollY = scrollY.toString();
    document.body.dataset.scrollX = scrollX.toString();
    
    // Get scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Apply overflow hidden and padding to compensate for scrollbar
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.documentElement.style.overflow = 'hidden';
    
    // Add utility class
    document.body.classList.add('scroll-locked');
  };

  const unlockScroll = () => {
    // Get stored scroll position
    const scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
    const scrollX = parseInt(document.body.dataset.scrollX || '0', 10);
    
    // Remove scroll lock styles
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.documentElement.style.overflow = '';
    
    // Remove utility class and data attributes
    document.body.classList.remove('scroll-locked');
    delete document.body.dataset.scrollY;
    delete document.body.dataset.scrollX;
    
    // Restore scroll position
    if (scrollY !== 0 || scrollX !== 0) {
      window.scrollTo({
        top: scrollY,
        left: scrollX,
        behavior: 'auto'
      });
    }
  };

  return { lockScroll, unlockScroll };
};
