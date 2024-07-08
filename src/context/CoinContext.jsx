import { createContext, useEffect, useState } from "react"

export const Coincontext = createContext();
const CoinContextProvider = (props)=>{
  const [allcoins,setallcoins] = useState([]);
  const [currency,setcurrency] = useState({
    name:"usd",
    symbol: "$"
  });
  const fetchcoins = async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-HmxnWWixjFKsJLqYsUTULze7'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
      .then(response => response.json())
      .then(response => setallcoins(response))
      .catch(err => console.error(err));
  }
  useEffect(()=>{fetchcoins()},[currency]) /* currency ek dependency hai, whenever currency is changed ,the useEffect will be executed again */ 
   const contextvalue={
   allcoins,currency,setcurrency
   }
   return (
    <Coincontext.Provider value={contextvalue}>
      {props.children}
    </Coincontext.Provider>
   )
}
export default CoinContextProvider


