import React, { useState, useRef } from 'react';
import { usePhoto, useUtils } from 'components/Background';

import './Footer.scss';
import { StockPrice } from 'components/StockPrice';
import { useStorage } from 'utilities/Storage';
import { CryptoPrice } from 'components/CryptoPrice';

export default function Footer() {
  const [watchList, setWatchList] = useStorage('stock-list', ['SHOP/nyse']);
  const [editing, setEditing] = useState(false);
  const [rawWatchList, setRawWatchList] = useState('');
  const input = useRef<any>();

  const photo = usePhoto();
  const { loading, changePhoto } = useUtils();

  const shuffle = () => {
    changePhoto(loading ? 'daily' : 'random');
  };

  const edit = () => {
    setRawWatchList(watchList.join(', '));
    setEditing(true);
    setTimeout(() => {
      if (input && input.current) input.current.focus();
    }, 5);
  };
  const save = () => {
    setWatchList(
      rawWatchList
        .split(',')
        .map(item => item.trim().toUpperCase())
        .filter(Boolean)
    );
    setEditing(false);
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
        <div id="stock-list">
          {editing && <i className="fas fa-save save-stock" onClick={save} />}
          {editing && (
            <input
              ref={input}
              className="input"
              type="text"
              value={rawWatchList}
              onChange={e => setRawWatchList(e.target.value)}
              onKeyPress={e => {
                e.key === 'Enter' && save();
              }}
              onBlur={save}
            />
          )}
          {!editing && <i className="fas fa-edit remove-stock" onClick={edit} />}
          {!editing &&
            watchList.map((symbol, index) => {
              if (symbol.startsWith('CRYPTO/')) {
                const handle = symbol.replace('CRYPTO/', '');
                return <CryptoPrice key={symbol + index} handle={handle} />;
              }
              return <StockPrice key={symbol + index} symbol={symbol} />;
            })}
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
