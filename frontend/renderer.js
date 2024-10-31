/*document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded and running");  // Check if this message appears
    const checkButtons = document.querySelectorAll(".checkbutton");

    checkButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("completed");
        });
    });
});*/

const fs = require('fs');
const path = require('path');
const PowerShell = require("powershell");

document.addEventListener('DOMContentLoaded', () => {

    const todoList = document.getElementById('todo-list');

    // Load todo items from JSON file
    //const filePath = path.join(__dirname, 'todo_list.json');
    //const filePath = path.join("C:\\Users\\Zulfi\\todo-cli\\todo_list.json");
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const todos = JSON.parse(data);
        todos.forEach((todo, index) => {
            // Create a list item and button dynamically
            const li = document.createElement("li");
            li.className = "todo-item";
            li.id = `entry${index}`;

            const button = document.createElement("button");
            button.className = "checkbutton";
            button.id = `${index}`;
            button.innerHTML = '<span>x</span>';

            // Apply the completed class if the todo is done
            if (todo.done) {
                button.classList.add("completed");
            }

            const taskText = document.createElement("span");
            taskText.textContent = todo.name;

            // Append the button and task text to the list item
            li.appendChild(button);
            li.appendChild(taskText);
            todoList.appendChild(li);

            // Add the click event listener for toggling
            button.addEventListener("click", () => {
                // Toggle the 'done' status and the 'completed' class
                todo.done = !todo.done;
                button.classList.toggle("completed");
                updateTodoFile(todos);

                // Optional: Log to verify
                console.log(`Todo item ${index} is now ${todo.done ? "completed" : "not completed"}`);
                console.log(todos);
            });
        });
        const addBut = document.getElementById("addBut");
        addBut.addEventListener("click", () =>{
            const PowerShell = require("powershell");
            const input = document.getElementById("input_field");
            if(input.value !== ""){
                let ps = new PowerShell('todo -a "'+input.value+'"');
            }

            // Handle process errors (e.g. powershell not found)



        })
    });

    // Function to update the JSON file
    function updateTodoFile(todos) {
        fs.writeFile(filePath, JSON.stringify(todos, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
            }
        });
    }
});
