const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addTaskBtn");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  addTask();
});

function addTask() {
  const taskTitle = document.getElementById("taskTitle").value;
  if (taskTitle) {
    const task = createTaskElement(taskTitle);
    taskList.appendChild(task);
  }
}

function createTaskElement(title) {
  const task = document.createElement("div");
  task.className = "task";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.value = title;
  titleInput.readOnly = true;
  titleInput.setAttribute("data-testid", "todoTitleInput");

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.setAttribute("data-testid", "editTaskBtn");
  editButton.addEventListener("click", () => editTask(task, titleInput));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("data-testid", "deleteTaskBtn");
  deleteButton.addEventListener("click", () => deleteTask(task));

  const completeCheckbox = document.createElement("input");
  completeCheckbox.type = "checkbox";
  completeCheckbox.addEventListener("change", () =>
    toggleComplete(task, completeCheckbox.checked)
  );

  task.appendChild(completeCheckbox);
  task.appendChild(titleInput);
  task.appendChild(editButton);
  task.appendChild(deleteButton);

  return task;
}

function editTask(task, titleInput) {
  if (titleInput.readOnly) {
    titleInput.readOnly = false;
    task.querySelector("button").textContent = "Save";
  } else {
    titleInput.readOnly = true;
    task.querySelector("button").textContent = "Edit";
  }
}

function deleteTask(task) {
  taskList.removeChild(task);
}

function toggleComplete(task, isComplete) {
  if (isComplete) {
    task.classList.add("completed");
  } else {
    task.classList.remove("completed");
  }
}
