'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';

import { cn } from '@/utils/cn';
import * as DotStepper from '@/components/ui/dot-stepper';
import { ThemedImage } from '@/components/themed-image';
import { AuthPattern } from '@/components/auth/auth-pattern';
import { useAuthSlider } from '@/src/hooks/useAuthSlider';

const MThemedImage = motion(ThemedImage);

type CardDeckSliderProps = {
  slides: {
    image: {
      default: string;
      dark?: string;
    };
    title: string;
    description: string;
  }[];
};

export default function CardDeckSlider({ slides }: CardDeckSliderProps) {
  const {
    currentSlide,
    hasMounted,
    sliderRef,
    instanceRef,
    moveToIdx,
    getSlideStyle,
  } = useAuthSlider(slides.length);

  return (
    <TabsPrimitive.Root
      value={`${currentSlide}`}
      onValueChange={(v) => moveToIdx(Number.parseInt(v))}
      className='flex size-full flex-col items-center justify-center pb-10 pt-20'
    >
      {/* cards */}
      <div className='relative flex w-full justify-center py-[120px]'>
        <AuthPattern />
        <div className='relative h-[380px] w-[352px]'>
          <div className='absolute bottom-0 left-1/2 h-2 w-[280px] -translate-x-1/2 translate-y-full rounded-b-full bg-bg-soft-200' />
          <div ref={sliderRef} className='absolute size-full'>
            {slides.map(({ image }, i) => {
              const { scale, zIndex, opacity } = getSlideStyle(i);
              const isActive = i === currentSlide;

              return (
                <MThemedImage
                  key={image.default}
                  src={image.default}
                  srcDark={image.dark}
                  className={cn(
                    'absolute h-auto w-full origin-bottom cursor-grab touch-none rounded-2xl object-contain',
                    {
                      'shadow-regular-xs': isActive,
                      'pointer-events-none': !isActive,
                    },
                  )}
                  style={{ zIndex: zIndex as number } as any}
                  animate={{
                    scale,
                    opacity,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.63, 0.44, 0.87],
                  }}
                  drag={isActive ? 'y' : false}
                  dragConstraints={{
                    top: 0,
                    bottom: 0,
                  }}
                  onDragEnd={() => instanceRef.current?.next()}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* texts */}
      <div className='w-full max-w-[624px] px-5 text-center'>
        <motion.div
          key={currentSlide}
          initial={{ opacity: hasMounted ? 0 : 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className='text-title-h5'>{slides[currentSlide].title}</h3>
          <p className='mt-2 min-h-12 text-paragraph-md text-text-sub-600'>
            {slides[currentSlide].description}
          </p>
        </motion.div>
      </div>

      {/* dots */}
      <div className='mt-12'>
        <DotStepper.Root asChild>
          <TabsPrimitive.List>
            {Array.from({ length: slides.length }, (_, i) => (
              <DotStepper.Item key={i} active={i === currentSlide} asChild>
                <TabsPrimitive.Trigger
                  value={`${i}`}
                  className={cn(
                    'w-3 h-3 rounded-full transition-all duration-300 ease-in-out',
                    i === currentSlide ? 'bg-[#EF4F54] !bg-[#EF4F54]' : 'bg-[#d3d3d3] !bg-[#d3d3d3]'
                  )}
                />
              </DotStepper.Item>
            ))}
          </TabsPrimitive.List>
        </DotStepper.Root>
      </div>
    </TabsPrimitive.Root>
  );
}
