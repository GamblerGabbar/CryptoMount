import axios from "axios";

export const getCoinData = (id)=>{
    const options = {
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/coins/${id}`,
        headers: {accept: 'application/json'}
      };
      
      const myData = axios
        .request(options)
        .then(res => {
          return res.data;
        })
        .catch(err => {console.error(err)
        });
        return myData;
}