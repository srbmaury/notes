let write_note = document.getElementById('write-note');
let add_note = document.getElementById('add-note');
let zero_notes = document.getElementById('zero-notes');
let searchButton = document.getElementById('searchButton');
let text = document.getElementById('text');

let container, i, count;
searchButton.addEventListener('click', searchTasks);

document.getElementById('hamburger').addEventListener('click',()=>{
    searchButton = document.getElementById('searchButton');
    let navList = document.getElementById('nav-list');
    navList.removeChild(searchButton);

    searchButton = document.createElement('button');
    searchButton.id = 'searchButton';
    searchButton.setAttribute('type', 'submit');
    searchButton.innerHTML = "Search";
    searchButton.addEventListener('click', searchTasks);
    navList.appendChild(searchButton);

    let nav = document.getElementsByTagName('nav')[0];
    let search = document.getElementById('searchButton');
    let bars = document.getElementsByClassName('bars');
    if(nav.style.height === '160px'){
        search.style.visibility = 'hidden';
        bars[0].style.transform = "rotate(0deg)";
        bars[1].style.transform = "rotate(0deg)";
        bars[0].style.marginTop = "5px";
        bars[1].style.marginTop = "5px";
        bars[2].style.visibility = "visible";
        bars[0].style.position = "relative";
        bars[1].style.position = "relative";
        bars[2].style.position = "relative";
        nav.style.height = '45px';
    }else{
        search.style.visibility = "visible";
        bars[0].style.transform = "rotate(45deg)";
        bars[1].style.transform = "rotate(-45deg)";
        bars[0].style.marginTop = "12px";
        bars[1].style.marginTop = "12px";
        bars[2].style.visibility = "hidden";
        bars[0].style.position = "absolute";
        bars[1].style.position = "absolute";
        nav.style.height = '160px';
    }
});

window.onload = displayTasks;
function displayTasks(){
    let times = localStorage.getItem('times');
    times = JSON.parse(times);

    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);

    let deletes = localStorage.getItem('deletes');
    deletes = JSON.parse(deletes);

    let deletedItems = localStorage.getItem('deletedItems');
    deletedItems = JSON.parse(deletedItems);

    i = localStorage.getItem('i');
    if(i == null) i = 0;

    count = localStorage.getItem('count');
    if(count == null) count = 0;

    container = document.createElement('div');
    container.id = 'all-taks';
    container.className = 'container';

    document.body.appendChild(container);

    let displayed = false;
    if(tasks !== null){
        zero_notes.style.display = "none";

        for (let index = 0; index < tasks.length; index++){
            if(deletedItems !== null && deletedItems.includes(String(index))) continue;
            displayed = true;

            appendTask(tasks[index], times[index], deletes[index], index, false);
        }
    }

    if(displayed === false){
        i = 0;
        count = 0;
        zero_notes.style.display = "visible";
        localStorage.clear();
        return;
    }
}

add_note.addEventListener('click', ()=>{
    // localStorage.clear();
    let currTime = String(new Date());
    let textValue = write_note.value;
    let currId = `delete${i}`;

    let times = localStorage.getItem('times');
    times = JSON.parse(times);

    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);

    let deletes = localStorage.getItem('deletes');
    deletes = JSON.parse(deletes);

    if(textValue.length === 0) return;

    if(tasks === null){
        let newTime = [];
        newTime.push(currTime);
        localStorage.setItem('times',JSON.stringify(newTime));

        let newTask = [];
        newTask.push(textValue);
        localStorage.setItem('tasks',JSON.stringify(newTask));
        
        let newDelete = [];
        newDelete.push(currId);
        localStorage.setItem('deletes',JSON.stringify(newDelete));
    }
    else{
        times.push(currTime);
        localStorage.setItem('times',JSON.stringify(times));

        tasks.push(textValue);
        localStorage.setItem('tasks',JSON.stringify(tasks));

        deletes.push(currId);
        localStorage.setItem('deletes',JSON.stringify(deletes));
    }

    tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);

    zero_notes.style.display = "none";
    write_note.value = '';

    appendTask(textValue, currTime, currId, i, true);
})

