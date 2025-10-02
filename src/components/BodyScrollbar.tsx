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
      if (isScrollbarHidden) {
        document
          .querySelectorAll('.body-scrollbar-content-wrapper')
          .forEach((element) => {
            element.setAttribute('tabindex', '-1');
          });
      } else {
        document
          .querySelectorAll('.body-scrollbar-content-wrapper')
          .forEach((element) => {
            element.setAttribute('tabindex', '1');
          });
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [isScrollbarHidden]);

  return (
    <SimpleBar
      className="body-scrollbar"
      classNames={{
        contentWrapper:
          'simplebar-content-wrapper body-scrollbar-content-wrapper',
        track: `simplebar-track body-scrollbar-track${isScrollbarHidden ? ' hidden' : ''}`,
      }}
      autoHide={true}
      forceVisible="y"
    >
      {children}
    </SimpleBar>
  );
}
