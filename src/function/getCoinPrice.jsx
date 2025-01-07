import axios from "axios";

export const getCoinPrices = (id, days,priceType) => {
    const option = {
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
        headers: {accept: 'application/json'}
      };
      
      const prices = axios
        .request(option)
        .then(resul => {
            return resul.data[priceType];
        })
        .catch(err => {console.error(err)
        });
        
        return prices;
}