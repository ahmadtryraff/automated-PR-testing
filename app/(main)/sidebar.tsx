'use client';

import * as React from 'react';
import { useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { logout } from '@/src/features/auth/authSlice';
import { RootState } from '@/store';
import {
  RiArrowRightSLine,
  RiCalendarLine,
  RiChat1Line,
  RiEqualizerLine,
  RiFileCloudLine,
  RiFoldersLine,
  RiGroupLine,
  RiHeadphoneLine,
  RiLayoutGridLine,
  RiSettings2Line,
  RiStarSmileLine,
  RiTimerLine,
} from '@remixicon/react';
import { useTranslations } from 'next-intl';
import { useHotkeys } from 'react-hotkeys-hook';
import { useDispatch, useSelector } from 'react-redux';

import { cn } from '@/utils/cn';
import { LABEL_COLORS } from '@/utils/consts';
import * as Divider from '@/components/ui/divider';
import * as Kbd from '@/components/ui/kbd';

type NavigationLink = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  disabled?: boolean;
};

export const navigationLinks: NavigationLink[] = [
  { icon: RiLayoutGridLine, label: 'common.dashboard', href: '/' },
  { icon: RiChat1Line, label: 'common.chat', href: '/chat' },
  { icon: RiGroupLine, label: 'common.teams', href: '/teams' },
  {
    icon: RiEqualizerLine,
    label: 'common.integrations',
    href: '/integrations',
  },
  {
    icon: RiCalendarLine,
    label: 'common.calendar',
    href: '/calendar',
    disabled: true,
  },
  { icon: RiTimerLine, label: 'common.timeOff', href: '#', disabled: true },
  { icon: RiFoldersLine, label: 'common.projects', href: '#', disabled: true },
  {
    icon: RiStarSmileLine,
    label: 'common.benefits',
    href: '#',
    disabled: true,
  },
  {
    icon: RiFileCloudLine,
    label: 'common.documents',
    href: '#',
    disabled: true,
  },
];

export const favoriteLinks = [
  {
    href: '#',
    color: 'purple',
    projectName: 'Loom Mobile App',
    shortcut: (
      <>
        <span className='text-xs font-mono'>⌘</span>1
      </>
    ),
  },
  {
    href: '#',
    color: 'red',
    projectName: 'Monday Redesign',
    shortcut: (
      <>
        <span className='text-xs font-mono'>⌘</span>2
      </>
    ),
  },
  {
    href: '#',
    color: 'pink',
    projectName: 'Udemy Courses',
    shortcut: (
      <>
        <span className='text-xs font-mono'>⌘</span>3
      </>
    ),
  },
];

function useCollapsedState(): {
  collapsed: boolean;
  sidebarRef: React.RefObject<HTMLDivElement>;
} {
  const [collapsed, setCollapsed] = React.useState(false);
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  useHotkeys(
    ['ctrl+b', 'meta+b'],
    () => setCollapsed((prev) => !prev),
    { preventDefault: true },
    [collapsed],
  );

  React.useEffect(() => {
    if (!sidebarRef.current) return;

    const elementsToHide = sidebarRef.current.querySelectorAll(
      '[data-hide-collapsed]',
    );

    const listeners: { el: Element; listener: EventListener }[] = [];

    elementsToHide.forEach((el) => {
      const hideListener = () => {
        el.classList.add('hidden');
        el.classList.remove('transition', 'duration-300');
      };

      const showListener = () => {
        el.classList.remove('transition', 'duration-300');
      };

      if (collapsed) {
        el.classList.add('opacity-0', 'transition', 'duration-300');
        el.addEventListener('transitionend', hideListener, { once: true });
        listeners.push({ el, listener: hideListener });
      } else {
        el.classList.add('transition', 'duration-300');
        el.classList.remove('hidden');
        setTimeout(() => {
          el.classList.remove('opacity-0');
        }, 1);
        el.addEventListener('transitionend', showListener, { once: true });
        listeners.push({ el, listener: showListener });
      }
    });

    return () => {
      listeners.forEach(({ el, listener }) => {
        el.removeEventListener('transitionend', listener);
      });
    };
  }, [collapsed]);

  return { collapsed, sidebarRef };
}

