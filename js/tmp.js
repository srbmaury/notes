let order = document.getElementById('order');
let container = document.querySelector('.container');
let add_note = document.getElementById('add-note');
let clear_notes = document.getElementById('clear-notes');
let write_note = document.getElementById('write-note');
let zero_notes = document.getElementById('zero-notes');
let oldestFirst = document.getElementById('oldestFirst');
let newestFirst = document.getElementById('newestFirst');
let displayOrder = document.getElementById('display-order');
let searchButton = document.getElementById('searchButton');
let navList = document.getElementById('nav-list');
let hamburger = document.getElementById('hamburger');
let dropdownItems = document.querySelector('.dropdown-items');
let h1 = document.getElementsByTagName('h1')[1];
let editbox = document.getElementById('editbox');

window.onload = () => {
    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);

    displayOrder.style.visibility = "hidden";
    dropdownItems.style.visibility = "hidden";
    editbox.style.display = "none";

    if(tasks === null || tasks.length === 0) return;
    
    let order = localStorage.getItem('order');
    if(order === null) order = "oldestFirst";
    
    if(order == "oldestFirst")
        displayOrder.innerHTML = `Oldest First <i class="arrow down"></i>`;
    else
        displayOrder.innerHTML = `Newest First <i class="arrow down"></i>`;
    
    Array.from(tasks).forEach((element) => {
        addTask(element[0], element[1], element[2], element[3], order);
    })
    
    let important = localStorage.getItem('important');
    important = JSON.parse(important);

    if(important != null){
        important.forEach(element =>{
            markAsImp(element, "onload");
        })
    }

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
    if(h1.innerText !== "Your Notes")
        window.location.reload();
    write_note.value = "";
    i++;
    localStorage.setItem('i', i);
})

function addTask(date, time, textValue, id, order){
    let textField = document.createElement('div');
    textField.innerHTML = `<div class="datentime"><span class="date">${date}</span><span class="time">${time}</span><span class="fa fa-star checked" id="-${id}" onclick="markAsImp(this.id)"></span><span><img src="images/edit-2-64.png" class="buttonOnDOM" id="e${id}" onclick="edit(this.id)"></span></div><div class="task" id="task${id}">${textValue}<img src="images/delete-64.png" id="${id}" class="delete" onclick="deleteTask(this.id)"></div>`;

    textField.id = `text-field${id}`;

    if(order === "oldestFirst")
        container.appendChild(textField);
    else
        container.insertBefore(textField, container.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);

    if(container.childElementCount !== 5){
        zero_notes.style.display = "none";
        displayOrder.style.visibility = "visible";
    }
}

function deleteTask(id){
    let current_task = document.getElementById(`text-field${id}`);
    container.removeChild(current_task);

    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);

    let important = localStorage.getItem('important');
    important = JSON.parse(important);

    if(important != null){
        for (let index = 0; index < important.length; index++) {
            if(important[index] == `-${id}`){
                important.splice(index, 1);
            }
        }
    }

    for (let index = 0; index < tasks.length; index++) {
        const element = tasks[index][3];
        if(element == id){
            tasks.splice(index, 1);
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('important', JSON.stringify(important));

    if(container.childElementCount === 5){
        zero_notes.style.display = "block";
        displayOrder.style.visibility = "hidden";
    }
}

clear_notes.addEventListener('click', ()=>{

    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);

    zero_notes.style.display = "block";
    displayOrder.style.visibility = "hidden";

    if(h1.innerText !== "Your Notes")
        window.location.reload();
    localStorage.clear();

    if(tasks === null) return;
    Array.from(tasks).forEach((element) => {
        let corresponding_elementId = `text-field${element[3]}`;
        let textField = document.getElementById(corresponding_elementId);
        container.removeChild(textField);
    });
})

displayOrder.addEventListener('click', ()=>{
    let order = localStorage.getItem('order');
    if(order === null) order = "oldestFirst";

    if(displayOrder.innerText == "Display Order"){
        if(order === "oldestFirst")
            displayOrder.innerHTML = `Oldest First<i class="arrow down"></i>`;
        else
            displayOrder.innerHTML = `Newest First<i class="arrow down"></i>`;
        dropdownItems.style.visibility = "hidden";
    }
    else{
        displayOrder.innerHTML = `Display Order<i class="arrow down"></i>`;
        dropdownItems.style.visibility = "visible";
    }
})

