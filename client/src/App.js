import React,{useState,useEffect} from "react";
import axios from 'axios';
import Main from './components/Main';
import Graphs from "./components/Graphs";
import {  Switch,Route, Redirect} from "react-router-dom";


function App() {
  
  const [data,getData] = useState([]);
  const [stocks,setStockNames] = useState([]);
  const [dates,setDateValues] = useState([]);
  const [stock, setStock] = useState('');
  const [date, setDate] = useState('');

  useEffect(()=>{
      if(stock!=="" && date!==""){
          getData([]);
          axios.get(`http://localhost:5000/stockData/${stock}/${date}`)
          .then((response) => response.data)
          .then((result)=>{
              let arr = [];
              for(let i=0;i<result.length;i++){
                  arr.push(result[i]);
              }
              getData(arr);
          })
      }
  },[stock,date])

  useEffect(()=>{
      axios.get('http://localhost:5000/stockNames')
      .then((response)=> response.data)
      .then((result)=>{
          let arr = [];
          let orderedArr = [];
          let ascendingArr = [];
          for(let i=0;i<result.length;i++){
              arr.push(result[i].stock_name);
          }
          for(let i=0;i<arr.length;i++){
            if(arr[i] === 'NIFTY' || arr[i] === 'BANKNIFTY'){
              orderedArr = [arr[i],...orderedArr];
            }else{
              ascendingArr.push(arr[i]);
            }
          }
          orderedArr = [...orderedArr,...ascendingArr.sort()];
          setStockNames(orderedArr);
      })
  },[])
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect exact from="/" to="/main" />
        </Route>
        <Route path="/main">
            <Main 
              stock={stock}
              date={date}
              stocks={stocks}
              dates={dates}
              setDateValues={setDateValues}
              setStock={setStock}
              setDate={setDate}
              data={data}
              getData={getData}
            />
        </Route>
        <Route 
          path="/graph/:stock/:date" 
          target="_blank"
          render={(props) => <Graphs {...props} />}
        />
      </Switch>
    </div>
  );
}

export default App;