function SidebarHeader({ collapsed }: { collapsed?: boolean }) {
  const t = useTranslations('common');
  const router = useRouter();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      if (typeof window !== 'undefined') {
        try {
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.clear();
          }

          dispatch(logout());
          router.push('/login');
        } catch (error) {
          dispatch(logout());
          router.push('/login');
        }
      }
    });
  };

  return (
    <div
      className={cn('flex flex-col items-start gap-2 px-5 pt-6 pb-2', {
        'px-2': collapsed,
      })}
    >
      <div className='flex items-center w-full gap-2'>
        <Image
          src='/icons/icon-header-logo.png'
          alt='Logo'
          width={48}
          height={48}
          className={cn('size-10', { 'size-8': collapsed })}
        />
        {!collapsed && (
          <div className='flex flex-col min-w-0 flex-1'>
            <span
              className='font-semibold text-label-md text-[#232323] leading-tight truncate'
              style={{ fontSize: '15px', lineHeight: '1.1' } as any}
              title={(() => {
                const subUserName = localStorage.getItem('sub-user-name');
                const accessType = localStorage.getItem('access-type') || 'N/A';
                if (
                  subUserName &&
                  subUserName.trim() !== '' &&
                  subUserName !== 'N/A'
                ) {
                  return (
                    subUserName.charAt(0).toUpperCase() + subUserName.slice(1)
                  );
                }
                return accessType.charAt(0).toUpperCase() + accessType.slice(1);
              })()}
            >
              {t('userName', {
                name: (() => {
                  const subUserName = localStorage.getItem('sub-user-name');
                  const accessType =
                    localStorage.getItem('access-type') || 'N/A';
                  if (
                    subUserName &&
                    subUserName.trim() !== '' &&
                    subUserName !== 'N/A'
                  ) {
                    return (
                      subUserName.charAt(0).toUpperCase() + subUserName.slice(1)
                    );
                  }
                  return (
                    accessType.charAt(0).toUpperCase() + accessType.slice(1)
                  );
                })(),
              })}
            </span>
          </div>
        )}
        <div className='ml-auto flex gap-2'>
          <button
            className='p-1 rounded hover:bg-bg-weak-50 transition flex items-center justify-center'
            style={{ padding: '2px' } as any}
          >
            <Image
              src='/icons/expand-up-down-line.svg'
              alt='Expand'
              width={20}
              height={20}
              className='size-5'
              style={{ width: 18, height: 18 } as any}
            />
          </button>
          <button
            className='p-1 rounded hover:bg-bg-weak-50 transition flex items-center justify-center'
            style={{ padding: '2px' } as any}
            onClick={handleLogout}
            disabled={isPending}
          >
            <Image
              src='/icons/logout-circle-r-line.svg'
              alt='Logout'
              width={20}
              height={20}
              className='size-5'
              style={{ width: 18, height: 18 } as any}
            />
          </button>
        </div>
      </div>
      {!collapsed && (
        <div className='w-full mt-3 mb-2 relative'>
          <span className='absolute left-3 top-1/2 -translate-y-1/2'>
            <Image
              src='/icons/search-2-line.svg'
              alt='Search'
              width={20}
              height={20}
              className='size-5'
              style={{ width: 18, height: 18 } as any}
            />
          </span>
          <input
            type='text'
            placeholder={t('search')}
            className='w-full rounded-lg border border-stroke-soft-200 pl-10 py-2 text-paragraph-md outline-none placeholder:text-[#A4A4A4] bg-bg-white-0'
          />
        </div>
      )}
    </div>
  );
}

function SectionHeading({
  children,
  collapsed,
}: {
  children: React.ReactNode;
  collapsed: boolean;
}) {
  const t = useTranslations('common');
  return (
    <div
      className={cn(
        'p-1 text-subheading-xs uppercase text-text-soft-400 mt-2 mb-1',
        {
          '-mx-2.5 w-14 px-0 text-center': collapsed,
        },
      )}
    >
      {children}
    </div>
  );
}

