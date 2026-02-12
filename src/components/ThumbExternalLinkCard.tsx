import type { JSX } from 'react';
import './ThumbCard.scss';
import type { ExternalLinkCard } from '@src/types/ExternalLinkCard';

interface Props {
  externalLinkCard: ExternalLinkCard;
}

export default function ThumbExternalLinkCard({
  externalLinkCard,
}: Props): JSX.Element {
  const content = (
    <ThumbExternalLinkCardContent externalLinkCard={externalLinkCard} />
  );

  return (
    <a
      href={externalLinkCard.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`thumb-card`}
      aria-label={externalLinkCard.title}
    >
      {content}
    </a>
  );
}

function ThumbExternalLinkCardContent({
  externalLinkCard,
}: {
  externalLinkCard: ExternalLinkCard;
}): JSX.Element {
  return (
    <>
      <div className="thumb-image-container">
        <img
          // retina にも対応
          src={externalLinkCard.image}
          srcSet={`${externalLinkCard.image} 1x, ${externalLinkCard.image2x} 2x`}
          alt={externalLinkCard.title}
          className="thumb-image"
        />
        <div className="thumb-info">
          <h3 className="thumb-title noto-sans-jp-regular">
            {externalLinkCard.title}
          </h3>
          <p className="thumb-description noto-sans-jp-thin">
            {externalLinkCard.description}
          </p>
        </div>
      </div>
    </>
  );
}
