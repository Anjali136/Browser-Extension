
import "./task.css"; 
import { useBrowser } from "../../../context/browser-context";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { quotes } from "../../../db/quotes";
import Todo from "../../../component/todo/todo";
const index=Math.floor(Math.random()* quotes.length);
const quote =quotes[index].quote;

const Task=()=>
{
    const [isChecked,setIsChecked]=useState(false);
    const [isTodoOpen,setIsTodoOpen]=useState(false);
    const [vale,setVale]=useState("");

    const {name,time,message,task,browserDispatch}=useBrowser();
    useEffect(()=>{
        const userTask=localStorage.getItem("task");
        browserDispatch({
            type:"TASK",
            payload:userTask
        });
        if(new Date().getDate()!==Number(localStorage.getItem("data"))){
            localStorage.removeItem("task");
            localStorage.removeItem("date");
            localStorage.removeItem("checkedStatus");
        }
    },[])
    useEffect(()=>{
        const checkStatus=localStorage.getItem("checkedStatus");
        checkStatus==="true"?setIsChecked(true):setIsChecked(false)
    },[])
    useEffect(()=>{
        getCurrentTime();
    },[time])
    const getCurrentTime=()=>{
        const today = new Date();
        const hours = today.getHours();
        const minutes=today.getMinutes();
        const hour=hours<10?`0${hours}`:hours;
        const minute=minutes<10?`0${minutes}`:minutes;
        const currentTime=`${hour}:${minute}`
        setTimeout(getCurrentTime,1000);
        browserDispatch({
            type:"TIME",
            payload:currentTime
        })
        browserDispatch({
            type:"MESSAGE",
            payload:hours
        })
    }
    const handleFormSubmit=(event)=>{
        event.preventDefault();

        browserDispatch({
            type:"TASK",
            payload:vale
        })
        localStorage.setItem("task",vale);
        setVale("");
    }
    const handleTaskChange=(event)=>{
       setVale(event.target.value)
            }
            const handleTaskCompleteChange=(event)=>{
                if(event.target.isChecked){
                    setIsChecked(isChecked=>!isChecked)
                }else{
                    setIsChecked(isChecked=>!isChecked)
                }
                localStorage.setItem("checkedStatus",!isChecked);
            }
            const handleClearClick=()=>{
                browserDispatch({
                    type:"CLEAR"
                })
                setIsChecked(false);
                localStorage.removeItem("task");
                localStorage.removeItem("checkedStatus");
            }
            const handleTodoClick=()=>
            {
                setIsTodoOpen(isTodoOpen=>!isTodoOpen);
            }
return(<div className="task-container">
<span className="time">{time}</span>
<span className="message">{message}{name}</span>
{name!==null && task===null?(
<Fragment>
    <span className="focus">What ur is main task to do for today?</span>
    <form onSubmit={handleFormSubmit}>
        <input value={vale} className="input task-input" required onChange={handleTaskChange}/>
    </form>
</Fragment>):(
    <div className="user-task-container">
    <span className="heading-2">Today's Focus</span>
    <div className="span-label">
        <label className={`${isChecked?"strike-through":""} heading-3 head cursor`}>    
            <input className="check cursor" type="checkbox" onChange={handleTaskCompleteChange} checked={isChecked}/>
            {task}
</label>
<button className="button cursor" onClick={handleClearClick}>
    <span class="material-symbols-outlined">
clear
</span></button>
</div>
    </div>
)}
<div className="quote-container">
    <span className="heading-3">{quote}</span>
</div>
{ isTodoOpen&&<Todo/>}
<div className="todo-btn-cointainer">
    <button className="button cursor todo-btn" onClick={handleTodoClick}>Todo</button>
</div>
</div>
)}
export default Task;

