import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

interface BodyScrollbarProps {
  children: React.ReactNode;
}

export default function BodyScrollbar({ children }: BodyScrollbarProps) {
  return (
    <SimpleBar
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
      }}
      autoHide={false}
      forceVisible="y"
    >
      {children}
    </SimpleBar>
  );
}
