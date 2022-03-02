import './App.css';
import {useState} from 'react';
import { Link } from "react-router-dom";

function Header(props){
  function clickHandler(event){
    event.preventDefault();
    props.onChangeMode();
  }
  return <header>
    <h1><Link to="/">WEB</Link></h1>
  </header>
}
function Nav(props){
  function clickHandler(event){
    event.preventDefault();
    props.onChangeMode(Number(event.target.dataset.id));
  }
  let lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <Link to={'/read/'+t.id}>{t.title}</Link>
    </li>)
  }
  return <nav>
    <ol>
        {lis}
    </ol>
  </nav>
}
function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  let topics = [
    {id:1, title:'HTML', body:'HTML is ...'},
    {id:2, title:'CSS', body:'CSS is ...'},
    {id:3, title:'JavaScript', body:'JavaScript is ...'}
  ];
  let [mode, setMode] = useState('WELCOME');
  let [id, setId] = useState(null);
  function onChangeHeaderHandler(){
    setMode('WELCOME');
  }
  function onChangeNavHandler(id){
    setMode('READ');
    setId(id);
  }
  let articleTag = '';
  if(mode === 'WELCOME'){
    articleTag = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ'){
    let title = '';
    let body = '';
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
        break;
      }
    }
    articleTag = <Article title={title} body={body}></Article>
  }
  return (
        <> 
          <Header onChangeMode={onChangeHeaderHandler}></Header>
          <Nav topics={topics} onChangeMode={onChangeNavHandler}></Nav>
          {articleTag}
        </>
  );
}


export default App;