oldestFirst.addEventListener('click',()=>{
    localStorage.setItem('order', "oldestFirst");
    displayOrder.innerHTML = "Oldest First";
    window.location.reload();
})

newestFirst.addEventListener('click',()=>{
    localStorage.setItem('order', "newestFirst");
    displayOrder.innerHTML = "Newest First";
    window.location.reload();
})

hamburger.addEventListener('click',()=>{
    
    navList.removeChild(searchButton);
    
    searchButton = document.createElement('button');
    searchButton.id = 'searchButton';
    searchButton.setAttribute('type', 'submit');
    searchButton.innerHTML = "Search";
    searchButton.addEventListener('click', searchTasks);
    navList.appendChild(searchButton);

    let nav = document.getElementsByTagName('nav')[0];
    let search = document.getElementById('searchButton');

    if(nav.style.height === '160px'){
        search.style.visibility = 'hidden';
        hamburger.innerHTML = `<div class="bars" style="transform: rotate(0deg); margin-top: 5px; position: relative;"></div> <div class="bars" style="transform: rotate(0deg); margin-top: 5px; position: relative;"></div> <div class="bars" style="visibility: visible;"></div>`;
        nav.style.height = '45px';
    }else{
        search.style.visibility = "visible";
        hamburger.innerHTML = ` <div class="bars" style="transform: rotate(45deg); margin-top: 12px; position: absolute;"></div> <div class="bars" style="transform: rotate(-45deg); margin-top: 12px; position: absolute;"></div> <div class="bars" style="visibility: hidden;"></div>`;
        nav.style.height = '160px';
    }
});

searchButton.addEventListener('click', searchTasks);
function searchTasks(){
    let heading = document.getElementsByTagName('h1')[1];
    
    text.value = text.value.toLowerCase();
    heading.innerHTML = `Notes Containg "${text.value}":`;

    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);

    zero_notes.style.display = "none";
    let found = false;
    if(tasks !== null){
        tasks.forEach((e) => {
            document.getElementById(`text-field${e[3]}`).style.display = "block ";
            let currText = e[2].toLowerCase();
            if(currText.includes(text.value)){
                found = true;
                document.getElementById(`text-field${e[3]}`).style.display = "block ";
            }else{
                document.getElementById(`text-field${e[3]}`).style.display = "none";
            }
        });
    }
    if(!found){
        zero_notes.innerHTML = "No match found!";
        zero_notes.style.display = "block";
    }
    document.querySelector('.dropdown').style.display = "none";
    text.value = "";
}

function markAsImp(id, time="default"){
    let star = document.getElementById(id);
    let important = localStorage.getItem('important');
    important = JSON.parse(important);

    if(important == null) important = [];

    if(time != "onload" && star.style.color == 'yellow'){
        star.style.color = 'white';
        for (let index = 0; index < important.length; index++) {
            if(important[index] == id){
                important.splice(index, 1);
            }
        }
    }
    else{
        star.style.color = 'yellow';
        if(time != "onload")
            important.push(id);
    }

    localStorage.setItem('important', JSON.stringify(important));
}

function edit(id){
    id = id.slice(1,);
    let reqId = "task"+id;
    if(editbox.style.display == "none")
        editbox.style.display = "block";
    else
        return;   
    document.body.style.overflow = 'hidden';
     
    blink("task"+id);
    let toChangeText = document.getElementById("toChangeText");
    toChangeText.value = document.getElementById(reqId).innerText;
    document.getElementById("changeText").addEventListener('click',()=>{
        let text = toChangeText.value;
        changeText(reqId, text);
    })
}

function changeText(reqId, text){
    document.getElementById(reqId).innerHTML = text;
    editbox.style.display = "none";

    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);

    reqId = reqId.slice(4,);
    Array.from(tasks).forEach((element) => {
        if(element[3] == reqId){
            element[2] = text;
        }
    })

    localStorage.setItem('tasks',JSON.stringify(tasks));
    window.location.reload();
}

document.getElementById('cancel').addEventListener('click',()=>{
    window.location.reload();
    editbox.style.display = "none";
})

function blink(id){
    let curr_ele = document.getElementById(id);
    setTimeout(() => {
        if(curr_ele.style.color !== "black")
            curr_ele.style.color = "black";
        else
            curr_ele.style.color = "white";
        blink(id);
    }, 500);
}