function NavigationMenu({
  collapsed,
  onExploreClick,
}: {
  collapsed: boolean;
  onExploreClick: () => void;
}) {
  const t = useTranslations();
  const pathname = usePathname();
  const userType = useSelector((state: RootState) => state.auth.user?.type);
  const router = useRouter();

  const handleSalesClick = () => {
    if (typeof window !== 'undefined') {
      const accessType = localStorage.getItem('access-type');
      if (accessType === 'brand') {
        router.push('/sales-brand');
      } else if (accessType === 'vendor') {
        router.push('/sales-vendor');
      } else {
        router.push('/login');
      }
    }
  };
  const params = useParams();
  const locale = params?.locale as string;

  const accessType =
    typeof window !== 'undefined' ? localStorage.getItem('access-type') : null;
  let productsHref = '/products';
  if (accessType === 'brand') productsHref = '/brand-products';
  else if (accessType === 'vendor') productsHref = '/vendor-products';

  return (
    <div className='space-y-6'>
      <div className='space-y-1 mb-2'>
        <SidebarLink
          collapsed={collapsed}
          href='/'
          label={t('common.dashboard')}
          icon={<RiLayoutGridLine className='size-5' />}
        />
      </div>
      <SectionHeading collapsed={collapsed}>
        {t('common.partnerRelations')}
      </SectionHeading>
      <div className='space-y-1'>
        <button
          type='button'
          className={cn(
            'group relative flex items-center gap-2 whitespace-nowrap rounded-lg py-2 text-text-sub-600 hover:bg-bg-weak-50',
            'transition duration-200 ease-out',
            {
              'w-9 px-2': collapsed,
              'w-full px-3': !collapsed,
            },
          )}
          onClick={onExploreClick}
        >
          <span className='size-5 shrink-0 flex items-center justify-center'>
            <Image
              src='/icons/space-ship-line.svg'
              alt={t('common.explore')}
              width={20}
              height={20}
              className='size-5'
              onError={(e) => {
                console.error('Failed to load space-ship icon');
                e.currentTarget.style.display = 'none';
              }}
            />
          </span>
          <div className='flex shrink-0 items-center gap-2' data-hide-collapsed>
            <div className='flex-1 text-label-sm'>{t('common.explore')}</div>
          </div>
        </button>
        <SidebarLink
          collapsed={collapsed}
          href='/agreements'
          label={t('common.agreements')}
          icon={
            <Image
              src='/icons/contract-line.svg'
              alt={t('common.agreements')}
              width={20}
              height={20}
              className='size-5'
            />
          }
        />
        <SidebarLink
          collapsed={collapsed}
          href='/sales'
          label={t('common.sales')}
          icon={
            <Image
              src='/icons/line-chart-line.svg'
              alt={t('common.sales')}
              width={20}
              height={20}
              className='size-5'
            />
          }
          onClick={handleSalesClick}
          isSalesLink={true}
        />
        <SidebarLink
          collapsed={collapsed}
          href='/chat'
          label={t('common.chat')}
          icon={
            <Image
              src='/icons/wechat-line.svg'
              alt={t('common.chat')}
              width={20}
              height={20}
              className='size-5'
            />
          }
        />
        <SidebarLink
          collapsed={collapsed}
          href='/orders'
          label={t('common.orders')}
          icon={
            <Image
              src='/icons/shopping-bag-3-line.svg'
              alt={t('common.orders')}
              width={20}
              height={20}
              className='size-5'
            />
          }
        />
      </div>
      <SectionHeading collapsed={collapsed}>
        {t('common.businessAssets')}
      </SectionHeading>
      <div className='space-y-1'>
        <SidebarLink
          collapsed={collapsed}
          href={productsHref}
          label={t('common.products')}
          icon={
            <Image
              src='/icons/box-3-line.svg'
              alt={t('common.products')}
              width={20}
              height={20}
              className='size-5'
            />
          }
        />
        <SidebarLink
          collapsed={collapsed}
          href='/inventory'
          label={t('common.inventory')}
          icon={
            <Image
              src='/icons/inbox-unarchive-line.svg'
              alt={t('common.inventory')}
              width={20}
              height={20}
              className='size-5'
            />
          }
        />
        <SidebarLink
          collapsed={collapsed}
          href='/shipping'
          label={t('common.shipping')}
          icon={
            <Image
              src='/icons/truck-line.svg'
              alt={t('common.shipping')}
              width={20}
              height={20}
              className='size-5'
            />
          }
        />
      </div>
      <SectionHeading collapsed={collapsed}>{t('common.more')}</SectionHeading>
      <div className='space-y-1'>
        <SidebarLink
          collapsed={collapsed}
          href='/profile-settings?tab=user-profile'
          label={t('common.profileSettings')}
          icon={
            <Image
              src='/icons/settings-4-line.svg'
              alt={t('common.profileSettings')}
              width={20}
              height={20}
              className='size-5'
            />
          }
        />
        <SidebarLink
          collapsed={collapsed}
          href='/action-center'
          label={t('common.actionCenter')}
          icon={
            <Image
              src='/icons/alarm-warning-line.svg'
              alt={t('common.actionCenter')}
              width={20}
              height={20}
              className='size-5'
            />
          }
        />
      </div>
    </div>
  );
}

