
import './App.css';
import { useState, useEffect } from 'react';

//functions
//this is my function
import { getTest } from "./functions/test";


function App() {
  const [data, setData] = useState("THIS IS MY FIRST REACT");

  useEffect(() => {
    getTest().then((res) =>{
      setData(res.message);
    }).catch((err) => console.log(err));

  },[]);
  return (
    <div className="App">
     <h1> {data}</h1>
      
     
    </div>
  );
}

export default App;
