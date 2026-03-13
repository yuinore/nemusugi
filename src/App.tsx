import './App.scss';
import ProfileCard from '@src/components/ProfileCard';
import ThumbCard from '@src/components/ThumbCard';
import Footer from '@src/components/Footer';
import profiles from '@src/enum/Profiles';
import movies from '@src/enum/Movies';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useMemo, useState } from 'react';
import { useImageLoadTracker } from '@src/hooks/useImageLoadTracker';
import type { Movie } from '@src/types/Movie';
import PopupContainer from './components/PopupContainer';
import type { Profile } from './types/Profile';
import ProfileModal from './components/ProfileModal';
import VideoModal from './components/VideoModal';
import PauseToggleButton from './components/PauseToggleButton';
import ThumbExternalLinkCard from './components/ThumbExternalLinkCard';
import externalLinkCards from './enum/ExternalLinkCards';
import React from 'react';
import Contact from './components/Contact';

export default function App() {
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isProfilePopupActive, setIsProfilePopupActive] = useState(false);
  const [partyTime, setPartyTime] = useState(true);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);

  const sortedMovies = useMemo(
    () =>
      _.orderBy(
        movies,
        (movie: Movie) => dayjs(movie.published_at).format('YYYY-MM-DD'),
        'desc',
      ),
    [movies],
  );

  // 全ての画像ソースを収集（プロフィール画像 + 動画サムネイル + @2x画像）
  const allImageSources = useMemo(() => {
    const profileImages = profiles.flatMap((profile) => {
      return [profile.image, profile.image2x];
    });

    const movieImages = sortedMovies.flatMap((movie) => {
      return [movie.image, movie.image2x];
    });

    return [...profileImages, ...movieImages];
  }, [sortedMovies]);

  const { onImageLoad, onImageError, allImagesLoaded } =
    useImageLoadTracker(allImageSources);

  const handleMovieClick = (movie: Movie) => {
    if (movie.hrefEmbed) {
      setCurrentMovie(movie);
      setIsPopupActive(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupActive(false);
    setCurrentMovie(null);
  };

  const handleProfileClick = (profile: Profile) => {
    setIsProfilePopupActive(true);
    setCurrentProfile(profile);
  };

  const handleCloseProfilePopup = () => {
    setIsProfilePopupActive(false);
    setCurrentProfile(null);
  };

  const handlePartyTime = () => {
    setPartyTime(!partyTime);
  };

  const handlePauseToggle = () => {
    setPartyTime(!partyTime);
  };

  return (
    <div className="app">
      <div
        className="page"
        id="page"
        inert={isPopupActive || isProfilePopupActive}
      >
        <header className="header">
          <h1 className="title jost-light-italic">#nemusugi</h1>
          <div className="subtitle jost-light">
            I'm{' '}
            <span
              onClick={handlePartyTime}
              className={`party-time ${partyTime ? 'enabled' : ''}`}
            >
              crazy
            </span>{' '}
            sleepy.
          </div>
        </header>

        <main className="main" id="main">
          <section className="profiles-section">
            <div className="profiles-container">
              {profiles.map((profile) => (
                <ProfileCard
                  key={profile.name}
                  profile={profile}
                  onImageLoad={onImageLoad}
                  onImageError={onImageError}
                  onClick={handleProfileClick}
                />
              ))}
            </div>
          </section>

          <section className="movies-section">
            <h2 className="section-title jost-light-italic">- Works -</h2>
            <div className="movies-grid">
              {sortedMovies.map((movie: Movie, index: number) => (
                <React.Fragment key={index}>
                  <ThumbCard
                    // key={index}
                    movie={movie}
                    onImageLoad={onImageLoad}
                    onImageError={onImageError}
                    shouldLoadVideo={allImagesLoaded}
                    onClick={handleMovieClick}
                    isAnyPopupActive={isPopupActive || isProfilePopupActive}
                    forcePlay={partyTime}
                  />
                  {index === 7 && externalLinkCards.length >= 1 && (
                    <ThumbExternalLinkCard
                      externalLinkCard={externalLinkCards[0]}
                    />
                  )}
                </React.Fragment>
              ))}
              <ThumbCard isEmptySpacer={true} />
              <ThumbCard isEmptySpacer={true} />
              <ThumbCard isEmptySpacer={true} />
            </div>
          </section>
        </main>

        <section className="mission-section">
          <h2 className="section-title jost-light-italic">- Mission -</h2>
          <div className="mission-item jost-light">
            カワイイとモーショングラフィックスで世界を塗り尽くし、
            <br />
            人々が思い描いた夢と現実をコネクトします。
            <br />
          </div>
        </section>

        <section className="contact-section">
          <h2 className="section-title jost-light-italic">- Contact -</h2>
          <Contact />
        </section>

        <Footer />

        <PauseToggleButton isPaused={!partyTime} onClick={handlePauseToggle} />
      </div>
      <div className="popup-containers">
        <PopupContainer active={isPopupActive} onClose={handleClosePopup}>
          {currentMovie && currentMovie.hrefEmbed && (
            <VideoModal movie={currentMovie} onClose={handleClosePopup} />
          )}
        </PopupContainer>

        <PopupContainer
          active={isProfilePopupActive}
          onClose={handleCloseProfilePopup}
        >
          {currentProfile && (
            <ProfileModal
              profile={currentProfile}
              onClose={handleCloseProfilePopup}
            />
          )}
        </PopupContainer>
      </div>
    </div>
  );
}
