const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskTargetDate = document.getElementById('taskTargetDate');
const taskState = document.getElementById('taskState');
const taskContainer = document.getElementById('taskContainer');

// Function to format dates
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
};

// Function to create a task card
const createTaskCard = (task, state, createdDate, targetDate) => {
    const card = document.createElement('div');
    card.classList.add('task-card', state);

    // Task content
    const taskText = document.createElement('p');
    taskText.textContent = task;
    card.appendChild(taskText);

    // State badge
    const stateBadge = document.createElement('span');
    stateBadge.textContent = state;
    card.appendChild(stateBadge);

    // Created date
    const createdDateText = document.createElement('p');
    createdDateText.textContent = `Created: ${formatDate(createdDate)}`;
    createdDateText.classList.add('created-date');
    card.appendChild(createdDateText);

    // Target date
    const targetDateText = document.createElement('p');
    targetDateText.textContent = `Target: ${formatDate(targetDate)}`;
    targetDateText.classList.add('target-date');
    card.appendChild(targetDateText);

    // Overdue check
    const currentDate = new Date();
    if (new Date(targetDate) < currentDate && state !== 'Completed') {
        const overdueMessage = document.createElement('p');
        overdueMessage.textContent = '⚠️ Task is overdue!';
        overdueMessage.classList.add('overdue');
        card.appendChild(overdueMessage);
    }

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        taskContainer.removeChild(card);
    };
    card.appendChild(deleteButton);

    return card;
};

// Event listener for adding a task
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const task = taskInput.value.trim();
    const state = taskState.value;
    const targetDate = taskTargetDate.value;

    if (!task || !targetDate) {
        alert('Please fill out the task and set a target date.');
        return;
    }

    const createdDate = new Date();

    const taskCard = createTaskCard(task, state, createdDate, targetDate);
    taskContainer.appendChild(taskCard);

    taskForm.reset();
});