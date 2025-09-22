import { useEffect, useState } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type BreakpointKeys = keyof typeof breakpoints;

const getBreakpoints = () => {
  if (typeof window === 'undefined') {
    return {} as Record<BreakpointKeys, boolean>;
  }
  return Object.keys(breakpoints).reduce(
    (acc, key) => ({
      ...acc,
      [key]: window.innerWidth >= breakpoints[key as BreakpointKeys],
    }),
    {} as Record<BreakpointKeys, boolean>,
  );
};

export function useBreakpoint() {
  const [state, setState] = useState({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleResize() {
      setState(getBreakpoints());
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return state;
}
