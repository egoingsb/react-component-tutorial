import './App.css';
import {useState} from 'react';
function App() {
  const [count, setCount] = useState(0);
  function increaseHandler(){
    setCount(count+1);
  }
  function decreaseHandler(){
    setCount(count-1);
  }
  function resetHandler(){
    setCount(0);
  }
  return (
       <div>
         <h1>Couter</h1>
         <div>{count}</div>
         <input type="button" value="+" onClick={increaseHandler}></input>
         <input type="button" value="0" onClick={resetHandler}></input>
         <input type="button" value="-" onClick={decreaseHandler}></input>
       </div>
  );
}
export default App;
