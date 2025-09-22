import { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { AUTH_SLIDER_SCALE_FACTOR } from '../constants/auth';

export function useAuthSlider(slidesCount: number) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: slidesCount,
    loop: true,
    initial: 0,
    drag: false,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const moveToIdx = (idx: number) => {
    instanceRef.current?.moveToIdx(idx);
  };

  const getSlideStyle = (index: number) => {
    const isActive = index === currentSlide;
    const isNext = index === (currentSlide + 1) % slidesCount;

    const zIndex = isActive ? 3 : isNext ? 2 : 1;
    const scale = isActive
      ? 1
      : isNext
        ? 1 - AUTH_SLIDER_SCALE_FACTOR
        : 1 - AUTH_SLIDER_SCALE_FACTOR * 2;

    return {
      zIndex,
      scale,
      opacity: !hasMounted && index > 0 ? 0 : 1,
    };
  };

  return {
    currentSlide,
    hasMounted,
    sliderRef,
    instanceRef,
    moveToIdx,
    getSlideStyle,
  };
} 