function SidebarLink({
  collapsed,
  href,
  label,
  icon,
  onClick,
  isSalesLink,
}: {
  collapsed: boolean;
  href: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isSalesLink?: boolean;
}) {
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale as string;
  const localizedHref = href.startsWith('/') ? `/${locale}${href}` : href;

  // Special logic for sales link to highlight both sales routes
  let isActive =
    href === '/' ? pathname === '/' : pathname?.startsWith(localizedHref);
  if (isSalesLink) {
    isActive =
      pathname?.includes('/sales-vendor') || pathname?.includes('/sales-brand');
  }

  // Helper to color SVG or img icons
  const renderIcon = () => {
    if (React.isValidElement(icon)) {
      // If it's a RemixIcon (SVG React element)
      if (typeof icon.type === 'function') {
        return React.cloneElement(icon as React.ReactElement, {
          className: cn(
            (icon.props as any)?.className,
            isActive && 'text-[#EF4F54]',
          ),
        });
      }
      // If it's an <img> element
      if (icon.type === 'img') {
        return React.cloneElement(icon as React.ReactElement, {
          style: {
            ...((icon.props as any)?.style || {}),
            filter: isActive
              ? 'invert(38%) sepia(97%) saturate(749%) hue-rotate(325deg) brightness(97%) contrast(97%)'
              : undefined,
          },
        });
      }
    }
    // Fallback - just return the icon as is
    return icon;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Link
      href={localizedHref}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'group relative flex items-center gap-2 whitespace-nowrap rounded-lg py-2 text-text-sub-600 hover:bg-bg-weak-50',
        'transition duration-200 ease-out',
        'aria-[current=page]:bg-bg-weak-50',
        {
          'w-9 px-2': collapsed,
          'w-full px-3': !collapsed,
        },
      )}
      onClick={handleClick}
    >
      {/* Vertical accent bar for active link, outside the box */}
      {isActive && (
        <span
          className='absolute -left-3 top-2 bottom-2 w-1.5 rounded-r-full bg-[#EF4F54] z-10'
          aria-hidden='true'
        />
      )}
      <span className='size-5 shrink-0 flex items-center justify-center'>
        {renderIcon()}
      </span>
      <div
        className='flex w-[180px] shrink-0 items-center gap-2'
        data-hide-collapsed
      >
        <div className='flex-1 text-label-sm'>{label}</div>
        {isActive && <RiArrowRightSLine className='size-5 text-text-sub-600' />}
      </div>
    </Link>
  );
}

