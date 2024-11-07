// const fs = require('fs');
// const path = require('path');
// const PowerShell = require("powershell");
// const {} = require('electron');
// //const home = app.remote.app.getPath('home');
// // ipcRenderer.invoke('read-user-data').then(
// //     result => console.log(result)
// // );
// //const home = ipcRenderer.invoke('read-user-data');
// var home;
// window.electronAPI.getit().then(homePath => {
//     console.log('Home path:', homePath);
//     home = homePath;
// }).catch(error => {
//     console.error('Error fetching home path:', error);
// });
//
// document.addEventListener('DOMContentLoaded', () => {
//     const todoList = document.getElementById('todo-list');
//     //console.log(home)
//     //const filePath = path.join(__dirname, 'todo-cli/todo_list.json');
//     const filePath = path.join(home, 'todo-cli/todo_list.json');
//     console.log(filePath);
//
//     let todos = [];
//
//     // Load todo items from JSON file
//     fs.readFile(filePath, 'utf-8', (err, data) => {
//         if (err) {
//             console.error('Error reading file:', err);
//             return;
//         }
//
//         todos = JSON.parse(data);
//         todos.forEach((todo, index) => {
//             appendTodoToList(todo, index);
//         });
//
//         const addBut = document.getElementById("addBut");
//         addBut.addEventListener("click", () => {
//             const input = document.getElementById("input_field");
//             const newTodoText = input.value.trim();
//             const isDuplicate = todos.some(item => item.name === newTodoText);
//             if(isDuplicate){
//                 const error_msg = document.getElementById("error-msg");
//                 error_msg.innerHTML = "This item is already in the todo list!";
//                 error_msg.style.display = "inline";
//                 return;
//             }
//             else if (newTodoText !== "") {
//                 const error_msg = document.getElementById("error-msg");
//                 error_msg.style.display = "none";
//                 // Add new todo item to the JSON file via PowerShell command
//                 let ps = new PowerShell(`todo -a "${newTodoText}"`);
//                 // Update local todos array and the screen
//                 const newTodo = { name: newTodoText, done: false };
//                 todos.push(newTodo);
//                 appendTodoToList(newTodo, todos.length - 1);
//                 input.value = ""; // Clear input field
//                 updateTodoFile(todos); // Save updated list to JSON file
//             }
//         });
//
//
//     });
//
//     // Function to add a single todo item to the DOM
//     function appendTodoToList(todo, index) {
//         const li = document.createElement("li");
//         li.className = "todo-item";
//         li.id = `entry${index}`;
//
//         const button = document.createElement("button");
//         button.className = "checkbutton";
//         button.id = `${index}`;
//         button.innerHTML = '<span>x</span>';
//
//         if (todo.done) {
//             button.classList.add("completed");
//         }
//
//         const taskText = document.createElement("span");
//         taskText.textContent = todo.name;
//         const minus = document.createElement("button");
//         minus.className = "rem";
//         minus.id = `rem${index}`;
//         minus.textContent = "-";
//
//         li.appendChild(button);
//         li.appendChild(taskText);
//         li.appendChild(minus);
//
//         todoList.appendChild(li);
//
//         // Add the click event listener for toggling the done status
//         minus.addEventListener("click", () => {
//             // Remove the item from the todos array
//             todos.splice(index, 1); // Remove the todo item from the array based on index
//             // Update the JSON file
//             updateTodoFile(todos);
//             // Remove the li element from the DOM
//             todoList.removeChild(li); // Remove the todo item from the displayed list
//             let ps = new PowerShell(`todo -r "${todo.name}"`);
//         })
//
//         button.addEventListener("click", () => {
//             todo.done = !todo.done;
//             button.classList.toggle("completed");
//             updateTodoFile(todos);
//         });
//     }
//
//     // Function to update the JSON file with the latest todos
//     function updateTodoFile(todos) {
//         fs.writeFile(filePath, JSON.stringify(todos, null, 2), (err) => {
//             if (err) {
//                 console.error('Error writing file:', err);
//             }
//         });
//     }
// });








window.electronAPI.getHomePath().then(homePath => {
    const todoList = document.getElementById('todo-list');
    const filePath = window.electronAPI.getPath(homePath, 'todo-cli/todo_list.json');
    let todos = [];

    // Load todolist from JSON file
    window.electronAPI.readFile(filePath, 'utf-8')
        .then(data => {
            // todos = JSON.parse(data);
            // todos.forEach((todo, index) => appendTodoToList(todo, index));
            try {
                todos = data ? JSON.parse(data) : [];  // If data is empty, use an empty array
            } catch (err) {
                console.error('Error parsing JSON, initializing with an empty list:', err);
                todos = [];  // Set to an empty array if parsing fails
            }
            todos.forEach((todo, index) => appendTodoToList(todo, index));
        })
        .catch(err => console.error('Error reading file:', err));

    if(document.readyState !== 'loading'){
        console.log("Ready")
        initializeAdd();
    } else {

        document.addEventListener('DOMContentLoaded', () => {
            initializeAdd();
        });

    }

    // Append todo item to DOM
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

        li.append(button, taskText, minus);
        todoList.appendChild(li);

        minus.addEventListener("click", () => {
            todos.splice(index, 1); // Remove from array
            updateTodoFile(todos); // Update JSON
            todoList.removeChild(li); // Remove from DOM
            window.electronAPI.runPowerShell(`todo -r "${todo.name}"`);
        });

        button.addEventListener("click", () => {
            todo.done = !todo.done;
            if(button.classList.contains("completed")){
                window.electronAPI.runPowerShell(`todo -u ${todo.name}`);
            } else {
                window.electronAPI.runPowerShell(`todo -d ${todo.name}`);
            }
            button.classList.toggle("completed");
            updateTodoFile(todos);
        });
    }
    function initializeAdd(){
        const addBut = document.getElementById("addBut");
        console.log(addBut)

        addBut.addEventListener("click", () => {
            console.log("I am clicked")
            const input = document.getElementById("input_field");
            const newTodoText = input.value;
            console.log(newTodoText)
            const isDuplicate = todos.some(item => item.name === newTodoText);
            if (isDuplicate) {
                const errorMsg = document.getElementById("error-msg");
                errorMsg.innerHTML = "This item is already in the todo list!";
                errorMsg.style.display = "inline";
                return;
            }
            if (newTodoText) {
                document.getElementById("error-msg").style.display = "none";
                const newTodo = { name: newTodoText, done: false };
                todos.push(newTodo);
                appendTodoToList(newTodo, todos.length - 1);
                input.value = ""; // Clear input field
                updateTodoFile(todos); // Save updated list to JSON file

                // Add new todo item to JSON via PowerShell
                window.electronAPI.runPowerShell(`todo -a "${newTodoText}"`);
            }
        });
    }

    // Update JSON file with latest items
    function updateTodoFile(todos) {
        window.electronAPI.writeFile(filePath, JSON.stringify(todos, null, 2))
            .catch(err => console.error('Error writing file:', err))
}}).catch(error => {
    console.error('Error fetching home path:', error);
});
