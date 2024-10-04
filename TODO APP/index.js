let inputText = document.getElementById("text");
let root = document.querySelector("ul");
let allBtn = document.querySelector(".all");
let activebtn = document.querySelector(".active");
let completedBtn = document.querySelector(".completed");
let clearCompletedBtn = document.querySelector(".clear-completed");

let allTodos = JSON.parse(localStorage.getItem("todos")) || [];

function handleInput(event) {
  let value = event.target.value;
  if (event.key === "Enter" && value !== "") {
    let todo = {
      name: value,
      isDone: false,
    };

    allTodos.push(todo);
    inputText.value = "";
    createUI(allTodos);
  }
  localStorage.setItem("todos", JSON.stringify(allTodos));
}

function createUI(todos = allTodos) {
  root.innerHTML = "";
  todos.forEach((todo, index) => {
    let li = document.createElement("li");
    let inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.checked = todo.isDone;
    inputCheckbox.addEventListener("change", () => {
      todo.isDone = !todo.isDone;
      localStorage.setItem("todos", JSON.stringify(allTodos));
      createUI(allTodos);
    });

    let p = document.createElement("p");
    p.innerText = todo.name;
    let span = document.createElement("span");
    span.innerText = "❌";
    span.addEventListener("click", () => {
      allTodos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(allTodos));
      createUI(allTodos);
    });

    li.append(inputCheckbox, p, span);
    root.append(li);
  });
}

allBtn.addEventListener("click", () => {
  createUI(allTodos);
});

activebtn.addEventListener("click", () => {
  let activetodos = allTodos.filter((todo) => !todo.isDone);
  createUI(activetodos);
});

completedBtn.addEventListener("click", () => {
  let completedtodos = allTodos.filter((todo) => todo.isDone);
  createUI(completedtodos);
});

clearCompletedBtn.addEventListener("click", () => {
  allTodos = allTodos.filter((todo) => !todo.isDone);
  localStorage.setItem("todos", JSON.stringify(allTodos));
  createUI(allTodos);
});

inputText.addEventListener("keyup", handleInput);
