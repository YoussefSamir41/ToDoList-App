const todoForm = document.querySelector("form");
const todoInptut = document.getElementById("todo-input");
const todolistUL = document.getElementById("todo-list");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInptut.value.trim();
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false
    };
    allTodos.push(todoObject);
    updateTodoList();
    saveTodos();
    todoInptut.value = "";
  }
}

function updateTodoList() {
  todolistUL.innerHTML = "";
  allTodos.forEach((todo, todoindex) => {
    const todoItem = createTodoItem(todo, todoindex);
    todolistUL.append(todoItem);
  });
}

function createTodoItem(todo, todoindex) {
  const todoLI = document.createElement("li");
  const todoText = todo.text;
  const todoid = "todo-" + todoindex;
  todoLI.className = "todo";
  todoLI.innerHTML = `
    <input type="checkbox" id="${todoid}" ${todo.completed ? "checked" : ""} />
    <label class="custom-checkbox" for="${todoid}">
      <svg fill="${todo.completed ? '#5f6368' : 'transparent'}"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px">
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
      </svg>
    </label>
    <label for="${todoid}" class="todo-text">
      ${todoText}
    </label>
    <button class="delete-button">
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368">
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
      </svg>
    </button>
  `;

  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoindex);
  });

  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodos[todoindex].completed = checkbox.checked;
    saveTodos();
    updateTodoList();  // Re-render the list to update SVG fill
  });

  return todoLI;
}

function deleteTodoItem(todoindex) {
  allTodos = allTodos.filter((_, i) => i !== todoindex);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  const todoJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todoJson);
}

function getTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}
