import { AUTH_PATTERN_PATH } from '@/src/constants/auth';

export function AuthPattern() {
  return (
    <img
      src={AUTH_PATTERN_PATH}
      alt=""
      className="pointer-events-none absolute left-1/2 top-1/2 w-full max-w-[824px] -translate-x-1/2 -translate-y-1/2 object-contain"
      width={824}
      height={318}
    />
  );
} 