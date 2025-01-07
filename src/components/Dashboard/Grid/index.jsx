import React, { useState } from 'react'
import "./style.css";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Link } from 'react-router-dom';
import { removeItemToWatchlist } from '../../../function/removeFromWatchlist';
import { saveItemToWatchlist } from '../../../function/saveToWatchlist';
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

function Grid({coin}) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));

  return (
    <Link to={`/coin/${coin.id}`}>
    <div className={`grid-contain ${
    coin.price_change_percentage_24h < 0 && "grid-cointainer-red"}`}
    >
        <div className='info'>
            <img src={coin.image} className='logo' />
            <div className='name'>
                <p className='c-sym'>{coin.symbol}</p>
                 <p className='c-name'>{coin.name}</p>
            </div>
            <div className={`watchlist-icon ${
              coin.price_change_percentage_24h < 0 &&"watchlist-icon-red"
            }`}
                onClick={(e) => {
                  if(isCoinAdded){
                    removeItemToWatchlist(e,coin.id,setIsCoinAdded);
                  }else {
                    setIsCoinAdded(true);
                    saveItemToWatchlist(e,coin.id);
                  }
                }}
                >
                  {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
                </div>

        </div>
        {coin.price_change_percentage_24h > 0 ? (
            <div className='chip-flex'>
              <div className='price-chip'>
                {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className='icon'><TrendingUpRoundedIcon/></div>
            </div>
        ) : (
          <div className='chip-flex'>
              <div className='price-chip chip-red'>
                {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className='icon icon-red'><TrendingDownRoundedIcon/></div>
            </div>
        )}
        <div className='info-Container'>
        <h3
        className='coin-price'
        style={{
          color:coin.price_change_percentage_24h < 0
          ?"var(--red)"
          :"var(--green)"
        }}>
          ${coin.current_price.toLocaleString()}
          </h3>
            <p className='total-vol'>Total Volume : {coin.total_volume.toLocaleString()}</p>
            <p className='total-cap'>Market cap : {coin.market_cap.toLocaleString()} </p>
        </div>
    </div>
    </Link>
  )
}

export default Grid
