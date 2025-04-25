

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filterType = "all";

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filters button");


taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text !== "") {
    const task = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    tasks.unshift(task); 
    taskInput.value = "";
    saveAndRender();
  }
});


function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;
  if (filterType === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  } else if (filterType === "pending") {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", () => toggleComplete(task.id));

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}


function toggleComplete(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveAndRender();
}


function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveAndRender();
}


filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filterType = btn.dataset.filter;
    renderTasks();
  });
});

function saveAndRender() {
  saveToLocalStorage();
  renderTasks();
}

renderTasks();
