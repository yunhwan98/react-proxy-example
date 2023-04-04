import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import BookTable from "./components/BookTable";
import DisplayBoard from "./components/DisplayBoard";
import CreateBook from "./components/CreateBook";
import { getAllBooks, createBook } from "./services/BookService";
import Footer from "./components/Footer";

import { getAllTodos, createTodo } from "./services/TodoService";
import TodoTable from "./components/TodoTable";
import CreateTodo from "./components/CreateTodo";
import DisplayTodo from "./components/DisplayTodo";

function App() {
  const [bookShelf, setBookShelf] = useState({});
  const [books, setBooks] = useState([]);
  const [numberOfBooks, setNumberBooks] = useState(0);

  const [todos, setTodos] = useState([]);
  const [todoShelf, setTodoShelf] = useState({});
  const [numberOfTodos, setNumberTodos] = useState(0);

  const handleSubmit = () => {
    createBook(bookShelf).then(() => {
      setNumberBooks(numberOfBooks + 1);
    });
  };
  const getAllBook = () => {
    getAllBooks().then((data) => {
      setBooks(data);

      setNumberBooks(data.length);
    });
  };
  const handleOnChangeForm = (e) => {
    let inputData = bookShelf;
    if (e.target.name === "book") {
      bookShelf.book = e.target.value;
    } else if (e.target.name === "category") {
      bookShelf.category = e.target.value;
    } else if (e.target.name === "author") {
      bookShelf.author = e.target.value;
    }
    setBookShelf(inputData);
  };

  const handleTodoSubmit = (e) => {
    createTodo(todoShelf).then(() => {
      setNumberTodos(numberOfTodos + 1);
    });
  };

  const getAllTodo = () => {
    getAllTodos().then((data) => {
      setTodos(data);
      setNumberTodos(data.length);
    });
  };

  const handleOnTodoChangeForm = (e) => {
    let inputData = todoShelf;
    if (e.target.name === "todo") {
      todoShelf.todo = e.target.value;
    } else if (e.target.name === "todo_category") {
      todoShelf.category = e.target.value;
    } else if (e.target.name === "isComplete") {
      todoShelf.isComplete = e.target.value;
    }
    setTodoShelf(inputData);
  };
  return (
    <div className="main-wrapper">
      <div className="main">
        <Header />
        <CreateBook
          bookShelf={bookShelf}
          onChangeForm={handleOnChangeForm}
          handleSubmit={handleSubmit}
        />

        <DisplayBoard numberOfBooks={numberOfBooks} getAllBook={getAllBook} />

        <BookTable books={books} />

        <CreateTodo
          bookShelf={todoShelf}
          onChangeForm={handleOnTodoChangeForm}
          handleSubmit={handleTodoSubmit}
        />
        <DisplayTodo numberOfTodos={numberOfTodos} getAllTodo={getAllTodo} />
        <TodoTable todos={todos} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
