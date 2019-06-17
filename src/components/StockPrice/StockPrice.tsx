import React, { useEffect } from 'react';
import { useStorage } from 'utilities/Storage';

export interface Props {
  symbol: string;
}

interface StockDetail {
  price: string;
  change: string;
  changePercentage: string;
  currency: string;
  symbol: string;
  market: string;
}

const useStockPrice = (symbol: string, cacheTimeout: number = 30000) => {
  const [detail, setDetail] = useStorage(`stock-${symbol}`, {
    upatedAt: 0,
    price: '0',
    change: '0',
    changePercentage: '0',
    currency: '',
    symbol: '',
    state: 'loading',
  });

  useEffect(() => {
    if (detail.upatedAt + cacheTimeout > new Date().getTime()) return;

    const updatePrice = async () => {
      try {
        const response = await fetch(`https://hello-data.amirs.dev/v1/stock/${symbol}`);
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
  }, [detail, setDetail, cacheTimeout, symbol]);

  return detail;
};

export default function StockPrice({ symbol }: Props) {
  const { state, price, change, changePercentage, currency, symbol: fetchedSymbol } = useStockPrice(symbol);

  const changeValue = Number(change);
  const sign = changeValue < 0 ? -1 : changeValue > 0 ? +1 : 0;

  const detail =
    state === 'loaded' ? (
      <small>
        {currency || 'USD'} {change.replace(/-/, '−')} ({changePercentage}%)
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
      {(fetchedSymbol || symbol).toUpperCase()} {priceDetail}
      &nbsp;
      {detail}
    </h5>
  );
}
