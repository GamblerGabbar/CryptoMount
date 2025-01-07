import React, { useState } from 'react'
import "./style.css"
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import { convertNumber } from '../../../function/convert.Number';
import { Link } from 'react-router-dom';
import { removeItemToWatchlist } from '../../../function/removeFromWatchlist';
import { saveItemToWatchlist } from '../../../function/saveToWatchlist';
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { motion } from "framer-motion";

function List({coin}) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));

  return (
    <Link to={`/coin/${coin.id}`}>
    <tr className='List-row'>
        <Tooltip title={coin.name} placement='bottom-start' >
        <td className='td-img'>
            <img src={coin.image} className='logo' />
        </td>
        </Tooltip>
        <Tooltip title='Name' placement='bottom-start'>
            <td>
            <div className='name'>
                <p className='c-sym td-p' >{coin.symbol}</p>
                 <p className='c-name td-p'>{coin.name}</p>
            </div>
        </td>
       </Tooltip>
        <Tooltip title="Price Change 24 hrs" placement='bottom-start'>
        {coin.price_change_percentage_24h > 0 ? (
            <td className='chip-flex'>
              <div className='price-chip'>
                {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className='icon'><TrendingUpRoundedIcon/></div>
            </td>
        ) : (
          <td className='chip-flex'>
              <div className='price-chip chip-red'>
                {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className='icon icon-red'><TrendingDownRoundedIcon/></div>
            </td>
        )}
        </Tooltip>
        <Tooltip title="Current Price" placement='bottom-start'>
        <td className='info-Container'>
        <h3
        className='coin-price centre-align'
        style={{
          color:coin.price_change_percentage_24h < 0
          ?"var(--red)"
          :"var(--green)"
        }}>
          ${coin.current_price.toLocaleString()}
          </h3>
          </td>
          </Tooltip>
          <Tooltip title="Total Volume" placement='bottom-end'>
          <td>
            <p className='total-vol right-align td-vol'>{coin.total_volume.toLocaleString()}</p>
          </td>
          </Tooltip>
          <Tooltip title="Market Cap" placement='bottom-end'>
          <td className='desktop-td-market'>
            <p className='total-cap right-align'>${coin.market_cap.toLocaleString()} </p>
          </td>
          </Tooltip>
          <Tooltip title="Market Cap" placement='bottom-end'>
          <td className='mobile-td-market'>
            <p className='total-cap right-align'>${convertNumber(coin.market_cap)} </p>
          </td>
          </Tooltip>
        <td
          className={`watchlist-icon ${
            coin.price_change_percentage_24h < 0 ? "watchlist-icon-red" : ""
        }`}
          onClick={(e) => {
            if (isCoinAdded) {
              // remove coin
              removeItemToWatchlist(e, coin.id, setIsCoinAdded);
            } else {
              setIsCoinAdded(true);
              saveItemToWatchlist(e, coin.id);
            }
          }}
        >
          {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
        </td>
    </tr>

    </ Link>
  )
}

export default List

