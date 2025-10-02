import React, { useEffect } from 'react';
import SimpleBar from 'simplebar-react';
import './BodyScrollbar.scss';

interface BodyScrollbarProps {
  children: React.ReactNode;
  isScrollbarHidden: boolean;
}

export default function BodyScrollbar({
  children,
  isScrollbarHidden,
}: BodyScrollbarProps) {
  useEffect(() => {
    // 最悪すぎる解決法
    const timeout = setTimeout(() => {
      document
        .querySelector('.simplebar-content-wrapper')
        ?.setAttribute('tabindex', '-1');
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <SimpleBar
      className="body-scrollbar"
      classNames={
        isScrollbarHidden
          ? {
              track: 'simplebar-track body-scrollbar-track hidden',
            }
          : undefined
      }
      autoHide={true}
      forceVisible="y"
    >
      {children}
    </SimpleBar>
  );
}
