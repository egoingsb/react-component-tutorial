import './App.css';
import {useReducer} from 'react';
function App() {
  function reducer(oldState, action){
    let newState = oldState;
    switch(action.type){
      case 'INCREASE':
        newState = oldState+1;
        break;
      case 'DECREASE':
        newState = oldState-1;
        break;
      case 'RESET':
        newState = 0;
        break;
    }
    return newState;
  }
  const [count, dispatch] = useReducer(reducer, 0);
  function increaseHandler(){
    dispatch({type:'INCREASE'});
  }
  function decreaseHandler(){
    dispatch({type:'DECREASE'});
  }
  function resetHandler(){
    dispatch({type:'RESET'});
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
