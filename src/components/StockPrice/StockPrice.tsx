import React, { useEffect } from 'react';
import { useStorage } from 'utilities/Storage';

export interface Props {
  symbol: string;
}

const useStockPrice = (symbol: string, cacheTimeout: number = 30000) => {
  const [detail, setDetail] = useStorage(`stock-${symbol}`, {
    upatedAt: 0,
    price: '0',
    change: '0',
    changePercentage: '0',
    sign: 0,
    currency: '',
    symbol: '',
    state: 'loading',
  });

  useEffect(() => {
    if (detail.upatedAt + cacheTimeout > new Date().getTime()) return;

    const updatePrice = async () => {
      try {
        const response = await fetch(`https://hello-data.amirs.dev/v1/stock/${symbol}`);
        const result = await response.json();

        const sign = result['change'] < 0 ? -1 : result['change'] > 0 ? +1 : 0;

        setDetail({
          ...result,
          upatedAt: new Date().getTime(),
          sign,
          state: 'loaded',
        });
      } catch (_) {
        setDetail({
          ...detail,
          upatedAt: new Date().getTime(),
          state: 'error',
        });
      }
    };

    updatePrice();
  }, [detail, setDetail, cacheTimeout, symbol]);

  return detail;
};

export default function StockPrice({ symbol }: Props) {
  const { state, price, change, changePercentage, sign, currency, symbol: fetchedSymbol } = useStockPrice(symbol);

  const detail =
    state === 'loaded' ? (
      <small>
        {currency || 'USD'} {change.replace(/\-/, '−')} ({changePercentage}%)
      </small>
    ) : null;

  const priceDetail =
    state === 'error' ? (
      <small>---</small>
    ) : state === 'loading' ? (
      <small>
        <i className="fas fa-spinner fa-pulse" />
      </small>
    ) : (
      price
    );
  return (
    <h5 className="heading--5 stock">
      <i className={`fas fa-angle-${sign < 0 ? 'down' : 'up'}`} />
      &nbsp;
      {(fetchedSymbol || symbol).toUpperCase()} {priceDetail}
      &nbsp;
      {detail}
    </h5>
  );
}
