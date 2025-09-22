import { LanguageSelect } from '@/components/language-select';
import { useTranslations } from 'next-intl';

export default function AuthFooter() {
  const t = useTranslations('auth');
  return (
    <div className='-mx-2 mt-auto flex items-center justify-between gap-4 pb-4 lg:mx-0 lg:pb-0'>
      <div className='text-paragraph-sm text-text-sub-600'>
        {t('copyright')}
      </div>

      <LanguageSelect />
    </div>
  );
}
