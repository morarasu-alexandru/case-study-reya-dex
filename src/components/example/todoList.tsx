"use client";

import type { ChangeEvent } from "react";
import { useTodoStore } from "@/store/example/todoStore";
import { useActions, useData } from "@/store/store.utils";

const TodoList = () => {
  const { todos, input } = useData(useTodoStore);
  const { addTodo, changeInput, deleteTodo, toggleTodo } =
    useActions(useTodoStore);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    changeInput(e.target.value);
  };

  return (
    <div>
      <h1>TodoList</h1>
      <div>
        <input type="text" value={input} onChange={handleChangeInput} />
        <button type={"button"} onClick={addTodo}>
          add todo
        </button>
      </div>
      <ul>
        {todos.map(({ id, isDone, text }) => {
          const handleDelete = () => {
            deleteTodo(id);
          };

          const handleToggleTodo = () => {
            toggleTodo(id);
          };

          return (
            <li key={id}>
              <div>
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={handleToggleTodo}
                />
                <span className="mx-4">{text}</span>
                <button
                  className="px-2 py-1 bg-blue-900"
                  type="button"
                  onClick={handleDelete}
                >
                  delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
