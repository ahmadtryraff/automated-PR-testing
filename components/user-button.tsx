'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { logout } from '@/src/features/auth/authSlice';
import {
  RiAddLine,
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiLayoutGridLine,
  RiLogoutBoxRLine,
  RiMoonLine,
  RiPulseLine,
  RiSettings2Line,
} from '@remixicon/react';
import { useTheme } from 'next-themes';
import { useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';

import { cn, cnExt } from '@/utils/cn';
import * as Avatar from '@/components/ui/avatar';
import * as Divider from '@/components/ui/divider';
import * as Dropdown from '@/components/ui/dropdown';
import * as Switch from '@/components/ui/switch';

export function UserButton({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      try {
        const { CometChatUIKit } = await import('@cometchat/chat-uikit-react');
        await CometChatUIKit.logout();
        console.log('CometChat user logged out');
      } catch (error) {
        console.error('CometChat logout failed:', error);
      }

      dispatch(logout());
      router.push(`/${locale}/login`);
    }
  };

  return (
    <Dropdown.Root>
      <Dropdown.Trigger
        className={cnExt(
          'flex w-full items-center gap-3 whitespace-nowrap rounded-10 p-3 text-left outline-none hover:bg-bg-weak-50 focus:outline-none',
          className,
        )}
      >
        <Avatar.Root size='40' color='yellow'>
          <Avatar.Image src='/images/avatar/illustration/sophia.png' alt='' />
        </Avatar.Root>
        <div
          className='flex w-[172px] shrink-0 items-center gap-3'
          data-hide-collapsed
        >
          <div className='flex-1 space-y-1'>
            <div className='flex items-center gap-0.5 text-label-sm'>
              {localStorage.getItem('user-name') || 'N/A'}
              
              <img src='/icons/icon-verified-fill.svg' alt='Verified' className='size-5 text-verified-base' />
            </div>
            <div className='text-paragraph-xs text-text-sub-600'>
              sarah@alignui.com
            </div>
          </div>

          <div className='flex size-6 items-center justify-center rounded-md'>
            <RiArrowRightSLine className='size-5 text-text-sub-600' />
          </div>
        </div>
      </Dropdown.Trigger>
      <Dropdown.Content side='right' sideOffset={24} align='end'>
        <Dropdown.Item
          onSelect={(e) => {
            e.preventDefault();
            setTheme(() => (theme === 'dark' ? 'light' : 'dark'));
          }}
        >
          <Dropdown.ItemIcon as={RiMoonLine} />
          {t('theme')}
          <span className='flex-1' />
          <Switch.Root checked={theme === 'dark'} />
        </Dropdown.Item>
        <Divider.Root variant='line-spacing' />
        <Dropdown.Group>
          <Dropdown.Item>
            <Dropdown.ItemIcon as={RiPulseLine} />
            {t('activity')}
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.ItemIcon as={RiLayoutGridLine} />
            {t('integrations')}
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.ItemIcon as={RiSettings2Line} />
            {t('settings')}
          </Dropdown.Item>
        </Dropdown.Group>
        <Divider.Root variant='line-spacing' />
        <Dropdown.Group>
          <Dropdown.Item>
            <Dropdown.ItemIcon as={RiAddLine} />
            {t('addAccount')}
          </Dropdown.Item>
          <Dropdown.Item onSelect={handleLogout}>
            <Dropdown.ItemIcon as={RiLogoutBoxRLine} />
            {t('logout')}
          </Dropdown.Item>
        </Dropdown.Group>
        <div className='p-2 text-paragraph-sm text-text-soft-400'>
          v.1.5.69 · {t('termsAndConditions')}
        </div>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}

export function UserButtonMobile({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    // 1. Log out from your app

    // 2. Log out from CometChat
    if (typeof window !== 'undefined') {
      try {
        const { CometChatUIKit } = await import('@cometchat/chat-uikit-react');
        await CometChatUIKit.logout();
        console.log('CometChat user logged out');
      } catch (error) {
        console.error('CometChat logout failed:', error);
      }

      dispatch(logout());

      // 3. Redirect to login
      router.push('/login');
    }
  };

  return (
    <Dropdown.Root modal={false}>
      <Dropdown.Trigger
        className={cnExt(
          'group flex w-full items-center gap-3 whitespace-nowrap rounded-10 p-3 text-left outline-none hover:bg-bg-weak-50 focus:outline-none',
          className,
        )}
      >
        <Avatar.Root size='48' color='yellow'>
          <Avatar.Image src='/images/avatar/illustration/sophia.png' alt='' />
        </Avatar.Root>
        <div className='flex-1 space-y-1'>
          <div className='flex items-center gap-0.5 text-label-md'>
            {localStorage.getItem('user-name') || 'N/A'}

            <img src='/icons/icon-verified-fill.svg' alt='Verified' className='size-5 text-verified-base' />
          </div>
          <div className='text-paragraph-sm text-text-sub-600'>
            sarah@alignui.com
          </div>
        </div>
        <div
          className={cn(
            'flex size-6 items-center justify-center rounded-md border border-stroke-soft-200 bg-bg-white-0 text-text-sub-600 shadow-regular-xs',
            // open
            'group-data-[state=open]:bg-bg-strong-950 group-data-[state=open]:text-text-white-0 group-data-[state=open]:shadow-none',
          )}
        >
          <RiArrowDownSLine className='size-5 group-data-[state=open]:-rotate-180' />
        </div>
      </Dropdown.Trigger>
      <Dropdown.Content side='top' align='end'>
        <Dropdown.Item
          onSelect={(e) => {
            e.preventDefault();
            setTheme(() => (theme === 'dark' ? 'light' : 'dark'));
          }}
        >
          <Dropdown.ItemIcon as={RiMoonLine} />
          Dark Mode
          <span className='flex-1' />
          <Switch.Root checked={theme === 'dark'} />
        </Dropdown.Item>
        <Divider.Root variant='line-spacing' />
        <Dropdown.Group>
          <Dropdown.Item>
            <Dropdown.ItemIcon as={RiPulseLine} />
            Activity
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.ItemIcon as={RiLayoutGridLine} />
            Integrations
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.ItemIcon as={RiSettings2Line} />
            Settings
          </Dropdown.Item>
        </Dropdown.Group>
        <Divider.Root variant='line-spacing' />
        <Dropdown.Group>
          <Dropdown.Item>
            <Dropdown.ItemIcon as={RiAddLine} />
            Add Account
          </Dropdown.Item>
          <Dropdown.Item onSelect={handleLogout}>
            <Dropdown.ItemIcon as={RiLogoutBoxRLine} />
            Logout
          </Dropdown.Item>
        </Dropdown.Group>
        <div className='p-2 text-paragraph-sm text-text-soft-400'>
          v.1.5.69 · Terms & Conditions
        </div>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
