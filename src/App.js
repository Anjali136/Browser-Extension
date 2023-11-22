import './App.css';
import React,{useState} from 'react';
import images from "./db/images";
import Home from "./pages/home/home";
import Task from './pages/home/task/task';
import {useBrowser} from "./context/browser-context";
import { useEffect } from 'react';
const index=Math.floor(Math.random()*images.length);
const bgimage=images[index].image;
function App() {

const {name,browserDispatch}=useBrowser();

useEffect(()=>{
  const userName=localStorage.getItem("name");
  browserDispatch({
    type:"NAME",
    payload:userName
  })
},[])
  return (
    <div className="app" style={{backgroundImage:`url("${bgimage}")`}}>
 {name?<Task/>:<Home/>}
    </div>
  );
}


export default App;
