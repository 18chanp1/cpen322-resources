import { useState } from "react";
import TodoItem from "./ToDoItem";
// Todo Item -
// done: boolean - true / false
// name: the description of the item

export default function ToDoList() {
  const [todoInput, setTodoInput] = useState({});
  const [todoList, setTodoList] = useState([]);

  const handleKeyChange = (event) => {
    const item = {
      done: false,
      name: event.target.value,
      id: todoList.length + 1
    };
    setTodoInput(item);
  };

  const handleItemToggle = (id) => {
    const newTodos = [...todoList];

    const todo = newTodos.find((item) => item.id === id);
    todo.done = !todo.done;
    setTodoList(newTodos);
    console.log(todoList);
  };

  const submitTodo = () => {
    setTodoList([...todoList, todoInput]);
  };

  return (
    <div>
      <h1> To do list </h1>
      <input type="text" onChange={handleKeyChange} />
      <button onClick={submitTodo}> Add </button>
      <ul>
        {todoList.length > 0 &&
          todoList.map((item) => (
            <TodoItem toggleFunc={handleItemToggle} item={item} key={item.id} />
          ))}
      </ul>
    </div>
  );
}
