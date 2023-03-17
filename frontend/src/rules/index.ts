import { useLayoutEffect, useState } from 'react';

export function useWindowSize(): number[] {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize(): void {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return (): void => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

//____________________адаптивные шрифты

export const FS14 = 'clamp(0.625rem, 0.4375rem + 0.8333vw, 0.875rem)';
export const FS16 = 'clamp(0.75rem, 0.4688rem + 1.2500vw, 1rem)';
export const FS18 = 'clamp(0.75rem, 0.4688rem + 1.2500vw, 1.125rem)';
export const FS18forCards = 'clamp(0.75rem, 0.6033rem + 0.6522vw, 1.125rem)';
export const sideBarFS18 = ' clamp(0.75rem, 0.1731rem + 1.1538vw, 1.125rem)';
export const FS24 = 'clamp(0.875rem, 0.4063rem + 2.0833vw, 1.5rem)';
export const FS24forCards = 'clamp(0.875rem, 0.6304rem + 1.0870vw, 1.5rem)';
export const uploadTextFS24 = 'clamp(1.125rem, 0.7500rem + 0.7500vw, 1.5rem)';
export const FS48 = 'clamp(1rem, -0.5000rem + 6.6667vw, 3rem)';
export const FS72 = 'clamp(1.125rem, -0.1957rem + 5.8696vw, 4.5rem)';

export const lineHeightFS86 = 'clamp(4rem, -0.5625rem + 5.9375vw, 5.375rem)';

//__________адаптивные шрифты для мобильных устройств (с 960px до 360px)

export const MobileFS18 = 'clamp(0.813rem, 0.6258rem + 0.8320vw, 1.125rem)'; // 18 -> 13
export const MobileFS20 = 'clamp(0.875rem, 0.6500rem + 1.0000vw, 1.25rem)'; // 20 -> 14
export const MobileFS24 = 'clamp(1rem, 0.7000rem + 1.3333vw, 1.5rem)'; // 24 -> 16
export const MobileFS28 = 'clamp(1.125rem, 0.7500rem + 1.6667vw, 1.75rem)'; // 28 -> 18
export const MobileFS48 = 'clamp(1.5rem, 0.6750rem + 3.6667vw, 2.875rem)'; // 48 -> 24
