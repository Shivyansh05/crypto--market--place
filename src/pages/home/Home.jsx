import React, { useContext, useEffect, useState } from 'react'
import { Coincontext } from '../../context/CoinContext';
import './home.css'
import { Link } from 'react-router-dom';
const Home = () => {
  const {allcoins,currency} = useContext(Coincontext);
  const [displaycoin,setdisplaycoin]=useState([]);
  const [input,setinput] = useState();
  useEffect(()=>{setdisplaycoin(allcoins)},[allcoins]);
  const handleinput=(e)=>{
    if(e.target.value==="") setdisplaycoin(allcoins)
    setinput(e.target.value);
  }
  const searchhandler=async(e)=>{
  e.preventDefault();
  const searchedcoins = await allcoins.filter((item)=>{ return item.name.toLowerCase().includes(input.toLowerCase())})
  setdisplaycoin(searchedcoins);
  }
  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br />Crypto Market Place</h1>
        <p>
          Welcome to the World's largest cryptocurrency markerplace. Sign up to explore more about cryptos
        </p>
        <form onSubmit={searchhandler}>
          <input type="text" placeholder='Search Crypto' list='coiinlist' onChange={handleinput} value={input} required/>
          <datalist id='coiinlist' className='datalist'>
            {allcoins.map((item,ind)=>(
            <option  key={ind} value={item.name} />)
            )}
          </datalist>
          <button type='submit'>Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24hrs change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {
          displaycoin.slice(0,15).map((item,ind)=>(
            <Link to={`/coins/${item.id}`} className='table-layout' key={ind}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name+"-"+item.symbol}</p>
              </div>
              <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
              <p style={{textAlign:"center"}} className={Math.floor(item.price_change_24h)>=0?"green":"red"}>{Math.floor(item.market_cap_change_percentage_24h*100)/100}</p>
              <p className='market-cap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home