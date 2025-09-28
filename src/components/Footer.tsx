import type { JSX } from 'react';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import { XIcon, FacebookIcon } from 'react-share';
import './Footer.scss';

export default function Footer(): JSX.Element {
  const shareUrl = window.location.href;
  const shareTitle = 'クソネミの世界を探索しよう #nemusugi';

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="share-button">
          <div className="share-network">
            <TwitterShareButton
              url={shareUrl}
              title={shareTitle}
              className="share-network__button"
            >
              <XIcon size={24} round />
            </TwitterShareButton>
          </div>
          <div className="share-network">
            <FacebookShareButton
              url={shareUrl}
              className="share-network__button"
            >
              <FacebookIcon size={24} round />
            </FacebookShareButton>
          </div>
        </div>
        <div className="footer-text">
          <div className="jost-light">#nemusugi / designed by yuinore</div>
          <div className="footer-text-hover-container">
            <div className="jost-light-italic footer-text-hover-foreground">
              Notice: This is a fact-based parody website.
            </div>
            <div className="noto-sans-jp-thin footer-text-hover-background">
              注：このサイトは事実を基にしたジョークサイトです。
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
