import React, { useContext, useEffect, useState } from 'react'
import './coin.css'
import { useParams } from 'react-router-dom'
import { Coincontext } from '../../context/CoinContext';
import Linechart from '../../components/linechart/linechart';
const Coin = () => {
  const {coinId}= useParams();
  const [coinData,setcoinData] = useState();
  const [history,sethistory]=useState();
  const {currency}=useContext(Coincontext);
  const fetchhistory=async ()=>{
    const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
  .then(response => response.json())
  .then(response => sethistory(response))
  .catch(err => console.error(err));
  }
  const fetchcoindata=async()=>{
    const options = {method: 'GET',
       headers: {accept: 'application/json'}
    };

  fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`,options)
  .then(response => response.json())
  .then(response => setcoinData(response))
  .catch(err => console.error(err));
  }
  useEffect(()=>{
    fetchcoindata();
    fetchhistory();
  },[currency])
  
  if(coinData && history){
  return (
    <div className='coin'>
      <div className='coin-name'>
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name}({coinData.symbol.toUpperCase()})</b></p>
      </div>
      <div className='history'>
      <Linechart history={history} />
      </div>
      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 hour high</li>
          <li>{currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 hour low</li>
          <li>{currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
      </div>
    </div>
  )}
  else{
    return (
      <div className='spinner'>
        <div className='spin'></div>
      </div>
    )
  }
}

export default Coin