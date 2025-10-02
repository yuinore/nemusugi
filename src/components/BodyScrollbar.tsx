import React from 'react';
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
      autoHide={false}
      forceVisible="y"
    >
      {children}
    </SimpleBar>
  );
}
