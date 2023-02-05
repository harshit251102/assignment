import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import App1 from "./App1.js"

function App() {

  const [text,setText] = useState("");

  function removeText(){
    setText("");
  }




  return (
    <>

      <input type="text" value={text} placeholder="Type here" onChange={ (e) => {
        setText(e.target.value);
      }}/>
      <App1/>

      <button onClick={removeText}>Press Me</button>
    </>
  );
}

export default App;
