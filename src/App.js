import logo from './logo.svg';
import './App.css';

function Header(){
  return <header>
    <h1><a href="/">WEB</a></h1>
  </header>
}
function Nav(){
  return <nav>
    <ol>
        <li><a href="1.html">html</a></li>
        <li><a href="2.html">css</a></li>
        <li><a href="3.html">js</a></li>
    </ol>
  </nav>
}
function Article(){
  return <article>
    <h2>Welcome</h2>
    Hello, WEB
  </article>
}

function App() {
  return (
        <> 
          <Header></Header>
          <Nav></Nav>
          <Article></Article>
        </>
  );
}

export default App;
