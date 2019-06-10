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
  });

  useEffect(() => {
    if (detail.upatedAt + cacheTimeout > new Date().getTime()) return;

    const updatePrice = async () => {
      const response = await fetch(
        `https://cloud.iexapis.com/stable/stock/${symbol.toUpperCase()}/quote?token=${API_KEY}`
      );
      const result = await response.json();
      const price = Number(result['latestPrice']).toFixed(2);
      setDetail({
        upatedAt: new Date().getTime(),
        price,
      });
    };

    updatePrice();
  }, [detail, setDetail, cacheTimeout, symbol]);

  return detail;
};

export default function StockPrice({ symbol }: Props) {
  const { price } = useStockPrice(symbol);

  return (
    <h5 className="heading--5 stock">
      {symbol.toUpperCase()} {price} USD
    </h5>
  );
}
