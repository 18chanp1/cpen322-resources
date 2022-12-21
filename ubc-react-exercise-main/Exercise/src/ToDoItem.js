const ToDoItem = ({ item, toggleFunc }) => {
  return (
    <li
      onClick={() => toggleFunc(item.id)}
      className={item.done ? "done" : "open"}
    >
      {item.name}
    </li>
  );
};

export default ToDoItem;
