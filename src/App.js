import './App.css';

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
  return <div>
    <h1>2</h1>
    <Child3></Child3>
  </div>
}
function Child3(){
  return <div>
    <h1>3</h1>
    <Child4></Child4>
  </div>
}
function Child4(){
  return <div>
    <h1>4</h1>
  </div>
}
export default App;
