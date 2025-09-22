export const AUTH_SLIDER_SCALE_FACTOR = 0.09;

export const AUTH_LOGO_PATH = '/images/placeholder/raff-logo-artboard.png';

export const AUTH_PATTERN_PATH = '/images/auth-pattern.svg';

export const AUTH_SLIDES = [
  {
    image: {
      default: '/images/auth-slide-image-1.png',
    },
    title: 'Stay in Control of Your Time Off',
    description:
      'Track your time off balance and manage requests with the Time Off widget, ensuring a stress-free experience.',
  },
];

export const AUTH_PATH_CONFIG = {
  '/login': {
    message: 'dontHaveAccount',
    linkText: 'register',
    linkHref: '/business-type',
  },
  '/register': {
    message: 'needHelp',
    linkText: 'contactUs',
    linkHref: '/',
  },
  '/reset-password': {
    message: 'changedYourMind',
    linkText: 'goBack',
    linkHref: '/login',
  },
  '/business-type': {
    message: 'alreadyHaveAccount',
    linkText: 'login',
    linkHref: '/login',
  },
} as const;

export const DEFAULT_AUTH_CONFIG = {
  message: 'changedYourMind',
  linkText: 'goBack',
  linkHref: '/',
} as const; 