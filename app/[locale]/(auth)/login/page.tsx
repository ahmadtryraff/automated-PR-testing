'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { getMyProfile, loginUser } from '@/src/features/auth/authSlice';
import { AppDispatch, RootState } from '@/store';
import * as LabelPrimitive from '@radix-ui/react-label';
import {
  RiEyeLine,
  RiEyeOffLine,
  RiLock2Line,
  RiMailLine,
} from '@remixicon/react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';

import { myProfileResponse } from '@/utils/api-types/auth';
import * as Checkbox from '@/components/ui/checkbox';
import * as Divider from '@/components/ui/divider';
import * as FancyButton from '@/components/ui/fancy-button';
import * as Input from '@/components/ui/input';
import * as Label from '@/components/ui/label';

function PasswordInput(
  props: React.ComponentPropsWithoutRef<typeof Input.Input>,
) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input.Root>
      <Input.Wrapper>
        <Input.Icon as={RiLock2Line} />
        <Input.Input
          type={showPassword ? 'text' : 'password'}
          placeholder='••••••••••'
          {...props}
        />
        <button type='button' onClick={() => setShowPassword((s) => !s)}>
          {showPassword ? (
            <RiEyeOffLine className='size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300' />
          ) : (
            <RiEyeLine className='size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300' />
          )}
        </button>
      </Input.Wrapper>
    </Input.Root>
  );
}

export default function PageLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLogin, setKeepLogin] = useState(false);
  const isMountedRef = useRef(true);
  const profileFetchCountRef = useRef(0);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, user } = useSelector(
    (state: RootState) =>
      state.auth as {
        loading: boolean;
        error: string | null;
        success: boolean;
        user: any;
      },
  );
  const router = useRouter();
  const t = useTranslations('auth');
  const params = useParams();
  const locale = params.locale as string;

  // Separate useEffect for profile fetching
  useEffect(() => {
    const fetchProfile = async () => {
      if (
        user?.status === 'success' &&
        success &&
        profileFetchCountRef.current < 2
      ) {
        profileFetchCountRef.current += 1;

        try {
          const profileResult = (await dispatch(
            getMyProfile(),
          ).unwrap()) as myProfileResponse;

          if (profileResult.data) {
            setTimeout(() => {
              router.push(`/${locale}`);
            }, 1500);
          } else {
            router.push(`/${locale}`);
          }
        } catch (error) {
          if (isMountedRef.current) {
            router.push(`/${locale}`);
          }
        }
      } else if (
        user?.status === 'success' &&
        success &&
        profileFetchCountRef.current >= 2
      ) {
      }
    };

    fetchProfile();
  }, [success, user, dispatch, locale]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginUser({ email, password, keep_login: keepLogin }));
  };

  return (
    <>
      <div className='flex flex-col items-center gap-2'>
        <div className='flex size-[68px] shrink-0 items-center justify-center lg:size-16'>
          <Image
            src='/images/raff-logo-artboard-two.png'
            alt='raff-logo'
            width={68}
            height={68}
            className='w-full h-full object-cover'
            priority
          />
        </div>
        <div className='space-y-1 text-center'>
          <div className='text-title-h6 lg:text-title-h5'>
            {t('loginToYourAccount')}
          </div>
          <div className='text-paragraph-sm text-text-sub-600 lg:text-paragraph-md'>
            {t('enterDetailsToLogin')}
          </div>
        </div>
      </div>

      <Divider.Root variant='line-text'>{t('or')}</Divider.Root>

      <form onSubmit={handleLogin} className='space-y-3'>
        <div className='space-y-1'>
          <Label.Root htmlFor='email'>
            {t('emailAddress')} <Label.Asterisk />
          </Label.Root>
          <Input.Root>
            <Input.Wrapper>
              <Input.Icon as={RiMailLine} />
              <Input.Input
                id='email'
                type='email'
                placeholder='hello@alignui.com'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Input.Wrapper>
          </Input.Root>
        </div>

        <div className='space-y-1'>
          <Label.Root htmlFor='password'>
            {t('password')} <Label.Asterisk />
          </Label.Root>
          <PasswordInput
            id='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-start gap-2'>
            <Checkbox.Root
              id='agree'
              checked={keepLogin}
              onCheckedChange={(val) => setKeepLogin(val === true)}
            />
            <LabelPrimitive.Root
              htmlFor='agree'
              className='block cursor-pointer text-paragraph-sm'
            >
              {t('keepMeLoggedIn')}
            </LabelPrimitive.Root>
          </div>
        </div>

        <div
          className={`relative group ${
            loading || !email || !password
              ? 'cursor-not-allowed'
              : 'hover:cursor-pointer'
          }`}
        >
          <FancyButton.Root
            variant='customRed'
            size='medium'
            type='submit'
            disabled={loading || !email || !password}
            className='w-full'
          >
            {loading ? t('login') + '...' : t('login')}
          </FancyButton.Root>
          {(loading || !email || !password) && (
            <div className='pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-black text-white text-xs rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10'>
              Please fill required fields
            </div>
          )}
        </div>
      </form>
    </>
  );
}
