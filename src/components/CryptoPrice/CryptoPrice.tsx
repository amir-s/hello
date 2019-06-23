import React, { useEffect } from 'react';
import { useStorage } from 'utilities/Storage';

export interface Props {
  handle: string;
}

interface StockDetail {
  price: string;
  changePercentage: string;
  currency: string;
  name: string;
  symbol: string;
  logo: string;
}

const useCryptoPrice = (handle: string, cacheTimeout: number = 30000) => {
  const [detail, setDetail] = useStorage(`crypto-${handle}`, {
    upatedAt: 0,
    price: '',
    changePercentage: '',
    currency: '',
    name: '',
    symbol: '',
    logo: '',
    state: 'loading',
  });

  useEffect(() => {
    if (detail.upatedAt + cacheTimeout > new Date().getTime()) return;

    const updatePrice = async () => {
      try {
        const response = await fetch(`https://hello-data.amirs.dev/v1/crypto/${handle}`);
        const result = (await response.json()) as StockDetail;

        setDetail({
          ...result,
          upatedAt: new Date().getTime(),
          state: 'loaded',
        });
      } catch (_) {
        setDetail({
          ...detail,
          upatedAt: new Date().getTime(),
          state: detail.state === 'loading' ? 'error' : detail.state,
        });
      }
    };

    updatePrice();
  }, [detail, setDetail, cacheTimeout, handle]);

  return detail;
};

export default function CryptoPrice({ handle }: Props) {
  const { state, name, price, changePercentage, currency, symbol } = useCryptoPrice(handle);

  const changeValue = Number(changePercentage);
  const sign = changeValue < 0 ? -1 : changeValue > 0 ? +1 : 0;

  const detail =
    state === 'loaded' ? (
      <small>
        {currency || 'USD'} ({changePercentage.replace(/-/, '−')}%)
      </small>
    ) : null;

  const priceDetail =
    state === 'error' ? (
      <small>
        <i className="fas fa-exclamation-circle error-icon" />
      </small>
    ) : state === 'loading' ? (
      <small>
        <i className="fas fa-spinner fa-pulse" />
      </small>
    ) : (
      price
    );

  const icon = (
    <small>
      <i className={`fas fa-angle-${sign < 0 ? 'down' : 'up'} ${state === 'error' ? 'hide' : ''}`} />
    </small>
  );

  return (
    <h5 className="heading--5 stock">
      {icon}
      &nbsp;
      {(symbol || handle).toUpperCase()} {priceDetail}
      &nbsp;
      {detail}
    </h5>
  );
}
