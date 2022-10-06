let order = document.getElementById('order');
let container = document.querySelector('.container');
let add_note = document.getElementById('add-note');
let clear_notes = document.getElementById('clear-notes');
let write_note = document.getElementById('write-note');
let zero_notes = document.getElementById('zero-notes');
let oldestFirst = document.getElementById('oldestFirst');
let newestFirst = document.getElementById('newestFirst');
let displayOrder = document.getElementById('display-order');

window.onload = () => {
    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);

    displayOrder.style.visibility = "hidden";
    if(tasks === null || tasks.length === 0) return;
    
    let order = localStorage.getItem('order');
    if(order === null) order = "oldestFirst";
    
    if(order == "oldestFirst")
    displayOrder.innerText = "Oldest First";
    else
    displayOrder.innerText = "Newest First";
    
    Array.from(tasks).forEach((element) => {
        addTask(element[0], element[1], element[2], element[3], order);
    })
    
    displayOrder.style.visibility = "visible";
}

add_note.addEventListener('click', ()=>{
    let date = String(new Date());
    let time = date.substring(16,24);
    let textValue = write_note.value;
    date = date.substring(4,15);

    if(textValue.length === 0) return;

    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);
    
    let order = localStorage.getItem('order');
    if(order === null) order = "oldestFirst";

    let i = localStorage.getItem('i');

    if(tasks === null){
        i = 0;
        tasks = [];
    }

    let newTask = [date, time, textValue, i];
    tasks.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    addTask(date, time, textValue, i, order);

    write_note.value = "";
    i++;
    localStorage.setItem('i', i);
})

function addTask(date, time, textValue, id, order){
    let textField = document.createElement('div');
    textField.innerHTML = `<div class="datentime"><span class="date">${date}</span><span class="time">${time}</span></div><div class="task">${textValue}<img src="images/delete-64.png" id="${id}" class="delete" onclick="deleteTask(this.id)"></div>`;

    textField.id = `text-field${id}`;

    if(order === "oldestFirst")
        container.appendChild(textField);
    else
        container.insertBefore(textField, container.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);

    if(container.childElementCount !== 6){
        zero_notes.style.visibility = "hidden";
        displayOrder.style.visibility = "visible";
    }
}

function deleteTask(id){
    let current_task = document.getElementById(`text-field${id}`);
    container.removeChild(current_task);

    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);

    for (let index = 0; index < tasks.length; index++) {
        const element = tasks[index][3];
        if(element == id){
            tasks.splice(index, 1);
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

    if(container.childElementCount === 4){
        zero_notes.style.visibility = "visible";
        displayOrder.style.visibility = "hidden";
    }
}

clear_notes.addEventListener('click', ()=>{

    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);

    Array.from(tasks).forEach((element) => {
        let corresponding_elementId = `text-field${element[3]}`;
        let textField = document.getElementById(corresponding_elementId);
        container.removeChild(textField);
    });

    zero_notes.style.visibility = "visible";
    displayOrder.style.visibility = "hidden";

    localStorage.clear();
})

displayOrder.addEventListener('click', ()=>{
    let order = localStorage.getItem('order');
    if(order === null) order = "oldestFirst";

    if(displayOrder.innerText === "Display Order"){
        if(order === "oldestFirst")
            displayOrder.innerText = "Oldest First";
        else
            displayOrder.innerText = "Newest First";
    }
    else
        displayOrder.innerText = "Display Order";
})

oldestFirst.addEventListener('click',()=>{
    localStorage.setItem('order', "oldestFirst");
    displayOrder.innerText = "Oldest First";
    window.location.reload();
})

newestFirst.addEventListener('click',()=>{
    localStorage.setItem('order', "newestFirst");
    displayOrder.innerText = "Newest First";
    window.location.reload();
})

