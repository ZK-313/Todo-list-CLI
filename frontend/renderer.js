const fs = require('fs');
const path = require('path');
const PowerShell = require("powershell");

document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    //const filePath = path.join(__dirname, 'todo_list.json');
    const filePath = path.join("C:\\Users\\Zulfi\\todo-cli\\todo_list.json");
    let todos = [];

    // Load todo items from JSON file
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        todos = JSON.parse(data);
        todos.forEach((todo, index) => {
            appendTodoToList(todo, index);
        });

        const addBut = document.getElementById("addBut");
        addBut.addEventListener("click", () => {
            const input = document.getElementById("input_field");
            const newTodoText = input.value.trim();
            const isDuplicate = todos.some(item => item.name === newTodoText);
            if(isDuplicate){
                const error_msg = document.getElementById("error-msg");
                error_msg.innerHTML = "This item is already in the todo list!";
                error_msg.style.display = "inline";
                return;
            }
            else if (newTodoText !== "") {
                const error_msg = document.getElementById("error-msg");
                error_msg.style.display = "none";
                // Add new todo item to the JSON file via PowerShell command
                let ps = new PowerShell(`todo -a "${newTodoText}"`);
                // Update local todos array and the screen
                const newTodo = { name: newTodoText, done: false };
                todos.push(newTodo);
                appendTodoToList(newTodo, todos.length - 1);
                input.value = ""; // Clear input field
                updateTodoFile(todos); // Save updated list to JSON file
            }
        });


    });

    // Function to add a single todo item to the DOM
    function appendTodoToList(todo, index) {
        const li = document.createElement("li");
        li.className = "todo-item";
        li.id = `entry${index}`;

        const button = document.createElement("button");
        button.className = "checkbutton";
        button.id = `${index}`;
        button.innerHTML = '<span>x</span>';

        if (todo.done) {
            button.classList.add("completed");
        }

        const taskText = document.createElement("span");
        taskText.textContent = todo.name;
        const minus = document.createElement("button");
        minus.className = "rem";
        minus.id = `rem${index}`;
        minus.textContent = "-";

        li.appendChild(button);
        li.appendChild(taskText);
        li.appendChild(minus);

        todoList.appendChild(li);

        // Add the click event listener for toggling the done status
        minus.addEventListener("click", () => {
            // Remove the item from the todos array
            todos.splice(index, 1); // Remove the todo item from the array based on index
            // Update the JSON file
            updateTodoFile(todos);
            // Remove the li element from the DOM
            todoList.removeChild(li); // Remove the todo item from the displayed list
            let ps = new PowerShell(`todo -r "${todo.name}"`);
        })

        button.addEventListener("click", () => {
            todo.done = !todo.done;
            button.classList.toggle("completed");
            updateTodoFile(todos);
        });
    }

    // Function to update the JSON file with the latest todos
    function updateTodoFile(todos) {
        fs.writeFile(filePath, JSON.stringify(todos, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
            }
        });
    }
});