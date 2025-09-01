import type { JSX } from 'react';
import type { Profile } from '@src/types/Profile';
import './ProfileCard.scss';

interface Props {
  profile: Profile;
  onImageLoad: (imageSrc: string) => void;
  onImageError: (imageSrc: string) => void;
}

export default function ProfileCard({
  profile,
  onImageLoad,
  onImageError,
}: Props): JSX.Element {
  // 画像読み込み完了を追跡
  const handleImageLoad = () => {
    onImageLoad(profile.image);
    onImageLoad(profile.image2x);
  };

  const handleImageError = () => {
    onImageError(profile.image);
    onImageError(profile.image2x);
  };

  return (
    <div className="profile-card">
      <a
        className="profile-anchor"
        href={profile.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={profile.name}
      >
        <span className="profile-image-container">
          <img
            src={profile.image}
            srcSet={`${profile.image} 1x, ${profile.image2x} 2x`}
            alt={`${profile.name} のプロフィール画像`}
            className="profile-image"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </span>
      </a>
      <div className="profile-name">
        <span className="jost-light">{profile.name}</span>
      </div>
    </div>
  );
}
