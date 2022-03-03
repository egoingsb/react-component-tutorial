import './App.css';
import {useState} from 'react';
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

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
function UpdateLink(){
  let params = useParams();
  return <li>
    <Link to={'/update/'+params.id}>Update</Link>
  </li>
}
function Control(props){
  let params = useParams();
  let contextUI = null;
  if(params.id){
    contextUI = <>
      <li><Link to={'/update/'+params.id}>Update</Link></li>
      <li><input type="button" value="Delete" onClick={()=>{
        props.onDelete(params.id);
      }}></input></li>
    </>
  }
  return <ol>
    <li><Link to="/create">Create</Link></li>
    {contextUI}
  </ol>
}
function Create(props){
  return <article>
    <form onSubmit={event=>{
      event.preventDefault();
      let t = event.target.title.value;
      let b = event.target.body.value;
      props.onCreate({title:t, body:b});
    }}>
      <p><input type="text" name="title" placeholder="Title" /></p>
      <p><textarea name="body" placeholder="Body"></textarea></p>
      <p><input type="submit" value="Create" /></p>
    </form>
  </article>
}
function Update(props){
  let params = useParams();
  let _title, _body = '';
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    if(t.id === Number(params.id)){
      _title = t.title;
      _body = t.body;
      break;
    }
  }
  let [title, setTitle] = useState(_title);
  let [body, setBody] = useState(_body);
  return <article>
    <form onSubmit={event=>{
      event.preventDefault();
      let t = event.target.title.value;
      let b = event.target.body.value;
      let i = props.id;
      props.onUpdate({id:params.id, title:t, body:b});
    }}>
      <p><input type="text" name="title" placeholder="Title" value={title} onChange={e=>{setTitle(e.target.value)}} /></p>
      <p><textarea name="body" placeholder="Body" value={body} onChange={e=>{setBody(e.target.value)}}></textarea></p>
      <p><input type="submit" value="Create" /></p>
    </form>
  </article>
}
function App() {
  let [topics, setTopics] = useState([
    {id:1, title:'HTML', body:'HTML is ...'},
    {id:2, title:'CSS', body:'CSS is ...'},
    {id:3, title:'JavaScript', body:'JavaScript is ...'}
  ]);
  let navigate = useNavigate();
  let [nextId, setNextId] = useState(4);
  function createHandler(data){
    let newTopics = [...topics];
    newTopics.push({id:nextId, title:data.title, body:data.body});
    setTopics(newTopics);
    navigate('/read/'+nextId);
    setNextId(nextId+1);
  }
  function updateHandler(data){
    let newTopics = [...topics];
    for(let i=0; i<newTopics.length; i++){
      let t = newTopics[i];
      if(t.id === Number(data.id)){
        t.title = data.title;
        t.body = data.body;
        break;
      }
    }
    setTopics(newTopics);
    navigate('/read/'+data.id);
  }
  function deleteHandler(id){
    let newTopics = [];
    for(let i=0; i<topics.length; i++){
      if(topics[i].id !== Number(id)){
        newTopics.push(topics[i]);
      }
    }
    setTopics(newTopics);
    navigate('/');
  }
  return (
        <> 
          <Header></Header>
          <Nav topics={topics}></Nav>
          <Routes>
            <Route path="/" element={<Article title="Welcome" body="Hello, WEB"></Article>}></Route>
            <Route path="/read/:id" element={<Read topics={topics}></Read>}></Route>
            <Route path="/create" element={<Create onCreate={createHandler}></Create>}></Route>
            <Route path="/update/:id" element={<Update topics={topics} onUpdate={updateHandler}></Update>}></Route>
          </Routes>
          <Routes>
            <Route path="/" element={<Control></Control>}></Route>
            <Route path="/read/:id" element={<Control onDelete={deleteHandler}></Control>}></Route>
          </Routes>
        </>
  );
}
export default App;
