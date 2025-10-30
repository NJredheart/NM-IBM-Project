// DOM Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);
// Add a new task
addTaskBtn.addEventListener("click", addTask);
// Function to add task
function addTask() {
 const taskText = taskInput.value.trim();
 if (taskText === "") {
 alert("Please enter a task!");
   return;
 }
 const task = {
 id: Date.now(),
 text: taskText,
 completed: false,
 };
 addTaskToDOM(task);
 saveTask(task);
 taskInput.value = "";
}
// Function to display task in UI
function addTaskToDOM(task) {
 const li = document.createElement("li");
 li.setAttribute("data-id", task.id);
 if (task.completed) li.classList.add("completed");
 li.innerHTML = `
 <span>${task.text}</span>
 <div class="task-actions">
 <button class="complete-btn">✔</button>
 <button class="edit-btn">✏</button>
 <button class="delete-btn">🗑</button>
 </div>
 `;
 taskList.appendChild(li);
 // Event listeners for each action
 li.querySelector(".complete-btn").addEventListener("click", () => 
toggleComplete(task.id));
 li.querySelector(".edit-btn").addEventListener("click", () => 
editTask(task.id));
 li.querySelector(".delete-btn").addEventListener("click", () => 
deleteTask(task.id));
}
// Toggle task completion
function toggleComplete(id) {
 const tasks = getTasks();
 const task = tasks.find((t) => t.id === id);
 task.completed = !task.completed;
 localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
// Edit task
function editTask(id) {
 const tasks = getTasks();
 const task = tasks.find((t) => t.id === id);
 const newText = prompt("Edit task:", task.text);
 if (newText && newText.trim() !== "") {
 task.text = newText.trim();
 localStorage.setItem("tasks", JSON.stringify(tasks));
 renderTasks();
 }
}
// Delete task
function deleteTask(id) {
 let tasks = getTasks();
 tasks = tasks.filter((t) => t.id !== id);
 localStorage.setItem("tasks", JSON.stringify(tasks));
 renderTasks();
}
// Save task to localStorage
function saveTask(task) {
 const tasks = getTasks();
 tasks.push(task);
 localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Get tasks from localStorage
function getTasks() {
 return JSON.parse(localStorage.getItem("tasks")) || [];
}
// Load all tasks
function loadTasks() {
 renderTasks();
}
// Render all tasks
function renderTasks() {
 taskList.innerHTML = "";
 const tasks = getTasks();
 tasks.forEach((task) => addTaskToDOM(task));
}
