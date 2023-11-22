
import "./home.css"
import { useBrowser } from "../../context/browser-context";
import { useState } from "react";
const Home=()=>
{
const [val,setVal]=useState("");
const handelChange=(event)=>{
    setVal(event.target.value);
}
const handleForm=(event)=>{
    event.preventDefault();
    browserDispatch({
        type:"NAME",
        payload:val
    })
            localStorage.setItem("name",val);
            setVal("");
        }
    
    const {name,browserDispatch}=useBrowser();
    return (
        <div className="home-cointainer">
             <h1 className="main-heading">Browser Extension</h1>
         <div className="user-details">
            <span className="heading-1">Hellooo,Kripya Apna Naam Pharmaye</span>
            <form onSubmit={handleForm}>
            <input required className="input" onChange={handelChange}/>
            </form>
         </div>
        </div>
      );
    }
export default Home;