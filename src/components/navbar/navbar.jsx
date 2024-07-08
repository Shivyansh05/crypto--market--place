import React, { useContext } from 'react'
import './navbar.css'
import logo from '../../assets/crp.jpeg'
import { Coincontext } from '../../context/CoinContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const {setcurrency} = useContext(Coincontext);

  const currencyhandler=(e)=>{
    console.log(e.target.value)
   switch (e.target.value){
    case "usd": {setcurrency({name: "usd",symbol: "$"})
    break;
  }
    case "Inr":{
      setcurrency({name:"inr",symbol:"₹"})
      break;
    }
    case "eur":{
      setcurrency({name:"eur",symbol:"€"})
      break;
    }
    default: {setcurrency({name: "usd",symbol: "$"})
    break;
  }
   }
  }
  const navigate= useNavigate();
  return (
    <div className='navbar'>
      <Link to='/'>
      <img src={logo} alt="" className='logo' />
      </Link>
      <ul>
        <li onClick={()=>navigate('/home')}>Home</li>
        <a href="https://www.coingecko.com/en/crypto-gainers-losers">Gainers and Losers</a>
        <a href="https://www.coingecko.com/learn">Learn Crypto</a>
        <a href="https://www.coingecko.com/en/news">News</a>
      </ul>
      <div className='nav-right'>
        <select onChange={currencyhandler}>
          <option value="usd">USD</option>
          <option value="Inr">INR</option>
          <option value="eur">EURO</option>
        </select>
      </div>
      </div>
  )
}

export default Navbar