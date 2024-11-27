const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskState = document.getElementById('taskState');
const taskContainer = document.getElementById('taskContainer');

// Function to create and return a task card element
const createTaskCard = (task, state) => {
  const card = document.createElement('div');
  card.classList.add('task-card', state);

  // Task description
  const taskText = document.createElement('p');
  taskText.textContent = task;
  card.appendChild(taskText);

  // Task state badge
  const stateBadge = document.createElement('span');
  stateBadge.textContent = state.charAt(0).toUpperCase() + state.slice(1);
  card.appendChild(stateBadge);

  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => {
    // Remove the task card from the DOM
    taskContainer.removeChild(card);
    // Remove the task from localStorage
    deleteTaskFromStorage(task, state);
  };
  card.appendChild(deleteButton);

  return card;
};

// Function to save tasks to localStorage
const saveTasksToStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to delete a task from localStorage
const deleteTaskFromStorage = (taskDescription, taskState) => {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.description !== taskDescription || task.state !== taskState);
  saveTasksToStorage(tasks);
};

// Function to load tasks from localStorage and display them
const loadTasksFromStorage = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const taskCard = createTaskCard(task.description, task.state);
    taskContainer.appendChild(taskCard);
  });
};

// Event listener for task form submission
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const task = taskInput.value.trim();
  const state = taskState.value;

  if (task && state) {
    // Create the task card
    const taskCard = createTaskCard(task, state);
    taskContainer.appendChild(taskCard);

    // Save the task to localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ description: task, state: state });
    saveTasksToStorage(tasks);

    // Reset the form for the next input
    taskForm.reset();
  }
});

// Load tasks from localStorage when the page is loaded
window.onload = loadTasksFromStorage;