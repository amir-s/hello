import React from 'react';
import { usePhoto, useUtils } from 'components/Background';

import './Footer.scss';
import { StockPrice } from 'components/StockPrice';

export default function Footer() {
  const photo = usePhoto();
  const { loading, changePhoto } = useUtils();

  const shuffle = () => {
    changePhoto(loading ? 'daily' : 'random');
  };

  const location = photo.description.location ? (
    <span id="location">
      | <i className="fas fa-map-marker-alt" /> {photo.description.location}
    </span>
  ) : null;

  const credit = photo.description.photographer ? (
    <span>
      Photo by <a href={photo.link}>{photo.description.photographer}</a>
    </span>
  ) : null;

  const source = photo.description.source ? <span> via {photo.description.source}</span> : null;
  const description = photo.title === photo.description.title ? '' : photo.description.title;

  const shuffleIcon = loading ? <i className="fas fa-spinner fa-pulse" /> : <i className="fas fa-random" />;
  return (
    <footer>
      <div className="d-flex justify-content-between align-items-end">
        <div id="quote">
          <StockPrice symbol="SHOP" />
        </div>
        <div id="credits">
          <h1 className="heading--5">{photo.title}</h1>
          <p className="body-text" id="photographer">
            {credit}
            {location}
          </p>
          <p className="body-text" id="location" />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center sep">
        <div id="refresh-btn" className={loading ? 'disabled' : ''} onClick={shuffle}>
          {shuffleIcon} Shuffle
        </div>
        <a id="burst-link" href={photo.link}>
          {description} {source}
        </a>
      </div>
    </footer>
  );
}
