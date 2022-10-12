let listOfTasks = document.getElementById('results')
let readBtn = document.getElementById('readBtn')
let createBtn = document.getElementById('createBtn')
let deleteBtn = document.getElementById('deleteBtn')
let updateBtn = document.getElementById('updateBtn')

function readTasks(){
    listOfTasks.innerHTML = "";
    userId = prompt('Please enter your user ID')
    if (!userId){
        alert("Request terminated")
    }else{
        fetch(`http://localhost:8000/todo/${userId}`)
            .then((data) => data.json())
            .then((tasks) => {
                tasks.forEach(task => {
                    let newTask = document.createElement('li');
                    newTask.classList.add("resultCard");
                    newTask.innerText = `Task ID:${task.id} \n ToDo: ${task.task}`
                    listOfTasks.append(newTask);
                })
            })
    }
}
function makeTask(){
    let taskBody = {
        "id_users": null,
        "task": null
    }
    let userInputId = prompt("Please enter your ID")
    let userInputTask = prompt("Please enter your ToDo")
    if(!userInputId || !userInputTask){
        alert('Request terminated')
    }
    else{
        taskBody.id_users = parseInt(userInputId)
        taskBody.task = userInputTask
        fetch(`http://localhost:8000/todo/create/${parseInt(userInputId)}`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskBody)
        })
    }
}

function changeTask(){
    let taskBody = {
        "task": null
    }
    let userInputTaskId = prompt("Please enter your task ID")
    let userInputTask = prompt("Please enter your new ToDo")
    if(!userInputTaskId || !userInputTask){
        alert("Request terminated")
    }else{
        taskBody.task = userInputTask
        fetch(`http://localhost:8000/todo/update/${parseInt(userInputTaskId)}`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskBody)
        })
        .then (alert('Your ToDo has been updated'))
    }
}

function deleteTask(){
    let userInputTaskId = prompt("Please enter your task ID")
    if(!userInputTaskId){
        alert('Request terminated');
    }else{
        fetch(`http://localhost:8000/todo/delete/${parseInt(userInputTaskId)}`, {
        method: "DELETE"
        })
        .then(alert('ToDo completed and removed successfully'))
    }
}

readBtn.addEventListener('click', readTasks)
createBtn.addEventListener('click', makeTask)
updateBtn.addEventListener('click', changeTask)
deleteBtn.addEventListener('click', deleteTask)