function appendTask(textValue, currTime, currId, index, check){
    if(check) index = i;
    let newdate = document.createElement('div');
    let newdiv = document.createElement('div');
    let deletebtn = document.createElement('img');

    newdate.style.width = "100%";
    newdate.style.height = "40px";
    newdate.style.backgroundColor = "skyblue";
    newdate.style.borderRadius = "10px 10px 0 0";
    newdate.style.padding = "15px 5px 0px 10px";
    newdate.id = `id${index}`;

    newdiv.style.width = "100%";
    newdiv.style.minHeight = "30px";
    newdiv.style.marginBottom = "20px";
    newdiv.style.backgroundColor = "rgb(91 169 200)";
    newdiv.style.borderRadius = "0 0 10px 10px";
    newdiv.style.padding = "15px 5px 35px 10px";
    newdiv.id = `task${index}`;
    newdiv.style.overflowWrap = "break-word";

    deletebtn.src = 'images/delete-64.png';
    deletebtn.id = currId;
    deletebtn.style.width = "30px";
    deletebtn.style.height = "30px";
    deletebtn.style.zIndex = "1000";
    deletebtn.style.float = "right";
    deletebtn.style.cursor = "pointer";

    let newTime = document.createElement('span');
    newTime.innerHTML = currTime.substring(4,15);
    newTime.style.fontWeight = "600";
    newTime.style.fontSize = "25px";
    newTime.style.color = "#423ae9";
    newTime.id = `date${index}`;
    
    newdate.appendChild(newTime);
    
    newTime = document.createElement('span');
    newTime.innerHTML = currTime.substring(16,24);
    newTime.style.marginLeft = "10px";
    newTime.style.fontSize = "15px";
    newTime.id = `time${index}`;
    
    newdate.appendChild(newTime);
    
    newdiv.innerHTML = `${textValue}`;
    
    container.appendChild(newdate);
    container.appendChild(newdiv);
    newdiv.appendChild(deletebtn);

    if(check){
        i++;
        count++;
        localStorage.setItem('i',i);
    }
}

function searchTasks(){
    let heading = document.getElementsByTagName('h1')[1];
    text.value = text.value.toLowerCase();
    
    heading.innerHTML = `Notes Containg "${text.value}":`;
    for (let index = 0; index < i; index++) {

        let deletedItems = localStorage.getItem('deletedItems');
        deletedItems = JSON.parse(deletedItems);

        if(deletedItems !== null && deletedItems.includes(String(index)) === true) continue;

        let textCheck = document.getElementById(`task${index}`).innerText.toLowerCase();
        let timeCheck = document.getElementById(`time${index}`).innerText.toLowerCase();
        let dateCheck = document.getElementById(`date${index}`).innerText.toLowerCase();

        if(textCheck.includes(text.value) || timeCheck.includes(text.value) || dateCheck.includes(text.value)){
            document.getElementById(`id${index}`).style.display = "visible";
            document.getElementById(`task${index}`).style.display = "visible";
        }else{
            document.getElementById(`id${index}`).style.display = "none";
            document.getElementById(`task${index}`).style.display = "none";
        }
    }
    text.value = "";
}

document.getElementById('clear-notes').addEventListener('click', ()=>{
    localStorage.clear();
    window.location.reload();
    zero_notes.style.display = "visible";
})

document.addEventListener('click', (e) =>{
    let elementId = e.target.id;
    let index = elementId.substring(6,);
    if (elementId !== '' && elementId.includes('delete')) {
        let task = document.getElementById(`task${index}`);
        let date = document.getElementById(`id${index}`);

        let deletedItems = localStorage.getItem('deletedItems');
        deletedItems = JSON.parse(deletedItems);

        if(deletedItems === null){
            let newDeletedItem = [];
            newDeletedItem.push(index);
            localStorage.setItem('deletedItems',JSON.stringify(newDeletedItem));
        }else{
            deletedItems.push(index);
            localStorage.setItem('deletedItems',JSON.stringify(deletedItems));
        }

        task.parentElement.removeChild(task);
        date.parentElement.removeChild(date);

        count--;
        if(count === 0){
            displayTasks();
            window.location.reload();
            zero_notes.style.display = "visible";
        }
    }
});