'use client';

import Image from 'next/image';
import { AUTH_LOGO_PATH } from '@/src/constants/auth';

export default function AuthHeader() {
  return (
    <div className='mx-auto flex w-full items-center justify-between gap-6 pb-3.5 pt-2.5 lg:py-0'>
      <Image 
        src={AUTH_LOGO_PATH} 
        alt='raff-artboard' 
        width={40}
        height={40}
        className='size-10' 
      />
    </div>
  );
}
