import React from 'react';
import { usePhoto, RefreshPhotoLink } from 'components/Background';

import './Footer.scss';
import { StockPrice } from 'components/StockPrice';

export default function Footer() {
  const photo = usePhoto();

  return (
    <footer>
      <div className="d-flex justify-content-between align-items-end">
        <div id="quote">
          <StockPrice symbol="SHOP" />
        </div>
        <div id="credits">
          <h1 className="heading--5">{photo.title}</h1>
          <p className="body-text">
            Photo by{' '}
            <a href={`https://burst.shopify.com/${photo.credits.handle}`}>
              {photo.credits.name}
            </a>
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center sep">
        <RefreshPhotoLink id="refresh-btn">Refresh photo</RefreshPhotoLink>
        <a id="burst-link" href="https://burst.shopify.com">
          Download free photos from Burst &nbsp;{' '}
          <i className="fas fa-arrow-right" />
        </a>
      </div>
    </footer>
  );
}
