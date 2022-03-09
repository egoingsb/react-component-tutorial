import './App.css';
import {createContext, useContext} from 'react';
const theme = {
  color:'red',
  backgroundColor:'blue'
}
const themeContext = createContext(theme);
function App() {
  return (
        <>
          <h1>0</h1>
          <Child1></Child1>
        </>
  );
}
function Child1(){
  return <div>
    <h1>1</h1>
    <Child2></Child2>
  </div>
}
function Child2(){
  const theme = useContext(themeContext);
  return <div style={theme}>
    <h1>2</h1>
    <Child3></Child3>
  </div>
}
function Child3(){
  const theme = useContext(themeContext);
  return <themeContext.Provider value={{...theme, color:'yellow'}}><div style={theme}>
      <h1>3</h1>
      <Child4></Child4>
    </div>
  </themeContext.Provider>
}
function Child4(){
  const theme = useContext(themeContext);
  return <div style={theme}>
    <h1>4</h1>
  </div>
}
export default App;
