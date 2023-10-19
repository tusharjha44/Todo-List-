import "./App.css";
import Header from "./MyComponents/Headers";
import Footer from "./MyComponents/Footer";
import AddTodos from "./MyComponents/AddTodos";
import Todos from "./MyComponents/Todos";
import About from "./MyComponents/About";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    console.log("I am on On Delete on todo", todo);

    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodos = (title, desc) => {
    console.log("I am addig a todo");
    let sno;
    if (todos.length === 0) {
      sno = 1;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
  };

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar={true} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddTodos addTodos={addTodos} />
                <Todos todos={todos} onDelete={onDelete} />
              </>
            }
          />
          
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
