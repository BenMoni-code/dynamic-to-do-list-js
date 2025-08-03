// Wait for the DOM to load before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage on page load
    loadTasksFromLocalStorage();

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();

        // Validate non-empty input
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create new <li> element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Add click event to remove button
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            saveTasksToLocalStorage(); // Update localStorage after removing
        };

        // Append remove button and list item to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';

        // Save to localStorage
        saveTasksToLocalStorage();
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', addTask);

    // Event listener for Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Save tasks to localStorage
    function saveTasksToLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(function (li) {
            tasks.push(li.firstChild.textContent); // only the task text
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function (taskText) {
            const li = document.createElement('li');
            li.textContent = taskText;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';
            removeBtn.onclick = function () {
                taskList.removeChild(li);
                saveTasksToLocalStorage();
            };

            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }
});
