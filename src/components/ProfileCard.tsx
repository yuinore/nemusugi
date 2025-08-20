import type { JSX } from 'react';
import type { Profile } from '@src/types/Profile';
import './ProfileCard.scss';

interface Props {
  profile: Profile;
}

export default function ProfileCard({ profile }: Props): JSX.Element {
  return (
    <div className="profile-card">
      <div className="profile-image-container">
        <a href={profile.href} target="_blank" rel="noopener noreferrer">
          <img src={`/images/${profile.image}`} alt={`${profile.name} のプロフィール画像`} className="profile-image" />
        </a>
      </div>
      <div className="profile-name">
        <span className="jost-light">{profile.name}</span>
      </div>
    </div>
  );
}
