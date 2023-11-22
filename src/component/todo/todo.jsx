import {useEffect, useState} from "react";
import{v4 as uuid} from "uuid";
import "./todo.css" 
const Todo=()=>
{
    const [inputv,setInput]=useState();
    const [submitv,setSubmit]=useState([]);
    useEffect(()=>{
        const userTodo=JSON.parse(localStorage.getItem("inputv"));
        userTodo && setSubmit(userTodo);
    },[])
    const itemEnter=(event)=>
    {
      setInput(event.target.value);
    };
    const handleTodoEnterKey=(event)=>
    {
        if(event.key==="Enter"){
            const updadatedTodoList=[...submitv,{_id:uuid(),inputv,isComplited:false}];
            setSubmit(updadatedTodoList);
            setInput("");
            localStorage.setItem("inputv",JSON.stringify(updadatedTodoList));
        }
    }
const handleTodoChage=(todoId)=>
{
    const updadatedTodoList=submitv.map(inputv=>todoId===inputv._id?{...inputv,isComplited:!inputv.isComplited}:inputv) 
    setSubmit(updadatedTodoList);
    localStorage.setItem("inputv",JSON.stringify(updadatedTodoList));
}
const handleTodoDelete=(todoId)=>{
const updadatedTodoList=submitv.filter(({_id})=>_id!==todoId);
setSubmit(updadatedTodoList);
localStorage.setItem("inputv",JSON.stringify(updadatedTodoList));
}

    return (<div className="todo_container">
        <div className="todo-input-container">
            <input className="todo-input" value={inputv} onChange={itemEnter} onKeyPress={handleTodoEnterKey} />
        </div>
        <div className="todo-list">
            {
                submitv && submitv.map(({inputv,_id,isComplited})=>{
                    return(
                        <div key={_id} className="todo-items">
                            <label className={`${isComplited?"strike-through" : ""} todo-label`}><input className="todo-check"type="checkbox" 
                            onChange={()=>handleTodoChage(_id)} checked={isComplited}/>{ inputv }</label>
                            <button className="button cursor todo-clear-btn" onClick={(()=>handleTodoDelete(_id))}>
                             <span class="material-symbols-outlined">
                            clear
                        </span></button>
                            </div>
                    )
                })
            }
        </div>
        </div>
    )
}
export default Todo;