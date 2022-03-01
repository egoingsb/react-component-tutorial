import './App.css';

function Header(props){
  function clickHandler(event){
    event.preventDefault();
    props.onChangeMode();
  }
  return <header>
    <h1><a href="/" onClick={clickHandler}>WEB</a></h1>
  </header>
}
function Nav(props){
  let lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a href={'/read/'+t.id}>{t.title}</a>
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
  function onChangeHeaderHandler(){
    console.log('Welcome');
  }
  return (
        <> 
          <Header onChangeMode={onChangeHeaderHandler}></Header>
          <Nav topics={topics}></Nav>
          <Article title="Welcome" body="Hello, WEB"></Article>
        </>
  );
}


export default App;
