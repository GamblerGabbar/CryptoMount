import React, { useEffect, useState } from 'react'
import { get100Coins } from '../function/get100Coins';
import Header from '../components/common/Header';
import Tabs from '../components/Dashboard/Tabs';
import Button from '../components/common/Button';
import Footer from '../components/common/footer';

function WatchList() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const[coins,setCoins] = useState([])

  useEffect(() =>
  {
    if(watchlist) {
      getData();
    }
  },[]);

  const getData = async () => {
    const allCoins = await get100Coins();
    if(allCoins){
      setCoins(allCoins.filter((coin) => watchlist.includes(coin.id)));
    }
  }
  return (
    <div className='app'>
      <Header />
      <div className='app-content'>
      {watchlist?.length > 0 ? (
        <Tabs coins={coins} />
      ) :(
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
             <a href="/dashboard">
              <Button text="Dashboard" />
            </a>
          </div>
          </div>
      )}
      </div>
      <Footer />
    </div>
  )

  
}

export default WatchList
