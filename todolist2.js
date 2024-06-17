const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addTaskBtn");

let tasks = [];

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});

function addTask() {
  const taskTitle = document.getElementById("taskTitle").value;
  if (taskTitle) {
    const newTask = {
      id: Date.now(), // 使用時間戳作為唯一 ID
      title: taskTitle,
      completed: false,
      editing: false,
    };
    tasks.push(newTask);
    renderTasks();
  }
}

function renderTasks() {
  taskList.innerHTML = ""; // 清空任務列表
  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    taskList.appendChild(taskElement);
  });
}

function createTaskElement(task) {
  const taskElement = document.createElement("div");
  taskElement.className = `task ${task.completed ? "completed" : ""}`;

  const completeCheckbox = document.createElement("input");
  completeCheckbox.type = "checkbox";
  completeCheckbox.checked = task.completed;
  completeCheckbox.addEventListener("change", () =>
    toggleComplete(task.id, completeCheckbox.checked)
  );

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.value = task.title;
  titleInput.readOnly = !task.editing;
  titleInput.setAttribute("data-testid", "todoTitleInput");
  titleInput.addEventListener("input", (e) =>
    updateTaskTitle(task.id, e.target.value)
  );

  const editButton = document.createElement("button");
  editButton.setAttribute("data-testid", "editTaskBtn");
  editButton.textContent = task.editing ? "Save" : "Edit";
  editButton.addEventListener("click", () => toggleEditTask(task.id));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("data-testid", "deleteTaskBtn");
  deleteButton.addEventListener("click", () => deleteTask(task.id));

  taskElement.appendChild(completeCheckbox);
  taskElement.appendChild(titleInput);
  taskElement.appendChild(editButton);
  taskElement.appendChild(deleteButton);

  return taskElement;
}

function toggleComplete(id, completed) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = completed;
    renderTasks();
  }
}

function toggleEditTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.editing = !task.editing;
    renderTasks();
  }
}

function updateTaskTitle(id, title) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.title = title;
  }
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  renderTasks();
}
