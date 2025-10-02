import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './PopupScrollbar.scss';

interface PopupScrollbarProps {
  children: React.ReactNode;
}

export default function PopupScrollbar({ children }: PopupScrollbarProps) {
  return (
    <SimpleBar className="popup-scrollbar" autoHide={false} forceVisible="y">
      {children}
    </SimpleBar>
  );
}
