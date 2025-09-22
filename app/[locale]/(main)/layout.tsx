import Sidebar from '../../(main)/sidebar';
import HeaderMobile from '../../(main)/header-mobile';
import { SearchMenu } from '@/components/search';
import { MainLayoutClient } from './main-layout-client';

export default function MainLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <div className='grid min-h-screen grid-cols-1 content-start items-start lg:grid-cols-[auto,minmax(0,1fr)]'>
      <Sidebar />
      <HeaderMobile />
      <div className='mx-auto flex w-full max-w-[1360px] flex-1 flex-col'>
        <MainLayoutClient>
          {children}
        </MainLayoutClient>
      </div>
      <SearchMenu />
    </div>
  );
} 
