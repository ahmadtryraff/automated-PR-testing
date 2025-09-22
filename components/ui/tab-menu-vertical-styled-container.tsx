import {
  RiArrowRightSLine,
  RiContactsBookLine,
  RiShareForwardBoxLine,
  RiShareLine,
  RiUserLine,
  RiArrowLeftSLine,
} from '@remixicon/react';

import * as TabMenuVertical from '@/components/ui/tab-menu-vertical';
import { useTranslations, useLocale } from 'next-intl';

interface TabMenuItem {
  label: string;
  value: string;
  icon: React.ElementType;
}

interface TabMenuVerticalStyledContainerProps {
  items: TabMenuItem[];
}

export function TabMenuVerticalStyledContainer({
  items,
}: TabMenuVerticalStyledContainerProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const displayItems = isRTL ? [...items].reverse() : items;
  return (
    <div className='w-full max-w-[258px]' dir={isRTL ? 'rtl' : 'ltr'}>
      <div className='bg-bg-white-0 shadow-regular-xs ring-stroke-soft-200 rounded-2xl p-2.5 ring-1 ring-inset'>
        <h4
          className={`text-subheading-xs text-text-soft-400 mb-2 py-1 uppercase ${isRTL ? 'text-right pr-2' : 'text-left pl-2'}`}
        >
          {t('common.settings')}
        </h4>
        <TabMenuVertical.List className={isRTL ? 'flex flex-col-reverse items-end' : 'items-start'}>
          {displayItems.map(({ label, value, icon: Icon }) => (
            <TabMenuVertical.Trigger key={value} value={value}>
              <TabMenuVertical.Icon as={Icon} />
              {label}
              <TabMenuVertical.ArrowIcon as={isRTL ? RiArrowLeftSLine : RiArrowRightSLine} />
            </TabMenuVertical.Trigger>
          ))}
        </TabMenuVertical.List>
      </div>
    </div>
  );
}
