import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
const Linechart = ({history}) => {
  const [data,setdata] = useState([["date","prices"]]);
  useEffect(()=>{
   let datacopy = [["date","prices"]];
   if(history){
    history.prices.map((item)=>{
      datacopy.push([`${new Date(item[0]).toLocaleString().slice(0,-5)}`,item[1]]);
      setdata(datacopy)
    })
   }
  },[{history}])
  return (
    <>
    <Chart chartType='LineChart'
    data={data}
    height="100%" legendToggle />
    </>
  )
}
export default Linechart