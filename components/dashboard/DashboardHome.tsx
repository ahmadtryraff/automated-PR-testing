'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import * as FancyButton from '@/components/ui/fancy-button';
import { RiArrowRightLine } from '@remixicon/react';
import { useParams } from 'next/navigation';

const handleCompleteProfile = () => {
  console.log('Complete Profile');
};

export default function DashboardHome() {
  const t = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="flex flex-col gap-5 p-6 max-w-[1400px] mx-auto">
      <div className="bg-[#FDEAEA] rounded-2xl p-6 flex flex-col gap-3 relative w-full" style={{ boxShadow: '0 2px 16px 0 rgba(239,79,84,0.06)' }}>
        <div className="text-title-h6 font-semibold text-lg">
          {(() => {
            const userName = localStorage.getItem('user-name') || '';
            const welcomeText = t('welcomeTitle', { name: userName });
            
            if (userName.length > 20) {
              return (
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <span>{t('welcomeTitle', { name: userName.substring(0, 20) + '...' })}</span>
                  <span className="text-sm text-gray-600 sm:hidden">
                    {userName}
                  </span>
                </div>
              );
            }
            
            return welcomeText;
          })()}
        </div>
        <div className="text-paragraph-md text-text-sub-600 text-base">{t('welcomeSubtitle')}</div>
        <div>
          <FancyButton.Root
            variant="customRed"
            size="medium"
            className="px-5 flex items-center gap-2 text-base"
            onClick={handleCompleteProfile}
          >
            {t('completeProfile')} <RiArrowRightLine className="ml-1 size-4" />
          </FancyButton.Root>
        </div>
        <img 
          src="/images/onboarding-dashboard/complete-profile-vector.svg" 
          alt={t('completeProfile')} 
          className={`w-20 absolute top-3 z-10 pointer-events-none select-none ${locale === 'ar' ? 'left-6' : 'right-6'}`} 
        />
      </div>
      {/* Top Row: 3 Cards */}
      <div className="grid grid-cols-3 gap-5">
        {/* Total Balance */}
        <div className="bg-white rounded-2xl p-6 flex flex-col justify-between min-h-[170px] shadow-sm border border-[#F3F3F3]">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#EAEAEA] bg-white mb-3">
            <img src="/icons/wallet-3-line.svg" alt={t('totalBalance')} className="w-6 h-6" />
          </span>
          <span className="text-[#232323] text-lg font-normal mb-1">{t('totalBalance')}</span>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-5xl font-bold text-[#232323]">6,240.28 ﷼</span>
            <span className="bg-[#F7C6CB] text-[#232323] text-sm font-semibold px-3 py-1 rounded-full">-2%</span>
          </div>
        </div>
        {/* Referral Link */}
        <div className="bg-white rounded-2xl p-6 flex flex-col justify-between min-h-[170px] shadow-sm border border-[#F3F3F3]">
          <span className="text-[#232323] text-lg font-bold mb-1">{t('shareReferral')}</span>
          <span className="text-[#B0B0B0] text-sm mb-2">{t('getRewards')}</span>
          <span className="text-[#232323] text-sm font-normal mb-1">{t('copyReferral')}</span>
          <div className="flex items-center gap-2">
            <input className="flex-1 px-3 py-2 border border-[#E0E0E0] rounded-lg bg-[#F8F8F8] text-sm" value="tryraff.com/ref/Gec3rs" readOnly />
            <button className="flex items-center gap-1 text-[#2D6BFF] text-sm font-medium px-0 py-0 bg-transparent shadow-none hover:underline">
              {t('copy')}
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><rect x="5" y="5" width="8" height="8" rx="2" stroke="#2D6BFF" strokeWidth="1.2"/><rect x="3" y="3" width="8" height="8" rx="2" fill="#fff" stroke="#2D6BFF" strokeWidth="1.2"/></svg>
            </button>
          </div>
        </div>
        {/* New Feature */}
        <div className="bg-[#F7F7F7] rounded-2xl p-6 flex flex-col justify-between min-h-[170px] shadow-sm border border-[#F3F3F3]">
          <div className="flex items-center justify-center mb-3">
            <span className="text-[#232323] text-lg font-bold text-center">{t('newFeature')}</span>
          </div>
          <div className="relative flex-1 flex items-center justify-center">
            <button className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[#E0E0E0] shadow-sm">
              <img src="/icons/arrow-left-s-line.svg" alt={t('prev')} className="w-4 h-4" />
            </button>
            <img src="/images/image.png" alt={t('featureImage')} className="w-20 h-20 object-contain mx-6" />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[#E0E0E0] shadow-sm">
              <img src="/icons/arrow-right-s-line.svg" alt={t('next')} className="w-4 h-4" />
            </button>
          </div>
          <button className="text-[#2D6BFF] font-semibold text-base mt-3 hover:underline">{t('exploreNow')}</button>
        </div>
      </div>
      {/* Middle Row: Horizontal Stats Bar */}
      <div className="bg-white rounded-2xl flex items-center justify-between px-6 py-4 shadow-sm border border-[#F3F3F3]">
        <div className="flex-1 flex items-center justify-between divide-x divide-[#EAEAEA]">
          {/* Income */}
          <div className="flex items-center flex-1 gap-3 px-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#EAEAEA] bg-white">
              <img src="/icons/arrow-right-up-fill.svg" alt={t('income')} className="w-5 h-5" />
            </span>
            <div className="flex flex-col justify-center">
              <span className="uppercase text-[#8C8C8C] text-[13px] font-medium tracking-widest mb-1">{t('income')}</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#232323]">96,000.00 ﷼</span>
                <span className="bg-[#D6F5E7] text-[#1FC16B] text-sm font-semibold px-3 py-1 rounded-full">+5%</span>
              </div>
            </div>
          </div>
          {/* Product */}
          <div className="flex items-center flex-1 gap-3 px-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#EAEAEA] bg-white">
              <img src="/icons/store-3-line.svg" alt={t('product')} className="w-5 h-5" />
            </span>
            <div className="flex flex-col justify-center">
              <span className="uppercase text-[#8C8C8C] text-[13px] font-medium tracking-widest mb-1">{t('product')}</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#232323]">96</span>
                <img src="/icons/arrow-right-up-line.svg" alt={t('up')} className="w-4 h-4" />
              </div>
            </div>
          </div>
          {/* Agreements */}
          <div className="flex items-center flex-1 gap-3 px-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#EAEAEA] bg-white">
              <img src="/icons/contract-line.svg" alt={t('agreements')} className="w-5 h-5" />
            </span>
            <div className="flex flex-col justify-center">
              <span className="uppercase text-[#8C8C8C] text-[13px] font-medium tracking-widest mb-1">{t('agreements')}</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#232323]">24</span>
                <img src="/icons/arrow-right-up-line.svg" alt={t('up')} className="w-4 h-4" />
              </div>
            </div>
          </div>
          {/* Order */}
          <div className="flex items-center flex-1 gap-3 px-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#EAEAEA] bg-white">
              <img src="/icons/shopping-bag-3-line.svg" alt={t('order')} className="w-5 h-5" />
            </span>
            <div className="flex flex-col justify-center">
              <span className="uppercase text-[#8C8C8C] text-[13px] font-medium tracking-widest mb-1">{t('order')}</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#232323]">14</span>
                <img src="/icons/arrow-right-up-line.svg" alt={t('up')} className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Row: Map and Needed Action */}
      <div className="grid grid-cols-5 gap-5">
        {/* Raff Map */}
        <div className="col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-[#F3F3F3] flex flex-col min-h-[370px] relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#232323] text-xl font-medium">{t('raffMap')}</span>
            <span className="flex items-center gap-2 bg-white rounded-xl px-3 py-1 text-xs font-medium text-[#222] border border-[#E0E0E0]">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#6DA544]">
                <img src="/images/KSA.svg" alt={t('ksa')} className="w-4 h-4" />
              </span>
              <span className="text-[#232323] font-medium text-sm">{t('ksa')}</span>
              <span className="text-[#B0B0B0] font-normal text-sm">(4)</span>
            </span>
          </div>
          <div className="bg-white border border-[#E0E0E0] rounded-xl px-6 py-2 flex items-center justify-center gap-4 mb-4">
            <span className="text-[#B0B0B0] text-sm font-normal">{t('retailers')} <span className="font-medium text-[#232323]">10 {t('locations')}</span></span>
            <span className="w-1.5 h-1.5 bg-[#E0E0E0] rounded-full"></span>
            <span className="text-[#B0B0B0] text-sm font-normal">{t('avgSales')} <span className="font-medium text-[#232323]">10,000.00 SAR/Mo.</span></span>
            <span className="w-1.5 h-1.5 bg-[#E0E0E0] rounded-full"></span>
            <span className="text-[#B0B0B0] text-sm font-normal">{t('orders')} <span className="font-medium text-[#232323]">500 {t('order')}</span></span>
          </div>
          <div className="flex-1 flex items-center justify-center relative">
            <img src="/images/red-map-dummy.png" alt={t('raffMap')} className="w-full h-56 object-contain" />
            {/* Zoom Controls */}
            <div className="absolute left-3 bottom-3 flex flex-col gap-2">
              <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#E0E0E0] bg-white text-lg font-bold text-[#5C5C5C]">+</button>
              <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#E0E0E0] bg-white text-lg font-bold text-[#5C5C5C]">-</button>
            </div>
            {/* Navigation Controls */}
            <button className="absolute right-3 bottom-3 w-7 h-7 flex items-center justify-center rounded-lg border border-[#E0E0E0] bg-white">
              <img src="/images/expand-left-right-line.svg" alt={t('navigate')} className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Needed Action List */}
        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-[#F3F3F3] flex flex-col min-h-[370px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center">
                <img src="/images/refund-2-line.svg" alt={t('neededAction')} className="w-8 h-8" />
              </span>
              <span className="text-[#232323] text-xl font-bold">{t('neededAction')}</span>
            </div>
            <button className="px-4 py-1 bg-[#F5F5F5] rounded-xl text-[#5C5C5C] text-base font-medium border border-[#E0E0E0]">{t('seeAll')}</button>
          </div>
          <div className="flex flex-col gap-4">
            {/* Task 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#E0E0E0] bg-white">
                  <img src="/images/bank-line.svg" alt={t('taskName')} className="w-6 h-6" />
                </span>
                <div>
                  <div className="text-base font-semibold text-[#232323]">{t('taskName')}</div>
                  <div className="text-sm text-[#B0B0B0] truncate max-w-[160px]">{t('taskDescription')}</div>
                </div>
              </div>
              <button className="flex items-center gap-1 text-[#2D6BFF] text-base font-semibold">{t('takeAction')} <span className="text-lg">&#8594;</span></button>
            </div>
            {/* Task 2 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#E0E0E0] bg-white">
                  <img src="/images/line-chart-line.svg" alt={t('taskName')} className="w-6 h-6" />
                </span>
                <div>
                  <div className="text-base font-semibold text-[#232323]">{t('taskName')}</div>
                  <div className="text-sm text-[#B0B0B0] truncate max-w-[160px]">{t('paymentFromStock')}</div>
                </div>
              </div>
              <button className="flex items-center gap-1 text-[#2D6BFF] text-base font-semibold">{t('takeAction')} <span className="text-lg">&#8594;</span></button>
            </div>
            {/* Task 3 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E6F9F0]">
                  <img src="/images/home-smile-fill.svg" alt={t('taskName')} className="w-6 h-6" />
                </span>
                <div>
                  <div className="text-base font-semibold text-[#232323]">{t('taskName')}</div>
                  <div className="text-sm text-[#B0B0B0] truncate max-w-[160px]">{t('taskDescription')}</div>
                </div>
              </div>
              <button className="flex items-center gap-1 text-[#2D6BFF] text-base font-semibold">{t('takeAction')} <span className="text-lg">&#8594;</span></button>
            </div>
            {/* Task 4 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#E0E0E0]">
                  <img src="/images/Mastercard.svg" alt={t('taskName')} className="w-6 h-6" />
                </span>
                <div>
                  <div className="text-base font-semibold text-[#232323]">{t('taskName')}</div>
                  <div className="text-sm text-[#B0B0B0] truncate max-w-[160px]">{t('refundOrder')}</div>
                </div>
              </div>
              <button className="flex items-center gap-1 text-[#2D6BFF] text-base font-semibold">{t('takeAction')} <span className="text-lg">&#8594;</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
