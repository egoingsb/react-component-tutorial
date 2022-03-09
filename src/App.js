import './App.css';
import {useState, createContext, useContext, useReducer} from 'react';
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
const defaultTheme = {
  color:'#E84855'
}
const themeContext = createContext(defaultTheme);
function Header(props){
  const theme = useContext(themeContext);
  function clickHandler(event){
    event.preventDefault();
    props.onChangeMode();
  }
  return <header>
    <h1><Link to="/" style={{color:theme.color}}>WEB</Link></h1>
  </header>
}
function Nav(props){
  const theme = useContext(themeContext);
  function clickHandler(event){
    event.preventDefault();
    props.onChangeMode(Number(event.target.dataset.id));
  }
  let lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <Link to={'/read/'+t.id} style={{color:theme.color}}>{t.title}</Link>
    </li>)
  }
  return <nav>
    <ol>
        {lis}
    </ol>
  </nav>
}
function Article(props){
  const theme = useContext(themeContext);
  return <article style={theme}>
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
  const theme = useContext(themeContext);
  // let [topics, setTopics] = useState([
  //   {id:1, title:'HTML', body:'HTML is ...'},
  //   {id:2, title:'CSS', body:'CSS is ...'},
  //   {id:3, title:'JavaScript', body:'JavaScript is ...'}
  // ]);
  const initTopics = [
    {id:1, title:'HTML', body:'HTML is ...'},
    {id:2, title:'CSS', body:'CSS is ...'},
    {id:3, title:'JavaScript', body:'JavaScript is ...'}
  ]
  function reducer(oldState, action){
    let newState = [...oldState];
    switch(action.type){
      case 'CREATE':
        newState.push(action.topic);
        break;
      case 'UPDATE':
        for(let i=0; i<newState.length; i++){
          let t = newState[i];
          if(t.id === Number(action.topic.id)){
            t.title = action.topic.title;
            t.body = action.topic.body;
            break;
          }
        }
        break;
      case 'DELETE':
        newState = [];
        for(let i=0; i<oldState.length; i++){
          if(oldState[i].id !== Number(action.id)){
            newState.push(oldState[i]);
          }
        }
        break;
    }
    return newState;
  }
  const [topics, dispatch] = useReducer(reducer, initTopics);
  let navigate = useNavigate();
  let [nextId, setNextId] = useState(4);
  function createHandler(data){
    dispatch({type:'CREATE', topic:{id:nextId, title:data.title, body:data.body}});
    navigate('/read/'+nextId);
    setNextId(nextId+1);
  }
  function updateHandler(data){
    dispatch({type:'UPDATE', topic:data});
    navigate('/read/'+data.id);
  }
  function deleteHandler(id){
    dispatch({type:'DELETE', id:id});
    navigate('/');
  }
  return (
        <div style={{color:theme.color}}> 
          <Header></Header>
          <Nav topics={topics}></Nav>
          <themeContext.Provider value={{color:'black'}}>
            <Routes>
              <Route path="/" element={<Article title="Welcome" body="Hello, WEB"></Article>}></Route>
              <Route path="/read/:id" element={<Read topics={topics}></Read>}></Route>
              <Route path="/create" element={<Create onCreate={createHandler}></Create>}></Route>
              <Route path="/update/:id" element={<Update topics={topics} onUpdate={updateHandler}></Update>}></Route>
            </Routes>
          </themeContext.Provider>
          <Routes>
            <Route path="/" element={<Control></Control>}></Route>
            <Route path="/read/:id" element={<Control onDelete={deleteHandler}></Control>}></Route>
          </Routes>
        </div>
  );
}
export default App;
