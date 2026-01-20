import { createStore, type Store, type StoreState } from "../store.utils";

interface TodoItem {
  id: string;
  isDone: boolean;
  text: string;
}

export interface TodoData {
  input: string;
  todos: TodoItem[];
}

const defaultInputValue = "";

export interface TodoActions {
  changeInput: (input: string) => void;
  addTodo: () => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

export type TodoState = StoreState<TodoData, TodoActions>;
export type TodoStore = Store<TodoData, TodoActions>;

export const useTodoStore: TodoStore = createStore<TodoData, TodoActions>(
  "todo",
  (_setState, getState, updateData): TodoState => ({
    data: {
      input: defaultInputValue,
      todos: [],
    },
    actions: {
      changeInput: (text) => {
        updateData({ input: text }, "changeInput");
      },
      addTodo: () => {
        const newInput: TodoItem = {
          id: Math.random().toString(),
          isDone: false,
          text: getState().data.input,
        };

        updateData(
          (data) => ({
            input: defaultInputValue,
            todos: [...data.todos, newInput],
          }),
          "addTodo",
        );
      },
      deleteTodo: (id: string) => {
        updateData(
          (data) => ({ todos: data.todos.filter((item) => item.id !== id) }),
          "deleteTodo",
        );
      },
      toggleTodo: (id: string) => {
        updateData((data) => {
          const newTodos: TodoItem[] = JSON.parse(JSON.stringify(data.todos));
          const foundIndex = newTodos.findIndex((todo) => todo.id === id);
          newTodos[foundIndex].isDone = !newTodos[foundIndex].isDone;

          return { todos: newTodos };
        }, "toggleTodo");
      },
    },
  }),
);