function Favs({ collapsed }: { collapsed: boolean }) {
  const t = useTranslations('common');
  return (
    <div className='space-y-2'>
      <div
        className={cn('p-1 text-subheading-xs uppercase text-text-soft-400', {
          '-mx-2.5 w-14 px-0 text-center': collapsed,
        })}
      >
        {t('favs')}
      </div>
      <div className='space-y-1'>
        {favoriteLinks.map((project, i) => (
          <Link
            key={i}
            href={project.href}
            className={cn(
              'group flex items-center gap-2 whitespace-nowrap rounded-lg py-2 text-text-sub-600 transition duration-200 ease-out hover:bg-bg-weak-50',
              {
                'w-9 px-2': collapsed,
                'w-full px-3': !collapsed,
              },
            )}
          >
            <div className='flex size-5 shrink-0 items-center justify-center'>
              <div className='size-3 rounded-full border-2 border-stroke-white-0 shadow-regular-sm'>
                <div
                  className={cn(
                    'size-2 rounded-full',
                    LABEL_COLORS[project.color as keyof typeof LABEL_COLORS].bg,
                  )}
                />
              </div>
            </div>

            <div
              className='flex w-[180px] shrink-0 items-center gap-2'
              data-hide-collapsed
            >
              <div className='flex-1 text-label-sm'>{project.projectName}</div>
              {project.shortcut && <Kbd.Root>{project.shortcut}</Kbd.Root>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SettingsAndSupport({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const t = useTranslations('common');

  const links = [
    {
      href: '/settings/general-settings',
      icon: RiSettings2Line,
      label: 'common.settings',
    },
    {
      href: '#',
      icon: RiHeadphoneLine,
      label: 'common.support',
      disabled: true,
    },
  ];

  return (
    <div className='mt-auto space-y-1.5'>
      {links.map(({ href, icon: Icon, label, disabled }, i) => {
        return (
          <Link
            key={i}
            href={href}
            aria-current={pathname?.startsWith(href) ? 'page' : undefined}
            aria-disabled={disabled}
            className={cn(
              'group relative flex items-center gap-2 whitespace-nowrap rounded-lg py-2 text-label-sm text-text-sub-600 transition duration-200 ease-out hover:bg-bg-weak-50',
              'aria-[current=page]:bg-bg-weak-50',
              'aria-[disabled]:pointer-events-none aria-[disabled]:opacity-50',
              {
                'w-9 px-2': collapsed,
                'w-full px-3': !collapsed,
              },
            )}
          >
            <div
              className={cn(
                'absolute top-1/2 h-5 w-1 origin-left -translate-y-1/2 rounded-r-full bg-primary-base transition duration-200 ease-out',
                {
                  '-left-[22px]': collapsed,
                  '-left-5': !collapsed,
                  'scale-100': pathname?.startsWith(href),
                  'scale-0': !pathname?.startsWith(href),
                },
              )}
            />
            <Icon
              className={cn(
                'size-5 shrink-0',
                'group-aria-[current=page]:text-primary-base',
              )}
            />
            <div
              className='flex w-[180px] shrink-0 items-center gap-2'
              data-hide-collapsed
            >
              <span className='flex-1'>{t(label.toLowerCase())}</span>
              {pathname === href && (
                <RiArrowRightSLine className='size-5 text-text-sub-600' />
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function UserProfile({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={cn('px-5 py-3', { 'px-2': collapsed })}>
      {/* <UserButton className={cn({ 'justify-center': collapsed })} /> */}
    </div>
  );
}

function SidebarDivider({ collapsed }: { collapsed: boolean }) {
  return (
    <div className='px-5'>
      <Divider.Root
        className={cn('transition-all duration-200 ease-out', {
          'w-10': collapsed,
        })}
      />
    </div>
  );
}

export default function Sidebar() {
  const { collapsed, sidebarRef } = useCollapsedState();
  const [exploreModalOpen, setExploreModalOpen] = React.useState(false);

  return (
    <>
      <div
        className={cn(
          'fixed left-0 top-0 z-40 rtl:right-0 rtl:left-auto hidden h-full overflow-hidden border-e border-stroke-soft-200 bg-bg-white-0 transition-all duration-300 ease-out lg:block',
          {
            'w-20': collapsed,
            'w-[272px]': !collapsed,
          },
        )}
      >
        <div
          ref={sidebarRef}
          className='flex h-full w-[272px] min-w-[272px] flex-col overflow-auto'
        >
          <SidebarHeader collapsed={collapsed} />

          <SidebarDivider collapsed={collapsed} />

          <div
            className={cn('flex flex-1 flex-col gap-5 pb-4 pt-5', {
              'px-[22px]': collapsed,
              'px-5': !collapsed,
            })}
          >
            <NavigationMenu
              collapsed={collapsed}
              onExploreClick={() => setExploreModalOpen(true)}
            />
          </div>

          <SidebarDivider collapsed={collapsed} />

          <UserProfile collapsed={collapsed} />
        </div>
      </div>

      <div
        className={cn('shrink-0', {
          'w-[272px]': !collapsed,
          'w-20': collapsed,
        })}
      />
    </>
  );
}
