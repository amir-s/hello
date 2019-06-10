import React, { useEffect } from 'react';
import { useStorage } from 'utilities/Storage';

export interface Props {
  symbol: string;
}

const API_KEY = 'pk_d8e6c3793f0743d3bef721a8b58bab8e';

const useStockPrice = (symbol: string, cacheTimeout: number = 30000) => {
  const [detail, setDetail] = useStorage(`stock-${symbol}`, {
    upatedAt: 0,
    price: '0',
    change: '0',
    changePercent: '0',
    sign: 0,
  });

  useEffect(() => {
    if (detail.upatedAt + cacheTimeout > new Date().getTime()) return;

    const updatePrice = async () => {
      const response = await fetch(
        `https://cloud.iexapis.com/stable/stock/${symbol.toUpperCase()}/quote?token=${API_KEY}`
      );
      const result = await response.json();
      console.log(result);
      const price = normalize(result['latestPrice']);
      const change = normalize(result['change'], true);
      const changePercent = normalize(Math.abs(100 * result['changePercent']));
      const sign = result['change'] < 0 ? -1 : result['change'] > 0 ? +1 : 0;
      setDetail({
        upatedAt: new Date().getTime(),
        price,
        change,
        changePercent,
        sign,
      });
    };

    updatePrice();
  }, [detail, setDetail, cacheTimeout, symbol]);

  return detail;
};

export default function StockPrice({ symbol }: Props) {
  const { price, change, changePercent, sign } = useStockPrice(symbol);
  return (
    <h5 className="heading--5 stock">
      <i className={`fas fa-angle-double-${sign < 0 ? 'down' : 'up'}`} />
      &nbsp;
      {symbol.toUpperCase()} {price}
      &nbsp;
      <small>
        USD {change} ({changePercent}%){' '}
      </small>
    </h5>
  );
}

const normalize = (value: string | number, signed: boolean = false) => {
  const isNegative = Number(value) < 0;
  const normalizedValue = Math.abs(Number(value)).toFixed(2);
  const positive = signed ? '+' : '';

  return `${isNegative ? '−' : positive}${normalizedValue}`;
};
