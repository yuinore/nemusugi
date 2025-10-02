import React, { useEffect } from 'react';
import SimpleBar from 'simplebar-react';
import './PopupScrollbar.scss';

interface PopupScrollbarProps {
  children: React.ReactNode;
}

export default function PopupScrollbar({ children }: PopupScrollbarProps) {
  return (
    <SimpleBar
      className="popup-scrollbar"
      classNames={{
        contentWrapper:
          'simplebar-content-wrapper popup-scrollbar-content-wrapper',
        track: `simplebar-track popup-scrollbar-track`,
      }}
      autoHide={true}
      forceVisible="y"
    >
      {children}
    </SimpleBar>
  );
}
