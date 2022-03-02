import './App.css';
import {useState} from 'react';
import { Routes, Route, Link, useParams } from "react-router-dom";

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
function Read(props){
  let params = useParams();
  let title, body = '';
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    if(t.id === Number(params.id)){
      title = t.title;
      body = t.body;
      break;
    }
  }
  return <Article title={title} body={body}></Article>
}
function App() {
  let topics = [
    {id:1, title:'HTML', body:'HTML is ...'},
    {id:2, title:'CSS', body:'CSS is ...'},
    {id:3, title:'JavaScript', body:'JavaScript is ...'}
  ];
  return (
        <> 
          <Header></Header>
          <Nav topics={topics}></Nav>
          <Routes>
            <Route path="/" element={<Article title="Welcome" body="Hello, WEB"></Article>}></Route>
            <Route path="/read/:id" element={<Read topics={topics}></Read>}></Route>
          </Routes>
        </>
  );
}
export default App;
