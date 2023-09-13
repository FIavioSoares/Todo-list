import React, { useState, useEffect } from "react";
import "./TodoList.css";
import Icon from "./assets/icon.webp";

function TodoList(){

  const listStorage = localStorage.getItem("List");

  const [List, setList] = useState(listStorage ? JSON.parse(listStorage) : []);
  const [newItem, setNewItem] = useState("");

  useEffect(() =>{localStorage.setItem("List", JSON.stringify(List))}, [List])

  function addItem(form){
    form.preventDefault();
    if (!newItem){
      return;
    }

    setList([...List, {text: newItem, iscompleted: false}]);
    setNewItem("")
    document.getElementById("input").focus();
  }

  function click(index){
    const listB = [...List];
    listB[index].iscompleted = !listB[index].iscompleted;
    setList(listB);
  }

  function del(index){
    const listB = [...List];
    listB.splice(index , 1);
    setList(listB);
  }

  function delAll(){
    setList([])
  }

  return(
    <div>
      <h1>Lista de tarefas</h1>
      <form onSubmit = {addItem}>
        <input id = "input" type= "text" value ={newItem} onChange = {(e) =>{setNewItem(e.target.value)}} placeholder = "Adicione uma tarefa"/>
        <button className = "Add" type = "submit">Adicionar</button>
      </form>
      <div className = "TodoList">
        <div>
          {
            List.length < 1 ? <img src = {Icon}/> : List.map((item, index) =>(<div key = {index} className = {item.iscompleted ? "Complete-item" : "Item"}>
            <span onClick = {() => {click(index)}}>{item.text}</span>
            <button onClick = {() => {del(index)}} className = "Del">Deletar</button>
          </div>)) 
          }
          <div>
            {
              List.length > 0 &&  <button onClick = {() => {delAll()}} className = "Delete-All">Deletar Todas</button>
            }
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoList;