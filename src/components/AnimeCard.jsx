import React from 'react';
import { useAnimeCardTilt } from '../hooks/useAnimeCardTilt';

/**
 * AnimeCard: Interactive card container utilizing Anime.js for 3D physics,
 * specular dynamic shine, and spring relaxation.
 */
export const AnimeCard = ({
  children,
  className = '',
  maxTilt = 7,
  scale = 1.02,
  glare = true,
  ...props
}) => {
  const cardRef = useAnimeCardTilt({ maxTilt, scale });

  return (
    <div className="perspective-1000 h-full w-full">
      <div
        ref={cardRef}
        className={`group relative preserve-3d transition-shadow duration-300 ${className}`}
        {...props}
      >
        {children}
        {glare && <div className="card-shine" aria-hidden="true" />}
      </div>
    </div>
  );
};

export default AnimeCard;
