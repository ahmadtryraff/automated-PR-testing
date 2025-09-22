'use client';

import * as React from 'react';
import { RiGlobalLine } from '@remixicon/react';
import { useRouter, usePathname } from 'next/navigation';
import * as Select from '@/components/ui/select';

const languages = [
  {
    value: 'en',
    label: 'Eng',
  },
  {
    value: 'ar',
    label: 'العربية',
  },
];

export function LanguageSelect({ ...props }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Select.Root
      defaultValue='en'
      variant='inline'
      {...props}
      onValueChange={(value) => {
        // Assumes the path starts with /en or /ar
        const segments = pathname.split('/');
        segments[1] = value; // replace the locale segment
        const newPath = segments.join('/') || '/';
        router.push(newPath);
      }}
    >
      <Select.Trigger>
        <Select.TriggerIcon as={RiGlobalLine} />
        <Select.Value placeholder='Select Language' />
      </Select.Trigger>
      <Select.Content>
        {languages.map((lang) => (
          <Select.Item key={lang.value} value={lang.value}>
            {lang.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
