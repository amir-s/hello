import React from 'react';
import { usePhoto } from 'components/Background';

import './Footer.scss';
import { StockPrice } from 'components/StockPrice';

export default function Footer() {
  const photo = usePhoto();

  const location = photo.description.location ? (
    <span id="location">
      | <i className="fas fa-map-marker-alt" /> {photo.description.location}
    </span>
  ) : null;

  const description = photo.description.photographer ? (
    <span>
      Photo by <a href={photo.link}>{photo.description.photographer}</a>
    </span>
  ) : null;

  const source = photo.description.source ? <span>{photo.description.source}</span> : null;

  return (
    <footer>
      <div className="d-flex justify-content-between align-items-end">
        <div id="quote">
          <StockPrice symbol="SHOP" />
        </div>
        <div id="credits">
          <h1 className="heading--5">{photo.title}</h1>
          <p className="body-text" id="photographer">
            {description}
            {location}
          </p>
          <p className="body-text" id="location" />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center sep">
        <div id="refresh-btn" />
        <a id="burst-link" href={photo.link}>
          {photo.description.title} - {source}
        </a>
      </div>
    </footer>
  );
}
